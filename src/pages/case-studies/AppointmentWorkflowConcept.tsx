import { useState } from "react";
import { Link } from "react-router-dom";
import AiMetadata, { AiIntent } from "../../components/AiMetadata";
import Footer from "../../components/Footer";
import SEO from "../../components/SEO";

const metrics = [
  { value: "+45%", label: "Illustrative booking conversion target" },
  { value: "-60%", label: "Illustrative no-show reduction target" },
  { value: "10+ hrs", label: "Illustrative weekly admin saving" },
  { value: "99/100", label: "Illustrative Lighthouse target" },
];

function WorkflowPreview() {
  const [view, setView] = useState<"before" | "after">("after");

  return (
    <div className="rounded-2xl border border-ink-line bg-ink-2/60 p-5 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">Interactive workflow preview</p>
          <p className="mt-2 text-sm text-paper/70">See how the experience moves from friction to one clear booking action.</p>
        </div>
        <div className="flex rounded-lg border border-ink-line p-1" role="tablist" aria-label="Workflow state">
          {(["before", "after"] as const).map((option) => (
            <button
              key={option}
              type="button"
              role="tab"
              aria-selected={view === option}
              onClick={() => setView(option)}
              className={`min-h-11 rounded-md px-4 font-mono text-[11px] uppercase tracking-wide transition-colors ${view === option ? "bg-amber text-ink" : "text-ink-soft hover:text-paper"}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-xl border border-ink-line bg-ink p-5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">{view === "before" ? "Fragmented path" : "Focused path"}</p>
          <div className="mt-6 space-y-3 text-sm">
            {(view === "before"
              ? ["Find a phone number", "Send an email", "Wait for a reply", "Manually confirm" ]
              : ["Choose a service", "Pick a live slot", "Receive confirmation", "Get a reminder" ]
            ).map((step, index) => (
              <div key={step} className="flex items-center gap-3 rounded-lg border border-ink-line px-3 py-3 text-paper/80">
                <span className="font-mono text-[10px] text-amber">0{index + 1}</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-ink-line bg-ink p-5">
          <div className="flex items-center justify-between border-b border-ink-line pb-4">
            <span className="font-display font-semibold">Appointment dashboard</span>
            <span className="rounded-full bg-amber/15 px-3 py-1 font-mono text-[10px] uppercase text-amber">{view === "after" ? "Synced" : "Manual"}</span>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-ink-2 p-4"><p className="font-mono text-[10px] text-ink-soft">Next opening</p><p className="mt-2 font-display text-xl">Today, 4:30</p></div>
            <div className="rounded-lg bg-ink-2 p-4"><p className="font-mono text-[10px] text-ink-soft">Reminders</p><p className="mt-2 font-display text-xl">{view === "after" ? "On" : "Off"}</p></div>
          </div>
          <button type="button" className="mt-4 min-h-11 w-full rounded-full bg-amber px-5 py-3 font-display text-sm font-semibold text-ink">{view === "after" ? "Book an appointment" : "Contact the business"}</button>
        </div>
      </div>
    </div>
  );
}

export default function AppointmentWorkflowConcept() {
  return (
    <div className="min-h-screen bg-ink text-paper">
      <SEO
        title="Modernizing Appointment Workflows — Concept"
        description="A clearly labeled concept for reducing booking friction and no-shows for appointment-based businesses, illustrative rather than a measured client result."
        path="/work/appointment-workflows/concept"
      />
      <AiMetadata
        map={["Concept case study", "Client challenge", "Engineering strategy", "Illustrative targets", "Workflow preview"]}
        intent="Show how PrismWave could modernize appointment workflows for a local service business, clearly labeled as a concept rather than a client result."
        tags={["concept case study", "appointment workflow", "website redesign", "React", "Supabase"]}
        extract={{ title: "Modernizing Appointment Workflows", audience: "Appointment-based small businesses", primaryActions: "Review the workflow concept or run a free audit" }}
      />
      <header className="border-b border-ink-line">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <Link to="/case-studies" className="font-mono text-[12px] uppercase tracking-wide text-paper/60 hover:text-paper">&larr; Case studies</Link>
          <Link to="/#audit-tool" className="rounded-full bg-amber px-4 py-2.5 font-display text-xs font-semibold text-ink">Run a free audit</Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <section className="max-w-4xl">
          <p className="font-mono text-[11px] uppercase tracking-widest text-amber">Concept / illustrative workflow</p>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight md:text-6xl">Modernizing appointment workflows and eliminating administrative friction.</h1>
          <AiIntent id="appointment-concept-intent">Present a clearly labeled concept showing how PrismWave could improve appointment booking, reminders, and operations.</AiIntent>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/65">A concept for a local service provider whose booking experience is costing time, creating no-shows, and making it harder for customers to take the next step.</p>
        </section>

        <section className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Illustrative targets">
          {metrics.map((metric) => <div key={metric.value} className="rounded-xl border border-ink-line bg-ink-2/60 p-5"><p className="font-display text-3xl font-semibold text-paper">{metric.value}</p><p className="mt-3 text-sm leading-relaxed text-ink-soft">{metric.label}</p></div>)}
        </section>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-wide text-ink-soft">These are planning targets for this concept, not measured client results.</p>

        <section className="mt-20 grid gap-12 md:grid-cols-2">
          <div><p className="font-mono text-[11px] uppercase tracking-widest text-amber">01 / The challenge</p><h2 className="mt-4 font-display text-3xl font-semibold">The business is losing time between interest and confirmed appointments.</h2><p className="mt-5 leading-relaxed text-ink-soft">Manual follow-ups, fragmented scheduling tools, poor mobile flows, and slow pages create friction for both the customer and the team managing the calendar.</p></div>
          <div><p className="font-mono text-[11px] uppercase tracking-widest text-amber">02 / The strategy</p><h2 className="mt-4 font-display text-3xl font-semibold">Make the next action obvious, then automate the handoff.</h2><p className="mt-5 leading-relaxed text-ink-soft">The proposed experience combines a fast mobile-first interface, clear service selection, real-time availability, booking confirmation, and reminder automation.</p></div>
        </section>

        <section className="mt-20"><WorkflowPreview /></section>

        <section className="mt-20 grid gap-12 md:grid-cols-[1.2fr_0.8fr]">
          <div><p className="font-mono text-[11px] uppercase tracking-widest text-amber">03 / Engineering and design</p><h2 className="mt-4 font-display text-3xl font-semibold">A small operational system, designed like a calm customer experience.</h2><p className="mt-5 leading-relaxed text-ink-soft">React and TypeScript support a responsive interface, Tailwind CSS keeps the visual system consistent, and Supabase can support availability, booking records, and secure operational data. Reminder delivery and calendar synchronization would be scoped around the provider&apos;s existing tools.</p></div>
          <div className="flex flex-wrap content-start gap-2"><span className="rounded-full border border-ink-line px-4 py-2 font-mono text-xs text-paper/70">React</span><span className="rounded-full border border-ink-line px-4 py-2 font-mono text-xs text-paper/70">TypeScript</span><span className="rounded-full border border-ink-line px-4 py-2 font-mono text-xs text-paper/70">Tailwind CSS</span><span className="rounded-full border border-ink-line px-4 py-2 font-mono text-xs text-paper/70">Supabase</span></div>
        </section>

        <section className="mt-20 rounded-2xl border border-amber/30 bg-amber/5 p-8 text-center md:p-12"><p className="font-mono text-[11px] uppercase tracking-widest text-amber">No fabricated testimonial</p><h2 className="mt-4 font-display text-3xl font-semibold">This is a concept, ready to become a measured project.</h2><p className="mx-auto mt-4 max-w-xl text-paper/65">There is no client quote or achieved result attached to this concept yet. The next step is to test the workflow against a real business and measure what changes.</p><Link to="/#contact" className="mt-7 inline-flex rounded-full bg-amber px-7 py-3.5 font-display text-sm font-semibold text-ink">Discuss a similar problem &rarr;</Link></section>
      </main>
      <Footer />
    </div>
  );
}