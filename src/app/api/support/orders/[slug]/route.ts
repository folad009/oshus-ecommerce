import { NextResponse } from "next/server";
import {
  backendFetchWithAuth,
  getBackendErrorMessage,
} from "@/lib/backend";
import { requireSupportToken } from "@/lib/require-support-token";

export const runtime = "nodejs";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const session = await requireSupportToken();
  if (session instanceof NextResponse) {
    return session;
  }

  const { slug } = await context.params;
  const response = await backendFetchWithAuth(
    `/orders/support/${slug}`,
    session.token
  );
  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      { error: getBackendErrorMessage(data, "Order not found.") },
      { status: response.status }
    );
  }

  return NextResponse.json(data);
}
