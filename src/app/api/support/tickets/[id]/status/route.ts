import { NextResponse } from "next/server";
import {
  backendFetchWithAuth,
  getBackendErrorMessage,
} from "@/lib/backend";
import { requireSupportToken } from "@/lib/require-support-token";

export const runtime = "nodejs";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, context: RouteContext) {
  const session = await requireSupportToken();
  if (session instanceof NextResponse) {
    return session;
  }

  const { id } = await context.params;
  let body: { status?: string };

  try {
    body = (await request.json()) as { status?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const response = await backendFetchWithAuth(
    `/tickets/${id}/status`,
    session.token,
    {
      method: "PATCH",
      body: JSON.stringify({ status: body.status }),
    }
  );
  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      { error: getBackendErrorMessage(data, "Failed to update ticket.") },
      { status: response.status }
    );
  }

  return NextResponse.json(data);
}
