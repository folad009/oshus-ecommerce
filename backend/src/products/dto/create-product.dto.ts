import { IsInt, IsString, IsUrl, Min } from "class-validator";

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

  @IsUrl()
  image!: string;

  @IsInt()
  @Min(0)
  stock!: number;
}
