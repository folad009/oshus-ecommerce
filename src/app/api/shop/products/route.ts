import { NextResponse } from "next/server";
import { backendFetch, getBackendErrorMessage } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET() {
  const response = await backendFetch("/products/shop");
  const data = (await response.json()) as { products?: unknown[]; message?: string };

  if (!response.ok) {
    return NextResponse.json(
      {
        error: getBackendErrorMessage(
          data,
          "Failed to load shop products."
        ),
      },
      { status: response.status }
    );
  }

  return NextResponse.json(data);
}
