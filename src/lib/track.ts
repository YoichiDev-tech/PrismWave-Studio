const SESSION_KEY = "pw_session_id";
const ATTRIBUTION_KEY = "pw_attribution";

export interface Attribution {
  source: string;
  medium: string;
  campaign: string;
  referrer: string;
  landingPath: string;
}

function getSessionId(): string {
  try {
    if (typeof window === "undefined") return "ssr-session";
    const existing = window.sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const fresh =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    window.sessionStorage.setItem(SESSION_KEY, fresh);
    return fresh;
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

type EventKind = "pageview" | "action";

interface TrackOptions {
  path?: string;
  intent?: "audit" | "build";
  metadata?: Record<string, unknown>;
}

export function getSessionIdForLead(): string {
  return getSessionId();
}

export function getAttribution(): Attribution {
  const isClient = typeof window !== "undefined";
  const isDoc = typeof document !== "undefined";

  const fallback: Attribution = {
    source: "direct",
    medium: "none",
    campaign: "",
    referrer: isDoc ? document.referrer : "",
    landingPath: isClient ? window.location.pathname : "/",
  };

  if (!isClient) return fallback;

  try {
    const stored = window.sessionStorage.getItem(ATTRIBUTION_KEY);
    if (stored) return { ...fallback, ...(JSON.parse(stored) as Partial<Attribution>) };

    const params = new URLSearchParams(window.location.search);
    const referrerHost = document.referrer ? new URL(document.referrer).hostname : "";

    const attribution: Attribution = {
      source: params.get("utm_source") ?? (referrerHost || "direct"),
      medium: params.get("utm_medium") ?? (document.referrer ? "referral" : "none"),
      campaign: params.get("utm_campaign") ?? "",
      referrer: document.referrer,
      landingPath: window.location.pathname,
    };
    window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution));
    return attribution;
  } catch {
    return fallback;
  }
}

export function track(kind: EventKind, eventName: string, options: TrackOptions = {}): void {
  // Prevent tracking during development builds
  if (typeof import.meta !== "undefined" && import.meta.env?.DEV) return;
  if (typeof window === "undefined") return;

  const body = JSON.stringify({
    kind,
    eventName,
    path: options.path ?? window.location.pathname,
    intent: options.intent,
    sessionId: getSessionId(),
    metadata: { ...options.metadata, attribution: getAttribution() },
  });

  if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
    const blob = new Blob([body], { type: "application/json" });
    navigator.sendBeacon("/api/track", blob);
    return;
  }

  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
}

export function trackPageview(path?: string): void {
  track("pageview", "pageview", { path });
}

export function trackAction(
  eventName:
    | "contact_submitted"
    | "audit_run"
    | "audit_completed"
    | "audit_lead_captured"
    | "audit_teardown_requested"
    | "revamp_preview_generated"
    | "chat_opened"
    | "chat_message_sent"
    | "cta_click"
    | "booking_completed",
  options: TrackOptions = {}
): void {
  track("action", eventName, options);
}