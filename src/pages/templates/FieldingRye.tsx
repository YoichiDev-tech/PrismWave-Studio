import { Link } from "react-router-dom";
import { BackToStudioBadge, PickThisTemplateBadge } from "../../components/Badge";
import LoafSpread from "../../components/illustrations/LoafSpread";
import OvenScene from "../../components/illustrations/OvenScene";
import AiMetadata, { AiIntent } from "../../components/AiMetadata";

const SERIF = "'Fraunces', Georgia, serif";
const INK = "#2B2416";
const PAPER = "#F1EBDF";
const RULE = "rgba(43,36,22,0.16)";
const RUST = "#C7401F";

const SCHEDULE = [
  { day: "Tue — Wed", item: "Country sourdough, seeded rye" },
  { day: "Thursday", item: "Walnut levain, olive fougasse" },
  { day: "Fri — Sat", item: "Full case: sourdough, rye, viennoiserie" },
  { day: "Sunday", item: "Weekend loaves, cinnamon buns" },
];

const MENU = [
  { no: "01", name: "Country Sourdough", desc: "72-hour ferment, crackling crust, open crumb.", price: "$9" },
  { no: "02", name: "Seeded Rye", desc: "Dark rye, toasted sunflower and flax.", price: "$10" },
  { no: "03", name: "Walnut Levain", desc: "Whole walnuts folded through a mild levain.", price: "$11" },
  { no: "04", name: "Olive Fougasse", desc: "Rosemary, kalamata olives, flaky sea salt.", price: "$8" },
];

