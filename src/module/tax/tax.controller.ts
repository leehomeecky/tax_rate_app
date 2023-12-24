import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { TaxService } from './tax.service';
import { Request, Response } from 'express';
import { CreateTaxDto, GetAllTaxFilter, UpdateTaxDto } from './tax.dto';

@Controller('tax')
export class TaxController {
  constructor(private readonly taxService: TaxService) {}

  @Post('/')
  async createTax(
    @Req() req: Request,
    @Body() body: CreateTaxDto,
    @Res() resp: Response,
  ) {
    await this.taxService.createTax(body);
    return resp.json({ code: 0, message: 'Operations sucessful' });
  }

  @Get('/')
  async getAllTaxes(
    @Req() req: Request,
    @Query() query: GetAllTaxFilter,
    @Res() resp: Response,
  ) {
    const result = await this.taxService.getAllTaxes(query);
    resp.json({ ...result, code: 0, message: 'Operations sucessful' });
  }

  @Get('/:id')
  async getTaxe(
    @Req() req: Request,
    @Param('id', new ParseIntPipe()) id,
    @Res() resp: Response,
  ) {
    const result = await this.taxService.getTaxe(id);
    return resp.json({
      ...result,
      code: 0,
      message: 'Operations sucessful',
    });
  }

  @Put('/')
  async updateTax(
    @Req() req: Request,
    @Body() body: UpdateTaxDto,
    @Res() resp: Response,
  ) {
    await this.taxService.updateTax(body);
    return resp.json({ code: 0, message: 'Operations sucessful' });
  }

  @Delete('/:id')
  async removeTaxe(
    @Req() req: Request,
    @Param('id', new ParseIntPipe()) id,
    @Res() resp: Response,
  ) {
    await this.taxService.removeTaxe(id);
    return resp.json({
      code: 0,
      message: 'Operations sucessful',
    });
  }
}
