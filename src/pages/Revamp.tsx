import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { BeforeAfterSlider } from "../components/BeforeAfterSlider";
import AiMetadata, { AiIntent } from "../components/AiMetadata";
import { getAttribution, getSessionIdForLead, trackAction } from "../lib/track";
import type { PreviewSource, RevampApiResponse } from "../types/revamp";

type Viewport = "desktop" | "tablet" | "mobile";

type DemoSite = {
  id: string;
  name: string;
  industry: string;
  url: string;
  originalTitle: string;
  originalSubtitle: string;
  modernTitle: string;
  modernSubtitle: string;
  accent: string;
  beforeSrc: string;
  afterSrc: string;
};

const DEMO_SITES: DemoSite[] = [
  {
    id: "aurora-fitness",
    name: "Aurora Fitness",
    industry: "Fitness / gyms",
    url: "https://aurorafitness.example",
    originalTitle: "Cardio. Weights. Results.",
    originalSubtitle: "Open 7 days a week. First class always free.",
    modernTitle: "Build your experience.",
    modernSubtitle:
      "A confident, conversion-focused redesign built to turn visitors into booked trial classes.",
    accent: "#3fae6b",
    beforeSrc: "/images/revamps/aurora-fitness/before.png",
    afterSrc: "/images/revamps/aurora-fitness/after.png",
  },
];

const ANALYSIS_STEPS = [
  "Fetching the live page...",
  "Reading structure, copy and brand colours...",
  "Designing the new layout...",
  "Rendering your preview...",
];

// How wide each device preview is laid out (px) before being scaled to fit,
// and the frame shape that suits it
const VIEWPORT_WIDTH: Record<Viewport, number> = { desktop: 1280, tablet: 820, mobile: 390 };
const VIEWPORT_ASPECT: Record<Viewport, string> = {
  desktop: "aspect-[16/9]",
  tablet: "aspect-[4/3]",
  mobile: "aspect-[9/16]",
};

// What a visitor sees when the Revamp page opens, and when they pick the sample
type LivePreview = {
  before: PreviewSource;
  after: PreviewSource;
  generator: "ai" | "template";
};

function Icon({
  name,
}: {
  name:
    | "globe"
    | "desktop"
    | "tablet"
    | "phone"
    | "layers"
    | "eye"
    | "arrow"
    | "close";
}) {
  const paths: Record<string, string> = {
    globe:
      "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-9-9h18M12 3c2.2 2.4 3.2 5.4 3.2 9s-1 6.6-3.2 9c-2.2-2.4-3.2-5.4-3.2-9s1-6.6 3.2-9Z",
    desktop: "M3 4h18v12H3zM8 20h8M12 16v4",
    tablet: "M6 3h12v18H6zM10 18h4",
    phone: "M8 2h8v20H8zM11 18h2",
    layers:
      "m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5",
    eye:
      "M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
    arrow: "M5 12h14m-6-6 6 6-6 6",
    close: "m6 6 12 12M18 6 6 18",
  };

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}

// Screenshot of the live site, used as the "before" only when the page is
// built with JavaScript (a script-free snapshot would look empty). The URL is
// appended RAW: thum.io expects /get/<options>/<url>, and percent-encoding the
// URL (what the old code did) is not the documented form.
function screenshotUrl(fullUrl: string): string {
  return `https://image.thum.io/get/width/1280/crop/800/noanimate/${fullUrl}`;
}

