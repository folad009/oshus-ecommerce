import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { Role } from "@prisma/client";
import type { Request } from "express";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import type { JwtPayload } from "../auth/auth.service";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { CreateStaffDto } from "./dto/create-staff.dto";
import { StaffService } from "./staff.service";

@Controller("staff")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.SUPPORT)
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Get()
  list(@Req() request: Request & { user: JwtPayload }) {
    const actorRole = request.user.role as Role;
    return this.staffService
      .listStaff(actorRole)
      .then((accounts) => ({ accounts }));
  }

  @Post()
  create(
    @Req() request: Request & { user: JwtPayload },
    @Body() body: CreateStaffDto
  ) {
    const actorRole = request.user.role as Role;

    if (actorRole === Role.SUPPORT && body.role !== "vendor") {
      throw new ForbiddenException(
        "Support agents can only create vendor accounts."
      );
    }

    return this.staffService
      .createStaff(body, actorRole)
      .then((account) => ({ account }));
  }
}
