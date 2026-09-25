import { Link } from "react-router-dom";
import type { Product } from "../types/product";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Link
      to={`/products/${product.slug}`}
      className="group block rounded-2xl border border-ink-line bg-ink-2/40 p-6 transition-colors hover:border-amber"
    >
      <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">
        {product.category}
      </p>

      <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-paper">
        {product.name}
      </h3>

      <p className="mt-2 text-sm text-ink-soft">{product.tagline}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {product.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-ink-line px-2 py-0.5 text-[11px] text-ink-soft"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="mt-4 font-mono text-[11px] uppercase tracking-wide text-ink-soft">
        {product.status === "live"
          ? "Live"
          : product.status === "beta"
          ? "Beta"
          : "Concept"}
      </p>
    </Link>
  );
}
