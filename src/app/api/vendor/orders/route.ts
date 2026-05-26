import { NextResponse } from "next/server";
import {
  backendFetchWithAuth,
  getBackendErrorMessage,
} from "@/lib/backend";
import { requireVendorToken } from "@/lib/require-vendor-token";

export const runtime = "nodejs";

export async function GET() {
  const session = await requireVendorToken();
  if (session instanceof NextResponse) {
    return session;
  }

  const response = await backendFetchWithAuth("/orders/vendor", session.token);
  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      { error: getBackendErrorMessage(data, "Failed to load orders.") },
      { status: response.status }
    );
  }

  return NextResponse.json(data);
}
