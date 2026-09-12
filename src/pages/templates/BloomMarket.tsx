import type { ComponentType } from "react";
import { Link } from "react-router-dom";
import { BackToStudioBadge, PickThisTemplateBadge } from "../../components/Badge";
import { SundayBouquet, CitrusHerbJar, DriedBloomBundle } from "../../components/illustrations/BloomProducts";
import {
  IconFlowerStem,
  IconLeafSprig,
  IconRibbonBow,
  IconWateringCan,
  IconBee,
  IconPottedPlant,
} from "../../components/illustrations/BloomIcons";
import AiMetadata, { AiIntent } from "../../components/AiMetadata";
import SEO from "../../components/SEO";

const ROUND = "'Fredoka', 'Sora', sans-serif";
const CREAM = "#FFF3E8";
const PLUM = "#3A1220";
const PINK = "#FF6FA8";
const YELLOW = "#FFD23F";
const MINT = "#8FD3C0";

const PRODUCTS: { name: string; price: string; bg: string; art: ComponentType<{ className?: string }> }[] = [
  { name: "Sunday Bouquet", price: "$38", bg: PINK, art: SundayBouquet },
  { name: "Citrus & Herb Jar", price: "$22", bg: YELLOW, art: CitrusHerbJar },
  { name: "Dried Bloom Bundle", price: "$28", bg: MINT, art: DriedBloomBundle },
];

const GRID_TILES: { bg: string; art: ComponentType<{ className?: string }> }[] = [
  { bg: PINK, art: IconFlowerStem },
  { bg: YELLOW, art: IconRibbonBow },
  { bg: MINT, art: IconLeafSprig },
  { bg: MINT, art: IconPottedPlant },
  { bg: PINK, art: IconBee },
  { bg: YELLOW, art: IconWateringCan },
];

