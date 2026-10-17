import AiMetadata, { AiIntent } from "../../components/AiMetadata";
import Footer from "../../components/Footer";
import BrowserChrome from "../../components/Badge";
import Screenshot from "../../components/Screenshot";
import SEO from "../../components/SEO";
import { Link } from "react-router-dom";

export default function ServeSyncCaseStudy() {
  return (
    <div ai-tag="case-study" data-ai="page" className="min-h-screen bg-ink text-paper">
      <SEO
        title="ServeSync — Case Study"
        description="How PrismWave Studio designed ServeSync, a hospitality operations concept that automates recurring back-office administration."
        path="/work/servesync/case-study"
      />
      <AiMetadata
        map={["Case study hero", "Weekly savings", "Operational problem", "Product fixes", "Outcome"]}
        intent="Explain how PrismWave Studio designed ServeSync to automate hospitality operations, presented as a concept rather than a measured client result."
        tags={["case study", "hospitality software", "operations automation", "ServeSync", "concept"]}
        extract={{ title: "ServeSync case study", audience: "Hospitality operators and product teams", primaryActions: "Understand the product problem, solution, and outcome", result: "Illustrative targets for automating recurring back-office administration" }}
      />
      <header data-ai="navigation" className="border-b border-ink-line">
        <div className="mx-auto max-w-4xl px-6 py-6">
          <Link to="/" className="font-mono text-[12px] uppercase tracking-wide text-paper/60 hover:text-paper">&larr; Back to studio</Link>
        </div>
      </header>
      <main role="main" data-ai="main-content" className="mx-auto max-w-4xl px-6 py-24 md:py-32">
        <article aria-labelledby="servesync-heading">
          <section aria-labelledby="servesync-heading" aria-describedby="servesync-hero-intent" role="region" data-ai="hero">
            <AiIntent id="servesync-hero-intent">Introduce ServeSync and explain the hospitality operations problem it is designed to solve, clearly labeled as a concept rather than a client result.</AiIntent>
          <p className="font-mono text-[11px] uppercase tracking-widest text-amber">Concept / illustrative product</p>
          <h1 id="servesync-heading" className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">ServeSync - Case Study</h1>
          <p className="mt-6 leading-relaxed text-paper/70">
            ServeSync is a hospitality operations engine built to give operators their time, margin, and evenings back by automating recurring administration.
          </p>
          <div className="mt-12">
            <BrowserChrome bg="#E8E8E8">
              <Screenshot label="ServeSync dashboard screenshot" />
            </BrowserChrome>
          </div>
          </section>
          <section aria-labelledby="savings" aria-describedby="savings-intent" role="region" data-ai="outcomes" className="mt-20">
            <AiIntent id="savings-intent">Summarize the weekly time, money, waste, and administration improvements ServeSync is designed to target, labeled as illustrative planning figures rather than measured client results.</AiIntent>
            <h2 id="savings" className="font-display text-2xl font-semibold">Weekly Savings Ticket</h2>
            <ul role="list" className="mt-4 list-disc pl-6 leading-relaxed text-paper/70">
              <li>11 hours returned weekly (illustrative target)</li>
              <li>$1,800+ monthly savings (illustrative target)</li>
              <li>30% less waste (illustrative target)</li>
              <li>70% of administration automated (illustrative target)</li>
            </ul>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-wide text-ink-soft">These are planning targets for this concept, not measured client results.</p>
          </section>
          <section aria-labelledby="outcome" aria-describedby="outcome-intent" role="region" data-ai="outcome" className="mt-20">
            <AiIntent id="outcome-intent">Explain the practical result of replacing manual hospitality administration with one automated platform.</AiIntent>
            <h2 id="outcome" className="font-display text-2xl font-semibold">Outcome</h2>
            <p className="mt-4 leading-relaxed text-paper/70">
              ServeSync replaces spreadsheets, manual counts, and repetitive admin with one automated platform running quietly in the background while the team runs the floor.
            </p>
          </section>
          <section aria-label="Disclosure" className="mt-20 rounded-2xl border border-amber/30 bg-amber/5 p-8 text-center md:p-12">
            <p className="font-mono text-[11px] uppercase tracking-widest text-amber">No fabricated testimonial</p>
            <h2 className="mt-4 font-display text-3xl font-semibold">This is a concept, ready to become a measured project.</h2>
            <p className="mx-auto mt-4 max-w-xl text-paper/65">
              There is no client quote or achieved result attached to this concept yet. The next step is to test it against a real hospitality business and measure what changes.
            </p>
            <Link to="/#contact" className="mt-7 inline-flex rounded-full bg-amber px-7 py-3.5 font-display text-sm font-semibold text-ink">
              Discuss a similar problem &rarr;
            </Link>
          </section>
        </article>
      </main>
      <footer data-ai="footer"><Footer /></footer>
    </div>
  );
}