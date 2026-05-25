import { IsIn } from "class-validator";

export class UpdateProductStatusDto {
  @IsIn(["approved", "rejected"])
  status!: "approved" | "rejected";
}
