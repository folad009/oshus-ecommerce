import { NextResponse } from "next/server";
import { backendFetch, getBackendErrorMessage } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderNumber = searchParams.get("orderNumber") ?? "";
  const email = searchParams.get("email") ?? undefined;

  if (!orderNumber) {
    return NextResponse.json(
      { error: "Order number is required." },
      { status: 400 }
    );
  }

  const query = new URLSearchParams({ orderNumber });
  if (email) {
    query.set("email", email);
  }

  const response = await backendFetch(`/orders/track?${query.toString()}`);
  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      { error: getBackendErrorMessage(data, "Order not found.") },
      { status: response.status }
    );
  }

  return NextResponse.json(data);
}
