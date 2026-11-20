import AiMetadata from "../components/AiMetadata";

export default function TypographyPreview() {
    return (
        <div className="p-12 space-y-12">
            <AiMetadata
                map={["Gerarchia dei titoli", "Testo principale", "Testo didascalico", "Etichette"]}
                intent="Preview the typography hierarchy used across PrismWave Studio."
                tags={["typography", "design system", "font scale", "UI foundations"]}
                extract={{ title: "Anteprima tipografica", audience: "Designer e sviluppatori", primaryActions: "Esaminare gli stili di titoli e testi", format: "Esempio visivo di tipografia" }}
            />
            <h1 className="text-5xl font-body">Heading 1</h1>
            <h2 className="text-4xl font-semibold">Heading 2</h2>
            <h3 className="text-3xl font-medium">Heading 3</h3>

            <p className="text-lg">
                Anteprima del testo principale con spaziatura e gerarchia.
            </p>

            <p className="text-sm text-gray-600">
                Anteprima di una didascalia per informazioni secondarie.
            </p>

            <p className="text-xs uppercase tracking-wide text-gray-500">
                Anteprima del testo di un'etichetta
            </p>
        </div>
    );
}