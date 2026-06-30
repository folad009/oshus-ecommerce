import { NextResponse } from "next/server";
import { getBackendErrorMessage, getBackendUrl } from "@/lib/backend";
import { requireProductManagerToken } from "@/lib/require-product-manager-token";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = await requireProductManagerToken();
  if (session instanceof NextResponse) {
    return session;
  }

  const incoming = await request.formData();
  const file = incoming.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No image file provided." }, { status: 400 });
  }

  const body = new FormData();
  body.append("file", file);

  const response = await fetch(`${getBackendUrl()}/uploads/product-image`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
    body,
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      { error: getBackendErrorMessage(data, "Image upload failed.") },
      { status: response.status }
    );
  }

  return NextResponse.json(data);
}
