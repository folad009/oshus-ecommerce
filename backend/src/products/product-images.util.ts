import { UnprocessableEntityException } from "@nestjs/common";

export function resolveProductImages(input: {
  image?: string;
  images?: string[];
}) {
  const fromArray = (input.images ?? [])
    .map((url) => url.trim())
    .filter(Boolean)
    .slice(0, 4);

  if (fromArray.length > 0) {
    return { images: fromArray, image: fromArray[0] };
  }

  const single = input.image?.trim();
  if (single) {
    return { images: [single], image: single };
  }

  throw new UnprocessableEntityException(
    "At least one product image is required (up to 4)."
  );
}
