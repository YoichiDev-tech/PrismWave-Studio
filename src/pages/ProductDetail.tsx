import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import AiMetadata from "../components/AiMetadata";
import { getProductBySlug } from "../data/products";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = getProductBySlug(slug!);

  if (!product) {
    return (
      <div className="grain min-h-screen bg-ink text-paper">
        <main className="mx-auto max-w-6xl px-6 py-20">
          <h1 className="font-display text-3xl font-semibold">Product not found</h1>
          <Link
            to="/products"
            className="mt-6 inline-block font-mono text-sm uppercase tracking-wide text-amber"
          >
            ← Back to products
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="grain min-h-screen bg-ink text-paper">
      <SEO
        title={product.name}
        description={product.tagline}
        path={`/products/${product.slug}`}
      />

      <AiMetadata
        map={["Product detail", "Product overview", "Studio footer"]}
        intent="Show a product detail page and invite visitors to explore or start an audit."
        tags={product.tags}
        extract={{
          title: product.name,
          audience: "Founders and indie makers",
          primaryActions: "Open product or run a free audit",
        }}
      />

      <header className="border-b border-ink-line">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <Link
            to="/products"
            className="font-mono text-[12px] uppercase tracking-wide text-paper/60 transition-colors hover:text-paper"
          >
            ← Back to products
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">
          {product.category}
        </p>

        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
          {product.name}
        </h1>

        <p className="mt-4 max-w-xl text-ink-soft">{product.description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-ink-line px-2 py-0.5 text-[11px] text-ink-soft"
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-block rounded-full bg-paper px-6 py-3 font-display text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
        >
          Visit product →
        </a>

        <div className="mt-12 border-t border-ink-line pt-8">
          <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">
            Need a custom build?
          </p>
          <Link
            to="/#audit-tool"
            className="mt-3 inline-block rounded-full bg-paper px-6 py-3 font-display text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
          >
            Get a Free Audit
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
