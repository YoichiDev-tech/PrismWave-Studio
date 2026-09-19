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

// Page architecture — one job per section, in the order a visitor decides:
//   1. Hero + Start card  -> hook, and the first low-friction action (audit / idea)
//   2. Work               -> proof, kept to one screen
//   3. Pricing            -> fixed prices + estimator (was Pricing + Configurator)
//   4. Process            -> removes "what happens after I say yes" doubt
//   5. About              -> who is behind it and why hospitality matters
//   6. FAQ                -> last objections
//   7. Contact            -> form + optional call booking (was Calendly + Contact)
// A future testimonials preview belongs between FAQ and Contact
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
        message: "I ran the audit tool on my site and would like the full teardown plus next steps.",
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
    <div ai-tag="home" data-ai="page">
      <SEO
        title="Websites built from zero — or rebuilt the right way"
        description="PrismWave Studio designs and builds fast, modern, conversion-focused websites for small businesses — from landing pages to full redesigns."
        path="/"
      />
      <AiMetadata
        map={["Hero and free audit", "Selected work", "Pricing and estimator", "Process", "About", "FAQ", "Contact and booking"]}
        intent="Help a founder assess, plan, and start a website audit or custom website build with PrismWave Studio."
        tags={["web design studio", "website audit", "website development", "small business websites", "AI-readable websites"]}
        extract={{ title: "PrismWave Studio", audience: "Founders, creators, and small businesses", primaryActions: "Run a free audit or request a project scope", location: "Online studio" }}
      />

      <Nav onSelectIntent={setIntent} />

      <main data-ai="main-content">
        <Hero onSelectIntent={setIntent} onRequestFullTeardown={handleAuditTeardown} onStartIdea={handleStartIdea} />
        <Portfolio variant="teaser" />
        <Pricing onRequestScope={handleScope} />
        <Process />
        <About />
        <FAQ />
        <Contact intent={intent} onIntentChange={setIntent} prefill={prefill} />
      </main>

      <Footer />
    </div>
  );
}