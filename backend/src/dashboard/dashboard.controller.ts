import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { Role } from "@prisma/client";
import type { Request } from "express";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import type { JwtPayload } from "../auth/auth.service";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { DashboardService } from "./dashboard.service";

@Controller("dashboard")
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  admin() {
    return this.dashboardService.getAdminStats();
  }

  @Get("vendor")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.VENDOR)
  vendor(@Req() request: Request & { user: JwtPayload }) {
    return this.dashboardService.getVendorStats(request.user.sub);
  }

  @Get("support")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPPORT)
  support() {
    return this.dashboardService.getSupportStats();
  }
}
