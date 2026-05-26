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
  let body: { name?: string; email?: string; password?: string };

  try {
    body = (await request.json()) as {
      name?: string;
      email?: string;
      password?: string;
    };
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  let response: Response;

  try {
    response = await backendFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: body.name?.trim(),
        email: body.email?.trim(),
        password: body.password,
      }),
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
      {
        error: getBackendErrorMessage(
          data,
          "Could not create account. Please try again."
        ),
      },
      { status: response.status }
    );
  }

  if (!data.accessToken) {
    return NextResponse.json({ error: "Registration failed." }, { status: 500 });
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
