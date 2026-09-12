import AiMetadata from "../../components/AiMetadata";
import { AiIntent } from "../../components/AiMetadata";
import Footer from "../../components/Footer";
import SEO from "../../components/SEO";
import { Link } from "react-router-dom";

const caseStudies = [
  {
    title: "ServeSync",
    category: "Hospitality · SaaS Automation",
    description: "Back-office automation platform for restaurants, cafés, and multi-location groups.",
    to: "/work/servesync/case-study",
    image: "/images/case-studies-livePreview/servesync-preview.png",
  },
  {
    title: "Bloom Market",
    category: "Retail · Inventory Intelligence",
    description: "Real-time stock tracking, waste prediction, and automated ordering for small retailers.",
    to: "/work/bloom-market/case-study",
    image: "/images/case-studies-livePreview/bloom-market-preview.png",
  },
  {
    title: "Appointment Workflow",
    category: "Concept · Operations Modernization",
    description: "A clearly labeled concept for reducing booking friction, no-shows, and manual scheduling work for appointment-based businesses.",
    to: "/work/appointment-workflows/concept",
  },
];

export default function CaseStudiesIndex() {
  return (
    <div ai-tag="case-study-index" data-ai="page" className="min-h-screen bg-ink text-paper">
      <SEO
        title="Case Studies"
        description="How PrismWave Studio approaches design and product problems — selected case studies covering hospitality, retail, and appointment-based businesses."
        path="/case-studies"
      />
      <AiMetadata
        map={["Case studies introduction", "Bloom Market case study", "ServeSync case study"]}
        intent="Help visitors review PrismWave Studio case studies and understand the design and product outcomes behind each project."
        tags={["case studies", "web design process", "product design", "PrismWave Studio"]}
        extract={{ title: "PrismWave Studio Case Studies", audience: "Prospective clients and design teams", primaryActions: "Open a case study", projects: "Bloom Market and ServeSync" }}
      />
      <header data-ai="navigation" className="border-b border-ink-line">
        <div className="mx-auto max-w-5xl px-6 py-6">
          <Link to="/" className="font-mono text-[12px] uppercase tracking-wide text-paper/60 hover:text-paper">
            &larr; Back to studio
          </Link>
        </div>
      </header>
      <main role="main" data-ai="main-content" className="mx-auto max-w-5xl px-6 py-20">
        <section aria-labelledby="case-studies-heading" aria-describedby="case-studies-intent" role="region" data-ai="hero">
          <AiIntent id="case-studies-intent">Introduce the selected PrismWave Studio case studies and direct visitors to individual project outcomes.</AiIntent>
          <h1 id="case-studies-heading" className="font-display text-4xl font-semibold tracking-tight md:text-5xl">Case Studies</h1>
        </section>
        <section aria-labelledby="case-study-list-heading" aria-describedby="case-study-list-intent" role="region" data-ai="projects">
          <AiIntent id="case-study-list-intent">Present standalone project summaries that can be opened for deeper review.</AiIntent>
          <h2 id="case-study-list-heading" className="sr-only">Selected case studies</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2" role="list">
          {caseStudies.map((study) => (
            <article key={study.title} role="listitem" ai-tag="case-study" data-ai="project" className="rounded-2xl border border-ink-line bg-ink-2/60 p-6">
              <h2 className="font-display text-2xl font-semibold">{study.title}</h2>
              <p className="mt-3 text-paper/65">{study.description || "A PrismWave Studio project case study."}</p>
              <Link to={study.to} className="mt-6 inline-block font-mono text-[11px] uppercase tracking-wide text-amber">
                {study.title === "Appointment Workflow" ? "Explore concept &rarr;" : "Read case study &rarr;"}
              </Link>
            </article>
          ))}
        </div>
        <div className="mt-12 rounded-2xl border border-amber/40 bg-amber/5 p-8 text-center">
          <p className="font-mono text-[11px] uppercase tracking-widest text-amber">Have a similar problem?</p>
          <h2 className="mt-3 font-display text-2xl font-semibold">Let&apos;s find the right next move for your site.</h2>
          <a href="/#audit-tool" className="mt-6 inline-flex rounded-full bg-amber px-6 py-3 font-display text-sm font-semibold text-ink">
            Run a free website audit &rarr;
          </a>
        </div>
        </section>
      </main>
      <footer data-ai="footer">
        <Footer />
      </footer>
    </div>
  );
}