
import { Link } from "react-router-dom";
import AiMetadata from "../components/AiMetadata";
import Footer from "../components/Footer";
import Portfolio from "../components/Portfolio";

export default function Work() {
	return (
		<div className="min-h-screen bg-ink text-paper">
			<AiMetadata
				map={["Work introduction", "Selected templates", "Project cards", "Studio footer"]}
				intent="Showcase PrismWave Studio website work and direct visitors to complete portfolio templates and case studies."
				tags={["web design portfolio", "website templates", "case studies", "PrismWave Studio work"]}
				extract={{ title: "PrismWave Studio Work", audience: "Founders and businesses evaluating a website studio", primaryActions: "Open a project template or case study", projects: "Fielding & Rye, Nova Cloud, Bloom Market" }}
			/>
			<header className="border-b border-ink-line">
				<div className="mx-auto max-w-6xl px-6 py-6">
					<Link to="/" className="font-mono text-[12px] uppercase tracking-wide text-paper/60 hover:text-paper">
						&larr; Back to studio
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

