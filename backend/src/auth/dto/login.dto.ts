import { IsEmail, IsIn, IsString, MinLength } from "class-validator";
import type { PortalRole } from "../../common/roles";

export class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsIn(["admin", "vendor", "support"])
  portal!: PortalRole;
}
