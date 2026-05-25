const DEFAULT_BACKEND_URL = "http://localhost:3001/api";

export function getBackendUrl(): string {
  return process.env.BACKEND_URL ?? DEFAULT_BACKEND_URL;
}

export interface BackendErrorBody {
  message?: string | string[];
  error?: string;
}

export function getBackendErrorMessage(
  body: BackendErrorBody,
  fallback: string
): string {
  if (typeof body.message === "string") {
    return body.message;
  }
  if (Array.isArray(body.message) && body.message.length > 0) {
    return body.message.join(", ");
  }
  if (body.error) {
    return body.error;
  }
  return fallback;
}

export async function backendFetch(
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  const headers = new Headers(options.headers);

  if (!headers.has("Content-Type") && options.body) {
    headers.set("Content-Type", "application/json");
  }

  return fetch(`${getBackendUrl()}${path}`, {
    ...options,
    headers,
    cache: "no-store",
  });
}

export async function backendFetchWithAuth(
  path: string,
  token: string | undefined,
  options: RequestInit = {}
): Promise<Response> {
  const headers = new Headers(options.headers);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return backendFetch(path, { ...options, headers });
}
