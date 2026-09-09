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
import AiMetadata from "../components/AiMetadata";
import { scrollToSection } from "../lib/scroll";

export type Intent = "audit" | "build";

export default function Home() {
  const [intent, setIntent] = useState<Intent | null>(null);
  const [prefill, setPrefill] = useState<ContactPrefill | null>(null);

  const scrollToContact = useCallback(() => {
    scrollToSection("contact");
  }, []);

  const handleAuditTeardown = useCallback(
    (siteUrl: string) => {
      setIntent("audit");
      setPrefill({
        siteUrl,
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
      setPrefill({ message: summary, nonce: Date.now() });
      scrollToContact();
    },
    [scrollToContact]
  );

  return (
    <>
      <AiMetadata
        map={["Hero", "Signs your site is outdated", "AI-ready site audit", "Services", "Process", "Pricing", "Sprint configurator", "Portfolio", "FAQ", "Contact"]}
        intent="Help a founder assess, plan, and start a website audit or custom website build with PrismWave Studio."
        tags={["web design studio", "website audit", "website development", "small business websites", "AI-readable websites"]}
        extract={{ title: "PrismWave Studio", audience: "Founders, creators, and small businesses", primaryActions: "Run a free audit or request a project scope", location: "Online studio" }}
      />
      <header>
        <Nav onSelectIntent={setIntent} />
      </header>

      <main role="main">
        <section aria-labelledby="hero-section">
          <Hero onSelectIntent={setIntent} />
        </section>

        <section aria-labelledby="signs-section">
          <SignsOutdated onSelectIntent={setIntent} />
        </section>

        <section aria-labelledby="audit-section">
          <AuditWidget onRequestFullTeardown={handleAuditTeardown} />
        </section>

        <section aria-labelledby="services-section">
          <Services />
        </section>

        <section aria-labelledby="process-section">
          <Process />
        </section>

        <section aria-labelledby="pricing-section">
          <Pricing />
        </section>

        <section aria-labelledby="sprint-section">
          <SprintConfigurator onRequestScope={handleSprintScope} />
        </section>

        <section aria-labelledby="build-section">
          <BuildYourIdea onSelectIntent={setIntent} />
        </section>

        <section aria-labelledby="portfolio-section">
          <Portfolio />
        </section>

        <section aria-labelledby="why-section">
          <WhyChooseUs />
        </section>

        <section aria-labelledby="faq-section">
          <FAQ />
        </section>

        <section aria-labelledby="about-section">
          <About />
        </section>

        <section aria-labelledby="calendly-section">
          <Calendly />
        </section>

        <section aria-labelledby="contact-section">
          <Contact intent={intent} onIntentChange={setIntent} prefill={prefill} />
        </section>
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}