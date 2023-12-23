import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { TaxService } from './tax.service';
import { Request, Response } from 'express';
import { createTaxDto } from './tax.dto';

@Controller('tax')
export class TaxController {
  constructor(private readonly taxService: TaxService) {}

  @Post('/')
  async createTax(
    @Req() req: Request,
    @Body() body: createTaxDto,
    @Res() resp: Response,
  ) {
    await this.taxService.createTax(body);
    return resp.json({ code: 0, message: 'Operations sucessful' });
  }

  @Get()
  async findAll() {
    return await this.taxService.findAll();
  }
}
