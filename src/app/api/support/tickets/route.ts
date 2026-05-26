import { NextResponse } from "next/server";
import {
  backendFetchWithAuth,
  getBackendErrorMessage,
} from "@/lib/backend";
import { requireSupportToken } from "@/lib/require-support-token";

export const runtime = "nodejs";

export async function GET() {
  const session = await requireSupportToken();
  if (session instanceof NextResponse) {
    return session;
  }

  const response = await backendFetchWithAuth("/tickets", session.token);
  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      { error: getBackendErrorMessage(data, "Failed to load tickets.") },
      { status: response.status }
    );
  }

  return NextResponse.json(data);
}
