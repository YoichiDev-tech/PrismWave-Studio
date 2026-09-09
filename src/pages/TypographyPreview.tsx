import AiMetadata from "../components/AiMetadata";

export default function TypographyPreview() {
    return (
        <div className="p-12 space-y-12">
            <AiMetadata
                map={["Typography heading scale", "Body text", "Caption text", "Label text"]}
                intent="Preview the typography hierarchy used across PrismWave Studio."
                tags={["typography", "design system", "font scale", "UI foundations"]}
                extract={{ title: "Typography Preview", audience: "Designers and developers", primaryActions: "Review heading and text styles", format: "Visual type specimen" }}
            />
            <h1 className="text-5xl font-body">Heading 1</h1>
            <h2 className="text-4xl font-semibold">Heading 2</h2>
            <h3 className="text-3xl font-medium">Heading 3</h3>

            <p className="text-lg">
                Body text preview showing spacing and hierarchy.
            </p>

            <p className="text-sm text-gray-600">
                Caption text preview for secondary information.
            </p>

            <p className="text-xs uppercase tracking-wide text-gray-500">
                Label text preview
            </p>
        </div>
    );
}