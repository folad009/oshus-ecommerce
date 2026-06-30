import { NextResponse } from "next/server";
import { backendFetch, getBackendErrorMessage } from "@/lib/backend";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const reference = searchParams.get("reference");
  const provider = searchParams.get("provider");

  if (!reference || !provider) {
    return NextResponse.json(
      { error: "Missing payment reference or provider." },
      { status: 400 }
    );
  }

  const response = await backendFetch(
    `/payments/verify?reference=${encodeURIComponent(reference)}&provider=${encodeURIComponent(provider)}`,
    { method: "GET" }
  );

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      { error: getBackendErrorMessage(data, "Payment verification failed.") },
      { status: response.status }
    );
  }

  return NextResponse.json(data);
}
