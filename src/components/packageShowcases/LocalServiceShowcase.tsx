import { AiIntent } from "../AiMetadata";

const INK = "#161311";
const PAPER = "#EDE6DA";
const GOLD = "#C9A227";
const RUST = "#8C3B2E";
const LINE = "rgba(237,230,218,0.14)";
const DISPLAY = "'Archivo Black', 'Arial Black', sans-serif";
const BODY = "'Inter', ui-sans-serif, sans-serif";

const SERVICES = [
  { group: "Cuts", items: [
    { name: "Classic Cut", price: "€25" },
    { name: "Skin Fade", price: "€30" },
    { name: "Kids Cut (12 & under)", price: "€18" },
  ]},
  { group: "Beard & Finish", items: [
    { name: "Beard Trim", price: "€15" },
    { name: "Hot Towel Shave", price: "€22" },
    { name: "Cut + Beard", price: "€35" },
  ]},
];

const REVIEWS = [
  { quote: "Been going every three weeks for a year. Never once had to explain what I wanted twice.", name: "Marco D." },
  { quote: "Walked in for a trim, left looking like I had somewhere important to be.", name: "Luca R." },
  { quote: "The only barbershop in the area that actually runs on time.", name: "Sofia V." },
];

const HOURS = [
  { day: "Tue — Fri", time: "10:00 – 19:00" },
  { day: "Saturday", time: "09:00 – 17:00" },
  { day: "Sun — Mon", time: "Closed" },
];

export default function LocalServiceShowcase() {
  return (
    <div style={{ background: INK, color: PAPER, fontFamily: BODY }} className="cursor-default">
      {/* Header */}
      <header style={{ borderBottom: `1px solid ${LINE}` }}>
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
          <p className="text-lg tracking-tight" style={{ fontFamily: DISPLAY, letterSpacing: "0.01em" }}>
            The Fade Room
          </p>
          <ul className="hidden gap-8 text-[13px] md:flex" style={{ color: "rgba(237,230,218,0.55)" }}>
            <li>Services</li>
            <li>Hours</li>
            <li>Visit</li>
          </ul>
          <span
            className="rounded-sm px-4 py-2 text-[12px] font-semibold"
            style={{ background: GOLD, color: INK }}
          >
            Book Now
          </span>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section aria-labelledby="barber-hero" aria-describedby="barber-hero-intent" className="mx-auto max-w-5xl px-6 pb-16 pt-16">
          <AiIntent id="barber-hero-intent">Introduce The Fade Room and direct visitors toward booking a cut.</AiIntent>
          <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-end">
            <div>
              <h1 id="barber-hero" className="text-5xl leading-[1.02] sm:text-6xl" style={{ fontFamily: DISPLAY }}>
                A good cut
                <br />
                keeps its shape.
              </h1>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed" style={{ color: "rgba(237,230,218,0.7)" }}>
                Six chairs, no rush. Book ahead or walk in — either way, you're
                out in forty minutes looking like you planned it for a week.
              </p>
              <span
                className="mt-8 inline-block rounded-sm px-5 py-3 text-[13px] font-semibold"
                style={{ background: GOLD, color: INK }}
              >
                Book Your Chair
              </span>
            </div>
            <div
              className="h-64 rounded-sm md:h-80"
              style={{ background: `linear-gradient(160deg, ${RUST} 0%, ${INK} 70%)`, border: `1px solid ${LINE}` }}
            />
          </div>
        </section>

        {/* Services */}
        <section aria-labelledby="barber-services" aria-describedby="barber-services-intent" style={{ borderTop: `1px solid ${LINE}` }} className="py-16">
          <AiIntent id="barber-services-intent">List services and prices at The Fade Room.</AiIntent>
          <div className="mx-auto max-w-5xl px-6">
            <h2 id="barber-services" className="text-3xl" style={{ fontFamily: DISPLAY }}>
              Services
            </h2>
            <div className="mt-10 grid gap-10 md:grid-cols-2">
              {SERVICES.map((group) => (
                <div key={group.group}>
                  <p className="text-[13px] font-semibold" style={{ color: GOLD }}>
                    {group.group}
                  </p>
                  <ul className="mt-4 space-y-3">
                    {group.items.map((item) => (
                      <li
                        key={item.name}
                        className="flex items-baseline justify-between pb-3"
                        style={{ borderBottom: `1px solid ${LINE}` }}
                      >
                        <span className="text-[15px]">{item.name}</span>
                        <span className="text-[15px]" style={{ color: "rgba(237,230,218,0.55)" }}>
                          {item.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section aria-labelledby="barber-gallery" aria-describedby="barber-gallery-intent" style={{ borderTop: `1px solid ${LINE}` }} className="py-16">
          <AiIntent id="barber-gallery-intent">Show a gallery of the shop and recent work.</AiIntent>
          <div className="mx-auto max-w-5xl px-6">
            <h2 id="barber-gallery" className="text-3xl" style={{ fontFamily: DISPLAY }}>
              The Shop
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
              {[RUST, GOLD, INK, RUST].map((c, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-sm"
                  style={{
                    background: i % 2 === 0 ? `linear-gradient(160deg, ${c} 0%, #241E1A 100%)` : "#241E1A",
                    border: `1px solid ${LINE}`,
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section aria-labelledby="barber-reviews" aria-describedby="barber-reviews-intent" style={{ borderTop: `1px solid ${LINE}` }} className="py-16">
          <AiIntent id="barber-reviews-intent">Show reviews from regular customers.</AiIntent>
          <div className="mx-auto max-w-5xl px-6">
            <h2 id="barber-reviews" className="text-3xl" style={{ fontFamily: DISPLAY }}>
              Regulars Say
            </h2>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {REVIEWS.map((r) => (
                <div key={r.name}>
                  <p className="text-3xl" style={{ color: GOLD, fontFamily: DISPLAY }}>
                    &ldquo;
                  </p>
                  <p className="mt-1 text-[14px] leading-relaxed" style={{ color: "rgba(237,230,218,0.75)" }}>
                    {r.quote}
                  </p>
                  <p className="mt-3 text-[12px]" style={{ color: "rgba(237,230,218,0.45)" }}>
                    {r.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hours & Location */}
        <section aria-labelledby="barber-visit" aria-describedby="barber-visit-intent" style={{ borderTop: `1px solid ${LINE}` }} className="py-16">
          <AiIntent id="barber-visit-intent">Show hours, address, and a map for finding the shop.</AiIntent>
          <div className="mx-auto grid max-w-5xl gap-10 px-6 md:grid-cols-[1fr_1.4fr]">
            <div>
              <h2 id="barber-visit" className="text-3xl" style={{ fontFamily: DISPLAY }}>
                Visit
              </h2>
              <ul className="mt-6 space-y-3">
                {HOURS.map((h) => (
                  <li key={h.day} className="flex justify-between text-[14px]" style={{ color: "rgba(237,230,218,0.7)" }}>
                    <span>{h.day}</span>
                    <span>{h.time}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[14px]" style={{ color: "rgba(237,230,218,0.55)" }}>
                14 Via Calzolai, Varedo
              </p>
            </div>
            <div
              className="h-56 rounded-sm md:h-64"
              style={{ background: "#241E1A", border: `1px solid ${LINE}` }}
            />
          </div>
        </section>
      </main>
    </div>
  );
}