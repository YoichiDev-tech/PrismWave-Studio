import { createHash } from "node:crypto";

// Salted hash so we can spot abusive bursts from one IP (rate limiting,
// abuse detection) without ever storing a raw IP address anywhere.
// Rotate SESSION_HASH_SALT periodically if you want old hashes to stop
// correlating with new ones
const SALT = process.env.SESSION_HASH_SALT ?? "prismwave-fallback-salt";

export function hashIp(ip: string): string {
  return createHash("sha256").update(`${SALT}:${ip}`).digest("hex").slice(0, 32);
}

export interface HeadersLike {
  [key: string]: string | string[] | undefined;
}

/** Pulls the client IP out of standard proxy headers (Vercel sets x-forwarded-for) */
export function getClientIp(headers: HeadersLike): string | undefined {
  const forwardedFor = headers["x-forwarded-for"] || headers["x-real-ip"];
  const raw = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor;
  return raw?.split(",")[0]?.trim();
}