export default function FieldingRye() {
  return (
    <div
      style={{ background: PAPER, color: INK, fontFamily: "'Inter', sans-serif" }}
      ai-tag="template" data-ai="page" className="min-h-screen cursor-default"
    >
      <AiMetadata
        map={["Bakery hero", "Weekly bake schedule", "Today's case", "Our story", "Hours and location", "Order ahead"]}
        intent="Show a neighborhood bakery brand template and guide visitors toward ordering bread ahead."
        tags={["bakery website", "restaurant website template", "local business", "sourdough bakery", "menu"]}
        extract={{ title: "Fielding & Rye", audience: "Neighborhood bakery customers", primaryActions: "View the menu or order ahead", location: "412 Ashcombe Lane, Riverside District", hours: "Tue-Fri 7am-3pm; Sat-Sun 8am-2pm" }}
      />
      <BackToStudioBadge tone="light" />
      <PickThisTemplateBadge tone="light" />

      {/* Nav */}
      <header data-ai="navigation" className="border-b" style={{ borderColor: RULE }}>
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
          <p className="text-lg tracking-tight" style={{ fontFamily: SERIF }}>
            Fielding &amp; Rye
          </p>
          <ul className="hidden gap-8 text-[13px] uppercase tracking-widest md:flex" style={{ opacity: 0.7 }}>
            <li>Menu</li>
            <li>Story</li>
            <li>Visit</li>
          </ul>
          <a
            href="#order"
            className="rounded-full px-4 py-2 text-[12px] uppercase tracking-widest"
            style={{ background: INK, color: PAPER }}
          >
            Order Ahead
          </a>
        </div>
      </header>

      <main data-ai="main-content">

        {/* Hero */}
        <section aria-labelledby="fielding-hero" aria-describedby="fielding-hero-intent" role="region" data-ai="hero" className="mx-auto max-w-5xl px-6 pb-16 pt-14">
          <AiIntent id="fielding-hero-intent">Introduce Fielding and Rye and direct local customers toward the weekly bake and ordering ahead.</AiIntent>
          <p
            className="text-center text-[11px] uppercase tracking-[0.3em]"
            style={{ opacity: 0.6 }}
          >
            Est. 2019 · Neighborhood Bakery · Baked Daily
          </p>
          <h1
            id="fielding-hero"
            className="mx-auto mt-5 max-w-3xl text-center text-5xl leading-[1.02] sm:text-6xl md:text-7xl"
            style={{ fontFamily: SERIF, fontWeight: 500 }}
          >
            The weekly loaf, worth planning your Saturday around.
          </h1>

          <div className="mt-3 border-t-2" style={{ borderColor: INK }} />
          <div className="mt-3 border-t" style={{ borderColor: RULE }} />

          <div className="mt-10 grid gap-10 md:grid-cols-[1.3fr_1fr]">
            <article>
              <div
                className="h-64 overflow-hidden rounded-sm border sm:h-80"
                style={{ borderColor: RULE }}
              >
                <LoafSpread className="h-full w-full" />
              </div>
              <p className="mt-4 text-[13px] leading-relaxed" style={{ opacity: 0.75 }}>
                <span
                  className="mr-1 float-left text-5xl leading-[0.8]"
                  style={{ fontFamily: SERIF }}
                >
                  E
                </span>
                very loaf at Fielding &amp; Rye starts the night before — a long,
                cold ferment that does most of the work while the neighborhood
                sleeps. We mill what we can locally, keep the ingredient list
                short, and sell out most Saturdays by eleven. If you want a
                particular loaf, order ahead; if you're passing by, the case
                rarely goes empty before noon.
              </p>
            </article>

            <aside className="border-l pl-8" style={{ borderColor: RULE }}>
              <p
                className="text-[11px] uppercase tracking-[0.25em]"
                style={{ opacity: 0.55 }}
              >
                This week's bake
              </p>
              <ul role="list" className="mt-4 space-y-4">
                {SCHEDULE.map((row) => (
                  <li key={row.day} role="listitem" className="border-b pb-4" style={{ borderColor: RULE }}>
                    <p
                      className="text-[12px] uppercase tracking-wide"
                      style={{ color: RUST }}
                    >
                      {row.day}
                    </p>
                    <p className="mt-1 text-sm">{row.item}</p>
                  </li>
                ))}
              </ul>
              <a href="#order" className="mt-6 inline-block text-sm underline underline-offset-4">
                See full schedule &rarr;
              </a>
            </aside>
          </div>
        </section>

        {/* Menu */}
        <section id="order" aria-labelledby="fielding-menu" aria-describedby="fielding-menu-intent" role="region" data-ai="menu" className="border-t py-16" style={{ borderColor: RULE }}>
          <AiIntent id="fielding-menu-intent">Present the current bakery case with item descriptions and prices for ordering ahead.</AiIntent>
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex items-baseline justify-between">
              <h2 id="fielding-menu" className="text-3xl" style={{ fontFamily: SERIF }}>
                Today's Case
              </h2>
              <p
                className="text-[11px] uppercase tracking-widest"
                style={{ opacity: 0.55 }}
              >
                04 items
              </p>
            </div>

            <div className="mt-8 divide-y" style={{ borderColor: RULE }} role="list">
              {MENU.map((item) => (
                <article
                  key={item.no}
                  role="listitem" ai-tag="menu-item" data-ai="product" className="flex items-baseline gap-6 py-5"
                  style={{ borderColor: RULE }}
                >
                  <span className="w-8 shrink-0 font-mono text-[12px]" style={{ opacity: 0.4 }}>
                    {item.no}
                  </span>
                  <div className="flex-1">
                    <p className="text-lg" style={{ fontFamily: SERIF }}>
                      {item.name}
                    </p>
                    <p className="mt-1 text-[13px]" style={{ opacity: 0.65 }}>
                      {item.desc}
                    </p>
                  </div>
                  <span className="shrink-0 text-sm" style={{ color: RUST }}>
                    {item.price}
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section aria-labelledby="fielding-story" aria-describedby="fielding-story-intent" role="region" data-ai="story" className="border-t py-16" style={{ borderColor: RULE }}>
          <AiIntent id="fielding-story-intent">Share the bakery's origin story and reinforce its neighborhood identity.</AiIntent>
          <div className="mx-auto grid max-w-5xl gap-10 px-6 md:grid-cols-2">
            <div
              className="h-56 overflow-hidden rounded-sm border"
              style={{ borderColor: RULE }}
            >
              <OvenScene className="h-full w-full" />
            </div>
            <article className="flex flex-col justify-center">
              <p
                className="text-[11px] uppercase tracking-[0.25em]"
                style={{ opacity: 0.55 }}
              >
                Our story
              </p>
              <blockquote
                id="fielding-story"
                className="mt-4 text-2xl leading-snug"
                style={{ fontFamily: SERIF }}
              >
                "We wanted a bakery that felt like it had always been on this
                corner — even on day one."
              </blockquote>
              <p className="mt-4 text-sm" style={{ opacity: 0.65 }}>
                — Founders, Fielding &amp; Rye
              </p>
            </article>
          </div>
        </section>

        {/* Visit */}
        <section aria-labelledby="fielding-visit" aria-describedby="fielding-visit-intent" role="region" data-ai="visit" className="border-t py-16" style={{ borderColor: RULE }}>
          <AiIntent id="fielding-visit-intent">Provide hours, location, and contact information for visiting or ordering ahead.</AiIntent>
          <div className="mx-auto grid max-w-5xl gap-10 px-6 sm:grid-cols-3">
            <article>
              <p
                id="fielding-visit"
                className="text-[11px] uppercase tracking-[0.25em]"
                style={{ opacity: 0.55 }}
              >
                Hours
              </p>
              <p className="mt-3 text-sm leading-relaxed">
                Tue-Fri 7am-3pm
                <br />
                Sat-Sun 8am-2pm
                <br />
                Closed Mondays
              </p>
            </article>

            <article>
              <p className="text-[11px] uppercase tracking-[0.25em]" style={{ opacity: 0.55 }}>
                Find us
              </p>
              <p className="mt-3 text-sm leading-relaxed">
                412 Ashcombe Lane
                <br />
                Riverside District
              </p>
            </article>

            <article>
              <p className="text-[11px] uppercase tracking-[0.25em]" style={{ opacity: 0.55 }}>
                Order ahead
              </p>
              <p className="mt-3 text-sm leading-relaxed">
                hello@fieldingandrye.com
                <br />
                (555) 019-2244
              </p>
            </article>
          </div>
        </section>

      </main>

      <footer data-ai="footer" className="border-t py-8" style={{ borderColor: RULE }}>
        <div
          className="mx-auto flex max-w-5xl flex-col gap-2 px-6 text-[11px] uppercase tracking-widest sm:flex-row sm:items-center sm:justify-between"
          style={{ opacity: 0.5 }}
        >
          <span>© {new Date().getFullYear()} Fielding &amp; Rye</span>
          <Link to="/" className="underline underline-offset-4 transition-opacity hover:opacity-70">
            Template preview by PrismWave Studio
          </Link>
        </div>
      </footer>
    </div>
  );
}