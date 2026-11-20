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
        title="Prodotti"
        description="Scopri strumenti e prodotti digitali realizzati da PrismWave Studio."
        path="/products"
      />
      <AiMetadata
        map={["Introduzione ai prodotti", "Griglia dei prodotti", "Piè di pagina dello studio"]}
        intent="Mostrare i prodotti di PrismWave Studio e invitare i visitatori a esplorarli o ad avviare un'analisi."
         tags={["products", "tools", "directory", "PrismWave"]}
        extract={{
          title: "PrismWave Studio Products",
          audience: "Fondatori, sviluppatori indipendenti e piccole imprese",
          primaryActions: "Aprire un prodotto o avviare un'analisi gratuita",
        }}
      />

      <header className="border-b border-ink-line">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <Link
            to="/"
            className="font-mono text-[12px] uppercase tracking-wide text-paper/60 transition-colors hover:text-paper"
          >
            ← Torna allo studio
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">Prodotti</p>
        <h1 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Strumenti e prodotti digitali realizzati dallo studio.
        </h1>
        <p className="mt-4 max-w-xl text-ink-soft">
          Scopri strumenti utili, directory selezionate e prodotti digitali pronti per il lancio.
        </p>

        {tagFilter && (
          <p className="mt-6 text-sm text-ink-soft">
            Filtro per etichetta: <span className="text-paper">{tagFilter}</span>
          </p>
        )}

        {filtered.length === 0 ? (
          <p className="mt-12 text-ink-soft">
            Nessun prodotto corrisponde a questo filtro. Rimuovi l'etichetta oppure visualizza tutti i prodotti.
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
