export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  status: "live" | "beta" | "concept";
  maker: {
    name: string;
    url?: string;
  };
  tags: string[];
  category: string;
  launchedAt?: string;
  cover?: string;
  featured?: boolean;
  prismwaveOwned?: boolean;
}
