import { NextResponse } from "next/server";
import {
  backendFetchWithAuth,
  getBackendErrorMessage,
  type BackendErrorBody,
} from "@/lib/backend";
import { requireVendorSession } from "@/lib/require-vendor-session";

export const runtime = "nodejs";

export async function GET() {
  const session = await requireVendorSession();
  if (session instanceof NextResponse) {
    return session;
  }

  const response = await backendFetchWithAuth(
    "/products/vendor",
    session.token
  );
  const data = (await response.json()) as BackendErrorBody;

  if (!response.ok) {
    return NextResponse.json(
      { error: getBackendErrorMessage(data, "Failed to load products.") },
      { status: response.status }
    );
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const session = await requireVendorSession();
  if (session instanceof NextResponse) {
    return session;
  }

  const body = await request.json();

  const response = await backendFetchWithAuth(
    "/products/vendor",
    session.token,
    {
      method: "POST",
      body: JSON.stringify(body),
    }
  );

  const data = (await response.json()) as BackendErrorBody;

  if (!response.ok) {
    return NextResponse.json(
      { error: getBackendErrorMessage(data, "Failed to submit product.") },
      { status: response.status }
    );
  }

  return NextResponse.json(data, { status: response.status });
}
