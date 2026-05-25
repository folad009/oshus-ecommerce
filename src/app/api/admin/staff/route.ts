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

  const response = await backendFetchWithAuth("/staff", session.token);
  const data = (await response.json()) as BackendErrorBody;

  if (!response.ok) {
    return NextResponse.json(
      { error: getBackendErrorMessage(data, "Failed to load staff accounts.") },
      { status: response.status }
    );
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const session = await requireAdminToken();
  if (session instanceof NextResponse) {
    return session;
  }

  const body = await request.json();

  const response = await backendFetchWithAuth("/staff", session.token, {
    method: "POST",
    body: JSON.stringify(body),
  });

  const data = (await response.json()) as BackendErrorBody;

  if (!response.ok) {
    return NextResponse.json(
      { error: getBackendErrorMessage(data, "Failed to create account.") },
      { status: response.status }
    );
  }

  return NextResponse.json(data, { status: response.status });
}
