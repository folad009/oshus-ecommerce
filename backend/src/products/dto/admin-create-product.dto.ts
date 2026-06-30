import { IsOptional, IsString } from "class-validator";
import { CreateProductDto } from "./create-product.dto";

export class AdminCreateProductDto extends CreateProductDto {
  @IsOptional()
  @IsString()
  vendorEmail?: string;
}
