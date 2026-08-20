import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnprocessableEntityException,
} from "@nestjs/common";
import { Role, UserStatus } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { PrismaService } from "../prisma/prisma.service";
import { CreateStaffDto } from "./dto/create-staff.dto";

@Injectable()
export class StaffService {
  constructor(private readonly prisma: PrismaService) {}

  async listStaff(actorRole: Role = Role.ADMIN) {
    const users = await this.prisma.user.findMany({
      where: {
        role:
          actorRole === Role.SUPPORT
            ? Role.VENDOR
            : { in: [Role.VENDOR, Role.SUPPORT] },
      },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        storeName: true,
        status: true,
        createdAt: true,
      },
    });

    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role === Role.VENDOR ? "vendor" : "support",
      storeName: user.storeName ?? undefined,
      status: user.status === UserStatus.ACTIVE ? "active" : "inactive",
      createdAt: user.createdAt.toISOString().slice(0, 10),
    }));
  }

  async createStaff(dto: CreateStaffDto, actorRole: Role = Role.ADMIN) {
    if (actorRole === Role.SUPPORT && dto.role !== "vendor") {
      throw new ForbiddenException(
        "Support agents can only create vendor accounts."
      );
    }

    const email = dto.email.trim().toLowerCase();
    const existing = await this.prisma.user.findUnique({ where: { email } });

    if (existing) {
      throw new ConflictException("An account with this email already exists.");
    }

    if (dto.role === "vendor" && !dto.storeName?.trim()) {
      throw new UnprocessableEntityException(
        "Store name is required for vendor accounts."
      );
    }

    const role = dto.role === "vendor" ? Role.VENDOR : Role.SUPPORT;
    const password = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        name: dto.name.trim(),
        password,
        role,
        storeName: dto.role === "vendor" ? dto.storeName?.trim() : null,
        status: UserStatus.ACTIVE,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        storeName: true,
        status: true,
        createdAt: true,
      },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role === Role.VENDOR ? "vendor" : "support",
      storeName: user.storeName ?? undefined,
      status: "active" as const,
      createdAt: user.createdAt.toISOString().slice(0, 10),
    };
  }
}
