import { IsIn } from "class-validator";

export class UpdateTicketStatusDto {
  @IsIn(["open", "in_progress", "resolved", "closed"])
  status!: "open" | "in_progress" | "resolved" | "closed";
}
