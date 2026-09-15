import { Link } from "react-router-dom";
import { BackToStudioBadge, BackToPackagesBadge } from "./Badge";
import AiMetadata from "./AiMetadata";
import SEO from "./SEO";
import Footer from "./Footer";
import type { PackageDetail } from "../data/packages";

const ACCENT_GRADIENT: Record<PackageDetail["accent"], string> = {
  amber: "linear-gradient(100deg, #FFB84D 0%, #FF7A59 100%)",
  coral: "linear-gradient(100deg, #FF7A59 0%, #FFB84D 100%)",
  violet: "linear-gradient(100deg, #6C63FF 0%, #FF7A59 100%)",
  gradient: "linear-gradient(100deg, #FFB84D 0%, #FF7A59 50%, #6C63FF 100%)",
};

export default function PackagePageLayout({ pkg }: { pkg: PackageDetail }) {
  const Showcase = pkg.showcase;

  return (
    <div className="min-h-screen bg-ink text-paper cursor-default" ai-tag="package" data-ai="page">
      <SEO
        title={`${pkg.name} — Fixed-Price Package`}
        description={pkg.seoDescription}
        path={`/packages/${pkg.slug}`}
      />

      <AiMetadata
        map={pkg.aiMap}
        intent={pkg.aiIntent}
        tags={pkg.aiTags}
        extract={{
          title: pkg.name,
          price: pkg.price,
          turnaround: pkg.turnaround,
          audience: pkg.category,
        }}
      />

      <BackToStudioBadge tone="dark" />
      <BackToPackagesBadge tone="dark" />

      {/* Full showcase at the top — replaces the small mock preview */}
      <section aria-label={`${pkg.name} showcase`} className="w-full">
        <Showcase />
      </section>

      <header className="border-b border-ink-line">
        <div className="mx-auto max-w-5xl px-6 py-6">
          <Link
            to="/packages"
            className="font-mono text-[12px] uppercase tracking-wide text-paper/60 hover:text-paper"
          >
            &larr; All packages
          </Link>
        </div>
      </header>

      <main data-ai="main-content">
        {/* Hero */}
        <section aria-labelledby="package-hero" className="mx-auto max-w-5xl px-6 pb-14 pt-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-paper/50">
            {pkg.category}
          </p>
          <h1
            id="package-hero"
            className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.05] sm:text-5xl"
          >
            {pkg.heroHeadline}
          </h1>
          <p className="mt-5 max-w-2xl text-paper/65">{pkg.heroDescription}</p>

          {pkg.sampleData && (
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wide text-paper/60">
              <span className="h-1.5 w-1.5 rounded-full bg-violet" />
              Preview built on sample data
            </p>
          )}
        </section>

        {/* Included / Excluded */}
        <section aria-labelledby="package-scope" className="border-t border-ink-line py-16">
          <div className="mx-auto grid max-w-5xl gap-10 px-6 md:grid-cols-2">
            <div>
              <h2 id="package-scope" className="font-display text-2xl font-semibold">
                What's included
              </h2>
              <ul className="mt-5 space-y-3">
                {pkg.included.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-paper/75">
                    <span className="mt-0.5 text-amber">&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-paper/50">Not included</h2>
              <ul className="mt-5 space-y-3">
                {pkg.excluded.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-paper/45">
                    <span className="mt-0.5">&#8212;</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-paper/40">
                Need something outside this scope? That's a custom quote, not a change to this
                package's price.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section aria-labelledby="package-price" className="border-t border-ink-line py-16">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2
              id="package-price"
              className="font-mono text-[11px] uppercase tracking-widest text-paper/50"
            >
              Fixed price
            </h2>
            <p className="mt-3 font-display text-5xl font-semibold">{pkg.price}</p>
            {pkg.priceNote && <p className="mt-2 text-sm text-paper/50">{pkg.priceNote}</p>}
            <p className="mt-2 font-mono text-[11px] uppercase tracking-wide text-paper/40">
              Delivered in {pkg.turnaround}
            </p>

            <Link
              to="/#contact"
              className="mt-8 inline-block rounded-full px-6 py-3 font-display text-sm font-semibold text-ink shadow-xl transition-transform hover:scale-105"
              style={{ background: ACCENT_GRADIENT[pkg.accent] }}
            >
              Get this package &rarr;
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}