import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { v2 as cloudinary } from "cloudinary";
import { createHash } from "crypto";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

@Injectable()
export class CloudinaryService {
  private configured = false;

  constructor(private readonly config: ConfigService) {
    const cloudName = this.config.get<string>("CLOUDINARY_CLOUD_NAME");
    const apiKey = this.config.get<string>("CLOUDINARY_API_KEY");
    const apiSecret = this.config.get<string>("CLOUDINARY_API_SECRET");

    if (
      cloudName &&
      apiKey &&
      apiSecret &&
      !cloudName.includes("placeholder") &&
      this.config.get<string>("CLOUDINARY_SANDBOX") !== "true"
    ) {
      cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
        secure: true,
      });
      this.configured = true;
    }
  }

  isSandboxMode() {
    return !this.configured;
  }

  validateFile(file: Express.Multer.File) {
    if (!file) {
      throw new UnprocessableEntityException("No image file provided.");
    }

    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
      throw new UnprocessableEntityException(
        "Only JPEG, PNG, WebP, and GIF images are allowed."
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new UnprocessableEntityException("Image must be 5 MB or smaller.");
    }
  }

  async uploadProductImage(file: Express.Multer.File) {
    this.validateFile(file);

    if (this.isSandboxMode()) {
      const hash = createHash("sha256")
        .update(file.buffer)
        .digest("hex")
        .slice(0, 12);

      return {
        url: `https://picsum.photos/seed/${hash}/800/900`,
        publicId: `sandbox/${hash}`,
        sandbox: true,
      };
    }

    const folder =
      this.config.get<string>("CLOUDINARY_FOLDER") ?? "oshus/products";

    const result = await new Promise<{
      secure_url: string;
      public_id: string;
    }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "image",
          transformation: [{ quality: "auto", fetch_format: "auto" }],
        },
        (error, uploadResult) => {
          if (error || !uploadResult) {
            reject(
              error instanceof Error
                ? error
                : new Error("Cloudinary upload failed.")
            );
            return;
          }

          resolve({
            secure_url: uploadResult.secure_url,
            public_id: uploadResult.public_id,
          });
        }
      );

      stream.end(file.buffer);
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
      sandbox: false,
    };
  }
}
