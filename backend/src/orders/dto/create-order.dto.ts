import { Type } from "class-transformer";
import {
  IsArray,
  IsEmail,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from "class-validator";

export class CreateOrderItemDto {
  @IsOptional()
  @IsString()
  productId?: string;

  @IsString()
  name!: string;

  @IsInt()
  @Min(1)
  quantity!: number;

  @IsInt()
  @Min(1)
  unitPrice!: number;

  @IsOptional()
  @IsString()
  image?: string;
}

export class CreateOrderDto {
  @IsString()
  customerName!: string;

  @IsEmail()
  customerEmail!: string;

  @IsOptional()
  @IsString()
  customerPhone?: string;

  @IsOptional()
  @IsString()
  shippingAddress?: string;

  @IsOptional()
  @IsString()
  @IsIn(["paystack", "opay"])
  paymentMethod?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  shippingFee?: number;

  @IsOptional()
  @IsString()
  @IsIn(["Lagos", "Abuja", "Ibadan"])
  deliveryCity?: string;

  @IsOptional()
  @IsString()
  @IsIn(["NGN", "ZAR", "ngn", "zar"])
  currency?: string;

  @IsOptional()
  @IsNumber()
  deliveryLatitude?: number;

  @IsOptional()
  @IsNumber()
  deliveryLongitude?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items!: CreateOrderItemDto[];
}
