import { NextResponse } from "next/server";
import {
  backendFetch,
  backendFetchWithAuth,
  getBackendErrorMessage,
} from "@/lib/backend";
import { CUSTOMER_SESSION_COOKIE } from "@/lib/customer-auth";
import { cookies } from "next/headers";
import { verifyJwtForPortal } from "@/lib/jwt-session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(CUSTOMER_SESSION_COOKIE)?.value;
  const claims = token ? await verifyJwtForPortal("customer", token) : null;

  const response = claims
    ? await backendFetchWithAuth("/orders", token, {
        method: "POST",
        body: JSON.stringify(body),
      })
    : await backendFetch("/orders", {
        method: "POST",
        body: JSON.stringify(body),
      });

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      { error: getBackendErrorMessage(data, "Failed to place order.") },
      { status: response.status }
    );
  }

  return NextResponse.json(data);
}
