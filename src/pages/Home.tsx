import { useCallback, useState } from "react";
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
import { scrollToSection } from "../lib/scroll";

export type Intent = "audit" | "build";

function FooterCTA() {
  return (
    <section className="grain bg-ink py-24 text-center">
      <h2 className="font-display text-3xl font-semibold text-paper">
        Not sure where to start?
      </h2>
      <p className="mt-2 text-ink-soft">
        Run a free audit in seconds — see the problems, then decide if a fix or full rebuild makes sense.
        No obligation either way.
      </p>

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
        title="Free Website Audit for Small Businesses | PrismWave Studio"
        description="Run a free website audit in seconds. See clear findings on speed, mobile, SEO and conversion — then get a fixed-scope fix or rebuild. No obligation."
        path="/"
      />

      <AiMetadata
        map={[
          "Hero and free audit",
          "Selected work",
          "Pricing and estimator",
          "Process",
          "About",
          "FAQ",
          "Contact and booking",
        ]}
        intent="Help a small-business owner run a free site audit, understand the findings, and start a fixed-scope website fix or rebuild with PrismWave Studio."
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