import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import Portfolio from "../components/Portfolio";
import Pricing from "../components/Pricing";
import Process from "../components/Process";
import About from "../components/About";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
import type { ContactPrefill } from "../components/Contact";
import Footer from "../components/Footer";
import AiMetadata from "../components/AiMetadata";
import SEO from "../components/SEO";
import TrustBadges from "../components/TrustBadges";
import CapacitySignal from "../components/CapacitySignal";
import { scrollToSection } from "../lib/scroll";

export type Intent = "audit" | "build";

function FooterCTA() {
  return (
    <section className="grain bg-ink py-24 text-center">
      <h2 className="font-display text-3xl font-semibold text-paper">Ready to start?</h2>
      <p className="mt-2 text-ink-soft">
        Run a free audit in seconds — or tell us about your idea. No obligation either way.
      </p>

      <div className="mt-4 flex justify-center">
        <CapacitySignal />
      </div>

      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => scrollToSection("audit-tool")}
          className="rounded-full px-8 py-3 font-display text-sm font-semibold text-ink transition-transform hover:scale-[1.03] active:scale-[0.98]"
          style={{ background: "linear-gradient(100deg, #FFB84D 0%, #FF7A59 100%)" }}
        >
          Get a Free Audit
        </button>
        <button
          type="button"
          onClick={() => scrollToSection("contact")}
          className="rounded-full border border-ink-line px-8 py-3 font-display text-sm font-semibold text-paper transition-colors hover:border-amber active:scale-[0.98]"
        >
          Book a 15-min call
        </button>
      </div>
    </section>
  );
}

export default function Home() {
  const [intent, setIntent] = useState<Intent | null>(null);
  const [prefill, setPrefill] = useState<ContactPrefill | null>(null);

  const scrollToContact = useCallback(() => {
    scrollToSection("contact");
  }, []);

  const handleAuditTeardown = useCallback(
    (context: { siteUrl: string; score: number; findings: string[] }) => {
      setIntent("audit");
      setPrefill({
        siteUrl: context.siteUrl,
        auditScore: context.score,
        auditFindings: context.findings,
        message:
          "I ran the free audit on my site and would like a short review of the findings plus next steps (fixed-scope options if it makes sense).",
        nonce: Date.now(),
      });
      scrollToContact();
    },
    [scrollToContact]
  );

  const handleScope = useCallback(
    (summary: string, scopeIntent: Intent) => {
      setIntent(scopeIntent);
      setPrefill({ message: summary, scopeEstimate: summary.split("\n")[1], nonce: Date.now() });
      scrollToContact();
    },
    [scrollToContact]
  );

  const handleStartIdea = useCallback(
    (idea: string) => {
      setIntent("build");
      setPrefill({ idea: idea || undefined, nonce: Date.now() });
      scrollToContact();
    },
    [scrollToContact]
  );

  return (
    <div ai-tag="home" data-ai="page" className="grain bg-ink min-h-screen">
      <SEO
        title="Websites built from zero — or rebuilt the right way"
        description="PrismWave Studio designs and builds fast, modern, conversion-focused websites for small businesses — from landing pages to full redesigns."
        path="/"
      />

      <AiMetadata
        map={[
          "Hero and free audit",
          "Selected work",
          "Trust badges",
          "Launch history",
          "Pricing and estimator",
          "Process",
          "About",
          "FAQ",
          "Contact and booking",
        ]}
        intent="Help a founder assess, plan, and start a website audit or custom website build with PrismWave Studio."
        tags={[
          "web design studio",
          "website audit",
          "website development",
          "small business websites",
          "AI-readable websites",
        ]}
        extract={{
          title: "PrismWave Studio",
          audience: "Founders, creators, and small businesses",
          primaryActions: "Run a free audit or request a project scope",
          location: "Online studio",
        }}
      />

      <Nav onSelectIntent={setIntent} />

      <main data-ai="main-content">
        <Hero
          onSelectIntent={setIntent}
          onRequestFullTeardown={handleAuditTeardown}
          onStartIdea={handleStartIdea}
        />

        <Portfolio variant="teaser" />

        <TrustBadges />

        {/* Launch history — short teaser only; full timeline lives on /history */}
        <section className="border-y border-ink-line bg-ink-2/40 py-14 md:py-16">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">Studio</p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-paper md:text-3xl">
                Launch history
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft md:text-[15px]">
                Project launches, redesigns, and studio milestones — kept honest and public.
              </p>
            </div>
            <Link
              to="/history"
              className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-ink-line px-6 font-display text-sm font-semibold text-paper transition-colors hover:border-amber"
            >
              View full history →
            </Link>
          </div>
        </section>

        <Pricing onRequestScope={handleScope} />

        <Process />

        <About />

        <FAQ />

        <FooterCTA />

        <Contact intent={intent} onIntentChange={setIntent} prefill={prefill} />
      </main>

      <Footer />
    </div>
  );
}