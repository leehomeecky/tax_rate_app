import { Controller, Get } from '@nestjs/common';
import { TaxService } from './tax.service';

@Controller('tax')
export class TaxController {
  constructor(private readonly taxService: TaxService) {}

  @Get()
  async findAll() {
    return await this.taxService.findAll();
  }
}
