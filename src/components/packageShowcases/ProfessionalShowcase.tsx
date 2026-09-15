import { AiIntent } from "../AiMetadata";

const PAPER = "#F6F3EE";
const INK = "#1B2035";
const PLUM = "#6E2A46";
const LINE = "rgba(27,32,53,0.12)";
const DISPLAY = "'Helvetica Neue', Arial, sans-serif";
const BODY = "Georgia, 'Times New Roman', serif";

const OFFERINGS = [
  { name: "Brand Positioning", desc: "Find the one sentence your business should be known for, and build everything around it." },
  { name: "Launch Strategy", desc: "A sequenced plan for getting a new product or offer in front of the right people first." },
  { name: "Marketing Audits", desc: "A clear-eyed look at what's working, what's wasted spend, and what to fix first." },
];

const TESTIMONIALS = [
  { quote: "Elena turned a scattered launch plan into something we could actually execute in three weeks.", name: "Founder, D2C skincare brand" },
  { quote: "The kind of strategist who tells you what you need to hear, not what's easiest to say.", name: "Marketing Director, logistics startup" },
];

export default function ProfessionalShowcase() {
  return (
    <div style={{ background: PAPER, color: INK, fontFamily: BODY }} className="cursor-default">
      {/* Header */}
      <header style={{ borderBottom: `1px solid ${LINE}` }}>
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-6">
          <p className="text-[15px] tracking-tight" style={{ fontFamily: DISPLAY, fontWeight: 700 }}>
            Elena Marchetti
          </p>
          <span
            className="rounded-full px-4 py-2 text-[12px] font-semibold"
            style={{ background: PLUM, color: PAPER, fontFamily: DISPLAY }}
          >
            Get in Touch
          </span>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section aria-labelledby="elena-hero" aria-describedby="elena-hero-intent" className="mx-auto max-w-4xl px-6 pb-16 pt-16">
          <AiIntent id="elena-hero-intent">Introduce Elena Marchetti's positioning as a brand and marketing consultant.</AiIntent>
          <p className="text-[13px]" style={{ color: PLUM, fontFamily: DISPLAY, fontWeight: 600 }}>
            Brand &amp; Marketing Consultant
          </p>
          <h1
            id="elena-hero"
            className="mt-4 max-w-2xl text-4xl leading-[1.15] sm:text-5xl"
            style={{ fontFamily: DISPLAY, fontWeight: 700, letterSpacing: "-0.01em" }}
          >
            I help founders say the right thing, to the right people, first.
          </h1>
          <p className="mt-6 max-w-md text-[16px] leading-relaxed" style={{ color: "rgba(27,32,53,0.7)" }}>
            Ten years, forty-plus launches — from pre-seed startups to a
            regional retail chain. I work on positioning, launch strategy,
            and the marketing decisions that are too easy to get wrong alone.
          </p>
        </section>

        {/* Bio / credentials */}
        <section aria-labelledby="elena-bio" aria-describedby="elena-bio-intent" style={{ borderTop: `1px solid ${LINE}` }} className="py-16">
          <AiIntent id="elena-bio-intent">Give background and credentials that establish credibility.</AiIntent>
          <div className="mx-auto grid max-w-4xl gap-10 px-6 md:grid-cols-[1fr_1.6fr]">
            <div
              className="h-40 w-40 rounded-full"
              style={{ background: `linear-gradient(140deg, ${PLUM} 0%, #C9A24B 100%)` }}
            />
            <div>
              <p className="text-[15px] leading-relaxed" style={{ color: "rgba(27,32,53,0.75)" }}>
                Before consulting, I ran marketing for a Milan-based DTC
                brand through its Series A. I now work with a small number
                of founders at a time, mostly pre- and post-launch, mostly
                in consumer and retail.
              </p>
              <p className="mt-4 text-[13px]" style={{ color: PLUM, fontFamily: DISPLAY, fontWeight: 600 }}>
                MSc Marketing, Bocconi — 40+ launches — Based in Milan
              </p>
            </div>
          </div>
        </section>

        {/* Offerings */}
        <section aria-labelledby="elena-offerings" aria-describedby="elena-offerings-intent" style={{ borderTop: `1px solid ${LINE}` }} className="py-16">
          <AiIntent id="elena-offerings-intent">List Elena's services and offerings.</AiIntent>
          <div className="mx-auto max-w-4xl px-6">
            <h2 id="elena-offerings" className="text-2xl" style={{ fontFamily: DISPLAY, fontWeight: 700 }}>
              How I work with clients
            </h2>
            <div className="mt-8 space-y-8">
              {OFFERINGS.map((o) => (
                <div key={o.name} className="pb-8" style={{ borderBottom: `1px solid ${LINE}` }}>
                  <p className="text-[16px]" style={{ fontFamily: DISPLAY, fontWeight: 700 }}>
                    {o.name}
                  </p>
                  <p className="mt-2 text-[15px] leading-relaxed" style={{ color: "rgba(27,32,53,0.65)" }}>
                    {o.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section aria-labelledby="elena-testimonials" aria-describedby="elena-testimonials-intent" style={{ borderTop: `1px solid ${LINE}` }} className="py-16">
          <AiIntent id="elena-testimonials-intent">Show testimonials from past clients.</AiIntent>
          <div className="mx-auto max-w-4xl px-6">
            <div className="grid gap-10 md:grid-cols-2">
              {TESTIMONIALS.map((t) => (
                <div key={t.name}>
                  <p className="text-[16px] italic leading-relaxed" style={{ color: "rgba(27,32,53,0.8)" }}>
                    "{t.quote}"
                  </p>
                  <p className="mt-3 text-[13px]" style={{ color: PLUM, fontFamily: DISPLAY, fontWeight: 600 }}>
                    {t.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section aria-labelledby="elena-contact" aria-describedby="elena-contact-intent" style={{ borderTop: `1px solid ${LINE}` }} className="py-16">
          <AiIntent id="elena-contact-intent">Provide a way to get in touch with Elena.</AiIntent>
          <div className="mx-auto max-w-4xl px-6">
            <h2 id="elena-contact" className="text-2xl" style={{ fontFamily: DISPLAY, fontWeight: 700 }}>
              Working on something?
            </h2>
            <p className="mt-3 max-w-sm text-[15px]" style={{ color: "rgba(27,32,53,0.65)" }}>
              Tell me what you're building and where it's stuck.
            </p>
            <div className="mt-6 max-w-md space-y-3">
              <div className="h-11 rounded-md" style={{ border: `1px solid ${LINE}`, background: "#fff" }} />
              <div className="h-11 rounded-md" style={{ border: `1px solid ${LINE}`, background: "#fff" }} />
              <div className="h-24 rounded-md" style={{ border: `1px solid ${LINE}`, background: "#fff" }} />
              <span
                className="inline-block rounded-full px-5 py-2.5 text-[13px] font-semibold"
                style={{ background: PLUM, color: PAPER, fontFamily: DISPLAY }}
              >
                Send Message
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}