import { Link, useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import AiMetadata from "../components/AiMetadata";
import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../data/products";

export default function Products() {
  const products = getAllProducts();
  const [params] = useSearchParams();
  const tagFilter = params.get("tag");

  const filtered = tagFilter
    ? products.filter((p) => p.tags.includes(tagFilter))
    : products;

  return (
    <div className="grain min-h-screen bg-ink text-paper">
      <SEO
        title="Products"
        description="Discover tools and digital products built by PrismWave Studio."
        path="/products"
      />
      <AiMetadata
        map={["Products introduction", "Product grid", "Studio footer"]}
        intent="Show PrismWave Studio products and invite visitors to explore a product or start an audit."
         tags={["products", "tools", "directory", "PrismWave"]}
        extract={{
          title: "PrismWave Studio Products",
          audience: "Founders, indie makers, and small businesses",
          primaryActions: "Open a product or run a free audit",
        }}
      />

      <header className="border-b border-ink-line">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <Link
            to="/"
            className="font-mono text-[12px] uppercase tracking-wide text-paper/60 transition-colors hover:text-paper"
          >
            ← Back to studio
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">Products</p>
        <h1 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Tools and digital products built by the studio.
        </h1>
        <p className="mt-4 max-w-xl text-ink-soft">
          Discover useful tools, curated directories, and launchable digital products.
        </p>

        {tagFilter && (
          <p className="mt-6 text-sm text-ink-soft">
            Filtering by tag: <span className="text-paper">{tagFilter}</span>
          </p>
        )}

        {filtered.length === 0 ? (
          <p className="mt-12 text-ink-soft">
            No products match this filter. Try removing the tag or browsing all products.
          </p>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
