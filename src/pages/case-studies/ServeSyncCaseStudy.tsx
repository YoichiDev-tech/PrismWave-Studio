import AiMetadata from "../../components/AiMetadata";
import Footer from "../../components/Footer";
import BrowserChrome from "../../components/Badge";
import Screenshot from "../../components/Screenshot";

export default function ServeSyncCaseStudy() {
  return (
    <div className="min-h-screen bg-ink text-paper">
      <AiMetadata
        map={["Case study hero", "Weekly savings", "Operational problem", "Product fixes", "Outcome"]}
        intent="Explain how PrismWave Studio designed ServeSync to automate hospitality operations."
        tags={["case study", "hospitality software", "operations automation", "ServeSync"]}
        extract={{ title: "ServeSync case study", audience: "Hospitality operators and product teams", primaryActions: "Understand the product problem, solution, and outcome", result: "Automated recurring back-office administration" }}
      />
      <main role="main" className="mx-auto max-w-4xl px-6 py-24 md:py-32">
        <article>
          <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">ServeSync - Case Study</h1>
          <p className="mt-6 leading-relaxed text-paper/70">
            ServeSync is a hospitality operations engine built to give operators their time, margin, and evenings back by automating recurring administration.
          </p>
          <div className="mt-12">
            <BrowserChrome bg="#E8E8E8">
              <Screenshot label="ServeSync dashboard screenshot" />
            </BrowserChrome>
          </div>
          <section aria-labelledby="savings" className="mt-20">
            <h2 id="savings" className="font-display text-2xl font-semibold">Weekly Savings Ticket</h2>
            <ul className="mt-4 list-disc pl-6 leading-relaxed text-paper/70">
              <li>11 hours returned weekly</li>
              <li>$1,800+ monthly savings</li>
              <li>30% less waste</li>
              <li>70% of administration automated</li>
            </ul>
          </section>
          <section aria-labelledby="outcome" className="mt-20">
            <h2 id="outcome" className="font-display text-2xl font-semibold">Outcome</h2>
            <p className="mt-4 leading-relaxed text-paper/70">
              ServeSync replaces spreadsheets, manual counts, and repetitive admin with one automated platform running quietly in the background while the team runs the floor.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}