import AiMetadata from "../../components/AiMetadata";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";

const caseStudies = [
  {
    title: "Bloom Market",
    description: "",
    href: "/case-study/BloomMarketCaseStudy",
    image: "/images/bloom.png",
  },
  {
    title: "ServeSync",
    description: "Modern scheduling & admin automation for hospitality.",
    href: "/case-study/ServeSyncCaseStudy",
    image: "/images/servesync.png", // placeholder
  },
];

export default function CaseStudiesIndex() {
  return (
    <div className="min-h-screen bg-ink text-paper">
      <AiMetadata
        map={["Case studies introduction", "Bloom Market case study", "ServeSync case study"]}
        intent="Help visitors review PrismWave Studio case studies and understand the design and product outcomes behind each project."
        tags={["case studies", "web design process", "product design", "PrismWave Studio"]}
        extract={{ title: "PrismWave Studio Case Studies", audience: "Prospective clients and design teams", primaryActions: "Open a case study", projects: "Bloom Market and ServeSync" }}
      />
      <header className="border-b border-ink-line">
        <div className="mx-auto max-w-5xl px-6 py-6">
          <Link to="/" className="font-mono text-[12px] uppercase tracking-wide text-paper/60 hover:text-paper">
            &larr; Back to studio
          </Link>
        </div>
      </header>
      <main role="main" className="mx-auto max-w-5xl px-6 py-20">
        <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">Case Studies</h1>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {caseStudies.map((study) => (
            <article key={study.title} className="rounded-2xl border border-ink-line bg-ink-2/60 p-6">
              <h2 className="font-display text-2xl font-semibold">{study.title}</h2>
              <p className="mt-3 text-paper/65">{study.description || "A PrismWave Studio project case study."}</p>
              <Link to={study.title === "Bloom Market" ? "/work/bloom-market/case-study" : "/work/servesync/case-study"} className="mt-6 inline-block font-mono text-[11px] uppercase tracking-wide text-amber">
                Read case study &rarr;
              </Link>
            </article>
          ))}
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}