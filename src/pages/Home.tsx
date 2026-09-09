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

  const handleAudienceSelect = useCallback(
    (segment: string) => {
      setIntent("build");
      setPrefill({
        message: `We're a ${segment.toLowerCase()} and would like to talk about our project.`,
        nonce: Date.now(),
      });
      scrollToContact();
    },
    [scrollToContact]
  );

  return (
    <>

      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}