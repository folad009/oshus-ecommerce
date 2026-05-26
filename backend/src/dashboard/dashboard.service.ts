import { Injectable } from "@nestjs/common";
import {
  OrderStatus,
  ProductStatus,
  Role,
  TicketPriority,
  TicketStatus,
} from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getAdminStats() {
    const [orders, products, customers] = await Promise.all([
      this.prisma.order.findMany(),
      this.prisma.product.count({ where: { status: ProductStatus.APPROVED } }),
      this.prisma.user.count({ where: { role: Role.CUSTOMER } }),
    ]);

    const revenue = orders.reduce((sum, o) => sum + o.total, 0);
    const pending = orders.filter(
      (o) =>
        o.status === OrderStatus.PENDING ||
        o.status === OrderStatus.PROCESSING
    ).length;

    return {
      stats: [
        {
          label: "Total Revenue",
          value: formatNaira(revenue),
          change: "+12.5%",
          trend: "up" as const,
        },
        {
          label: "Total Orders",
          value: String(orders.length),
          change: "+8.2%",
          trend: "up" as const,
        },
        {
          label: "Products",
          value: String(products),
          change: "+2 new",
          trend: "neutral" as const,
        },
        {
          label: "Customers",
          value: String(customers),
          change: "+18.1%",
          trend: "up" as const,
        },
      ],
      pendingCount: pending,
      orderCounts: Object.values(OrderStatus).reduce(
        (acc, status) => {
          acc[status.toLowerCase()] = orders.filter(
            (o) => o.status === status
          ).length;
          return acc;
        },
        {} as Record<string, number>
      ),
    };
  }

  async getVendorStats(vendorId: string) {
    const [items, products] = await Promise.all([
      this.prisma.orderItem.findMany({
        where: { vendorId },
        include: { order: true },
      }),
      this.prisma.product.findMany({ where: { vendorId } }),
    ]);

    const earnings = items.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0
    );
    const orderIds = new Set(items.map((i) => i.orderId));
    const lowStock = products.filter((p) => p.stock < 15).length;
    const pending = items.filter(
      (i) =>
        i.order.status === OrderStatus.PENDING ||
        i.order.status === OrderStatus.PROCESSING
    ).length;

    return {
      stats: [
        {
          label: "Total Earnings",
          value: formatNaira(earnings),
          change: "+14.2%",
          trend: "up" as const,
        },
        {
          label: "Orders",
          value: String(orderIds.size),
          change: "+9 this week",
          trend: "up" as const,
        },
        {
          label: "Products",
          value: String(products.length),
          change: lowStock > 0 ? `${lowStock} low stock` : "All stocked",
          trend: "neutral" as const,
        },
        {
          label: "Store Rating",
          value: "4.8",
          change: "+32 reviews",
          trend: "up" as const,
        },
      ],
      pendingCount: pending,
      lowStockCount: lowStock,
    };
  }

  async getSupportStats() {
    const tickets = await this.prisma.supportTicket.findMany();
    const open = tickets.filter(
      (t) =>
        t.status === TicketStatus.OPEN ||
        t.status === TicketStatus.IN_PROGRESS
    ).length;
    const resolvedToday = tickets.filter(
      (t) =>
        t.status === TicketStatus.RESOLVED &&
        t.createdAt.toDateString() === new Date().toDateString()
    ).length;

    return {
      stats: [
        {
          label: "Open Tickets",
          value: String(open),
          change: "+3 today",
          trend: "up" as const,
        },
        {
          label: "Resolved Today",
          value: String(resolvedToday),
          change: "+4 vs yesterday",
          trend: "up" as const,
        },
        {
          label: "Avg. Response",
          value: "24 min",
          change: "-6 min",
          trend: "up" as const,
        },
        {
          label: "Active Chats",
          value: "5",
          change: "2 waiting",
          trend: "neutral" as const,
        },
      ],
      openCount: open,
      highPriorityCount: tickets.filter(
        (t) =>
          t.priority === TicketPriority.HIGH &&
          t.status !== TicketStatus.CLOSED &&
          t.status !== TicketStatus.RESOLVED
      ).length,
      ticketCounts: Object.values(TicketStatus).reduce(
        (acc, status) => {
          acc[status.toLowerCase()] = tickets.filter(
            (t) => t.status === status
          ).length;
          return acc;
        },
        {} as Record<string, number>
      ),
    };
  }
}
