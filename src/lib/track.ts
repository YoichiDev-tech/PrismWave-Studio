const SESSION_KEY = "bw_session_id";

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
    const existing = window.sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const fresh =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    window.sessionStorage.setItem(SESSION_KEY, fresh);
    return fresh;
  } catch {
    // sessionStorage can throw in locked-down browser contexts (rare) —
    // fall back to a per-call random id rather than breaking tracking
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
  const fallback: Attribution = {
    source: "direct",
    medium: "none",
    campaign: "",
    referrer: typeof document !== "undefined" ? document.referrer : "",
    landingPath: typeof window !== "undefined" ? window.location.pathname : "/",
  };

  try {
    const stored = window.sessionStorage.getItem(ATTRIBUTION_KEY);
    if (stored) return { ...fallback, ...(JSON.parse(stored) as Partial<Attribution>) };

    const params = new URLSearchParams(window.location.search);
    const attribution: Attribution = {
      source: params.get("utm_source") ?? (document.referrer ? new URL(document.referrer).hostname : "direct"),
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
  if (import.meta.env.DEV) return;

  const body = JSON.stringify({
    kind,
    eventName,
    path: options.path ?? window.location.pathname,
    intent: options.intent,
    sessionId: getSessionId(),
    metadata: { ...options.metadata, attribution: getAttribution() },
  });

  // sendBeacon fires-and-forgets even during page unload/navigation, which
  // matters for pageview-on-route-change in an SPA. Fall back to a
  // keepalive fetch for browsers/environments without sendBeacon
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
  }).catch(() => {
    // Tracking is best-effort — never let a failed beacon affect the visitor
  });
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
    | "chat_opened"
    | "chat_message_sent"
    | "cta_click"
    | "booking_completed",
  options: TrackOptions = {}
): void {
  track("action", eventName, options);
}