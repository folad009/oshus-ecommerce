import { NextResponse } from "next/server";
import {
  backendFetch,
  getBackendErrorMessage,
  type BackendErrorBody,
} from "@/lib/backend";

export const runtime = "nodejs";

export async function GET() {
  const response = await backendFetch("/categories");
  const data = (await response.json()) as BackendErrorBody;

  if (!response.ok) {
    return NextResponse.json(
      { error: getBackendErrorMessage(data, "Failed to load categories.") },
      { status: response.status }
    );
  }

  return NextResponse.json(data);
}
