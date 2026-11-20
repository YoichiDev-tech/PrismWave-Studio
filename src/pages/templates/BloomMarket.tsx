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
  { name: "Bouquet della domenica", price: "$38", bg: PINK, art: SundayBouquet },
  { name: "Vaso agli agrumi e alle erbe", price: "$22", bg: YELLOW, art: CitrusHerbJar },
  { name: "Composizione di fiori essiccati", price: "$28", bg: MINT, art: DriedBloomBundle },
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
        title="Bloom Market — Modello dimostrativo"
        description="A bright, fast storefront template for flower delivery and small retail businesses, built by PrismWave Studio."
        path="/work/bloom-market"
      />
      <AiMetadata
        map={["Presentazione del negozio di fiori", "Prodotti preferiti della settimana", "Offerta in abbonamento", "Storia del marchio"]}
        intent="Presentare un negozio di fiori con consegna a domicilio e guidare i visitatori verso l'acquisto o l'abbonamento."
        tags={["negozio di fiori", "modello e-commerce", "consegna di fiori", "commercio in abbonamento", "vendita al dettaglio locale"]}
        extract={{ title: "Bloom Market", audience: "Persone interessate ad acquistare bouquet e piante facili da curare", primaryActions: "Acquistare la selezione settimanale o attivare un abbonamento", products: "Bouquet della domenica $38; Vaso agli agrumi e alle erbe $22; Composizione di fiori essiccati $28", cadence: "Nuova selezione ogni venerdì" }}
      />
      <BackToStudioBadge tone="light" />
      <PickThisTemplateBadge tone="light" />

      <header data-ai="navigation" className="px-6 py-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <p className="text-xl font-bold" style={{ fontFamily: ROUND }}>Bloom Market</p>
          <ul className="hidden gap-8 text-sm font-medium md:flex" style={{ opacity: 0.75 }}>
            <li>Negozio</li><li>Abbonamenti</li><li>Chi siamo</li><li>Dove siamo</li>
          </ul>
          <a href="#shop" className="rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-200 hover:scale-105 hover:shadow-xl" style={{ background: PLUM, color: CREAM, fontFamily: ROUND }}>Acquista la selezione</a>
        </div>
      </header>

      <main data-ai="main-content">
        <section aria-labelledby="bloom-hero" aria-describedby="bloom-hero-intent" role="region" data-ai="hero" className="relative overflow-hidden px-6 pb-20 pt-10">
          <AiIntent id="bloom-hero-intent">Presentare Bloom Market e guidare i visitatori verso l'acquisto o l'attivazione di un abbonamento floreale.</AiIntent>
          <div aria-hidden="true" className="absolute -right-16 top-0 h-64 w-64 rotate-12 rounded-[45%]" style={{ background: PINK, opacity: 0.9 }} />
          <div aria-hidden="true" className="absolute bottom-0 left-[-4rem] h-48 w-48 -rotate-6 rounded-[45%]" style={{ background: YELLOW, opacity: 0.85 }} />
          <div className="relative mx-auto max-w-6xl">
            <p className="inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wide" style={{ background: PLUM, color: CREAM, fontFamily: ROUND }}>Nuova selezione ogni venerdì</p>
            <h1 id="bloom-hero" className="mt-6 max-w-2xl text-6xl font-bold leading-[0.95] sm:text-7xl" style={{ fontFamily: ROUND }}>Fiori freschi,<br />senza bisogno<br />del pollice verde.</h1>
            <p className="mt-6 max-w-md text-lg" style={{ opacity: 0.75 }}>Bouquet realizzati a mano e piante facili da curare, consegnati a casa ogni settimana. Puoi sospendere o interrompere quando vuoi.</p>
            <div className="mt-8 flex flex-wrap gap-4"><a href="#shop" data-ai="cta" className="rounded-full px-7 py-3.5 text-sm font-bold transition-all duration-200 hover:scale-105 hover:shadow-xl" style={{ background: PINK, color: PLUM, fontFamily: ROUND }}>Acquista la selezione</a><a href="#subscribe" className="rounded-full border-2 px-7 py-3.5 text-sm font-bold transition-all duration-200 hover:scale-105 hover:shadow-xl" style={{ borderColor: PLUM, fontFamily: ROUND }}>Attiva un abbonamento</a></div>
          </div>
        </section>

        <section id="shop" aria-labelledby="bloom-products" aria-describedby="bloom-products-intent" role="region" data-ai="products" className="px-6 py-16">
          <AiIntent id="bloom-products-intent">Presentare i fiori e le piante disponibili questa settimana, con i relativi prezzi.</AiIntent>
          <div className="mx-auto max-w-6xl"><div className="flex items-end justify-between"><h2 id="bloom-products" className="text-3xl font-bold" style={{ fontFamily: ROUND }}>I preferiti della settimana</h2><span className="text-sm font-semibold underline underline-offset-4">Visualizza tutti</span></div>
            <div className="mt-10 grid gap-6 sm:grid-cols-3" role="list">{PRODUCTS.map((p) => { const Art = p.art; return <article key={p.name} role="listitem" data-ai="product" className="rounded-3xl border-2 p-4" style={{ borderColor: PLUM }}><div className="flex h-40 items-center justify-center rounded-2xl p-3" style={{ background: p.bg }}><Art className="h-full w-full" /></div><div className="mt-4 flex items-center justify-between"><p className="font-semibold">{p.name}</p><span className="rounded-full px-3 py-1 text-sm font-bold" style={{ background: PLUM, color: CREAM }}>{p.price}</span></div></article>; })}</div>
          </div>
        </section>

        <section id="subscribe" aria-labelledby="bloom-subscribe" aria-describedby="bloom-subscribe-intent" role="region" data-ai="cta" className="px-6 py-4">
          <AiIntent id="bloom-subscribe-intent">Presentare le opzioni di consegna ricorrente e invitare i visitatori ad abbonarsi risparmiando.</AiIntent>
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 rounded-3xl px-8 py-12 text-center sm:flex-row sm:text-left" style={{ background: PLUM, color: CREAM }}><div><h2 id="bloom-subscribe" className="text-3xl font-bold" style={{ fontFamily: ROUND }}>Non restare mai senza fiori.</h2><p className="mt-2 max-w-md" style={{ opacity: 0.75 }}>Ogni settimana, ogni due settimane o una volta al mese: scegli la frequenza, al resto pensiamo noi.</p></div><a href="#" className="shrink-0 rounded-full px-7 py-3.5 text-sm font-bold transition-all duration-200 hover:scale-105 hover:shadow-xl" style={{ background: YELLOW, color: PLUM, fontFamily: ROUND }}>Abbonati e risparmia il 15%</a></div>
        </section>

        <section aria-labelledby="bloom-about" aria-describedby="bloom-about-intent" role="region" data-ai="about" className="px-6 py-16">
          <AiIntent id="bloom-about-intent">Raccontare la storia di Bloom Market e collegare il negozio alle sue radici nella floricoltura locale.</AiIntent>
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center"><div className="grid grid-cols-3 gap-3">{GRID_TILES.map((tile, i) => { const Art = tile.art; return <div key={i} className="flex aspect-square items-center justify-center rounded-2xl p-4" style={{ background: tile.bg, opacity: 0.9 }}><Art className="h-full w-full" /></div>; })}</div><div><p className="text-xs font-bold uppercase tracking-widest" style={{ opacity: 0.55 }}>La nostra storia</p><h2 id="bloom-about" className="mt-3 text-3xl font-bold" style={{ fontFamily: ROUND }}>Tutto è iniziato su un banco del mercato, un sabato del 2021.</h2><p className="mt-4" style={{ opacity: 0.75 }}>Bloom Market è passato da un semplice banco pieghevole a un servizio di consegna settimanale in tutta la città: gli stessi bouquet preparati a mano e gli stessi coltivatori locali, con molte più case da raggiungere.</p></div></div>
        </section>
      </main>

      <footer data-ai="footer" className="px-6 py-8" style={{ borderTop: `2px solid ${PLUM}` }}><div className="mx-auto flex max-w-6xl flex-col gap-2 text-xs font-semibold uppercase tracking-wide sm:flex-row sm:items-center sm:justify-between" style={{ opacity: 0.6 }}><span>© {new Date().getFullYear()} Bloom Market</span><Link to="/" className="underline underline-offset-4 transition-opacity hover:opacity-70">Anteprima del modello a cura di PrismWave Studio</Link></div></footer>
    </div>
  );
}