import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import AiMetadata, { AiIntent } from "../components/AiMetadata";
import { getAttribution, getSessionIdForLead, trackAction } from "../lib/track";

type Viewport = "desktop" | "tablet" | "mobile";
type ViewMode = "split" | "modern" | "original";

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
};

const DEMO_SITES: DemoSite[] = [
  {
    id: "bistro",
    name: "Bella Vista Bistro",
    industry: "Hospitality / dining",
    url: "bellavistabistro.example",
    originalTitle: "Welcome to Bella Vista Bistro",
    originalSubtitle: "Call us to order or stop by our location. Closed Mondays.",
    modernTitle: "Authentic food. An easier table to book.",
    modernSubtitle: "A warm, mobile-first experience for menus, reservations, and repeat visits.",
    accent: "#d97757",
  },
  {
    id: "dental",
    name: "Apex Dental Care",
    industry: "Healthcare",
    url: "apexdental.example",
    originalTitle: "Apex Dental Care - Family Dentistry",
    originalSubtitle: "Accepting new patients. Call today!",
    modernTitle: "A calmer path to a healthier smile.",
    modernSubtitle: "Clear services, direct booking, and reassurance before the first appointment.",
    accent: "#3bb8c8",
  },
  {
    id: "logistics",
    name: "Vanguard Logistics",
    industry: "B2B services",
    url: "vanguard-logistics.example",
    originalTitle: "Vanguard Logistics Corp",
    originalSubtitle: "Tracking, warehousing, supply chain management.",
    modernTitle: "Make complex operations easy to understand.",
    modernSubtitle: "A sharper digital front door for teams that need to explain capability and earn trust.",
    accent: "#7d72e8",
  },
];

const ANALYSIS_STEPS = [
  "Reading the page structure...",
  "Mapping content and conversion paths...",
  "Applying PrismWave design tokens...",
  "Preparing a responsive preview...",
];

function Icon({ name }: { name: "globe" | "desktop" | "tablet" | "phone" | "layers" | "eye" | "arrow" | "close" }) {
  const paths: Record<string, string> = {
    globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-9-9h18M12 3c2.2 2.4 3.2 5.4 3.2 9s-1 6.6-3.2 9c-2.2-2.4-3.2-5.4-3.2-9s1-6.6 3.2-9Z",
    desktop: "M3 4h18v12H3zM8 20h8M12 16v4",
    tablet: "M6 3h12v18H6zM10 18h4",
    phone: "M8 2h8v20H8zM11 18h2",
    layers: "m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5",
    eye: "M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
    arrow: "M5 12h14m-6-6 6 6-6 6",
    close: "m6 6 12 12M18 6 6 18",
  };

  return <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;
}

