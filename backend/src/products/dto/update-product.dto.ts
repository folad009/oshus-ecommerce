import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Min,
} from "class-validator";
import { ProductDetailsFieldsDto } from "./product-details.dto";

export class UpdateProductDto extends ProductDetailsFieldsDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  price?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  originalPrice?: number;

  @IsOptional()
  @IsUrl()
  image?: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(4)
  @IsUrl({}, { each: true })
  images?: string[];

  @IsOptional()
  @IsInt()
  @Min(0)
  stock?: number;
}
