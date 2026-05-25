import { IsEmail, IsIn, IsOptional, IsString, MinLength } from "class-validator";

export class CreateStaffDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsIn(["vendor", "support"])
  role!: "vendor" | "support";

  @IsOptional()
  @IsString()
  storeName?: string;
}
