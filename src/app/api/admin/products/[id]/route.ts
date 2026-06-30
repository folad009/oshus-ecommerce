import { NextResponse } from "next/server";
import {
  backendFetchWithAuth,
  getBackendErrorMessage,
  type BackendErrorBody,
} from "@/lib/backend";
import { requireAdminToken } from "@/lib/require-admin-token";

export const runtime = "nodejs";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, context: RouteContext) {
  const session = await requireAdminToken();
  if (session instanceof NextResponse) {
    return session;
  }

  const { id } = await context.params;
  const body = await request.json();

  const response = await backendFetchWithAuth(
    `/products/admin/${id}/status`,
    session.token,
    {
      method: "PATCH",
      body: JSON.stringify(body),
    }
  );

  const data = (await response.json()) as BackendErrorBody;

  if (!response.ok) {
    return NextResponse.json(
      { error: getBackendErrorMessage(data, "Failed to update product.") },
      { status: response.status }
    );
  }

  return NextResponse.json(data);
}

export async function PUT(request: Request, context: RouteContext) {
  const session = await requireAdminToken();
  if (session instanceof NextResponse) {
    return session;
  }

  const { id } = await context.params;
  const body = await request.json();

  const response = await backendFetchWithAuth(
    `/products/admin/${id}`,
    session.token,
    {
      method: "PUT",
      body: JSON.stringify(body),
    }
  );

  const data = (await response.json()) as BackendErrorBody;

  if (!response.ok) {
    return NextResponse.json(
      { error: getBackendErrorMessage(data, "Failed to update product.") },
      { status: response.status }
    );
  }

  return NextResponse.json(data);
}

export async function DELETE(_request: Request, context: RouteContext) {
  const session = await requireAdminToken();
  if (session instanceof NextResponse) {
    return session;
  }

  const { id } = await context.params;

  const response = await backendFetchWithAuth(
    `/products/admin/${id}`,
    session.token,
    { method: "DELETE" }
  );

  const data = (await response.json()) as BackendErrorBody;

  if (!response.ok) {
    return NextResponse.json(
      { error: getBackendErrorMessage(data, "Failed to delete product.") },
      { status: response.status }
    );
  }

  return NextResponse.json(data);
}
