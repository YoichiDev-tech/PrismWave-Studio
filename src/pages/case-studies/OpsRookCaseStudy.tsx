import { ArrowRight, ArrowUpRight, Boxes, Clock3, Network } from "lucide-react";
import { Link } from "react-router-dom";
import AiMetadata, { AiIntent } from "../../components/AiMetadata";
import Footer from "../../components/Footer";
import SEO from "../../components/SEO";

const outcomes = [
  { value: "23 hours → 11 min", label: "Median lead response", detail: "Clearer qualification and ownership for every enquiry." },
  { value: "21 days → 6 days", label: "Pilot deployment cycle", detail: "Repeatable readiness checks and shared capacity visibility." },
  { value: "32% → 47%", label: "Pilot-to-paid conversion", detail: "Less friction between technical validation and follow-up." },
  { value: "$42k → $65k", label: "Monthly recurring revenue", detail: "A modeled outcome of more qualified pilots reaching production." },
];

const priorities = [
  { icon: Clock3, title: "Qualify demand earlier", body: "Route high-intent enquiries by technical fit, assign clear ownership, and make the next action visible before interest cools." },
  { icon: Boxes, title: "Shorten the path to production", body: "Bring workload requirements, deployment readiness, and accelerator capacity into one repeatable pilot workflow." },
  { icon: Network, title: "Connect commercial and technical teams", body: "Give both teams a shared view of opportunity status, capacity constraints, and the signals needed to move forward." },
];

const demoUrl = "https://northloop-git-design-unified-in-54e785-yoichidev-techs-projects.vercel.app";

