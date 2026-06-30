import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Min,
  ValidateIf,
} from "class-validator";

export class CreateProductDto {
  @IsString()
  name!: string;

  @IsString()
  category!: string;

  @IsInt()
  @Min(1)
  price!: number;

  @IsInt()
  @Min(1)
  originalPrice!: number;

  /** @deprecated Use images — kept for backward compatibility */
  @ValidateIf((dto: CreateProductDto) => !dto.images?.length)
  @IsUrl()
  @IsOptional()
  image?: string;

  @ValidateIf((dto: CreateProductDto) => !dto.image)
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(4)
  @IsUrl({}, { each: true })
  @IsOptional()
  images?: string[];

  @IsInt()
  @Min(0)
  stock!: number;
}
