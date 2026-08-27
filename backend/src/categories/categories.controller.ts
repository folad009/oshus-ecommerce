import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { Role } from "@prisma/client";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  list() {
    return this.categoriesService
      .listCategories()
      .then((categories) => ({ categories }));
  }

  @Get("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPPORT)
  listAdmin() {
    return this.categoriesService
      .listCategoriesWithCounts()
      .then((categories) => ({ categories }));
  }

  @Post("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPPORT)
  create(@Body() body: CreateCategoryDto) {
    return this.categoriesService
      .createCategory(body)
      .then((category) => ({ category, message: "Category created." }));
  }

  @Put("admin/:id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPPORT)
  update(@Param("id") id: string, @Body() body: UpdateCategoryDto) {
    return this.categoriesService
      .updateCategory(id, body)
      .then((category) => ({ category, message: "Category updated." }));
  }

  @Delete("admin/:id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPPORT)
  delete(@Param("id") id: string) {
    return this.categoriesService.deleteCategory(id);
  }
}
