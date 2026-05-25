import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserStatus } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { portalToRole, type PortalRole } from "../common/roles";
import { PrismaService } from "../prisma/prisma.service";

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async login(email: string, password: string, portal: PortalRole) {
    const normalizedEmail = email.trim().toLowerCase();
    const role = portalToRole(portal);

    const user = await this.prisma.user.findFirst({
      where: {
        email: normalizedEmail,
        role,
        status: UserStatus.ACTIVE,
      },
    });

    if (!user) {
      throw new UnauthorizedException("Invalid email or password.");
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new UnauthorizedException("Invalid email or password.");
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        storeName: user.storeName,
      },
    };
  }
}
