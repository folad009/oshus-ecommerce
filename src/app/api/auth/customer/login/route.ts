import { NextResponse } from "next/server";
import { authRedirects } from "@/data/auth";
import {
  backendFetch,
  getBackendErrorMessage,
  type BackendErrorBody,
} from "@/lib/backend";
import {
  CUSTOMER_SESSION_COOKIE,
  getCustomerSessionCookieOptions,
} from "@/lib/customer-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: { email?: string; password?: string };

  try {
    body = (await request.json()) as { email?: string; password?: string };
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const email = body.email?.trim() ?? "";
  const password = body.password ?? "";

  let response: Response;

  try {
    response = await backendFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password, portal: "customer" }),
    });
  } catch {
    return NextResponse.json(
      {
        error:
          "Cannot reach the API server. Start the backend with: npm run dev:backend",
      },
      { status: 503 }
    );
  }

  const data = (await response.json()) as {
    accessToken?: string;
  } & BackendErrorBody;

  if (!response.ok) {
    return NextResponse.json(
      { error: getBackendErrorMessage(data, "Invalid email or password.") },
      { status: response.status }
    );
  }

  if (!data.accessToken) {
    return NextResponse.json({ error: "Login failed." }, { status: 500 });
  }

  const res = NextResponse.json({
    ok: true,
    redirectTo: authRedirects.customer,
  });

  res.cookies.set(
    CUSTOMER_SESSION_COOKIE,
    data.accessToken,
    getCustomerSessionCookieOptions()
  );

  return res;
}
