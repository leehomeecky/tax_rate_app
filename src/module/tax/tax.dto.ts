import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { productServiceCategoryEnum } from 'src/entities/ProductAndService';

export enum TaxProductCode {
  SAAS = 'C018',
  E_COMMERCE = 'C022',
}

export class createTaxDto {
  @IsString({ message: 'countryCode is not a valid string' })
  @IsNotEmpty()
  countryCode: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(100)
  taxRate: number;

  @IsOptional()
  @IsString()
  productCode?: productServiceCategoryEnum;

  @IsOptional()
  @IsString()
  serviceCode?: productServiceCategoryEnum;
}
