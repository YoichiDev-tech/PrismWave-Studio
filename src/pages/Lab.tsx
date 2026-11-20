import { useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import ScoreGauge from "../components/ScoreGauge";
import Footer from "../components/Footer";
import AiMetadata, { AiIntent } from "../components/AiMetadata";
import SEO from "../components/SEO";

const THREADS_URL = "https://www.threads.com/@yoichidev";

interface ShowcaseItem {
  id: string;
  title: string;
  description: string;
  code: string;
}

const ITEMS: ShowcaseItem[] = [
  {
    id: "gradient-button",
    title: "Pulsante principale con sfumatura",
    description: "Lo stile del pulsante principale utilizzato nelle sezioni del sito.",
    code: `<button
  className="rounded-full px-8 py-4 font-display text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
  style={{ background: "linear-gradient(100deg, #FFB84D 0%, #FF7A59 100%)" }}
>
  Richiedi un'analisi gratuita
</button>`,
  },
  {
    id: "score-gauge",
    title: "Indicatore circolare del punteggio",
    description: "Visualizza i punteggi delle quattro categorie nello strumento di analisi del sito.",
    code: `<ScoreGauge label="Velocità di caricamento" score={87} />`,
  },
  {
    id: "reveal-on-scroll",
    title: "Comparsa durante lo scorrimento",
    description: "Effetto di comparsa progressiva durante lo scorrimento, applicabile a qualsiasi sezione.",
    code: `<Reveal delay={1}>
  <h2>Compare gradualmente durante lo scorrimento</h2>
</Reveal>`,
  },
];

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API can be blocked (permissions, insecure context) —
      // failing silently is fine here, there's just nothing to confirm
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="font-mono text-[11px] uppercase tracking-wide text-ink-soft hover:text-paper transition-colors"
    >
      {copied ? "Copiato!" : "Copia il codice"}
    </button>
  );
}

