import { getSupabaseAdmin } from "./supabaseAdmin.js";
import { getClientIp, hashIp, type HeadersLike } from "./ipHash.js";

export interface RateLimitOptions {
  /** Unique bucket name for this endpoint, e.g. "audit", "audit-lead", "send" */
  bucket: string;
  /** Max requests allowed inside the window */
  limit: number;
  /** Window length in seconds */
  windowSeconds: number;
}

/**
 * Supabase-backed fixed-window rate limiter, atomic via the
 * check_rate_limit() Postgres function (see supabase/schema.sql). An
 * in-memory counter isn't safe here — Vercel can run multiple serverless
 * instances of the same function concurrently, each with its own memory.
 *
 * Fails OPEN on infra errors (Supabase down, env vars missing): a rate
 * limiter that takes the whole site offline when its own dependency hiccups
 * is worse than one that occasionally lets a burst through
 */
export async function isRateLimited(identifier: string, opts: RateLimitOptions): Promise<boolean> {
  const key = `${opts.bucket}:${identifier}`;

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase.rpc("check_rate_limit", {
      p_key: key,
      p_limit: opts.limit,
      p_window_seconds: opts.windowSeconds,
    });

    if (error) {
      console.warn("Rate limit check failed, allowing request:", error);
      return false;
    }

    // check_rate_limit returns true when the request is ALLOWED.
    return data === false;
  } catch (err) {
    console.warn("Rate limit check threw, allowing request:", err);
    return false;
  }
}

/** Convenience: rate-limit by hashed client IP, given a VercelLikeRequest's headers. */
export async function isClientRateLimited(headers: HeadersLike, opts: RateLimitOptions): Promise<boolean> {
  const ip = getClientIp(headers);
  // No IP header at all (rare, but possible locally) — don't rate limit,
  // there's nothing stable to key on.
  if (!ip) return false;
  return isRateLimited(hashIp(ip), opts);
}