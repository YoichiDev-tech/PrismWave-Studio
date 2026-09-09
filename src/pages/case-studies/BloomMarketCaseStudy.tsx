import { Link } from "react-router-dom";
import BrowserChrome from "../../components/Badge";
import BloomMock from "../../components/portfolioMocks/BloomMock";
import Footer from "../../components/Footer";
import Reveal from "../../components/Reveal";
import AiMetadata from "../../components/AiMetadata";

const ROUND = "'Fredoka', 'Sora', sans-serif";
const CREAM = "#FFF3E8";
const PLUM = "#3A1220";
const PINK = "#FF6FA8";
const YELLOW = "#FFD23F";
const MINT = "#8FD3C0";

const PALETTE = [
  { name: "Cream", hex: CREAM, use: "Base background" },
  { name: "Plum", hex: PLUM, use: "Text & primary buttons" },
  { name: "Pink", hex: PINK, use: "Accent shapes & CTAs" },
  { name: "Yellow", hex: YELLOW, use: "Highlights & tags" },
  { name: "Mint", hex: MINT, use: "Secondary accent" },
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
      aria-label="Typography specimen"
    >
      <div className="space-y-5 p-8" style={{ background: CREAM, color: PLUM }}>
        <p className="text-4xl font-bold leading-none" style={{ fontFamily: ROUND }}>
          Fresh blooms, weekly.
        </p>
        <p className="text-lg font-semibold" style={{ fontFamily: ROUND }}>
          This week's favorites
        </p>
        <p
          className="max-w-md text-sm"
          style={{ opacity: 0.75, fontFamily: "'Inter', sans-serif" }}
        >
          Hand-tied bouquets and easy-care plants, dropped off on your porch
          every week — set in Fredoka for headlines and Inter for body copy.
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
            Nav
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
        Asymmetrical grid, rounded organic shapes, generous whitespace
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
        { label: "Sunday Bouquet", price: "$38", bg: PINK },
        { label: "Citrus & Herb Jar", price: "$22", bg: YELLOW },
        { label: "Dried Bloom Bundle", price: "$28", bg: MINT },
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
        Hover a card — gentle lift and scale, no motion overload
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
            New drop every Friday
          </p>
          <h3
            className="mt-5 max-w-sm text-3xl font-bold leading-[0.98] sm:text-4xl"
            style={{ fontFamily: ROUND }}
          >
            Fresh blooms, no green thumb required.
          </h3>
          <p className="mt-4 max-w-xs text-sm" style={{ opacity: 0.75 }}>
            Hand-tied bouquets and easy-care plants, dropped off on your
            porch every week.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span
              className="rounded-full px-5 py-2.5 text-xs font-bold"
              style={{ background: PINK, color: PLUM, fontFamily: ROUND }}
            >
              Shop the drop
            </span>
            <span
              className="rounded-full border-2 px-5 py-2.5 text-xs font-bold"
              style={{ borderColor: PLUM, fontFamily: ROUND }}
            >
              Start a subscription
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
          View the real hero &rarr;
        </Link>
      </div>
    </div>
  );
}

