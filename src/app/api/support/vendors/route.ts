import { NextResponse } from "next/server";
import {
  backendFetchWithAuth,
  getBackendErrorMessage,
  type BackendErrorBody,
} from "@/lib/backend";
import { requireSupportToken } from "@/lib/require-support-token";

export const runtime = "nodejs";

export async function GET() {
  const session = await requireSupportToken();
  if (session instanceof NextResponse) {
    return session;
  }

  const response = await backendFetchWithAuth("/staff", session.token);
  const data = (await response.json()) as BackendErrorBody;

  if (!response.ok) {
    return NextResponse.json(
      { error: getBackendErrorMessage(data, "Failed to load vendor accounts.") },
      { status: response.status }
    );
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const session = await requireSupportToken();
  if (session instanceof NextResponse) {
    return session;
  }

  const body = (await request.json()) as Record<string, unknown>;

  const response = await backendFetchWithAuth("/staff", session.token, {
    method: "POST",
    body: JSON.stringify({
      ...body,
      role: "vendor",
    }),
  });

  const data = (await response.json()) as BackendErrorBody;

  if (!response.ok) {
    return NextResponse.json(
      { error: getBackendErrorMessage(data, "Failed to create vendor account.") },
      { status: response.status }
    );
  }

  return NextResponse.json(data, { status: response.status });
}