export default function Lab() {
  const [replayKey, setRipetiKey] = useState(0);
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div ai-tag="lab" data-ai="page" className="grain relative min-h-screen overflow-hidden bg-ink text-paper">
      <SEO
        title="Laboratorio — Componenti aperti"
        description="Componenti e modelli di interazione del sito PrismWave Studio, pronti da copiare e utilizzare gratuitamente."
        path="/lab"
      />
      <AiMetadata
        map={["Introduzione al laboratorio", "Elenco dei componenti", "Anteprime interattive", "Codice copiabile"]}
        intent="Permettere ai visitatori di esaminare, provare e copiare i componenti dell'interfaccia utilizzati da PrismWave Studio."
        tags={["libreria di componenti", "modelli frontend", "componenti React", "frammenti di interfaccia", "laboratorio web"]}
        extract={{ title: "Laboratorio PrismWave Studio", audience: "Sviluppatori e designer", primaryActions: "Esaminare un componente, provarlo o copiarne il codice", format: "Raccolta pubblica di componenti" }}
      />
      
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 translate-x-[35%] h-[560px] w-[560px] rounded-full opacity-20 blur-[130px]"
        style={{ background: "radial-gradient(circle, #6C63FF 0%, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 left-0 -translate-x-[35%] h-[420px] w-[420px] rounded-full opacity-10 blur-[130px]"
        style={{ background: "radial-gradient(circle, #FFB84D 0%, transparent 70%)" }}
      />

      <header data-ai="navigation" className="relative border-b border-ink-line">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
          <Link
            to="/"
            className="font-mono text-[12px] uppercase tracking-wide text-ink-soft hover:text-paper"
          >
            &larr; PrismWave Studio
          </Link>
          <a
            href={THREADS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[12px] uppercase tracking-wide text-ink-soft hover:text-paper"
          >
            Segui lo sviluppo &rarr;
          </a>
        </div>
      </header>

      <main className="relative mx-auto max-w-5xl px-6 py-20" role="main" data-ai="main-content">
        <section aria-labelledby="lab-hero" aria-describedby="lab-hero-intent" role="region" data-ai="hero">
          <AiIntent id="lab-hero-intent">Presentare il laboratorio pubblico di componenti e spiegare cosa possono esaminare i visitatori.</AiIntent>
          <Reveal>
          <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">Il laboratorio</p>
          <h1 id="lab-hero" className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Componenti di produzione, a disposizione di tutti.
          </h1>
          <p className="mt-5 max-w-xl text-ink-soft">
            Una raccolta di componenti effettivamente utilizzati su questo sito, liberamente consultabili e copiabili. Ogni nuovo componente viene presentato anche su 
            <a
              href={THREADS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-paper underline underline-offset-4"
            >
              Threads
            </a>{" "}
            con una breve spiegazione.
          </p>
          </Reveal>
        </section>

        <section aria-labelledby="lab-components" aria-describedby="lab-components-intent" role="region" data-ai="features">
          <AiIntent id="lab-components-intent">Elencare i componenti utilizzati in produzione, con anteprime interattive e frammenti di codice copiabili.</AiIntent>
          <h2 id="lab-components" className="sr-only">Componenti di produzione</h2>
          <div className="mt-16 grid gap-8" role="list">
          {ITEMS.map((item, index) => {
            const isOpen = openId === item.id;

            return (
              <Reveal key={item.id} delay={((index % 4) + 1) as 1 | 2 | 3 | 4}>
                <article
                  className="rounded-2xl border border-ink-line bg-ink-2/60 p-8 transition-transform hover:scale-[1.02] hover:bg-ink-2 hover:border-amber"
                  role="listitem"
                  aria-label={`Component: ${item.title}`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h2 className="font-display text-xl font-semibold text-paper">{item.title}</h2>
                      <p className="mt-1.5 max-w-md text-sm text-ink-soft">{item.description}</p>
                    </div>
                  </div>

                  {/* Live preview */}
                  <div
                    className="mt-6 flex min-h-[120px] items-center justify-center rounded-xl border border-ink-line bg-ink-2 p-8"
                    role="region"
                    aria-label={`Live preview: ${item.title}`}
                  >
                    {item.id === "gradient-button" && (
                      <button
                        type="button"
                        className="rounded-full px-8 py-4 font-display text-sm font-semibold text-ink transition-transform hover:scale-[1.03] hover:brightness-110"
                        style={{ background: "linear-gradient(100deg, #FFB84D 0%, #FF7A59 100%)" }}
                      >
                        Richiedi un'analisi gratuita
                      </button>
                    )}

                    {item.id === "score-gauge" && <ScoreGauge label="Velocità di caricamento" score={87} />}

                    {item.id === "reveal-on-scroll" && (
                      <div className="flex flex-col items-center gap-4">
                        <Reveal key={replayKey}>
                          <p className="font-display text-lg font-semibold text-paper">
                            Compare gradualmente durante lo scorrimento ↑
                          </p>
                        </Reveal>
                        <button
                          type="button"
                          onClick={() => setRipetiKey((k) => k + 1)}
                          className="font-mono text-[11px] uppercase tracking-wide text-amber underline underline-offset-4"
                        >
                          Ripeti
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Collapsible Code Drawer */}
                  <div className="mt-6 flex items-center justify-between">
                    <CopyButton code={item.code} />

                    <button
                      type="button"
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      className="font-mono text-[11px] uppercase tracking-wide text-ink-soft underline underline-offset-4 hover:text-paper transition-colors"
                    >
                      {isOpen ? "Nascondi il codice" : "Visualizza il codice →"}
                    </button>
                  </div>

                  {isOpen && (
                    <pre className="mt-4 overflow-x-auto rounded-xl border border-ink-line bg-ink-2 p-4 font-mono text-[12px] leading-relaxed text-ink-soft">
                      <code>{item.code}</code>
                    </pre>
                  )}
                </article>
              </Reveal>
            );
          })}
          </div>
        </section>

        <section aria-labelledby="lab-cta" aria-describedby="lab-cta-intent" role="region" data-ai="cta">
          <AiIntent id="lab-cta-intent">Invite visitors who need similar components to start a PrismWave project.</AiIntent>
          <Reveal className="mt-16 text-center">
          <p className="text-ink-soft">Want something like this built into your own site?</p>
          <Link
            to="/#contact"
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-display text-sm font-semibold text-ink transition-transform hover:scale-[1.02]"
            style={{ background: "linear-gradient(100deg, #FFB84D 0%, #FF7A59 100%)" }}
          >
            Avvia un progetto &rarr;
          </Link>
          </Reveal>
        </section>
      </main>

      <footer data-ai="footer"><Footer /></footer>
    </div>
  );
}