export default function BloomMarket() {
  return (
    <div ai-tag="template" data-ai="page" style={{ background: CREAM, color: PLUM, fontFamily: "'Inter', sans-serif" }} className="min-h-screen cursor-default">
      <SEO
        title="Bloom Market — Live Template"
        description="A bright, fast storefront template for flower delivery and small retail businesses, built by PrismWave Studio."
        path="/work/bloom-market"
      />
      <AiMetadata
        map={["Flower shop hero", "Weekly product favorites", "Subscription offer", "Brand story"]}
        intent="Present a flower delivery storefront and guide visitors toward shopping or subscribing."
        tags={["flower shop", "ecommerce template", "flower delivery", "subscription commerce", "local retail"]}
        extract={{ title: "Bloom Market", audience: "People buying bouquets and easy-care plants", primaryActions: "Shop the drop or start a subscription", products: "Sunday Bouquet $38; Citrus & Herb Jar $22; Dried Bloom Bundle $28", cadence: "New drop every Friday" }}
      />
      <BackToStudioBadge tone="light" />
      <PickThisTemplateBadge tone="light" />

      <header data-ai="navigation" className="px-6 py-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <p className="text-xl font-bold" style={{ fontFamily: ROUND }}>Bloom Market</p>
          <ul className="hidden gap-8 text-sm font-medium md:flex" style={{ opacity: 0.75 }}>
            <li>Shop</li><li>Subscriptions</li><li>About</li><li>Visit</li>
          </ul>
          <a href="#shop" className="rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-200 hover:scale-105 hover:shadow-xl" style={{ background: PLUM, color: CREAM, fontFamily: ROUND }}>Shop the drop</a>
        </div>
      </header>

      <main data-ai="main-content">
        <section aria-labelledby="bloom-hero" aria-describedby="bloom-hero-intent" role="region" data-ai="hero" className="relative overflow-hidden px-6 pb-20 pt-10">
          <AiIntent id="bloom-hero-intent">Introduce Bloom Market and direct visitors toward shopping or starting a flower subscription.</AiIntent>
          <div aria-hidden="true" className="absolute -right-16 top-0 h-64 w-64 rotate-12 rounded-[45%]" style={{ background: PINK, opacity: 0.9 }} />
          <div aria-hidden="true" className="absolute bottom-0 left-[-4rem] h-48 w-48 -rotate-6 rounded-[45%]" style={{ background: YELLOW, opacity: 0.85 }} />
          <div className="relative mx-auto max-w-6xl">
            <p className="inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wide" style={{ background: PLUM, color: CREAM, fontFamily: ROUND }}>New drop every Friday</p>
            <h1 id="bloom-hero" className="mt-6 max-w-2xl text-6xl font-bold leading-[0.95] sm:text-7xl" style={{ fontFamily: ROUND }}>Fresh blooms,<br />no green thumb<br />required.</h1>
            <p className="mt-6 max-w-md text-lg" style={{ opacity: 0.75 }}>Hand-tied bouquets and easy-care plants, dropped off on your porch every week. Cancel or pause anytime.</p>
            <div className="mt-8 flex flex-wrap gap-4"><a href="#shop" data-ai="cta" className="rounded-full px-7 py-3.5 text-sm font-bold transition-all duration-200 hover:scale-105 hover:shadow-xl" style={{ background: PINK, color: PLUM, fontFamily: ROUND }}>Shop the drop</a><a href="#subscribe" className="rounded-full border-2 px-7 py-3.5 text-sm font-bold transition-all duration-200 hover:scale-105 hover:shadow-xl" style={{ borderColor: PLUM, fontFamily: ROUND }}>Start a subscription</a></div>
          </div>
        </section>

        <section id="shop" aria-labelledby="bloom-products" aria-describedby="bloom-products-intent" role="region" data-ai="products" className="px-6 py-16">
          <AiIntent id="bloom-products-intent">Present the current weekly flower and plant products with prices.</AiIntent>
          <div className="mx-auto max-w-6xl"><div className="flex items-end justify-between"><h2 id="bloom-products" className="text-3xl font-bold" style={{ fontFamily: ROUND }}>This week's favorites</h2><span className="text-sm font-semibold underline underline-offset-4">View all</span></div>
            <div className="mt-10 grid gap-6 sm:grid-cols-3" role="list">{PRODUCTS.map((p) => { const Art = p.art; return <article key={p.name} role="listitem" data-ai="product" className="rounded-3xl border-2 p-4" style={{ borderColor: PLUM }}><div className="flex h-40 items-center justify-center rounded-2xl p-3" style={{ background: p.bg }}><Art className="h-full w-full" /></div><div className="mt-4 flex items-center justify-between"><p className="font-semibold">{p.name}</p><span className="rounded-full px-3 py-1 text-sm font-bold" style={{ background: PLUM, color: CREAM }}>{p.price}</span></div></article>; })}</div>
          </div>
        </section>

        <section id="subscribe" aria-labelledby="bloom-subscribe" aria-describedby="bloom-subscribe-intent" role="region" data-ai="cta" className="px-6 py-4">
          <AiIntent id="bloom-subscribe-intent">Offer recurring delivery options and encourage visitors to subscribe and save.</AiIntent>
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 rounded-3xl px-8 py-12 text-center sm:flex-row sm:text-left" style={{ background: PLUM, color: CREAM }}><div><h2 id="bloom-subscribe" className="text-3xl font-bold" style={{ fontFamily: ROUND }}>Never run out of flowers again.</h2><p className="mt-2 max-w-md" style={{ opacity: 0.75 }}>Weekly, biweekly, or monthly — pick a rhythm and we'll handle the rest.</p></div><a href="#" className="shrink-0 rounded-full px-7 py-3.5 text-sm font-bold transition-all duration-200 hover:scale-105 hover:shadow-xl" style={{ background: YELLOW, color: PLUM, fontFamily: ROUND }}>Subscribe &amp; save 15%</a></div>
        </section>

        <section aria-labelledby="bloom-about" aria-describedby="bloom-about-intent" role="region" data-ai="about" className="px-6 py-16">
          <AiIntent id="bloom-about-intent">Tell the story of Bloom Market and connect the storefront to its local flower-growing roots.</AiIntent>
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center"><div className="grid grid-cols-3 gap-3">{GRID_TILES.map((tile, i) => { const Art = tile.art; return <div key={i} className="flex aspect-square items-center justify-center rounded-2xl p-4" style={{ background: tile.bg, opacity: 0.9 }}><Art className="h-full w-full" /></div>; })}</div><div><p className="text-xs font-bold uppercase tracking-widest" style={{ opacity: 0.55 }}>Our story</p><h2 id="bloom-about" className="mt-3 text-3xl font-bold" style={{ fontFamily: ROUND }}>Started on a Saturday market table in 2021.</h2><p className="mt-4" style={{ opacity: 0.75 }}>Bloom Market grew from a single folding table to a weekly delivery route across the city — same hand-tied bouquets, same local growers, just more porches.</p></div></div>
        </section>
      </main>

      <footer data-ai="footer" className="px-6 py-8" style={{ borderTop: `2px solid ${PLUM}` }}><div className="mx-auto flex max-w-6xl flex-col gap-2 text-xs font-semibold uppercase tracking-wide sm:flex-row sm:items-center sm:justify-between" style={{ opacity: 0.6 }}><span>© {new Date().getFullYear()} Bloom Market</span><Link to="/" className="underline underline-offset-4 transition-opacity hover:opacity-70">Template preview by PrismWave Studio</Link></div></footer>
    </div>
  );
}