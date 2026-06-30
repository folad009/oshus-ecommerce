import {
  IsEmail,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";

export class KwikQuoteDto {
  @IsString()
  deliveryAddress!: string;

  @IsString()
  @IsIn(["Lagos", "Abuja", "Ibadan"])
  deliveryCity!: string;

  @IsString()
  customerName!: string;

  @IsString()
  customerPhone!: string;

  @IsEmail()
  customerEmail!: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;
}
