import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotAcceptableException,
} from '@nestjs/common';
import { createTaxDto, updateTaxDto } from './tax.dto';
import { Country, ProductAndService, Tax } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  async createTax(data: createTaxDto) {
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

  async updateTax(data: updateTaxDto) {
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

  async getAllTaxes() {
    try {
      // return result;
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