export default function Revamp() {
  const [urlInput, setUrlInput] = useState("");
  const [activeSite, setActiveSite] = useState(DEMO_SITES[0]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lead, setLead] = useState({ name: "", email: "", business: "", note: "" });

  useEffect(() => {
    if (!isAnalyzing) return;
    const timer = window.setInterval(() => {
      setAnalysisStep((current) => {
        if (current >= ANALYSIS_STEPS.length - 1) {
          window.clearInterval(timer);
          setIsAnalyzing(false);
          return current;
        }
        return current + 1;
      });
    }, 500);
    return () => window.clearInterval(timer);
  }, [isAnalyzing]);

  const analyze = (site: DemoSite) => {
    setActiveSite(site);
    setIsAnalyzing(true);
    setAnalysisStep(0);
    trackAction("revamp_preview_generated", { metadata: { location: "revamp", site: site.name, industry: site.industry } });
  };

  const handleAnalyze = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanUrl = urlInput.trim().replace(/^https?:\/\//i, "").split("/")[0];
    if (!cleanUrl) return;
    const preset = DEMO_SITES.find((site) => cleanUrl.toLowerCase().includes(site.url.split(".")[0]));
    analyze(preset ?? { ...DEMO_SITES[0], id: "custom", name: cleanUrl, url: cleanUrl, industry: "Your business", originalTitle: `${cleanUrl} — current experience`, originalSubtitle: "A real audit can reveal the highest-impact opportunities.", modernTitle: `A clearer digital front door for ${cleanUrl}.`, modernSubtitle: "A focused redesign concept based on your goals, audience, and next action." });
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
          message: lead.note || `I want to explore a full revamp for ${activeSite.name}.`,
          sessionId: getSessionIdForLead(),
          attribution: getAttribution(),
        }),
      });
      const data: { ok?: boolean; error?: string } = await response.json().catch(() => ({}));
      if (!response.ok || !data.ok) throw new Error(data.error ?? "The request could not be sent.");
      setSubmitted(true);
      trackAction("contact_submitted", { intent: "audit", metadata: { location: "revamp", site: activeSite.name } });
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "The request could not be sent.");
    } finally {
      setSending(false);
    }
  };

  const viewportClass = viewport === "mobile" ? "max-w-sm" : viewport === "tablet" ? "max-w-2xl" : "max-w-none";
  const showOriginal = viewMode === "split" || viewMode === "original";
  const showModern = viewMode === "split" || viewMode === "modern";
  const workspaceLayout = viewMode === "split" && viewport === "desktop" ? "lg:grid-cols-2" : "grid-cols-1";

  return (
    <div className="grain min-h-screen overflow-x-clip bg-ink text-paper">
      <AiMetadata map={["Revamp engine", "URL input", "Before and after preview", "Lead capture"]} intent="Let a visitor preview a modern PrismWave redesign concept for an existing website and request a full implementation." tags={["website redesign", "interactive preview", "website audit", "conversion design"]} extract={{ title: "Instant Web Revamp Engine", audience: "Businesses with an existing website", primaryActions: "Generate a redesign preview or request implementation" }} />
      <header className="sticky top-0 z-40 border-b border-ink-line bg-ink/90 backdrop-blur-md">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link to="/" className="font-display text-base font-semibold tracking-tight text-paper sm:text-lg">PrismWave <span className="text-gradient">Studio</span></Link>
          <button type="button" onClick={() => setModalOpen(true)} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-amber px-4 py-2.5 font-display text-xs font-semibold text-ink transition-colors hover:bg-coral sm:text-sm">Request full implementation <Icon name="arrow" /></button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <section className="mx-auto max-w-3xl text-center">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-ink-line bg-ink-2/60 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-amber">Instant Web Revamp Engine</p>
          <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">See your website&apos;s <span className="text-gradient">next version.</span></h1>
          <AiIntent id="revamp-intent">Let visitors paste a website URL and preview a clearer, more modern conversion experience.</AiIntent>
          <p className="mt-5 text-base leading-relaxed text-ink-soft sm:text-lg">Paste an existing URL or try a sample. We&apos;ll create a visual redesign direction so you can see what a faster, clearer website could feel like before discussing the build.</p>
        </section>

        <section className="mx-auto mt-10 max-w-3xl">
          <form onSubmit={handleAnalyze} className="flex flex-col gap-3 sm:flex-row">
            <label className="relative flex min-h-12 flex-1 items-center">
              <span className="pointer-events-none absolute left-4 text-ink-soft"><Icon name="globe" /></span>
              <input type="text" value={urlInput} onChange={(event) => setUrlInput(event.target.value)} placeholder="yourbusiness.com" className="h-12 w-full rounded-xl border border-ink-line bg-ink-2/70 pl-11 pr-4 text-sm text-paper outline-none transition-colors placeholder:text-ink-soft/60 focus:border-amber sm:text-base" />
            </label>
            <button type="submit" disabled={isAnalyzing || !urlInput.trim()} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-amber px-6 font-display text-sm font-semibold text-ink transition-colors hover:bg-coral disabled:cursor-not-allowed disabled:opacity-50">{isAnalyzing ? "Preparing preview..." : "Generate modern preview"}</button>
          </form>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-ink-soft"><span className="mr-1">Try a sample:</span>{DEMO_SITES.map((site) => <button key={site.id} type="button" onClick={() => { setUrlInput(site.url); analyze(site); }} className={`min-h-11 rounded-lg border px-3 py-2 transition-colors ${activeSite.id === site.id ? "border-amber bg-amber/10 text-paper" : "border-ink-line hover:border-amber hover:text-paper"}`}>{site.name}</button>)}</div>
        </section>

        <section className="mt-12" aria-label="Interactive redesign workspace">
          <div className="mb-4 flex flex-col gap-4 rounded-xl border border-ink-line bg-ink-2/60 p-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-1 rounded-lg border border-ink-line bg-ink p-1">
              {(["split", "modern", "original"] as const).map((mode) => <button key={mode} type="button" onClick={() => setViewMode(mode)} className={`min-h-11 rounded-md px-3 font-mono text-[10px] uppercase tracking-wide transition-colors sm:px-4 ${viewMode === mode ? "bg-amber text-ink" : "text-ink-soft hover:text-paper"}`}>{mode === "split" ? "Side by side" : mode === "modern" ? "Modern preview" : "Original view"}</button>)}
            </div>
            <div className="flex items-center gap-1 self-start rounded-lg border border-ink-line bg-ink p-1 sm:self-auto">
              {(["desktop", "tablet", "mobile"] as const).map((size) => <button key={size} type="button" onClick={() => setViewport(size)} aria-label={`${size} viewport`} className={`flex min-h-11 min-w-11 items-center justify-center rounded-md transition-colors ${viewport === size ? "bg-ink-2 text-amber" : "text-ink-soft hover:text-paper"}`}><Icon name={size === "desktop" ? "desktop" : size === "tablet" ? "tablet" : "phone"} /></button>)}
            </div>
            <p className="hidden text-xs text-ink-soft lg:block"><span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400" />Previewing {activeSite.name}</p>
          </div>

          <div className={`relative mx-auto overflow-hidden rounded-2xl border border-ink-line bg-ink-2 shadow-2xl transition-[max-width] duration-300 ${viewportClass}`}>
            {isAnalyzing && <div className="absolute inset-0 z-20 flex min-h-[480px] flex-col items-center justify-center bg-ink/95 p-6 text-center backdrop-blur-sm"><div className="h-1.5 w-56 overflow-hidden rounded-full bg-ink-line"><div className="h-full rounded-full bg-amber transition-[width] duration-300" style={{ width: `${((analysisStep + 1) / ANALYSIS_STEPS.length) * 100}%` }} /></div><h2 className="mt-5 font-display text-xl font-semibold">Building your preview</h2><p className="mt-2 font-mono text-xs text-amber">{ANALYSIS_STEPS[analysisStep]}</p></div>}
            <div className={`grid min-h-[520px] ${workspaceLayout}`}>
              {showOriginal && <div className="flex min-h-[520px] flex-col justify-between border-b border-ink-line bg-[#eee7d8] p-6 text-[#332b25] lg:border-b-0 lg:border-r sm:p-8"><div><p className="font-mono text-[10px] uppercase tracking-widest text-[#776b60]">Original direction / {activeSite.industry}</p><div className="mt-8 border-b-2 border-[#9c9084] pb-3 font-serif text-sm font-bold uppercase">{activeSite.name}</div><div className="mt-8 rounded border border-[#b9aa9b] bg-white/70 p-4 font-sans text-xs"><p className="font-mono text-[10px] text-[#a34432]">Audit flags</p><ul className="mt-2 list-disc space-y-1 pl-4 text-[#665d56]"><li>Unclear primary action</li><li>Mobile hierarchy needs work</li><li>Content competes for attention</li></ul></div><h2 className="mt-8 font-serif text-2xl font-bold leading-tight">{activeSite.originalTitle}</h2><p className="mt-3 font-sans text-sm leading-relaxed text-[#665d56]">{activeSite.originalSubtitle}</p></div><div className="border-t border-[#b9aa9b] pt-4 font-mono text-[10px] text-[#776b60]">Current experience / before</div></div>}
              {showModern && <div className="relative flex min-h-[520px] flex-col justify-between overflow-hidden bg-ink-2 p-6 text-paper sm:p-8" style={{ background: `radial-gradient(circle at 100% 0%, ${activeSite.accent}33, transparent 42%), #10182b` }}><div><div className="flex items-center justify-between gap-3"><p className="font-mono text-[10px] uppercase tracking-widest text-amber">Modern direction / preview</p><span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 font-mono text-[9px] uppercase text-emerald-300">Mobile-first</span></div><h2 className="mt-12 max-w-xl font-display text-3xl font-semibold leading-tight sm:text-4xl">{activeSite.modernTitle}</h2><p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">{activeSite.modernSubtitle}</p><button type="button" onClick={() => setModalOpen(true)} className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-amber px-5 py-3 font-display text-sm font-semibold text-ink transition-colors hover:bg-coral">Book the next step <Icon name="arrow" /></button><div className="mt-12 grid grid-cols-2 gap-3"><div className="rounded-xl border border-ink-line bg-ink/60 p-4"><p className="font-mono text-[10px] uppercase text-amber">Clear path</p><p className="mt-2 text-sm text-paper/70">One primary action, visible at the right moment.</p></div><div className="rounded-xl border border-ink-line bg-ink/60 p-4"><p className="font-mono text-[10px] uppercase text-violet">Responsive</p><p className="mt-2 text-sm text-paper/70">A hierarchy that holds together on every screen.</p></div></div></div><div className="mt-10 rounded-xl border border-amber/30 bg-ink/80 p-4"><p className="font-display text-sm font-semibold">Want this direction built for your business?</p><p className="mt-1 text-xs leading-relaxed text-ink-soft">Request a scoped conversation. We&apos;ll confirm fit, price, and timeline before any commitment.</p><button type="button" onClick={() => setModalOpen(true)} className="mt-4 min-h-11 w-full rounded-lg bg-amber px-4 py-2.5 font-display text-xs font-semibold text-ink">Contact PrismWave for the full build</button></div></div>}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-3"><div className="rounded-xl border border-ink-line bg-ink-2/60 p-5"><p className="font-mono text-[10px] uppercase tracking-widest text-amber">01 / Diagnose</p><p className="mt-3 text-sm leading-relaxed text-ink-soft">Use the existing site as a starting point, not a blank slate.</p></div><div className="rounded-xl border border-ink-line bg-ink-2/60 p-5"><p className="font-mono text-[10px] uppercase tracking-widest text-coral">02 / Clarify</p><p className="mt-3 text-sm leading-relaxed text-ink-soft">Make the value and next action obvious to the right visitor.</p></div><div className="rounded-xl border border-ink-line bg-ink-2/60 p-5"><p className="font-mono text-[10px] uppercase tracking-widest text-violet">03 / Build</p><p className="mt-3 text-sm leading-relaxed text-ink-soft">Turn the direction into a fixed-scope, owned implementation.</p></div></section>
      </main>

      {modalOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 p-4 backdrop-blur-sm"><div className="relative max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-2xl border border-ink-line bg-ink-2 p-6 shadow-2xl sm:p-8"><button type="button" onClick={() => { setModalOpen(false); setSubmitted(false); }} aria-label="Close request form" className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center text-ink-soft hover:text-paper"><Icon name="close" /></button>{submitted ? <div className="py-12 text-center"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-amber text-amber">✓</div><h2 className="mt-5 font-display text-2xl font-semibold">Request received</h2><p className="mt-3 text-sm leading-relaxed text-ink-soft">I&apos;ll review your direction and reply within one business day.</p></div> : <><p className="font-mono text-[11px] uppercase tracking-widest text-amber">Full implementation</p><h2 className="mt-3 pr-8 font-display text-2xl font-semibold">Turn this direction into your real site.</h2><p className="mt-3 text-sm leading-relaxed text-ink-soft">Tell me where you are starting from. We&apos;ll confirm scope, price, and fit before any commitment.</p><form onSubmit={submitLead} className="mt-6 grid gap-4"><label className="grid gap-2 text-xs text-ink-soft">Name<input required value={lead.name} onChange={(event) => setLead({ ...lead, name: event.target.value })} className="min-h-11 rounded-lg border border-ink-line bg-ink px-3 text-sm text-paper outline-none focus:border-amber" /></label><label className="grid gap-2 text-xs text-ink-soft">Email<input required type="email" value={lead.email} onChange={(event) => setLead({ ...lead, email: event.target.value })} className="min-h-11 rounded-lg border border-ink-line bg-ink px-3 text-sm text-paper outline-none focus:border-amber" /></label><label className="grid gap-2 text-xs text-ink-soft">Business name<input required value={lead.business} onChange={(event) => setLead({ ...lead, business: event.target.value })} className="min-h-11 rounded-lg border border-ink-line bg-ink px-3 text-sm text-paper outline-none focus:border-amber" /></label><label className="grid gap-2 text-xs text-ink-soft">Notes<textarea rows={3} value={lead.note} onChange={(event) => setLead({ ...lead, note: event.target.value })} className="resize-y rounded-lg border border-ink-line bg-ink px-3 py-3 text-sm text-paper outline-none focus:border-amber" /></label>{error && <p className="font-mono text-xs text-coral">{error}</p>}<button type="submit" disabled={sending} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-amber px-5 py-3 font-display text-sm font-semibold text-ink disabled:opacity-60">{sending ? "Sending..." : "Request the full build"}<Icon name="arrow" /></button></form></>}</div></div>}
      <Footer />
    </div>
  );
}
