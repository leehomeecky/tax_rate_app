import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotAcceptableException,
} from '@nestjs/common';
import { request } from 'src/helper/globals';
import { TaxProductCode, createTaxDto } from './tax.dto';
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

    if (productAndServiceCode)
      throw new BadRequestException(
        null,
        'Either productCode, or serviceCode must be passed',
      );
    try {
      const country = await this.countryRepo.findOne({
        where: { countryCode },
      });
      const productService = await this.productAndServiceRepo.findOne({
        where: { category: productAndServiceCode },
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
  async findAll() {
    try {
      const result = await request({
        Authorization:
          'Apikey gok47TuAezs8wBROucv0A3gXtVU8vH6uV3uNi186t8tKvmTmw1mZOY8DZu4dvZ20',
      })(
        'https://api.taxrates.io/api/v3/tax/rates',
        {
          Product_code: TaxProductCode.SAAS,
          domain: 'api.taxrates.io',
          filter: 'CombinedRate',
        },
        'GET',
      );
      console.log({ result });
      return result;
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(null, 'server error');
    }
  }
}
