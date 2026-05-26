import { Injectable, NotFoundException } from "@nestjs/common";
import { TicketPriority, TicketStatus } from "@prisma/client";
import { formatDateTime } from "../common/order-format";
import { PrismaService } from "../prisma/prisma.service";

function toClientPriority(
  priority: TicketPriority
): "high" | "medium" | "low" {
  return priority.toLowerCase() as "high" | "medium" | "low";
}

function toClientTicketStatus(
  status: TicketStatus
): "open" | "in_progress" | "resolved" | "closed" {
  return status.toLowerCase() as
    | "open"
    | "in_progress"
    | "resolved"
    | "closed";
}

@Injectable()
export class TicketsService {
  constructor(private readonly prisma: PrismaService) {}

  async listTickets() {
    const tickets = await this.prisma.supportTicket.findMany({
      orderBy: { createdAt: "desc" },
    });

    return tickets.map((ticket) => ({
      id: ticket.ticketNumber,
      subject: ticket.subject,
      customer: ticket.customerName,
      email: ticket.customerEmail,
      createdAt: formatDateTime(ticket.createdAt),
      priority: toClientPriority(ticket.priority),
      status: toClientTicketStatus(ticket.status),
      orderId: ticket.orderNumber
        ? ticket.orderNumber.startsWith("#")
          ? ticket.orderNumber
          : `#${ticket.orderNumber}`
        : undefined,
    }));
  }

  async updateStatus(ticketNumber: string, status: string) {
    const map: Record<string, TicketStatus> = {
      open: TicketStatus.OPEN,
      in_progress: TicketStatus.IN_PROGRESS,
      resolved: TicketStatus.RESOLVED,
      closed: TicketStatus.CLOSED,
    };

    const prismaStatus = map[status];
    if (!prismaStatus) {
      throw new NotFoundException("Invalid ticket status.");
    }

    const ticket = await this.prisma.supportTicket.update({
      where: { ticketNumber },
      data: { status: prismaStatus },
    });

    return {
      id: ticket.ticketNumber,
      status: toClientTicketStatus(ticket.status),
    };
  }

  async listCustomers() {
    const tickets = await this.prisma.supportTicket.findMany({
      orderBy: { createdAt: "desc" },
    });

    const byEmail = new Map<
      string,
      { name: string; email: string; tickets: number; lastContact: Date }
    >();

    for (const ticket of tickets) {
      const key = ticket.customerEmail;
      const existing = byEmail.get(key);
      if (!existing) {
        byEmail.set(key, {
          name: ticket.customerName,
          email: ticket.customerEmail,
          tickets: 1,
          lastContact: ticket.createdAt,
        });
        continue;
      }

      existing.tickets += 1;
      if (ticket.createdAt > existing.lastContact) {
        existing.lastContact = ticket.createdAt;
        existing.name = ticket.customerName;
      }
    }

    return Array.from(byEmail.values()).map((row, index) => ({
      id: `cust-${index + 1}`,
      name: row.name,
      email: row.email,
      tickets: row.tickets,
      lastContact: formatDateTime(row.lastContact),
    }));
  }
}
