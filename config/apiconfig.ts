const DEFAULT_SERVER_API_BASE = "https://server.uparupa.town:9090";

export const API_URL =
  process.env.NEXT_PUBLIC_SERVER_API_BASE ?? DEFAULT_SERVER_API_BASE;

export const SERVER_API_BASE =
  process.env.SERVER_API_BASE ??
  process.env.NEXT_PUBLIC_SERVER_API_BASE ??
  DEFAULT_SERVER_API_BASE;

export const API_REQUEST_TIMEOUT_MS = 8000;
