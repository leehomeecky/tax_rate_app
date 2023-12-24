import { Module } from '@nestjs/common';
import { TaxService } from './tax.service';
import { TaxController } from './tax.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Country,
  ProductAndService,
  Tax,
  TaxLookUpHistory,
} from 'src/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Tax,
      Country,
      ProductAndService,
      TaxLookUpHistory,
    ]),
  ],
  controllers: [TaxController],
  providers: [TaxService],
})
export class TaxModule {}
