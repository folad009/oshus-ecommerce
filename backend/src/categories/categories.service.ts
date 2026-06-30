import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

function formatCategory(category: { id: string; name: string }) {
  return {
    id: category.id,
    name: category.name,
  };
}

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async listCategories() {
    const categories = await this.prisma.category.findMany({
      orderBy: { name: "asc" },
    });

    return categories.map(formatCategory);
  }

  async listCategoriesWithCounts() {
    const categories = await this.prisma.category.findMany({
      orderBy: { name: "asc" },
    });

    const counts = await this.prisma.product.groupBy({
      by: ["category"],
      _count: { category: true },
    });

    const countMap = new Map(
      counts.map((entry) => [entry.category, entry._count.category])
    );

    return categories.map((category) => ({
      ...formatCategory(category),
      productCount: countMap.get(category.name) ?? 0,
    }));
  }

  async assertValidCategory(name: string) {
    const trimmed = name.trim();
    const category = await this.prisma.category.findFirst({
      where: { name: { equals: trimmed, mode: "insensitive" } },
    });

    if (!category) {
      throw new NotFoundException("Invalid category.");
    }

    return category.name;
  }

  async createCategory(dto: CreateCategoryDto) {
    const name = dto.name.trim();

    const existing = await this.prisma.category.findFirst({
      where: { name: { equals: name, mode: "insensitive" } },
    });

    if (existing) {
      throw new ConflictException("A category with this name already exists.");
    }

    const category = await this.prisma.category.create({
      data: { name },
    });

    return formatCategory(category);
  }

  async updateCategory(id: string, dto: UpdateCategoryDto) {
    const existing = await this.prisma.category.findUnique({ where: { id } });

    if (!existing) {
      throw new NotFoundException("Category not found.");
    }

    const name = dto.name.trim();

    const duplicate = await this.prisma.category.findFirst({
      where: {
        name: { equals: name, mode: "insensitive" },
        NOT: { id },
      },
    });

    if (duplicate) {
      throw new ConflictException("A category with this name already exists.");
    }

    const category = await this.prisma.$transaction(async (tx) => {
      if (existing.name !== name) {
        await tx.product.updateMany({
          where: { category: existing.name },
          data: { category: name },
        });
      }

      return tx.category.update({
        where: { id },
        data: { name },
      });
    });

    return formatCategory(category);
  }

  async deleteCategory(id: string) {
    const existing = await this.prisma.category.findUnique({ where: { id } });

    if (!existing) {
      throw new NotFoundException("Category not found.");
    }

    const productCount = await this.prisma.product.count({
      where: { category: existing.name },
    });

    if (productCount > 0) {
      throw new ConflictException(
        `Cannot delete "${existing.name}" while ${productCount} product(s) use it. Reassign or remove those products first.`
      );
    }

    await this.prisma.category.delete({ where: { id } });

    return { message: "Category deleted." };
  }
}
