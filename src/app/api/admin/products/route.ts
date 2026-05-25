import { NextResponse } from "next/server";
import {
  backendFetchWithAuth,
  getBackendErrorMessage,
  type BackendErrorBody,
} from "@/lib/backend";
import { requireAdminToken } from "@/lib/require-admin-token";

export const runtime = "nodejs";

export async function GET() {
  const session = await requireAdminToken();
  if (session instanceof NextResponse) {
    return session;
  }

  const response = await backendFetchWithAuth("/products/admin", session.token);
  const data = (await response.json()) as BackendErrorBody;

  if (!response.ok) {
    return NextResponse.json(
      { error: getBackendErrorMessage(data, "Failed to load products.") },
      { status: response.status }
    );
  }

  return NextResponse.json(data);
}
