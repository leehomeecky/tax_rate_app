import { Module } from '@nestjs/common';
import { TaxService } from './tax.service';
import { TaxController } from './tax.controller';

@Module({
  controllers: [TaxController],
  providers: [TaxService],
})
export class TaxModule {}
