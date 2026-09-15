import { AiIntent } from "../AiMetadata";

const GREEN = "#16241C";
const CREAM = "#F3ECD8";
const GOLD = "#C9A24B";
const WINE = "#7A1F2B";
const LINE = "rgba(243,236,216,0.16)";
const DISPLAY = "'Cormorant Garamond', Georgia, serif";
const BODY = "'Inter', ui-sans-serif, sans-serif";

const MENU = [
  { course: "Antipasti", items: [
    { name: "Burrata, tomato confit, basil oil", price: "€11" },
    { name: "Beef carpaccio, rocket, parmesan", price: "€13" },
  ]},
  { course: "Primi", items: [
    { name: "Tagliatelle al ragù", price: "€14" },
    { name: "Risotto ai funghi porcini", price: "€15" },
  ]},
  { course: "Secondi", items: [
    { name: "Branzino al forno", price: "€19" },
    { name: "Tagliata di manzo, rosmarino", price: "€22" },
  ]},
  { course: "Dolci", items: [
    { name: "Tiramisù", price: "€7" },
    { name: "Panna cotta ai frutti di bosco", price: "€6" },
  ]},
];

export default function RestaurantShowcase() {
  return (
    <div style={{ background: GREEN, color: CREAM, fontFamily: BODY }} className="cursor-default">
      {/* Header */}
      <header style={{ borderBottom: `1px solid ${LINE}` }}>
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
          <p className="text-xl italic" style={{ fontFamily: DISPLAY, fontWeight: 600 }}>
            Osteria Bramante
          </p>
          <ul className="hidden gap-8 text-[13px] md:flex" style={{ color: "rgba(243,236,216,0.55)" }}>
            <li>Menu</li>
            <li>Story</li>
            <li>Visit</li>
          </ul>
          <span
            className="rounded-full border px-4 py-2 text-[12px]"
            style={{ borderColor: GOLD, color: GOLD }}
          >
            Reserve a Table
          </span>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section aria-labelledby="osteria-hero" aria-describedby="osteria-hero-intent" className="mx-auto max-w-5xl px-6 pb-16 pt-16 text-center">
          <AiIntent id="osteria-hero-intent">Introduce Osteria Bramante and its signature dish, direct visitors to reserve a table.</AiIntent>
          <p className="text-[13px]" style={{ color: "rgba(243,236,216,0.55)" }}>
            Family-run since 1994
          </p>
          <h1 id="osteria-hero" className="mx-auto mt-4 max-w-2xl text-5xl leading-[1.08] sm:text-6xl" style={{ fontFamily: DISPLAY, fontStyle: "italic" }}>
            Slow food, cooked the way my mother taught me.
          </h1>
          <div className="mx-auto mt-10 h-64 max-w-3xl rounded-sm sm:h-80" style={{ background: `linear-gradient(150deg, ${WINE} 0%, ${GREEN} 75%)`, border: `1px solid ${LINE}` }} />
        </section>

        {/* Menu */}
        <section aria-labelledby="osteria-menu" aria-describedby="osteria-menu-intent" style={{ borderTop: `1px solid ${LINE}` }} className="py-16">
          <AiIntent id="osteria-menu-intent">Present the current menu by course with prices.</AiIntent>
          <div className="mx-auto max-w-3xl px-6">
            <h2 id="osteria-menu" className="text-center text-3xl italic" style={{ fontFamily: DISPLAY }}>
              Tonight's Menu
            </h2>
            <div className="mt-10 space-y-10">
              {MENU.map((course) => (
                <div key={course.course}>
                  <p className="text-lg italic" style={{ fontFamily: DISPLAY, color: GOLD }}>
                    {course.course}
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {course.items.map((item) => (
                      <li key={item.name} className="flex items-baseline justify-between gap-4 text-[14px]">
                        <span>{item.name}</span>
                        <span
                          className="flex-1 border-b border-dotted"
                          style={{ borderColor: "rgba(243,236,216,0.25)" }}
                        />
                        <span style={{ color: "rgba(243,236,216,0.6)" }}>{item.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section aria-labelledby="osteria-gallery" aria-describedby="osteria-gallery-intent" style={{ borderTop: `1px solid ${LINE}` }} className="py-16">
          <AiIntent id="osteria-gallery-intent">Show a gallery of dishes and the dining room.</AiIntent>
          <div className="mx-auto max-w-5xl px-6">
            <div className="grid grid-cols-3 gap-3">
              {[WINE, GOLD, WINE].map((c, i) => (
                <div
                  key={i}
                  className="aspect-[4/3] rounded-sm"
                  style={{ background: `linear-gradient(160deg, ${c} 0%, #101C15 100%)`, border: `1px solid ${LINE}` }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Visit */}
        <section aria-labelledby="osteria-visit" aria-describedby="osteria-visit-intent" style={{ borderTop: `1px solid ${LINE}` }} className="py-16">
          <AiIntent id="osteria-visit-intent">Show hours, location, and a map, and prompt visitors to reserve.</AiIntent>
          <div className="mx-auto grid max-w-5xl gap-10 px-6 md:grid-cols-[1fr_1.4fr]">
            <div>
              <h2 id="osteria-visit" className="text-3xl italic" style={{ fontFamily: DISPLAY }}>
                Visit
              </h2>
              <p className="mt-5 text-[14px]" style={{ color: "rgba(243,236,216,0.7)" }}>
                Tue - Sun, 12:30 - 15:00 &amp; 19:00 - 23:00
                <br />
                Closed Mondays
              </p>
              <p className="mt-4 text-[14px]" style={{ color: "rgba(243,236,216,0.55)" }}>
                8 Via Bramante, Varedo
              </p>
              <span
                className="mt-6 inline-block rounded-full border px-5 py-2.5 text-[13px]"
                style={{ borderColor: GOLD, color: GOLD }}
              >
                Reserve a Table
              </span>
            </div>
            <div
              className="h-56 rounded-sm md:h-64"
              style={{ background: "#101C15", border: `1px solid ${LINE}` }}
            />
          </div>
        </section>
      </main>
    </div>
  );
}