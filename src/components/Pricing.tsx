import { useMemo, useState } from "react";
import type { Intent } from "../pages/Home";
import Reveal from "./Reveal";
import Section from "./Section";
import { ADDONS, PLANS, formatWeeks } from "../data/offers";
import { CALENDLY_URL } from "../config/site";
import { trackAction } from "../lib/track";

interface PricingProps {
  onRequestScope: (summary: string, intent: Intent) => void;
}

// Pricing + scope estimator in ONE section (they used to be two, with
// different numbers). Pick a plan, toggle add-ons, see the estimate, send it
// pre-filled into the contact form
export default function Pricing({ onRequestScope }: PricingProps) {
  const [planId, setPlanId] = useState<string>(PLANS[0].id);
  const [addonIds, setAddonIds] = useState<Set<string>>(new Set());

  const plan = PLANS.find((p) => p.id === planId) ?? PLANS[0];
  const selectedAddons = useMemo(() => ADDONS.filter((a) => addonIds.has(a.id)), [addonIds]);

  const { minPrice, maxPrice, totalWeeks } = useMemo(() => {
    const base = plan.price + selectedAddons.reduce((sum, a) => sum + a.price, 0);
    return {
      minPrice: base,
      maxPrice: Math.round(base * 1.25),
      totalWeeks: plan.weeks + selectedAddons.reduce((sum, a) => sum + a.weeks, 0),
    };
  }, [plan, selectedAddons]);

  const toggleAddon = (id: string) => {
    setAddonIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleRequestScope = () => {
    const addonLines = selectedAddons.length ? `\nAdd-ons:\n${selectedAddons.map((a) => `- ${a.label}`).join("\n")}` : "";
    const summary = [
      `I'm interested in a fixed-scope project:`,
      `Core scope: ${plan.label} (est. $${minPrice.toLocaleString()}-$${maxPrice.toLocaleString()}, ~${formatWeeks(totalWeeks)}).${addonLines}`,
      "",
      "Tell me more about timeline and next steps.",
    ].join("\n");

    trackAction("cta_click", {
      intent: plan.intent,
      metadata: { label: "Get this scoped", location: "pricing", plan: plan.id, estimateMin: minPrice },
    });
    onRequestScope(summary, plan.intent);
  };

  return (
    <Section
      id="pricing"
      ai="pricing"
      intent="Present fixed-scope pricing, let visitors build an estimate, and turn it into a project inquiry."
      labelledBy="pricing-title"
      className="grain relative overflow-hidden bg-ink py-16 md:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[720px] -translate-x-1/2 transform-gpu rounded-full opacity-20 blur-[130px] will-change-transform"
        style={{ background: "radial-gradient(circle, #6C63FF 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">Transparent &amp; fixed-scope</p>
          <h2 id="pricing-title" className="mt-3 font-display text-3xl font-semibold tracking-tight text-paper md:text-4xl">
            Pick a starting point. See the number instantly.
          </h2>
          <p className="mt-4 text-ink-soft">No vague proposals, no hidden fees — every project is scoped upfront.</p>
        </Reveal>

        <Reveal delay={1} className="mt-10">
          <div role="radiogroup" aria-label="Choose a plan" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PLANS.map((p) => {
              const active = p.id === planId;
              return (
                <button
                  key={p.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setPlanId(p.id)}
                  className={`flex flex-col rounded-2xl border p-5 text-left transition-colors ${
                    active ? "border-amber bg-amber/10" : "border-ink-line bg-ink-2/60 hover:border-amber hover:bg-ink-2"
                  }`}
                >
                  <span className="flex items-start justify-between gap-2">
                    <span className="font-display text-base font-semibold text-paper">{p.label}</span>
                    <span
                      aria-hidden="true"
                      className={`mt-1 flex h-4 w-4 flex-none items-center justify-center rounded-full border ${
                        active ? "border-amber bg-amber" : "border-ink-soft"
                      }`}
                    >
                      {active && <span className="h-1.5 w-1.5 rounded-full bg-ink" />}
                    </span>
                  </span>
                  <span className="mt-1 font-mono text-[13px] text-ink-soft">
                    From <span className="font-semibold text-paper">${p.price.toLocaleString()}</span> · ~{formatWeeks(p.weeks)}
                  </span>
                  <span className="mt-3 text-sm text-paper/80">{p.blurb}</span>
                  <ul className="mt-3 space-y-1.5 text-[13px] text-ink-soft">
                    {p.includes.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span aria-hidden="true" className="text-amber">
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="mr-1 font-mono text-[11px] uppercase tracking-wide text-ink-soft">Add-ons</span>
            {ADDONS.map((addon) => {
              const checked = addonIds.has(addon.id);
              return (
                <button
                  key={addon.id}
                  type="button"
                  aria-pressed={checked}
                  onClick={() => toggleAddon(addon.id)}
                  className={`min-h-11 rounded-full border px-4 text-[13px] transition-colors ${
                    checked ? "border-amber bg-amber/10 text-paper" : "border-ink-line text-ink-soft hover:border-amber hover:text-paper"
                  }`}
                >
                  {checked ? "✓ " : "+ "}
                  {addon.label} <span className="font-mono text-[12px] opacity-80">${addon.price.toLocaleString()}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={2} className="mt-8">
          <div className="flex flex-col items-center gap-6 rounded-2xl border border-ink-line bg-ink-2 p-6 text-center md:flex-row md:justify-between md:p-8 md:text-left">
            <div aria-live="polite">
              <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">Estimated investment</p>
              <p className="mt-1 font-display text-4xl font-semibold text-paper">
                ${minPrice.toLocaleString()}–${maxPrice.toLocaleString()}
              </p>
              <p className="mt-1 font-mono text-[13px] text-ink-soft">~{formatWeeks(totalWeeks)} turnaround</p>
            </div>

            <div className="flex w-full flex-col items-center gap-3 md:w-auto md:items-end">
              <button
                type="button"
                onClick={handleRequestScope}
                className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-8 font-display text-sm font-semibold text-ink transition-transform hover:scale-[1.03] md:w-auto"
                style={{ background: "linear-gradient(100deg, #FFB84D 0%, #FF7A59 100%)" }}
              >
                Get this scoped
                <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </button>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackAction("cta_click", { metadata: { label: "Book a free 15-min call", location: "pricing" } })}
                className="font-mono text-[12px] uppercase tracking-wide text-ink-soft underline underline-offset-4 transition-colors hover:text-paper"
              >
                Not sure? Book a free 15-min call
              </a>
            </div>
          </div>

          <p className="mx-auto mt-4 max-w-3xl text-center font-mono text-[11px] leading-relaxed text-ink-soft">
            {plan.excludes} The estimate is directional — scope is confirmed together before any work starts. 50% deposit to start, 50% on delivery.
            Prices in USD unless agreed otherwise. No retainers, no surprise add-ons, no locked-in platform.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}