export default function Revamp() {
  const [urlInput, setUrlInput] = useState("");
  const [activeSite, setActiveSite] = useState<DemoSite>(DEMO_SITES[0]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [live, setLive] = useState<LivePreview | null>(null);
  const [previewError, setPreviewError] = useState<string | null>(null);
  // Guards against a slow earlier request overwriting a newer one
  const requestId = useRef(0);
  const inFlight = useRef<AbortController | null>(null);
  const [lead, setLead] = useState({
    name: "",
    email: "",
    business: "",
    note: "",
  });

  // Purely cosmetic: walks the progress labels while the request is running.
  // It never ends the analysis — only the request finishing does. (The old
  // version flipped isAnalyzing off after ~2s no matter what, so the preview
  // was declared "done" before anything had actually been generated.)
  useEffect(() => {
    if (!isAnalyzing) return;
    const timer = window.setInterval(() => {
      setAnalysisStep((current) => Math.min(current + 1, ANALYSIS_STEPS.length - 1));
    }, 3500);
    return () => window.clearInterval(timer);
  }, [isAnalyzing]);

  const analyze = async (site: DemoSite) => {
    const myRequest = ++requestId.current;
    inFlight.current?.abort();
    setPreviewError(null);

    // Built-in sample: instant, no network involved
    if (!site.id.startsWith("custom-")) {
      setLive(null);
      setActiveSite(site);
      setIsAnalyzing(false);
      trackAction("revamp_preview_generated", {
        metadata: { location: "revamp", site: site.name, industry: site.industry, generator: "sample" },
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisStep(0);

    const controller = new AbortController();
    inFlight.current = controller;
    // Server budget is ~9s to fetch the site + ~40s for the model; give it a little headroom
    const timeoutId = window.setTimeout(() => controller.abort(), 58_000);

    try {
      const response = await fetch("/api/revamp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: site.url }),
        signal: controller.signal,
      });
      const data = (await response.json().catch(() => null)) as
        | RevampApiResponse
        | { error?: string }
        | null;

      if (myRequest !== requestId.current) return; // a newer request took over

      if (!response.ok || !data || !("ok" in data) || !data.ok) {
        const message = data && "error" in data ? data.error : undefined;
        throw new Error(message ?? "The preview could not be generated. Please try again.");
      }

      const before: PreviewSource = data.jsHeavy
        ? { type: "image", src: screenshotUrl(data.finalUrl), fallbackHtml: data.beforeHtml }
        : { type: "html", html: data.beforeHtml };

      setLive({ before, after: { type: "html", html: data.afterHtml }, generator: data.generator });
      setActiveSite({
        ...site,
        name: data.siteName,
        url: data.finalUrl,
        originalTitle: data.title || `${data.siteName} — current experience`,
        originalSubtitle:
          data.description || "A real audit can reveal the highest-impact opportunities.",
        modernTitle: `A clearer digital front door for ${data.siteName}.`,
        modernSubtitle:
          "A concept built from your site's own content — a starting point for a focused redesign around your goals, audience and next action.",
      });

      trackAction("revamp_preview_generated", {
        metadata: {
          location: "revamp",
          site: data.host,
          industry: site.industry,
          generator: data.generator,
        },
      });
    } catch (analysisError) {
      if (myRequest !== requestId.current) return;
      const aborted = analysisError instanceof Error && analysisError.name === "AbortError";
      setPreviewError(
        aborted
          ? "That took too long. Try again, or try a simpler page such as the homepage."
          : analysisError instanceof Error
          ? analysisError.message
          : "The preview could not be generated. Please try again."
      );
    } finally {
      window.clearTimeout(timeoutId);
      if (myRequest === requestId.current) setIsAnalyzing(false);
    }
  };

  // Normalise + validate the address, then generate
  const handleAnalyze = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const rawInput = urlInput.trim();
    const cleanHost = rawInput.replace(/^https?:\/\//i, "").split("/")[0];
    if (!cleanHost) return;

    const preset = DEMO_SITES.find((site) =>
      cleanHost.toLowerCase().includes(site.url.split("//")[1].split(".")[0])
    );

    const normalizedUrl = /^https?:\/\//i.test(rawInput)
      ? rawInput
      : `https://${rawInput.replace(/\s+/g, "")}`;

    if (!preset) {
      try {
        const parsed = new URL(/^https?:\/\//i.test(rawInput) ? rawInput : `https://${cleanHost}`);
        if (!parsed.hostname.includes(".")) throw new Error("no dot");
      } catch {
        setPreviewError("That doesn't look like a website address — try something like yourbusiness.com");
        return;
      }
    }

    const targetSite: DemoSite = preset ?? {
      id: `custom-${Date.now()}`,
      name: cleanHost,
      url: normalizedUrl,
      industry: "Your business",
      originalTitle: `${cleanHost} — current experience`,
      originalSubtitle:
        "A real audit can reveal the highest-impact opportunities.",
      modernTitle: `A clearer digital front door for ${cleanHost}.`,
      modernSubtitle:
        "A focused redesign concept based on your goals, audience, and next action.",
      accent: "#3fae6b",
      beforeSrc: DEMO_SITES[0].beforeSrc,
      afterSrc: DEMO_SITES[0].afterSrc,
    };

    analyze(targetSite);
  };

  // Opening the form after a live preview prefills the required "business" field,
  // so the visitor isn't asked to retype what they just typed
  const openModal = () => {
    setLead((current) =>
      current.business || !live ? current : { ...current, business: activeSite.name }
    );
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSubmitted(false);
    setError(null);
    setLead({ name: "", email: "", business: "", note: "" });
  };

  const submitLead = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSending(true);
    setError(null);
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intent: "audit",
          name: lead.name,
          email: lead.email,
          business: lead.business || activeSite.name,
          siteUrl: activeSite.url,
          idea: "",
          message:
            (lead.note || `I want to explore a full revamp for ${activeSite.name}.`) +
            `\n\n[Revamp engine — previewed: ${activeSite.url} (${
              live ? `${live.generator === "ai" ? "AI" : "template"} concept` : "built-in sample"
            })]`,
          sessionId: getSessionIdForLead(),
          attribution: getAttribution(),
        }),
      });
      const data: { ok?: boolean; error?: string } =
        await response.json().catch(() => ({}));
      if (!response.ok || !data.ok)
        throw new Error(data.error ?? "The request could not be sent.");
      setSubmitted(true);
      trackAction("contact_submitted", {
        intent: "audit",
        metadata: { location: "revamp", site: activeSite.name },
      });
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "The request could not be sent."
      );
    } finally {
      setSending(false);
    }
  };

  const viewportClass =
    viewport === "mobile"
      ? "max-w-sm"
      : viewport === "tablet"
      ? "max-w-xl"
      : "max-w-4xl";

  return (
    <div className="grain min-h-screen overflow-x-clip bg-ink text-paper">
      <AiMetadata
        map={[
          "Revamp engine",
          "URL input",
          "Before and after preview",
          "Lead capture",
        ]}
        intent="Let a visitor preview a modern PrismWave redesign concept for an existing website and request a full implementation."
        tags={[
          "website redesign",
          "interactive preview",
          "website audit",
          "conversion design",
        ]}
        extract={{
          title: "Instant Web Revamp Engine",
          audience: "Businesses with an existing website",
          primaryActions: "Generate a redesign preview or request implementation",
        }}
      />
      <header className="sticky top-0 z-40 border-b border-ink-line bg-ink/90 backdrop-blur-md">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="font-display text-base font-semibold tracking-tight text-paper sm:text-lg"
          >
            PrismWave <span className="text-gradient">Studio</span>
          </Link>
          <button
            type="button"
            onClick={openModal}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-amber px-4 py-2.5 font-display text-xs font-semibold text-ink transition-colors hover:bg-coral sm:text-sm"
          >
            Request full implementation <Icon name="arrow" />
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <section className="mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-ink-line bg-ink-2/60 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-amber">
            Instant Web Revamp Engine
          </p>
          <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            See your website&apos;s{" "}
            <span className="text-gradient">next version.</span>
          </h1>
          <AiIntent id="revamp-intent">
            Let visitors paste a website URL and preview a clearer, more modern
            conversion experience.
          </AiIntent>
          <p className="mt-5 text-base leading-relaxed text-ink-soft sm:text-lg">
            Paste an existing URL or try a sample. We&apos;ll create a visual
            redesign direction so you can see what a faster, clearer website
            could feel like before discussing the build.
          </p>
        </section>

        <section className="mx-auto mt-10 max-w-3xl">
          <form
            onSubmit={handleAnalyze}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <label className="relative flex min-h-12 flex-1 items-center">
              <span className="pointer-events-none absolute left-4 text-ink-soft">
                <Icon name="globe" />
              </span>
              <input
                type="text"
                value={urlInput}
                onChange={(event) => setUrlInput(event.target.value)}
                placeholder="yourbusiness.com"
                className="h-12 w-full rounded-xl border border-ink-line bg-ink-2/70 pl-11 pr-4 text-sm text-paper outline-none transition-colors placeholder:text-ink-soft/60 focus:border-amber sm:text-base"
              />
            </label>
            <button
              type="submit"
              disabled={isAnalyzing || !urlInput.trim()}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-amber px-6 font-display text-sm font-semibold text-ink transition-colors hover:bg-coral disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isAnalyzing ? "Preparing preview..." : "Generate modern preview"}
            </button>
          </form>
          {previewError && (
            <p role="alert" className="mt-3 text-center font-mono text-xs text-coral">
              {previewError}
            </p>
          )}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-ink-soft">
            <span className="mr-1">Try a sample:</span>
            {DEMO_SITES.map((site) => (
              <button
                key={site.id}
                type="button"
                onClick={() => {
                  setUrlInput(site.url);
                  analyze(site);
                }}
                className={`min-h-11 rounded-lg border px-3 py-2 transition-colors ${
                  activeSite.id === site.id
                    ? "border-amber bg-amber/10 text-paper"
                    : "border-ink-line hover:border-amber hover:text-paper"
                }`}
              >
                {site.name}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-12" aria-label="Interactive redesign workspace">
          <div className="mb-4 flex flex-col gap-4 rounded-xl border border-ink-line bg-ink-2/60 p-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">
              Drag the divider to compare
            </p>
            <div className="flex items-center gap-1 self-start rounded-lg border border-ink-line bg-ink p-1 sm:self-auto">
              {(["desktop", "tablet", "mobile"] as const).map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setViewport(size)}
                  aria-pressed={viewport === size}
                  aria-label={`${size} viewport`}
                  className={`flex min-h-11 min-w-11 items-center justify-center rounded-md transition-colors ${
                    viewport === size
                      ? "bg-ink-2 text-amber"
                      : "text-ink-soft hover:text-paper"
                  }`}
                >
                  <Icon
                    name={
                      size === "desktop"
                        ? "desktop"
                        : size === "tablet"
                        ? "tablet"
                        : "phone"
                    }
                  />
                </button>
              ))}
            </div>
            <p className="hidden text-xs text-ink-soft lg:block">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400" />
              Previewing {activeSite.name}
              {live && (
                <span className="ml-2 rounded border border-ink-line px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-amber">
                  {live.generator === "ai" ? "AI concept" : "Concept"}
                </span>
              )}
            </p>
          </div>

          <div
            className={`relative mx-auto overflow-hidden rounded-2xl border border-ink-line bg-ink-2 shadow-2xl transition-[max-width] duration-300 ${viewportClass}`}
          >
            {isAnalyzing && (
              <div className="absolute inset-0 z-20 flex min-h-[480px] flex-col items-center justify-center bg-ink/95 p-6 text-center backdrop-blur-sm">
                <div className="h-1.5 w-56 overflow-hidden rounded-full bg-ink-line">
                  <div
                    className="h-full rounded-full bg-amber transition-[width] duration-300"
                    style={{
                      width: `${
                        ((analysisStep + 1) / ANALYSIS_STEPS.length) * 100
                      }%`,
                    }}
                  />
                </div>
                <h2 className="mt-5 font-display text-xl font-semibold">
                  Building your preview
                </h2>
                <p className="mt-2 font-mono text-xs text-amber">
                  {ANALYSIS_STEPS[analysisStep]}
                </p>
              </div>
            )}
            <div className="min-h-[520px] p-4 sm:p-6">
              <BeforeAfterSlider
                before={live?.before ?? { type: "image", src: activeSite.beforeSrc }}
                after={live?.after ?? { type: "image", src: activeSite.afterSrc }}
                beforeLabel={live ? "BEFORE (current site)" : `BEFORE (${activeSite.industry})`}
                afterLabel={live ? "AFTER (PrismWave concept)" : "AFTER (PrismWave redesign)"}
                virtualWidth={VIEWPORT_WIDTH[viewport]}
                aspectClass={VIEWPORT_ASPECT[viewport]}
              />
              {live && (
                <p className="mt-3 text-center text-[11px] leading-relaxed text-ink-soft">
                  Concept generated from {activeSite.name}&apos;s public page content — not a final
                  design. Images, copy and layout are refined in a real build.
                </p>
              )}
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[#a89f92]">
                    Original direction
                  </p>
                  <h2 className="mt-2 font-display text-xl font-semibold leading-tight">
                    {activeSite.originalTitle}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {activeSite.originalSubtitle}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-amber">
                    Modern direction
                  </p>
                  <h2 className="mt-2 font-display text-xl font-semibold leading-tight">
                    {activeSite.modernTitle}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {activeSite.modernSubtitle}
                  </p>
                  <button
                    type="button"
                    onClick={openModal}
                    className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-amber px-5 py-3 font-display text-sm font-semibold text-ink transition-colors hover:bg-coral"
                  >
                    Book the next step <Icon name="arrow" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-ink-line bg-ink-2/60 p-5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-amber">
              01 / Diagnose
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Use the existing site as a starting point, not a blank slate.
            </p>
          </div>
          <div className="rounded-xl border border-ink-line bg-ink-2/60 p-5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-coral">
              02 / Clarify
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Make the value and next action obvious to the right visitor.
            </p>
          </div>
          <div className="rounded-xl border border-ink-line bg-ink-2/60 p-5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-violet">
              03 / Build
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Turn the direction into a fixed-scope, owned implementation.
            </p>
          </div>
        </section>
      </main>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 p-4 backdrop-blur-sm">
          <div className="relative max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-2xl border border-ink-line bg-ink-2 p-6 shadow-2xl sm:p-8">
            <button
              type="button"
              onClick={handleCloseModal}
              aria-label="Close request form"
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center text-ink-soft hover:text-paper"
            >
              <Icon name="close" />
            </button>
            {submitted ? (
              <div className="py-12 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-amber text-amber">
                  ✓
                </div>
                <h2 className="mt-5 font-display text-2xl font-semibold">
                  Request received
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  I&apos;ll review your direction and reply within one business
                  day.
                </p>
              </div>
            ) : (
              <>
                <p className="font-mono text-[11px] uppercase tracking-widest text-amber">
                  Full implementation
                </p>
                <h2 className="mt-3 pr-8 font-display text-2xl font-semibold">
                  Turn this direction into your real site.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  Tell me where you are starting from. We&apos;ll confirm scope,
                  price, and fit before any commitment.
                </p>
                <form
                  onSubmit={submitLead}
                  className="mt-6 grid gap-4"
                >
                  <label className="grid gap-2 text-xs text-ink-soft">
                    Name
                    <input
                      required
                      value={lead.name}
                      onChange={(event) =>
                        setLead({ ...lead, name: event.target.value })
                      }
                      className="min-h-11 rounded-lg border border-ink-line bg-ink px-3 text-sm text-paper outline-none focus:border-amber"
                    />
                  </label>
                  <label className="grid gap-2 text-xs text-ink-soft">
                    Email
                    <input
                      required
                      type="email"
                      value={lead.email}
                      onChange={(event) =>
                        setLead({ ...lead, email: event.target.value })
                      }
                      className="min-h-11 rounded-lg border border-ink-line bg-ink px-3 text-sm text-paper outline-none focus:border-amber"
                    />
                  </label>
                  <label className="grid gap-2 text-xs text-ink-soft">
                    Business name
                    <input
                      required
                      value={lead.business}
                      onChange={(event) =>
                        setLead({ ...lead, business: event.target.value })
                      }
                      className="min-h-11 rounded-lg border border-ink-line bg-ink px-3 text-sm text-paper outline-none focus:border-amber"
                    />
                  </label>
                  <label className="grid gap-2 text-xs text-ink-soft">
                    Notes
                    <textarea
                      rows={3}
                      value={lead.note}
                      onChange={(event) =>
                        setLead({ ...lead, note: event.target.value })
                      }
                      className="resize-y rounded-lg border border-ink-line bg-ink px-3 py-3 text-sm text-paper outline-none focus:border-amber"
                    />
                  </label>
                  {error && (
                    <p className="font-mono text-xs text-coral">{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-amber px-5 py-3 font-display text-sm font-semibold text-ink disabled:opacity-60"
                  >
                    {sending ? "Sending..." : "Request the full build"}
                    <Icon name="arrow" />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}