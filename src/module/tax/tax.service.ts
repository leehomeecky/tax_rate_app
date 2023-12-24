import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotAcceptableException,
} from '@nestjs/common';
import { CreateTaxDto, GetAllTaxFilter, UpdateTaxDto } from './tax.dto';
import { Country, ProductAndService, Tax } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DEFAULT_LIMIT } from 'src/helper/constants';

@Injectable()
export class TaxService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepo: Repository<Country>,
    @InjectRepository(ProductAndService)
    private readonly productAndServiceRepo: Repository<ProductAndService>,
    @InjectRepository(Tax)
    private readonly taxRepo: Repository<Tax>,
  ) {}

  async createTax(data: CreateTaxDto) {
    const { countryCode, taxRate, productCode, serviceCode } = data;
    const productAndServiceCode = productCode || serviceCode;

    if (!productAndServiceCode)
      throw new BadRequestException(
        null,
        'Either productCode, or serviceCode must be passed',
      );
    try {
      const country = await this.countryRepo.findOne({
        where: { countryCode },
      });
      const productService = await this.productAndServiceRepo.findOne({
        where: { shortName: productAndServiceCode },
      });

      if (!country)
        throw new NotAcceptableException(null, 'inwalid country selected');
      if (!productService)
        throw new NotAcceptableException(
          null,
          'invalid productCode or serviceCod passed',
        );

      const sqlData: Tax = {
        taxRate,
        productService,
        country,
      };

      await this.taxRepo.save(sqlData);
    } catch (error) {
      Logger.error(error);
      throw new NotAcceptableException(null, 'tax creation failed');
    }
  }

  async updateTax(data: UpdateTaxDto) {
    const { id, countryCode, taxRate, productCode, serviceCode } = data;
    const productAndServiceCode = productCode || serviceCode;

    try {
      const country = await this.countryRepo.findOne({
        where: { countryCode },
      });
      const productService = await this.productAndServiceRepo.findOne({
        where: { shortName: productAndServiceCode },
      });

      const sqlData: Tax = {};

      if (taxRate) sqlData.taxRate = taxRate;
      if (country) sqlData.country = country;
      if (productService) sqlData.productService = productService;

      await this.taxRepo.update(id, sqlData);
    } catch (error) {
      Logger.error(error);
      throw new NotAcceptableException(null, 'tax update failed');
    }
  }

  async getAllTaxes(filter: GetAllTaxFilter) {
    try {
      const { search, offset, limit } = filter;
      DEFAULT_LIMIT;
      const taxSql = this.taxRepo
        .createQueryBuilder('tax')
        .select('tax', 'tax')
        .leftJoinAndSelect('tax.productService', 'productService')
        .leftJoinAndSelect('tax.country', 'country')
        .leftJoinAndSelect('country.region', 'region')
        .limit(+limit || DEFAULT_LIMIT)
        .offset(+offset || 0);

      const taxMetaSql = this.taxRepo
        .createQueryBuilder('tax')
        .select('COUNT(tax.id)', 'count');

      if (search?.length)
        taxSql.andWhere(
          `(
            productService.name LIKE :search OR
            productService.shortName LIKE :search OR
            country.name LIKE :search OR
            country.countryCode LIKE :search OR
            region.name LIKE :search OR
            region.shortName LIKE :search OR
            tax.taxRate LIKE :search
          )`,
          { search: `%${search}%` },
        );

      const [tax, taxMeta] = await Promise.all([
        taxSql.getMany(),
        taxMetaSql.getRawOne(),
      ]);

      return {
        ...tax,
        pagination: {
          count: +taxMeta.count,
          limit: +limit || DEFAULT_LIMIT,
          offset: +offset || 0,
        },
      };
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(null, 'server error');
    }
  }

  async getTaxe(id) {
    try {
      const result = await this.taxRepo.findOne({
        where: { id },
        relations: [
          'country',
          'productService',
          'lookUpHistory',
          'country.region',
        ],
      });
      return result;
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(null, 'server error');
    }
  }

  async removeTaxe(id) {
    try {
      await this.taxRepo.softDelete(id);
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(null, 'server error');
    }
  }
}
