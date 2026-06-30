import { NextResponse } from "next/server";
import { backendFetch, getBackendErrorMessage } from "@/lib/backend";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const response = await backendFetch("/shipping/kwik/quote", {
    method: "POST",
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      { error: getBackendErrorMessage(data, "Could not fetch delivery quote.") },
      { status: response.status }
    );
  }

  return NextResponse.json(data);
}
