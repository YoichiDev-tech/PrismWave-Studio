import Nav from "../components/Nav";
import Footer from "../components/Footer";
import CaseStudiesIndex from "../pages/case-studies";
import Portfolio from "../components/Portfolio";
import Reveal from "../components/Reveal";

export default function Work() {
  return (
    <>
      <Nav onSelectIntent={() => {}} />

      <main className="mx-auto max-w-6xl px-6 py-32">

        {/* Case Studies */}
        <Reveal>
          <section className="mb-16">
            <CaseStudiesIndex />
          </section>
        </Reveal>

        {/* Divider */}
        <div className="border-t border-ink-line my-16" />

        {/* Templates */}
        <Reveal>
          <section className="mb-16">
            <h2 className="font-display text-3xl font-semibold text-paper mb-6">
              Templates
            </h2>
            <Portfolio />
          </section>
        </Reveal>

        {/* Divider */}
        <div className="border-t border-ink-line my-16" />

        {/* Client Work (future) */}
        <Reveal>
          <section className="mb-16">
            <h2 className="font-display text-3xl font-semibold text-paper mb-6">
              Client Work
            </h2>
            <p className="text-ink-soft font-mono text-sm">
              New client projects are currently in production.
            </p>
          </section>
        </Reveal>

      </main>

      <Footer />
    </>
  );
}