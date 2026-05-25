import type { StaffPortal } from "@/data/auth";
import {
  backendFetch,
  getBackendErrorMessage,
  type BackendErrorBody,
} from "@/lib/backend";

interface BackendLoginResponse {
  accessToken: string;
}

export async function loginPortal(
  portal: StaffPortal,
  email: string,
  password: string
): Promise<{ accessToken: string } | { error: string; status?: number }> {
  let response: Response;

  try {
    response = await backendFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password, portal }),
    });
  } catch {
    return {
      error:
        "Cannot reach the API server. Start the backend with: npm run dev:backend",
      status: 503,
    };
  }

  const data = (await response.json()) as BackendLoginResponse & BackendErrorBody;

  if (!response.ok) {
    return {
      error: getBackendErrorMessage(
        data,
        `Invalid ${portal} email or password.`
      ),
    };
  }

  if (!data.accessToken) {
    return { error: "Login failed. Please try again." };
  }

  return { accessToken: data.accessToken };
}
