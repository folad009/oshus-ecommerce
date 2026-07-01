import { Type } from "class-transformer";
import {
  IsArray,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

export class AdditionalInfoDto {
  @IsString()
  label!: string;

  @IsString()
  value!: string;
}

export class ProductDetailsFieldsDto {
  @IsOptional()
  @IsString()
  sku?: string;

  @IsOptional()
  @IsString()
  shortDescription?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  description?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  descriptionBullets?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  sizes?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AdditionalInfoDto)
  additionalInfo?: AdditionalInfoDto[];
}
