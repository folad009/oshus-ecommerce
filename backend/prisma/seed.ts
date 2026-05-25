import { PrismaClient, Role, UserStatus } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

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
