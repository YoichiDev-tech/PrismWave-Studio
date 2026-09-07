import { Link } from "react-router";
import { ReceiptFrame } from "../../components/case-study/ReceiptFrame";

const metrics = [
  { label: "Admin saved weekly", value: "11 hrs" },
  { label: "Monthly savings", value: "$1,800+" },
  { label: "Waste reduction", value: "-30%" },
  { label: "Admin automated", value: "70%" },
  { label: "Manual scheduling", value: "0 min" },
];

const stack = [
  "React",
  "TypeScript",
  "Vite",
  "Tailwind CSS",
  "Supabase (Auth · Postgres · RLS)",
  "Vercel (serverless + Cron)",
  "Power Automate (scheduling engine)",
  "Resend (email delivery)",
];

export default function ServeSyncCaseStudy() {
  return (
    <article className="bg-ink text-paper cursor-default">

      {/* Header */}
      <header className="mx-auto max-w-3xl px-6 pb-10 pt-20 text-center">
        <Link to="/" className="font-mono text-[12px] uppercase tracking-wide text-paper/60 transition-colors hover:text-paper">
          &larr; Back to studio
        </Link>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-paper/60">
          Case Study — Hospitality / SaaS Automation
        </p>

        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          ServeSync
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-lg text-paper/80">
          ServeSync is a back-office automation platform for hospitality
          operators. It returns time, margin, and clarity to restaurants,
          cafés, and multi-location groups by automating the admin nobody
          has time for.
        </p>

        <StatusBadge />
      </header>

      {/* Hero Screenshot */}
      <section className="px-6 pb-20">
        <ReceiptFrame label="servesync.app">
          <div className="flex aspect-[16/10] items-center justify-center bg-[color:var(--color-steam,#EDE7DD)] font-mono text-xs opacity-50">
            <img
              src="/images/serve-sync/servesync.jpg"
              alt="ServeSync homepage screenshot"
              className="w-auto h-auto object-cover"
              loading="lazy"
            />
          </div>
        </ReceiptFrame>
      </section>

      {/* Problem */}
      <Section eyebrow="The problem" title="Hospitality runs on people, not paperwork">
        <p>
          Operators lose hours every week to repetitive admin: re-typing
          schedules, re-counting stockrooms, chasing invoices, and
          re-explaining closing checklists. None of it moves the business
          forward — and none of it is why anyone opened a restaurant.
        </p>
        <p>
          The result is predictable: spoiled stock, overtime that wasn't
          approved, and evenings spent on a laptop instead of at home.
          ServeSync eliminates that second unpaid job by automating the
          recurring tasks that quietly drain time and margin.
        </p>
      </Section>

      {/* Metrics */}
      <Section eyebrow="Impact" title="Weekly savings operators see">
        <dl className="grid grid-cols-2 gap-6 sm:grid-cols-3 font-mono text-sm">
          {metrics.map((m) => (
            <div key={m.label} className="space-y-1">
              <dt className="uppercase tracking-wide text-paper/60">{m.label}</dt>
              <dd className="font-display text-xl font-semibold">{m.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* Five Problems */}
      <Section eyebrow="What ServeSync fixes" title="Five problems. One platform.">
        <ul className="space-y-6">
          <li>
            <strong>Time —</strong> recurring tasks run automatically instead of
            by hand. Operators get back an average of <em>11 hours</em> per week.
          </li>
          <li>
            <strong>Money —</strong> overtime alerts, supplier invoice checks,
            and aligned ordering reduce leakage by <em>$1,800+ monthly</em>.
          </li>
          <li>
            <strong>Waste —</strong> spoilage is logged instantly and predicted
            before it happens, reducing waste by <em>30%</em>.
          </li>
          <li>
            <strong>Admin —</strong> compliance logs, temperature checks,
            invoices, and daily checklists run quietly in the background —
            <em>70% automated</em>.
          </li>
          <li>
            <strong>Shifts —</strong> staff submit availability; ServeSync builds
            the schedule automatically. <em>0 minutes</em> of manual typing.
          </li>
        </ul>
      </Section>

      {/* Built For */}
      <Section eyebrow="Who it's built for" title="Built for hospitality, not adapted to it">
        <ul className="space-y-3 opacity-90">
          <li>Family restaurants — one site, tight crew, no back office</li>
          <li>Full-service & QSR — higher volume, tighter margins</li>
          <li>Multi-location groups — consistency across every site</li>
          <li>Cafés & coffee shops — fast turns, thin staffing</li>
          <li>Shopping centers — shared services across tenants</li>
        </ul>
      </Section>

      {/* Stack */}
      <Section eyebrow="Stack" title="Built with">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-2 font-mono text-sm sm:grid-cols-3">
          {stack.map((tech) => (
            <li key={tech} className="opacity-80">
              · {tech}
            </li>
          ))}
        </ul>
      </Section>

      {/* Roadmap */}
      <Section eyebrow="Roadmap" title="What's next">
        <ol className="space-y-3 font-mono text-sm">
          <RoadmapItem status="next">Staff list & editing</RoadmapItem>
          <RoadmapItem status="next">Shift scheduling engine (Power Automate)</RoadmapItem>
          <RoadmapItem status="next">Waste forecasting & reorder alerts</RoadmapItem>
          <RoadmapItem status="later">Multi-location portfolio dashboard</RoadmapItem>
          <RoadmapItem status="later">Public launch</RoadmapItem>
        </ol>
      </Section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-6 pb-24 pt-12 text-center">
        <h2 className="font-display text-2xl font-semibold tracking-tight">See ServeSync in action</h2>
        <p className="mt-3 text-paper/80">
          Explore the live marketing site or reach out for a deeper technical
          walkthrough of the scheduling engine, compliance logs, or RLS schema.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://my-servesync.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-ink-line px-6 py-2 font-mono text-xs uppercase tracking-wide text-paper/70 transition-colors hover:border-amber hover:text-paper"
          >
            View live site
          </a>
          <a
            href="mailto:hello-prismwave-studio@example.com"
            className="rounded-full px-6 py-2 font-mono text-xs uppercase tracking-wide text-paper/70 underline underline-offset-4 transition-colors hover:text-amber"
          >
            Get in touch
          </a>
        </div>
      </section>
    </article>
  );
}

// Components
function StatusBadge() {
  return (
    <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-ink-line px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-paper/70">
      <span className="h-1.5 w-1.5 rounded-full bg-amber" />
      In active development · core product shipping module by module
    </div>
  );
}

function Section({
  eyebrow,
  title,
  children,
  className = "",
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`px-6 py-16 ${className}`}>
      <div className="mx-auto max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-paper/50">
          {eyebrow}
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
        <div className="mt-6 space-y-4 leading-relaxed text-paper/90">
          {children}
        </div>
      </div>
    </section>
  );
}

function RoadmapItem({
  status,
  children,
}: {
  status: "next" | "later";
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-center gap-3">
      <span
        className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wide ${
          status === "next" ? "opacity-100" : "opacity-50"
        }`}
      >
        {status}
      </span>
      <span className="opacity-90">{children}</span>
    </li>
  );
}