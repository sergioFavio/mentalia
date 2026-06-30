export const API_URL =
  (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/+$/, "") ??
  "http://localhost:5000";
export const AUDIO_API_URL =
  (import.meta.env.VITE_AUDIO_API_URL as string | undefined)?.replace(/\/+$/, "") ??
  "http://localhost:5002";

type ApiOptions = RequestInit & {
  userId?: number;
  timeoutMs?: number;
  baseUrl?: string;
};

export async function apiFetch(path: string, options: ApiOptions = {}) {
  const {
    userId,
    timeoutMs = 15000,
    headers,
    signal,
    baseUrl = API_URL,
    ...requestOptions
  } = options;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

  if (signal) {
    signal.addEventListener("abort", () => controller.abort(), { once: true });
  }

  try {
    return await fetch(`${baseUrl}${normalizedPath}`, {
      ...requestOptions,
      signal: controller.signal,
      headers: {
        ...(userId ? { "X-User-Id": String(userId) } : {}),
        ...headers,
      },
    });
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export function audioApiFetch(path: string, options: ApiOptions = {}) {
  return apiFetch(path, { ...options, baseUrl: AUDIO_API_URL });
}

export function toApiAssetUrl(path?: string) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;

  const normalizedPath = path
    .replace(/^\/+/, "")
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return `${API_URL}/${normalizedPath}`;
}

export function toAudioAssetUrl(path?: string) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;

  const normalizedPath = path
    .replace(/^\/+/, "")
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return `${AUDIO_API_URL}/${normalizedPath}`;
}
