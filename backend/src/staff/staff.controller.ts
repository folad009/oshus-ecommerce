import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { Role } from "@prisma/client";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { CreateStaffDto } from "./dto/create-staff.dto";
import { StaffService } from "./staff.service";

@Controller("staff")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Get()
  list() {
    return this.staffService.listStaff().then((accounts) => ({ accounts }));
  }

  @Post()
  create(@Body() body: CreateStaffDto) {
    return this.staffService
      .createStaff(body)
      .then((account) => ({ account }));
  }
}
