import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  UseGuards,
} from "@nestjs/common";
import { Role } from "@prisma/client";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { UpdateTicketStatusDto } from "./dto/update-ticket-status.dto";
import { TicketsService } from "./tickets.service";

@Controller("tickets")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SUPPORT)
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  list() {
    return this.ticketsService
      .listTickets()
      .then((tickets) => ({ tickets }));
  }

  @Get("customers")
  listCustomers() {
    return this.ticketsService
      .listCustomers()
      .then((customers) => ({ customers }));
  }

  @Patch(":ticketNumber/status")
  updateStatus(
    @Param("ticketNumber") ticketNumber: string,
    @Body() body: UpdateTicketStatusDto
  ) {
    return this.ticketsService.updateStatus(ticketNumber, body.status);
  }
}
