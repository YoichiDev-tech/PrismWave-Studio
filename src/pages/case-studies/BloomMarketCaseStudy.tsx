import { Link } from "react-router-dom";
import BrowserChrome from "../../components/Badge";
import BloomMock from "../../components/portfolioMocks/BloomMock";
import Footer from "../../components/Footer";
import Reveal from "../../components/Reveal";
import AiMetadata, { AiIntent } from "../../components/AiMetadata";
import SEO from "../../components/SEO";

const ROUND = "'Fredoka', 'Sora', sans-serif";
const CREAM = "#FFF3E8";
const PLUM = "#3A1220";
const PINK = "#FF6FA8";
const YELLOW = "#FFD23F";
const MINT = "#8FD3C0";

const PALETTE = [
  { name: "Crema", hex: CREAM, use: "Sfondo principale" },
  { name: "Prugna", hex: PLUM, use: "Testi e pulsanti principali" },
  { name: "Rosa", hex: PINK, use: "Elementi decorativi e inviti all'azione" },
  { name: "Giallo", hex: YELLOW, use: "Evidenziazioni ed etichette" },
  { name: "Menta", hex: MINT, use: "Colore secondario" },
];

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div role="heading" aria-level={2} aria-label={title}>
      <p className="font-mono text-[11px] uppercase tracking-widest text-paper/50">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-2xl font-semibold text-paper">
        {title}
      </h2>
    </div>
  );
}

