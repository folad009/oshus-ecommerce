import {
  OrderStatus,
  PrismaClient,
  ProductStatus,
  Role,
  TicketPriority,
  TicketStatus,
  UserStatus,
} from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

const orderSeeds = [
  {
    orderNumber: "SDGT1254FD",
    customerName: "Ada Okonkwo",
    customerEmail: "ada@example.com",
    customerPhone: "+234 801 234 5678",
    orderDate: new Date("2024-04-20"),
    itemCount: 4,
    total: 270_000,
    status: OrderStatus.PROCESSING,
    shippingAddress: "12 Admiralty Way, Lekki Phase 1, Lagos, Nigeria",
    trackingNumber: "GIG-8847291-NG",
    estimatedDelivery: "24 Apr 2024",
    items: [
      { name: "SilkSculpt Serum", sku: "SS-001", quantity: 2, unitPrice: 45_000 },
      { name: "VelvetGlow Foundation", sku: "VG-002", quantity: 1, unitPrice: 32_000 },
    ],
  },
  {
    orderNumber: "SDGT1253AB",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    orderDate: new Date("2024-04-19"),
    itemCount: 2,
    total: 150_000,
    status: OrderStatus.SHIPPED,
    trackingNumber: "GIG-7729102-NG",
    estimatedDelivery: "23 Apr 2024",
    items: [
      { name: "Radiant Repair Oil", sku: "RR-010", quantity: 1, unitPrice: 75_000 },
      { name: "Luxe Lip Tint", sku: "LL-004", quantity: 1, unitPrice: 75_000 },
    ],
  },
  {
    orderNumber: "SDGT1252XY",
    customerName: "Sarah Kim",
    customerEmail: "sarah@example.com",
    orderDate: new Date("2024-04-18"),
    itemCount: 1,
    total: 48_000,
    status: OrderStatus.DELIVERED,
    items: [
      { name: "Hydra Mist Toner", sku: "HM-007", quantity: 1, unitPrice: 48_000 },
    ],
  },
  {
    orderNumber: "SDGT1251PQ",
    customerName: "Michael Chen",
    customerEmail: "michael@example.com",
    orderDate: new Date("2024-04-18"),
    itemCount: 3,
    total: 185_000,
    status: OrderStatus.PENDING,
    items: [
      { name: "Glow Primer", sku: "GP-003", quantity: 2, unitPrice: 62_500 },
      { name: "Brow Sculpt Gel", sku: "BS-008", quantity: 1, unitPrice: 60_000 },
    ],
  },
  {
    orderNumber: "SDGT1250LM",
    customerName: "Grace Adeyemi",
    customerEmail: "grace@example.com",
    orderDate: new Date("2024-04-17"),
    itemCount: 5,
    total: 320_000,
    status: OrderStatus.DELIVERED,
    items: [
      { name: "SilkSculpt Serum", sku: "SS-001", quantity: 3, unitPrice: 45_000 },
      { name: "Night Recovery Cream", sku: "NR-012", quantity: 2, unitPrice: 92_500 },
    ],
  },
  {
    orderNumber: "SDGT1249RS",
    customerName: "David Wilson",
    customerEmail: "david@example.com",
    orderDate: new Date("2024-04-17"),
    itemCount: 2,
    total: 95_000,
    status: OrderStatus.CANCELLED,
    items: [
      { name: "VelvetGlow Foundation", sku: "VG-002", quantity: 2, unitPrice: 47_500 },
    ],
  },
];

type OrderSeed = (typeof orderSeeds)[number] & {
  customerPhone?: string;
  shippingAddress?: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
};

const ticketSeeds: Array<{
  ticketNumber: string;
  subject: string;
  customerName: string;
  customerEmail: string;
  priority: TicketPriority;
  status: TicketStatus;
  orderNumber?: string;
  createdAt: Date;
}> = [
  {
    ticketNumber: "TKT-1042",
    subject: "Order not delivered — #SDGT1254FD",
    customerName: "Ada Okonkwo",
    customerEmail: "ada@example.com",
    priority: TicketPriority.HIGH,
    status: TicketStatus.OPEN,
    orderNumber: "SDGT1254FD",
    createdAt: new Date("2024-04-20T09:15:00"),
  },
  {
    ticketNumber: "TKT-1041",
    subject: "Wrong item received",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    priority: TicketPriority.HIGH,
    status: TicketStatus.IN_PROGRESS,
    orderNumber: "SDGT1253AB",
    createdAt: new Date("2024-04-20T08:40:00"),
  },
  {
    ticketNumber: "TKT-1040",
    subject: "Refund request for cancelled order",
    customerName: "David Wilson",
    customerEmail: "david@example.com",
    priority: TicketPriority.MEDIUM,
    status: TicketStatus.IN_PROGRESS,
    orderNumber: "SDGT1249RS",
    createdAt: new Date("2024-04-19T16:20:00"),
  },
  {
    ticketNumber: "TKT-1039",
    subject: "Paystack payment failed at checkout",
    customerName: "Sarah Kim",
    customerEmail: "sarah@example.com",
    priority: TicketPriority.MEDIUM,
    status: TicketStatus.OPEN,
    createdAt: new Date("2024-04-19T14:10:00"),
  },
  {
    ticketNumber: "TKT-1038",
    subject: "How to change delivery address?",
    customerName: "Michael Chen",
    customerEmail: "michael@example.com",
    priority: TicketPriority.LOW,
    status: TicketStatus.RESOLVED,
    orderNumber: "SDGT1251PQ",
    createdAt: new Date("2024-04-19T11:00:00"),
  },
  {
    ticketNumber: "TKT-1037",
    subject: "Product availability inquiry",
    customerName: "Grace Adeyemi",
    customerEmail: "grace@example.com",
    priority: TicketPriority.LOW,
    status: TicketStatus.CLOSED,
    createdAt: new Date("2024-04-18T15:45:00"),
  },
];

