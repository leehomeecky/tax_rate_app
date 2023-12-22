import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { request } from 'src/helper/globals';
import { TaxProductCode } from './tax.dto';

@Injectable()
export class TaxService {
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
