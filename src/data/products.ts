import type { Product } from "../types/product";

/**
 * Product discovery offline until a real public product ships.
 * PrismStack stays fully commented — no empty shelves.
 */
export const products: Product[] = [
  // Uncomment when PrismStack / IndieMakerStack is live:
  // {
  //   id: "prismstack",
  //   slug: "prismstack",
  //   name: "PrismStack",
  //   tagline: "Curated productivity & tool stack for founders and indie makers.",
  //   description: "A curated directory of tools for founders and indie makers.",
  //   url: "https://your-live-ims-url.vercel.app",
  //   status: "beta",
  //   maker: { name: "PrismWave Studio", url: "https://prismwave-studio.vercel.app" },
  //   tags: ["directory", "tools", "founders", "productivity"],
  //   category: "Tool Directory",
  //   launchedAt: "2026-09-01",
  //   featured: true,
  //   prismwaveOwned: true,
  // },
];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}