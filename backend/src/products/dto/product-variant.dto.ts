import { Type } from "class-transformer";
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from "class-validator";

export class ProductVariantDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  sku?: string;

  @IsOptional()
  @IsString()
  weight?: string;

  @IsOptional()
  @IsString()
  packSize?: string;

  @IsOptional()
  @IsString()
  flavour?: string;

  @IsInt()
  @Min(1)
  price!: number;

  @IsInt()
  @Min(1)
  originalPrice!: number;

  @IsInt()
  @Min(0)
  stock!: number;
}

export class ProductVariantsFieldDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductVariantDto)
  variants?: ProductVariantDto[];
}
