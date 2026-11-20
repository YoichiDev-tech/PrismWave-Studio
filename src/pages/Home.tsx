import { useCallback, useState } from "react";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import TrustStrip from "../components/TrustStrip";
import AuditDetails from "../components/AuditDetails";
import AuditFindings from "../components/AuditFindings";
import AuditInAction from "../components/AuditInAction";
import AuditUserVoice from "../components/AuditUserVoice";
import WhoWeHelp from "../components/WhoWeHelp";
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
        Non sai da dove iniziare?
      </h2>
      <p className="mt-2 text-ink-soft">
        Esegui un'analisi gratuita in pochi secondi, scopri i problemi e decidi se intervenire con correzioni mirate o realizzare un nuovo sito.
        No obligation either way.
      </p>

      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => scrollToSection("top")}
          className="rounded-full px-8 py-3 font-display text-sm font-semibold text-ink transition-transform hover:scale-[1.03] active:scale-[0.98]"
          style={{ background: "linear-gradient(100deg, #FFB84D 0%, #FF7A59 100%)" }}
        >
          Richiedi un'analisi gratuita
        </button>
        <button
          type="button"
          onClick={() => scrollToSection("contact")}
          className="rounded-full border border-ink-line px-8 py-3 font-display text-sm font-semibold text-paper transition-colors hover:border-amber active:scale-[0.98]"
        >
          Prenota una chiamata di 15 minuti
        </button>
      </div>

      <p className="mt-6 text-sm text-ink-soft">
        Dopo l'analisi, scegli tu: <span className="text-paper">correggere ciò che non funziona</span> con interventi mirati oppure <span className="text-paper">realizzare un nuovo sito</span> con un progetto completo su misura. In entrambi i casi, prezzo e tempi vengono concordati prima di iniziare.
      </p>
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
        title="Analisi gratuita del sito e sviluppo web su misura | PrismWave Studio"
        description="PrismWave Studio offre un'analisi gratuita di velocità, esperienza mobile, SEO e leggibilità per i sistemi AI. Ricevi risultati chiari e scegli interventi mirati o un nuovo sito, con prezzo e tempistiche definiti per iscritto."
        path="/"
      />

      <AiMetadata
        map={[
          "Presentazione e analisi gratuita",
          "Come lavoriamo",
          "Cosa verifica l'analisi",
          "Formato dei risultati dell'analisi",
          "Esempio pratico di report",
          "A chi ci rivolgiamo",
          "Progetti selezionati",
          "Prezzi e configuratore",
          "Processo",
          "Chi siamo",
          "FAQ",
          "Contatti e prenotazioni",
        ]}
        intent="Aiutare il titolare di una piccola impresa a eseguire un'analisi gratuita del sito, comprenderne i risultati e avviare un intervento o una riprogettazione con ambito definito insieme a PrismWave Studio."
        tags={[
          "web design studio",
          "website audit",
          "website development",
          "small business websites",
          "AI-readable websites",
        ]}
        extract={{
          title: "PrismWave Studio",
          audience: "Fondatori, creativi e piccole imprese",
          primaryActions: "Avviare un'analisi gratuita o richiedere la definizione di un progetto",
          location: "Studio digitale",
        }}
      />

      <Nav onSelectIntent={setIntent} />

      <main data-ai="main-content">
        <Hero
          onSelectIntent={setIntent}
          onRequestFullTeardown={handleAuditTeardown}
          onStartIdea={handleStartIdea}
        />

        <TrustStrip />

        <AuditDetails />

        <AuditFindings />

        <AuditInAction />

        <AuditUserVoice />

        <WhoWeHelp
          onSelectAudience={(segment) => {
            setIntent("build");
            setPrefill({
              message: `I'm interested in a project — I fit the "${segment}" segment.`,
              nonce: Date.now(),
            });
            scrollToSection("contact");
          }}
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