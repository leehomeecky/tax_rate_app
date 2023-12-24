import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { productServiceCategoryEnum } from 'src/entities/ProductAndService';

export class CreateTaxDto {
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

export class UpdateTaxDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString({ message: 'countryCode is not a valid string' })
  @IsOptional()
  countryCode: string;

  @IsNumber()
  @IsOptional()
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

export class GetAllTaxFilter {
  @IsString()
  @IsOptional()
  search?: string;

  @IsNumberString()
  @IsOptional()
  limit?: number;

  @IsNumberString()
  @IsOptional()
  offset?: number;
}