function PaletteSwatches() {
  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-5" role="list">
      {PALETTE.map((color) => (
        <div
          key={color.name}
          className="overflow-hidden rounded-2xl border border-ink-line"
          role="listitem"
          aria-label={`Color swatch: ${color.name}`}
        >
          <div className="h-20" style={{ background: color.hex }} />
          <div className="bg-ink-2/60 p-3">
            <p className="font-display text-sm font-semibold text-paper">
              {color.name}
            </p>
            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-paper/40">
              {color.hex}
            </p>
            <p className="mt-1.5 text-[11px] leading-snug text-paper/50">
              {color.use}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function TypeSpecimen() {
  return (
    <div
      className="mt-8 overflow-hidden rounded-2xl border border-ink-line"
      role="region"
      aria-label="Tipografia specimen"
    >
      <div className="space-y-5 p-8" style={{ background: CREAM, color: PLUM }}>
        <p className="text-4xl font-bold leading-none" style={{ fontFamily: ROUND }}>
          Fiori freschi, ogni settimana.
        </p>
        <p className="text-lg font-semibold" style={{ fontFamily: ROUND }}>
          I preferiti della settimana
        </p>
        <p
          className="max-w-md text-sm"
          style={{ opacity: 0.75, fontFamily: "'Inter', sans-serif" }}
        >
          Bouquet realizzati a mano e piante facili da curare, consegnati a casa tua
          ogni settimana. Per i titoli utilizziamo Fredoka, mentre per i testi utilizziamo Inter.
        </p>
      </div>
      <div className="flex flex-wrap gap-4 bg-ink-2/60 px-8 py-4 font-mono text-[11px] uppercase tracking-wide text-paper/50">
        <span>Display — Fredoka, bold</span>
        <span>Body — Inter, regular</span>
      </div>
    </div>
  );
}

function LayoutDiagram() {
  return (
    <div
      className="mt-8 rounded-2xl border border-ink-line bg-ink-2/40 p-6"
      role="region"
      aria-label="Layout diagram"
    >
      <div className="grid gap-3">
        <div className="flex items-center justify-between rounded-lg border border-dashed border-paper/20 px-4 py-3">
          <span className="font-mono text-[10px] uppercase tracking-wide text-paper/40">
            Navigazione
          </span>
          <span className="h-2 w-16 rounded-full bg-paper/15" />
        </div>
        <div className="grid gap-3 sm:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col justify-center gap-2 rounded-lg border border-dashed border-paper/20 px-4 py-8">
            <span className="h-3 w-3/4 rounded-full" style={{ background: PINK, opacity: 0.6 }} />
            <span className="h-3 w-1/2 rounded-full" style={{ background: PINK, opacity: 0.4 }} />
            <span className="mt-2 h-2 w-2/3 rounded-full bg-paper/15" />
          </div>
          <div
            className="rounded-[45%] border border-dashed border-paper/20"
            style={{ background: `${YELLOW}22` }}
          />
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[PINK, YELLOW, MINT].map((c, i) => (
            <div
              key={i}
              className="aspect-square rounded-lg border border-dashed border-paper/20"
              style={{ background: `${c}22` }}
            />
          ))}
        </div>
      </div>
      <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-paper/40">
        Griglia asimmetrica, forme organiche arrotondate e ampi spazi vuoti
      </p>
    </div>
  );
}

function InteractionDemo() {
  return (
    <div
      className="mt-8 grid gap-4 sm:grid-cols-3"
      role="list"
      aria-label="Interaction demo cards"
    >
      {[
        { label: "Bouquet della domenica", price: "$38", bg: PINK },
        { label: "Vaso agli agrumi e alle erbe", price: "$22", bg: YELLOW },
        { label: "Composizione di fiori essiccati", price: "$28", bg: MINT },
      ].map((p) => (
        <div
          key={p.label}
          role="listitem"
          aria-label={`Product card: ${p.label}`}
          className="group cursor-default rounded-2xl border-2 p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          style={{ borderColor: PLUM, background: CREAM }}
        >
          <div
            className="flex h-20 items-center justify-center rounded-xl text-xs font-semibold uppercase tracking-wide transition-transform duration-300 group-hover:scale-105"
            style={{ background: p.bg, color: PLUM, fontFamily: ROUND }}
          >
            {p.label}
          </div>
          <div className="mt-3 flex items-center justify-between" style={{ color: PLUM }}>
            <span className="text-xs font-semibold">{p.label}</span>
            <span
              className="rounded-full px-2 py-0.5 text-[11px] font-bold"
              style={{ background: PLUM, color: CREAM }}
            >
              {p.price}
            </span>
          </div>
        </div>
      ))}
      <p className="col-span-full font-mono text-[10px] uppercase tracking-widest text-paper/40">
        Passa il cursore su una scheda: un leggero sollevamento e ingrandimento, senza animazioni eccessive
      </p>
    </div>
  );
}

function LiveHeroPreview() {
  return (
    <div
      className="mt-8 overflow-hidden rounded-2xl border border-ink-line"
      role="region"
      aria-label="Live hero preview"
    >
      <div
        className="relative overflow-hidden px-6 py-14 sm:px-10 sm:py-16"
        style={{ background: CREAM, color: PLUM }}
      >
        <div
          aria-hidden="true"
          className="absolute -right-12 -top-12 h-40 w-40 rotate-12 rounded-[45%]"
          style={{ background: PINK, opacity: 0.9 }}
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-10 -left-10 h-32 w-32 -rotate-6 rounded-[45%]"
          style={{ background: YELLOW, opacity: 0.85 }}
        />

        <div className="relative">
          <p
            className="inline-block rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide"
            style={{ background: PLUM, color: CREAM, fontFamily: ROUND }}
          >
            Nuova selezione ogni venerdì
          </p>
          <h3
            className="mt-5 max-w-sm text-3xl font-bold leading-[0.98] sm:text-4xl"
            style={{ fontFamily: ROUND }}
          >
            Fiori freschi, senza bisogno del pollice verde.
          </h3>
          <p className="mt-4 max-w-xs text-sm" style={{ opacity: 0.75 }}>
            Bouquet realizzati a mano e piante facili da curare, consegnati a casa tua
            porch every week.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span
              className="rounded-full px-5 py-2.5 text-xs font-bold"
              style={{ background: PINK, color: PLUM, fontFamily: ROUND }}
            >
              Acquista la selezione
            </span>
            <span
              className="rounded-full border-2 px-5 py-2.5 text-xs font-bold"
              style={{ borderColor: PLUM, fontFamily: ROUND }}
            >
              Attiva un abbonamento
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between bg-ink-2/60 px-6 py-3 font-mono text-[10px] uppercase tracking-wide text-paper/40">
        <span>Live recreation — not a static image</span>
        <Link
          to="/work/bloom-market#top"
          className="underline underline-offset-4 hover:text-paper/70"
        >
          Visualizza la sezione principale reale &rarr;
        </Link>
      </div>
    </div>
  );
}

export default function BloomMarketCaseStudy() {
  return (
    <div ai-tag="case-study" data-ai="page" className="bg-ink cursor-default">
      <SEO
        title="Bloom Market — Caso studio"
        description="Sistema di design e progetto dimostrativo di prodotto alla base di Bloom Market, un modello luminoso per attività che consegnano fiori ogni settimana."
        path="/work/bloom-market/case-study"
      />
      <AiMetadata
        map={["Presentazione del caso studio", "Anteprima del prodotto finale", "Panoramica del progetto", "Palette colori", "Tipografia", "Sistema di layout", "Progettazione delle interazioni", "Invito finale all'azione"]}
        intent="Spiegare le scelte di design del modello e-commerce Bloom Market e mostrare come il sistema visivo supporti gli abbonamenti floreali."
        tags={["caso studio", "design e-commerce", "marchio floreale", "identità visiva", "Bloom Market"]}
        extract={{ title: "Caso studio Bloom Market", audience: "Fondatori di attività commerciali e team di design", primaryActions: "Esaminare il sistema di design e visualizzare il modello interattivo", outcome: "Un concept luminoso per un negozio con consegna settimanale di fiori" }}
      />
      <header data-ai="navigation" className="border-b border-ink-line">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-6">
          <Link
            to="/"
            className="font-mono text-[12px] uppercase tracking-wide text-paper/60 transition-colors hover:text-paper"
          >
            &larr; Torna allo studio
          </Link>
          <Link
            to="/work/bloom-market"
            className="rounded-full border border-ink-line px-4 py-2 font-mono text-[11px] uppercase tracking-wide text-paper/70 transition-colors hover:border-amber hover:text-paper"
          >
            Visualizza il modello interattivo
          </Link>
        </div>
      </header>

      <main role="main" data-ai="main-content">

        <article
          aria-labelledby="case-study-hero"
          className="text-paper py-20 md:py-28"
        >
          <div className="mx-auto max-w-4xl px-6">

            {/* Hero */}
            <section aria-labelledby="case-study-hero" aria-describedby="bloom-hero-intent" role="region" data-ai="hero">
              <AiIntent id="bloom-hero-intent">Presentare il caso studio Bloom Market e mostrare la sua direzione visiva.</AiIntent>
              <Reveal>
                <p className="font-mono text-[12px] uppercase tracking-widest text-paper/50">
                  Caso studio
                </p>
                <h1
                  id="case-study-hero"
                  className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl"
                >
                  Bloom Market
                </h1>
                <p className="mt-6 max-w-2xl text-paper/70 leading-relaxed">
                  Uno sguardo più approfondito alla progettazione della pagina Bloom Market, dalla palette alla tipografia e al layout, fino al linguaggio visivo giocoso del modello finale.
                </p>
                <LiveHeroPreview />
              </Reveal>
            </section>

            {/* Final Mock */}
            <section aria-labelledby="case-study-final-mock" aria-describedby="bloom-mock-intent" role="region" data-ai="product-preview">
              <AiIntent id="bloom-mock-intent">Mostrare il concept finale del negozio Bloom Market come anteprima del prodotto.</AiIntent>
              <Reveal delay={1} className="mt-12">
                <BrowserChrome bg="#FFE8D6">
                  <BloomMock />
                </BrowserChrome>
              </Reveal>
            </section>

            {/* Panoramica */}
            <section aria-labelledby="case-study-overview" aria-describedby="bloom-overview-intent" role="region" data-ai="overview">
              <AiIntent id="bloom-overview-intent">Spiegare il brief, il pubblico di riferimento e gli obiettivi visivi di Bloom Market.</AiIntent>
              <Reveal delay={1} className="mt-20">
                <SectionHeading eyebrow="01 — Incarico" title="Panoramica" />
                <p className="mt-4 max-w-2xl text-paper/70 leading-relaxed">
                  Bloom Market è un negozio boutique di fiori e articoli da regalo, con un'identità espressiva e ricca di elementi visivi. L'obiettivo era creare una pagina di presentazione vivace, con caratteri tipografici ampi, forme organiche e una palette che trasmettesse calore e festa.
                </p>
              </Reveal>
            </section>

            {/* Palette */}
            <section aria-labelledby="case-study-palette" aria-describedby="bloom-palette-intent" role="region" data-ai="palette">
              <AiIntent id="bloom-palette-intent">Documentare i colori scelti per bilanciare calore, ricchezza visiva e accessibilità.</AiIntent>
              <Reveal delay={2} className="mt-16">
                <SectionHeading eyebrow="02 — Palette" title="Palette dei colori" />
                <p className="mt-4 max-w-2xl text-paper/70 leading-relaxed">
                  La palette combina delicate tonalità pesca con accenti color frutti di bosco. Il risultato bilancia accoglienza e ricchezza visiva, una scelta adatta a un marchio boutique.
                </p>
                <PaletteSwatches />
              </Reveal>
            </section>

            {/* Tipografia */}
            <section aria-labelledby="case-study-type" aria-describedby="bloom-type-intent" role="region" data-ai="typography">
              <AiIntent id="bloom-type-intent">Documentare il sistema tipografico utilizzato per titoli e testi del modello.</AiIntent>
              <Reveal delay={1} className="mt-16">
                <SectionHeading eyebrow="03 — Tipografia" title="Tipografia" />
                <p className="mt-4 max-w-2xl text-paper/70 leading-relaxed">
                  Il sistema tipografico utilizza un carattere marcato e arrotondato per i titoli e un sans serif pulito per i testi di supporto. Questo contrasto rafforza la personalità giocosa del marchio mantenendo i contenuti leggibili.
                </p>
                <TypeSpecimen />
              </Reveal>
            </section>

            {/* Layout */}
            <section aria-labelledby="case-study-layout" aria-describedby="bloom-layout-intent" role="region" data-ai="layout">
              <AiIntent id="bloom-layout-intent">Spiegare il layout asimmetrico e il sistema di composizione organica.</AiIntent>
              <Reveal delay={2} className="mt-16">
                <SectionHeading eyebrow="04 — Composizione" title="Layout e composizione" />
                <p className="mt-4 max-w-2xl text-paper/70 leading-relaxed">
                  Il layout utilizza ampi spazi, blocchi asimmetrici e forme curve per creare un senso di movimento. Ogni sezione diventa un momento visivo, anziché una griglia rigida.
                </p>
                <LayoutDiagram />
              </Reveal>
            </section>

            {/* Interaction */}
            <section aria-labelledby="case-study-interaction" aria-describedby="bloom-interaction-intent" role="region" data-ai="interaction">
              <AiIntent id="bloom-interaction-intent">Mostrare le animazioni misurate e gli effetti al passaggio del cursore utilizzati nell'interfaccia.</AiIntent>
              <Reveal delay={1} className="mt-16">
                <SectionHeading eyebrow="05 — Movimento" title="Interazioni e movimento" />
                <p className="mt-4 max-w-2xl text-paper/70 leading-relaxed">
                  Gli effetti al passaggio del cursore sono discreti ma espressivi: piccoli ingrandimenti e ombre leggere danno vita all'interfaccia senza distrarre l'utente. Queste micro-interazioni rafforzano la personalità giocosa del marchio.
                </p>
                <InteractionDemo />
              </Reveal>
            </section>

            {/* Closing CTA */}
            <section aria-labelledby="case-study-cta" aria-describedby="bloom-cta-intent" role="region" data-ai="cta">
              <AiIntent id="bloom-cta-intent">Invitare i visitatori ad avviare un progetto web curato con la stessa attenzione.</AiIntent>
              <Reveal
                delay={2}
                className="mt-24 rounded-3xl border border-ink-line bg-ink-2/60 px-8 py-12 text-center"
              >
                <h2
                  id="case-study-cta"
                  className="font-display text-2xl font-semibold text-paper md:text-3xl"
                >
                  Vuoi realizzare un progetto con la stessa cura?
                </h2>
                <p className="mx-auto mt-3 max-w-md text-paper/60">
                  Che tu voglia partire da un'idea o migliorare un sito esistente, porteremo la stessa attenzione ai dettagli nel tuo progetto.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <Link
                    to="/#contact"
                    className="group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-display text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
                    style={{
                      background:
                        "linear-gradient(100deg, #FFB84D 0%, #FF7A59 100%)",
                    }}
                  >
                    Avvia un progetto
                    <span className="transition-transform group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </Link>
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-line px-7 py-3.5 font-display text-sm font-semibold text-paper transition-colors hover:border-amber hover:text-amber"
                  >
                    Scopri altri progetti
                  </Link>
                </div>
              </Reveal>
            </section>

          </div>
        </article>

      </main>

      <footer data-ai="footer">
        <Footer />
      </footer>
    </div>
  );
}