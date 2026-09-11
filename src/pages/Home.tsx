import { useCallback, useState } from "react";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import SignsOutdated from "../components/SignsOutdated";
import Services from "../components/Services";
import BuildYourIdea from "../components/BuildYourIdea";
import Portfolio from "../components/Portfolio";
import WhyChooseUs from "../components/WhyChooseUs";
import Contact from "../components/Contact";
import type { ContactPrefill } from "../components/Contact";
import Footer from "../components/Footer";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";
import About from "../components/About";
import Calendly from "../components/Calendly";
import Process from "../components/Process";
import AuditWidget from "../components/AuditWidget";
import SprintConfigurator from "../components/SprintConfigurator";
import AiMetadata, { AiIntent } from "../components/AiMetadata";
import { scrollToSection } from "../lib/scroll";

export type Intent = "audit" | "build";

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

  const handleSprintScope = useCallback(
    (summary: string, scopeIntent: Intent) => {
      setIntent(scopeIntent);
      setPrefill({ message: summary, scopeEstimate: summary.split("\n")[1], nonce: Date.now() });
      scrollToContact();
    },
    [scrollToContact]
  );

  return (
    <div ai-tag="home" data-ai="page">
      <AiMetadata
        map={["Hero", "Signs your site is outdated", "AI-ready site audit", "Services", "Process", "Pricing", "Sprint configurator", "Portfolio", "FAQ", "Contact"]}
        intent="Help a founder assess, plan, and start a website audit or custom website build with PrismWave Studio."
        tags={["web design studio", "website audit", "website development", "small business websites", "AI-readable websites"]}
        extract={{ title: "PrismWave Studio", audience: "Founders, creators, and small businesses", primaryActions: "Run a free audit or request a project scope", location: "Online studio" }}
      />
      <header data-ai="navigation">
        <Nav onSelectIntent={setIntent} />
      </header>

      <main role="main" data-ai="main-content">
        <section aria-labelledby="hero-section" aria-describedby="hero-intent" role="region" data-ai="hero">
          <AiIntent id="hero-intent">Introduce PrismWave Studio and direct visitors to audit or build a website.</AiIntent>
          <Hero onSelectIntent={setIntent} />
        </section>
        <section aria-labelledby="signs-section" aria-describedby="signs-intent" role="region" data-ai="problem">
          <AiIntent id="signs-intent">Help visitors recognize signs that their current website needs improvement.</AiIntent>
          <SignsOutdated onSelectIntent={setIntent} />
        </section>
        <section aria-labelledby="audit-section" aria-describedby="audit-intent" role="region" data-ai="audit">
          <AiIntent id="audit-intent">Let visitors evaluate their website and request a full audit teardown.</AiIntent>
          <AuditWidget onRequestFullTeardown={handleAuditTeardown} />
        </section>
        <section aria-labelledby="services-section" aria-describedby="services-intent" role="region" data-ai="services">
          <AiIntent id="services-intent">Explain the website strategy, design, and development services available.</AiIntent>
          <Services />
        </section>
        <section aria-labelledby="process-section" aria-describedby="process-intent" role="region" data-ai="process">
          <AiIntent id="process-intent">Show the steps from initial direction through launch and iteration.</AiIntent>
          <Process />
        </section>
        <section aria-labelledby="pricing-section" aria-describedby="pricing-intent" role="region" data-ai="pricing">
          <AiIntent id="pricing-intent">Present project pricing and help visitors choose an appropriate engagement.</AiIntent>
          <Pricing />
        </section>
        <section aria-labelledby="sprint-section" aria-describedby="sprint-intent" role="region" data-ai="configurator">
          <AiIntent id="sprint-intent">Collect project requirements and generate a focused website sprint scope.</AiIntent>
          <SprintConfigurator onRequestScope={handleSprintScope} />
        </section>
        <section aria-labelledby="build-section" aria-describedby="build-intent" role="region" data-ai="build-cta">
          <AiIntent id="build-intent">Help visitors turn an early website idea into a concrete build conversation.</AiIntent>
          <BuildYourIdea onSelectIntent={setIntent} />
        </section>
        <section aria-labelledby="portfolio-section" aria-describedby="portfolio-intent" role="region" data-ai="portfolio">
          <AiIntent id="portfolio-intent">Show selected website work and the range of visual systems PrismWave can build.</AiIntent>
          <Portfolio />
        </section>
        <section aria-labelledby="why-section" aria-describedby="why-intent" role="region" data-ai="proof">
          <AiIntent id="why-intent">Explain why founders choose PrismWave Studio for strategic, readable websites.</AiIntent>
          <WhyChooseUs />
        </section>
        <section aria-labelledby="faq-section" aria-describedby="faq-intent" role="region" data-ai="faq">
          <AiIntent id="faq-intent">Answer common questions about the studio, process, pricing, and project fit.</AiIntent>
          <FAQ />
        </section>
        <section aria-labelledby="about-section" aria-describedby="about-intent" role="region" data-ai="about">
          <AiIntent id="about-intent">Give visitors context about the studio and its approach to digital work.</AiIntent>
          <About />
        </section>
        <section aria-labelledby="calendly-section" aria-describedby="calendly-intent" role="region" data-ai="booking">
          <AiIntent id="calendly-intent">Offer a direct way to schedule an introductory conversation.</AiIntent>
          <Calendly />
        </section>
        <section aria-labelledby="contact-section" aria-describedby="contact-intent" role="region" data-ai="cta">
          <AiIntent id="contact-intent">Capture a project inquiry with the visitor's selected intent and scope.</AiIntent>
          <Contact intent={intent} onIntentChange={setIntent} prefill={prefill} />
        </section>
      </main>

      <footer data-ai="footer">
        <Footer />
      </footer>
    </div>
  );
}