export default function BloomMarketCaseStudy() {
  return (
    <div className="bg-ink cursor-default">
      <AiMetadata
        map={["Case study hero", "Final product preview", "Project overview", "Color palette", "Typography", "Layout system", "Interaction design", "Final call to action"]}
        intent="Explain the design decisions behind the Bloom Market ecommerce template and show how the visual system supports flower subscriptions."
        tags={["case study", "ecommerce design", "flower brand", "visual identity", "Bloom Market"]}
        extract={{ title: "Bloom Market case study", audience: "Retail founders and design teams", primaryActions: "Review the design system and view the live template", outcome: "A bright storefront concept for weekly flower delivery" }}
      />
      <header className="border-b border-ink-line">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-6">
          <Link
            to="/"
            className="font-mono text-[12px] uppercase tracking-wide text-paper/60 transition-colors hover:text-paper"
          >
            &larr; Back to studio
          </Link>
          <Link
            to="/work/bloom-market"
            className="rounded-full border border-ink-line px-4 py-2 font-mono text-[11px] uppercase tracking-wide text-paper/70 transition-colors hover:border-amber hover:text-paper"
          >
            View live template
          </Link>
        </div>
      </header>

      <main role="main">

        <article
          aria-labelledby="case-study-hero"
          className="text-paper py-20 md:py-28"
        >
          <div className="mx-auto max-w-4xl px-6">

            {/* Hero */}
            <section aria-labelledby="case-study-hero">
              <Reveal>
                <p className="font-mono text-[12px] uppercase tracking-widest text-paper/50">
                  Case Study
                </p>
                <h1
                  id="case-study-hero"
                  className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl"
                >
                  Bloom Market
                </h1>
                <p className="mt-6 max-w-2xl text-paper/70 leading-relaxed">
                  A deeper look at how the Bloom Market landing page was designed —
                  exploring palette, type, layout, and the playful visual language
                  behind the final template.
                </p>
                <LiveHeroPreview />
              </Reveal>
            </section>

            {/* Final Mock */}
            <section aria-labelledby="case-study-final-mock">
              <Reveal delay={1} className="mt-12">
                <BrowserChrome bg="#FFE8D6">
                  <BloomMock />
                </BrowserChrome>
              </Reveal>
            </section>

            {/* Overview */}
            <section aria-labelledby="case-study-overview">
              <Reveal delay={1} className="mt-20">
                <SectionHeading eyebrow="01 — Brief" title="Overview" />
                <p className="mt-4 max-w-2xl text-paper/70 leading-relaxed">
                  Bloom Market is a boutique flower and gift shop with a
                  maximalist, expressive identity. The goal was to create a
                  landing page that feels alive — oversized type, organic shapes,
                  and a palette built around warmth and celebration.
                </p>
              </Reveal>
            </section>

            {/* Palette */}
            <section aria-labelledby="case-study-palette">
              <Reveal delay={2} className="mt-16">
                <SectionHeading eyebrow="02 — Palette" title="Color Palette" />
                <p className="mt-4 max-w-2xl text-paper/70 leading-relaxed">
                  The palette mixes soft peach tones with deep berry accents. This
                  creates a balance between approachability and richness — perfect
                  for a boutique brand.
                </p>
                <PaletteSwatches />
              </Reveal>
            </section>

            {/* Typography */}
            <section aria-labelledby="case-study-type">
              <Reveal delay={1} className="mt-16">
                <SectionHeading eyebrow="03 — Type" title="Typography" />
                <p className="mt-4 max-w-2xl text-paper/70 leading-relaxed">
                  The type system uses a bold, rounded display font for headlines
                  and a clean sans-serif for supporting text. This contrast
                  reinforces the playful personality of the brand while keeping
                  the content readable.
                </p>
                <TypeSpecimen />
              </Reveal>
            </section>

            {/* Layout */}
            <section aria-labelledby="case-study-layout">
              <Reveal delay={2} className="mt-16">
                <SectionHeading eyebrow="04 — Composition" title="Layout & Composition" />
                <p className="mt-4 max-w-2xl text-paper/70 leading-relaxed">
                  The layout uses large spacing, asymmetrical blocks, and curved
                  shapes to create a sense of movement. Each section feels like a
                  "moment" rather than a rigid grid.
                </p>
                <LayoutDiagram />
              </Reveal>
            </section>

            {/* Interaction */}
            <section aria-labelledby="case-study-interaction">
              <Reveal delay={1} className="mt-16">
                <SectionHeading eyebrow="05 — Motion" title="Interaction & Motion" />
                <p className="mt-4 max-w-2xl text-paper/70 leading-relaxed">
                  Hover effects are subtle but expressive — gentle scaling and
                  soft shadows that bring the interface to life without
                  overwhelming the user. These micro-interactions reinforce the
                  playful personality of the brand.
                </p>
                <InteractionDemo />
              </Reveal>
            </section>

            {/* Closing CTA */}
            <section aria-labelledby="case-study-cta">
              <Reveal
                delay={2}
                className="mt-24 rounded-3xl border border-ink-line bg-ink-2/60 px-8 py-12 text-center"
              >
                <h3
                  id="case-study-cta"
                  className="font-display text-2xl font-semibold text-paper md:text-3xl"
                >
                  Want something built with this much care?
                </h3>
                <p className="mx-auto mt-3 max-w-md text-paper/60">
                  Whether you're starting from an idea or fixing what's already
                  there, we'll bring the same attention to detail to your project.
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
                    Start a project
                    <span className="transition-transform group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </Link>
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-line px-7 py-3.5 font-display text-sm font-semibold text-paper transition-colors hover:border-amber hover:text-amber"
                  >
                    See more work
                  </Link>
                </div>
              </Reveal>
            </section>

          </div>
        </article>

      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}