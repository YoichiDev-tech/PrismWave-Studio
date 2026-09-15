import { Link } from "react-router-dom";
import AiMetadata from "../components/AiMetadata";
import Footer from "../components/Footer";
import Packages from "../components/Packages";
import SEO from "../components/SEO";

export default function PackagesPage() {
  return (
    <div className="min-h-screen bg-ink text-paper">
      <SEO
        title="Packages & Pricing"
        description="Fixed-price website packages from PrismWave Studio — barber & salon, restaurant, professional one-pager, SEO fixes, and an analytics dashboard showcase."
        path="/packages"
      />
      <AiMetadata
        map={["Packages introduction", "Five fixed-price packages", "Package cards"]}
        intent="Show PrismWave Studio's fixed-price packages and direct visitors to a specific package page to see full scope and price."
        tags={["fixed price web design", "website packages", "small business website pricing", "PrismWave Studio packages"]}
        extract={{
          title: "PrismWave Studio Packages",
          audience: "Small business owners deciding what a website should cost",
          primaryActions: "Open a package to see full scope, price, and turnaround",
          packages: "Local Service Landing Page, Restaurant/Café Landing Page, Professional One-Pager, SEO Adjustment, Insights Dashboard Showcase",
        }}
      />
      <header className="border-b border-ink-line">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <Link to="/" className="font-mono text-[12px] uppercase tracking-wide text-paper/60 hover:text-paper">
            &larr; Back to studio
          </Link>
        </div>
      </header>
      <main role="main">
        <Packages />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}