export default function OpsRookCaseStudy() {
  return (
    <div className="min-h-screen bg-ink text-paper">
      <SEO title="OpsRook-VI — AI Infrastructure Case Study" description="How PrismWave Studio approached product positioning, lead qualification, and pilot-to-production friction for an AI infrastructure concept." path="/work/opsrook-vi/case-study" />
      <AiMetadata map={["OpsRook-VI case study", "Business bottlenecks", "Product strategy", "Modeled outcomes", "Live product demo"]} intent="Show how PrismWave Studio connects product design, workflow thinking, and business priorities in an AI infrastructure concept." tags={["case study", "AI infrastructure", "SaaS", "product strategy", "conversion workflow", "PrismWave Studio"]} extract={{ title: "OpsRook-VI case study", audience: "SaaS founders, technical teams, and growing businesses", primaryActions: "Explore the product demo or discuss a similar challenge" }} />
      <header className="border-b border-ink-line">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-6">
          <Link to="/case-studies" className="font-mono text-[11px] uppercase tracking-wide text-paper/60 hover:text-paper">← Case studies</Link>
          <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-amber px-4 py-2 font-display text-xs font-semibold text-ink">Explore live demo <ArrowUpRight className="h-4 w-4" /></a>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <section className="max-w-4xl" aria-labelledby="opsrook-title">
          <AiIntent id="opsrook-hero-intent">Introduce OpsRook-VI as an AI infrastructure product concept and explain the business problem behind its design.</AiIntent>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber">AI infrastructure · Product strategy · Workflow design</p>
          <h1 id="opsrook-title" className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight md:text-6xl">Turn technical capability into commercial momentum.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-paper/65">OpsRook-VI explores a familiar growth problem for technically strong SaaS teams: qualified demand arrives, but leads stall during qualification and promising pilots take too long to reach production.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-amber px-6 py-3 font-display text-sm font-semibold text-ink">Explore OpsRook-VI <ArrowUpRight className="h-4 w-4" /></a>
            <Link to="/#contact" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-ink-line px-6 py-3 font-display text-sm font-semibold text-paper hover:border-amber">Discuss a similar challenge <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <p className="mt-5 font-mono text-[10px] uppercase tracking-wide text-ink-soft">Collaboration with PrismWave Studio</p>
        </section>
        <section className="mt-16 rounded-2xl border border-ink-line bg-ink-2/60 p-6 sm:p-8" aria-labelledby="challenge-heading">
          <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-start">
            <div><p className="font-mono text-[11px] uppercase tracking-widest text-amber">The challenge</p><h2 id="challenge-heading" className="mt-3 font-display text-2xl font-semibold sm:text-3xl">Two handoffs were slowing growth.</h2></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-ink-line bg-ink p-5"><Clock3 className="h-5 w-5 text-amber" /><h3 className="mt-4 font-display text-lg font-semibold">High-intent leads went cold</h3><p className="mt-2 text-sm leading-relaxed text-paper/65">Qualification, technical fit, and follow-up ownership were disconnected, leaving buyers waiting and sales effort spread too thin.</p></div>
              <div className="rounded-xl border border-ink-line bg-ink p-5"><Boxes className="h-5 w-5 text-amber" /><h3 className="mt-4 font-display text-lg font-semibold">Pilots stalled before production</h3><p className="mt-2 text-sm leading-relaxed text-paper/65">Workload requirements, deployment readiness, and capacity visibility lived across separate workflows, extending time to value.</p></div>
            </div>
          </div>
        </section>
        <section className="mt-20" aria-labelledby="approach-heading">
          <div className="max-w-2xl"><p className="font-mono text-[11px] uppercase tracking-widest text-amber">The approach</p><h2 id="approach-heading" className="mt-3 font-display text-3xl font-semibold sm:text-4xl">Fix the system around the product.</h2><p className="mt-4 leading-relaxed text-paper/65">The experience connects positioning, qualification, pilot readiness, and capacity signals into one clear operating story — supported by a consistent product website and interactive control-plane interface.</p></div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">{priorities.map(({ icon: Icon, title, body }) => <article key={title} className="rounded-2xl border border-ink-line bg-ink-2/60 p-6"><div className="flex items-center justify-between"><span className="font-mono text-xs text-amber">PrismWave approach</span><Icon className="h-5 w-5 text-amber" /></div><h3 className="mt-5 font-display text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-relaxed text-paper/65">{body}</p></article>)}</div>
        </section>
        <section className="mt-20" aria-labelledby="outcomes-heading">
          <div className="max-w-2xl"><p className="font-mono text-[11px] uppercase tracking-widest text-amber">Modeled outcomes</p><h2 id="outcomes-heading" className="mt-3 font-display text-3xl font-semibold sm:text-4xl">Make improvement measurable.</h2><p className="mt-4 leading-relaxed text-paper/65">The product demo illustrates how reducing operational friction could affect response speed, pilot throughput, and commercial performance.</p></div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{outcomes.map((outcome) => <article key={outcome.label} className="rounded-xl border border-ink-line bg-ink-2/60 p-5"><p className="font-display text-2xl font-semibold tracking-tight text-paper">{outcome.value}</p><h3 className="mt-3 text-sm font-semibold">{outcome.label}</h3><p className="mt-2 text-xs leading-relaxed text-ink-soft">{outcome.detail}</p></article>)}</div>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-wide text-ink-soft">These figures are illustrative model outputs for this concept, not measured client results.</p>
        </section>
        <section className="mt-20 grid gap-8 rounded-2xl border border-amber/30 bg-amber/5 p-7 sm:p-10 md:grid-cols-[1fr_auto] md:items-center">
          <div><p className="font-mono text-[11px] uppercase tracking-widest text-amber">The result</p><h2 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">A clearer path from first contact to production.</h2><p className="mt-4 max-w-2xl leading-relaxed text-paper/65">OpsRook-VI brings a complex technical offer into a more coherent product experience — with clear business priorities, connected workflows, and an interface built to make operational signals easier to act on.</p></div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col"><a href={demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-amber px-5 py-3 font-display text-sm font-semibold text-ink">View live demo <ArrowUpRight className="h-4 w-4" /></a><Link to="/#contact" className="inline-flex min-h-11 items-center justify-center rounded-full border border-ink-line px-5 py-3 font-display text-sm font-semibold text-paper hover:border-amber">Work with PrismWave</Link></div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
