import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Role } from "@prisma/client";
import type { Request } from "express";
import { memoryStorage } from "multer";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { CloudinaryService } from "./cloudinary.service";

@Controller("uploads")
export class UploadsController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post("product-image")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPPORT, Role.VENDOR)
  @UseInterceptors(
    FileInterceptor("file", {
      storage: memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 },
    })
  )
  uploadProductImage(
    @UploadedFile() file: Express.Multer.File,
    @Req() _request: Request
  ) {
    return this.cloudinaryService.uploadProductImage(file);
  }
}
