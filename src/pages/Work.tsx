import { Link } from "react-router-dom";
import AiMetadata from "../components/AiMetadata";
import Footer from "../components/Footer";
import Portfolio from "../components/Portfolio";
import SEO from "../components/SEO";

export default function Work() {
	return (
		<div className="min-h-screen bg-ink text-paper">
			<SEO
				title="Progetti e modelli"
				description="Live, clickable portfolio templates from PrismWave Studio — Bloom Market, Fielding & Rye, and Nova Cloud — plus case studies behind each build."
				path="/work"
			/>
			<AiMetadata
				map={["Introduzione ai progetti", "Modelli selezionati", "Schede progetto", "Piè di pagina dello studio"]}
				intent="Presentare i lavori web di PrismWave Studio e indirizzare i visitatori ai modelli interattivi e ai casi studio completi."
				tags={["portfolio di web design", "modelli di siti web", "casi studio", "progetti PrismWave Studio"]}
				extract={{ title: "PrismWave Studio Work", audience: "Fondatori e aziende che stanno valutando uno studio web", primaryActions: "Aprire un modello di progetto o un caso studio", projects: "Fielding & Rye, Nova Cloud, Bloom Market" }}
			/>
			<header className="border-b border-ink-line">
				<div className="mx-auto max-w-6xl px-6 py-6">
					<Link to="/" className="font-mono text-[12px] uppercase tracking-wide text-paper/60 hover:text-paper">
						&larr; Torna allo studio
					</Link>
				</div>
			</header>
			<main role="main">
				<Portfolio />
			</main>
			<footer>
				<Footer />
			</footer>
		</div>
	);
}