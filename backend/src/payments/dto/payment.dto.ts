import { IsIn, IsString } from "class-validator";

export class InitializePaymentDto {
  @IsString()
  orderNumber!: string;

  @IsString()
  @IsIn(["paystack", "opay"])
  provider!: string;
}

export class VerifyPaymentDto {
  @IsString()
  reference!: string;

  @IsString()
  @IsIn(["paystack", "opay"])
  provider!: string;
}