async function main() {
  const password = await bcrypt.hash("password123", 10);

  const users = [
    {
      email: "admin@oshusstore.com",
      name: "Admin User",
      role: Role.ADMIN,
      storeName: null,
    },
    {
      email: "chioma@glowbeauty.ng",
      name: "Chioma Adeleke",
      role: Role.VENDOR,
      storeName: "Glow Beauty Co.",
    },
    {
      email: "amara@oshusstore.com",
      name: "Amara Bello",
      role: Role.SUPPORT,
      storeName: null,
    },
    {
      email: "customer@example.com",
      name: "Demo Customer",
      role: Role.CUSTOMER,
      storeName: null,
    },
  ] as const;

  const categoryNames = [
    "Skin Care",
    "Makeup",
    "Hair Care",
    "Fragrances",
    "Nail Care",
    "Body Care",
  ] as const;

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {
        name: user.name,
        role: user.role,
        storeName: user.storeName,
        password,
        status: UserStatus.ACTIVE,
      },
      create: {
        email: user.email,
        name: user.name,
        role: user.role,
        storeName: user.storeName,
        password,
        status: UserStatus.ACTIVE,
      },
    });
  }

  for (const name of categoryNames) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  const vendor = await prisma.user.findUnique({
    where: { email: "chioma@glowbeauty.ng" },
  });

  if (!vendor) {
    throw new Error("Vendor user missing after seed.");
  }

  const product = await prisma.product.upsert({
    where: { id: "seed-silk-serum" },
    update: {
      vendorId: vendor.id,
      name: "SilkSculpt Serum",
      category: "Skin Care",
      price: 45_000,
      originalPrice: 52_000,
      image:
        "https://images.unsplash.com/photo-1620916563828-0db4a4a758a0?w=400&h=400&fit=crop",
      rating: 4.8,
      discount: "13%",
      stock: 42,
      status: ProductStatus.APPROVED,
    },
    create: {
      id: "seed-silk-serum",
      vendorId: vendor.id,
      name: "SilkSculpt Serum",
      category: "Skin Care",
      price: 45_000,
      originalPrice: 52_000,
      image:
        "https://images.unsplash.com/photo-1620916563828-0db4a4a758a0?w=400&h=400&fit=crop",
      rating: 4.8,
      discount: "13%",
      stock: 42,
      status: ProductStatus.APPROVED,
    },
  });

  for (const order of orderSeeds as OrderSeed[]) {
    await prisma.order.upsert({
      where: { orderNumber: order.orderNumber },
      update: {
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        customerPhone: order.customerPhone ?? "",
        orderDate: order.orderDate,
        itemCount: order.itemCount,
        total: order.total,
        status: order.status,
        shippingAddress: order.shippingAddress ?? "",
        trackingNumber: order.trackingNumber ?? null,
        estimatedDelivery: order.estimatedDelivery ?? null,
        items: {
          deleteMany: {},
          create: order.items.map((item) => ({
            name: item.name,
            sku: item.sku,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            vendorId: vendor.id,
            productId: item.name.includes("SilkSculpt") ? product.id : null,
          })),
        },
      },
      create: {
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        customerPhone: order.customerPhone ?? "",
        orderDate: order.orderDate,
        itemCount: order.itemCount,
        total: order.total,
        status: order.status,
        shippingAddress: order.shippingAddress ?? "",
        trackingNumber: order.trackingNumber ?? null,
        estimatedDelivery: order.estimatedDelivery ?? null,
        items: {
          create: order.items.map((item) => ({
            name: item.name,
            sku: item.sku,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            vendorId: vendor.id,
            productId: item.name.includes("SilkSculpt") ? product.id : null,
          })),
        },
      },
    });
  }

  for (const ticket of ticketSeeds) {
    await prisma.supportTicket.upsert({
      where: { ticketNumber: ticket.ticketNumber },
      update: {
        subject: ticket.subject,
        customerName: ticket.customerName,
        customerEmail: ticket.customerEmail,
        priority: ticket.priority,
        status: ticket.status,
        orderNumber: ticket.orderNumber ?? null,
        createdAt: ticket.createdAt,
      },
      create: {
        ticketNumber: ticket.ticketNumber,
        subject: ticket.subject,
        customerName: ticket.customerName,
        customerEmail: ticket.customerEmail,
        priority: ticket.priority,
        status: ticket.status,
        orderNumber: ticket.orderNumber ?? null,
        createdAt: ticket.createdAt,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
