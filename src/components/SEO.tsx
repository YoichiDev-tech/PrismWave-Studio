import { Helmet } from "react-helmet-async";

const SITE_URL = "https://prismwave-studio.vercel.app";
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-cover-prismwave.jpg`;

interface SEOProps {
  /** Page title WITHOUT the site suffix — "Bloom Market Case Study", not "Bloom Market Case Study — PrismWave Studio" */
  title: string;
  description: string;
  /** Route path starting with "/" (e.g. "/work/bloom-market/case-study"). Used to build the canonical URL. */
  path: string;
  /** Absolute or root-relative image URL for OG/Twitter cards. Defaults to the site cover image. */
  image?: string;
  /** Set true only for pages that should NOT be indexed (drafts, internal previews). */
  noIndex?: boolean;
}

/**
 * Per-route document head tags. AiMetadata (in-body, hidden) is for AI
 * answer engines reading page content; this is for the actual <head> —
 * browser tab title, search engine snippet, and social share cards.
 * Every routed page should render exactly one of these
 */
export default function SEO({ title, description, path, image, noIndex }: SEOProps) {
  const fullTitle = `${title} — PrismWave Studio`;
  const canonical = `${SITE_URL}${path}`;
  const ogImage = image ?? DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="PrismWave Studio" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}