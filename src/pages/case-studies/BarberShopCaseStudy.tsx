import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import AiMetadata, { AiIntent } from "../../components/AiMetadata";
import Footer from "../../components/Footer";
import SEO from "../../components/SEO";

const repositoryUrl = "https://github.com/YoichiDev-tech/Barber-shop";
const configuredDemoUrl = import.meta.env.VITE_BARBER_SHOP_URL?.trim();

function getDemoUrl(value?: string) {
  if (!value) return undefined;
  try {
    const parsedUrl = new URL(value);
    const isSecure = parsedUrl.protocol === "https:";
    const isLocalDevelopment = parsedUrl.protocol === "http:" && parsedUrl.hostname === "localhost";
    return isSecure || isLocalDevelopment ? parsedUrl.href : undefined;
  } catch {
    return undefined;
  }
}

export default function BarberShopCaseStudy() {
  const demoUrl = getDemoUrl(configuredDemoUrl);

  return (
    <div className="min-h-screen bg-ink text-paper">
      <SEO
        title="Razor & Rumble — Barbershop Website Concept"
        description="A responsive fictional barbershop website concept built by PrismWave Studio."
        path="/work/barber-shop/case-study"
      />
      <AiMetadata
        map={["Razor & Rumble concept", "Responsive website design", "Live demo status", "Source repository"]}
        intent="Show a fictional barbershop website concept and clearly distinguish demo work from real client work."
        tags={["barbershop website", "responsive design", "React", "TypeScript", "PrismWave Studio"]}
        extract={{
          title: "Razor & Rumble website concept",
          audience: "Local service businesses and prospective clients",
          primaryActions: "Open the live demo when configured or inspect the source repository",
        }}
      />
      <header className="border-b border-ink-line">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-6">
          <Link to="/case-studies" className="font-mono text-[11px] uppercase tracking-wide text-paper/60 hover:text-paper">
            ← Case studies
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink-line px-4 py-2 font-display text-xs font-semibold text-paper"
            >
              View source <ArrowUpRight className="h-4 w-4" />
            </a>
            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-amber px-4 py-2 font-display text-xs font-semibold text-ink"
              >
                Live demo <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <section className="max-w-4xl" aria-labelledby="barber-title">
          <div className="flex items-center gap-4">
            <img src="/images/barber-shop/razor-rumble-mark.svg" alt="" className="h-14 w-14 rounded-2xl bg-white p-2" />
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber">Local business · Website concept</p>
              <p className="mt-1 text-sm text-paper/50">PrismWave Studio concept demo</p>
            </div>
          </div>
          <h1 id="barber-title" className="mt-6 font-display text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            A sharper first impression for a neighborhood barbershop.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-paper/65">
            Razor & Rumble is a fictional barbershop landing-page concept built to demonstrate responsive frontend design, clear service presentation, and a visual identity for a local service business.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {demoUrl ? (
              <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-amber px-6 py-3 font-display text-sm font-semibold text-ink">
                Explore live demo <ArrowUpRight className="h-4 w-4" />
              </a>
            ) : (
              <span className="inline-flex min-h-12 items-center rounded-full border border-ink-line px-6 py-3 font-mono text-[10px] uppercase tracking-wide text-paper/50">
                Live demo not deployed yet
              </span>
            )}
            <a href={repositoryUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-ink-line px-6 py-3 font-display text-sm font-semibold text-paper hover:border-amber">
              Inspect GitHub repository <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </section>
        <section className="mt-16 grid gap-5 md:grid-cols-3" aria-label="Concept features">
          {[
            { title: "Responsive layout", body: "A landing page structured for clear browsing across desktop and mobile screens." },
            { title: "Reusable components", body: "Header, hero, service cards, story content, and footer are composed from React components." },
            { title: "Honest demo scope", body: "Service copy and business identity are illustrative; there is no booking, payment, or customer-data backend." },
          ].map((item) => (
            <article key={item.title} className="rounded-2xl border border-ink-line bg-ink-2/60 p-6">
              <h2 className="font-display text-xl font-semibold">{item.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-paper/65">{item.body}</p>
            </article>
          ))}
        </section>
        <section className="mt-12 rounded-2xl border border-amber/30 bg-amber/5 p-6 sm:p-8" aria-labelledby="demo-scope">
          <AiIntent id="barber-demo-scope">Explain that Razor & Rumble is illustrative concept work and not a real barbershop or client project.</AiIntent>
          <h2 id="demo-scope" className="font-display text-xl font-semibold">Concept, not client work</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-paper/65">
            The business name, services, and imagery are illustrative. No real address, phone number, opening hours, testimonials, appointment workflow, or payment system is represented. A live demo link will appear here after a production URL is configured.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
