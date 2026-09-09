interface AiMetadataProps {
  map: string[];
  intent: string;
  tags: string[];
  extract: Record<string, string>;
}

export default function AiMetadata({ map, intent, tags, extract }: AiMetadataProps) {
  return (
    <div hidden data-ai-metadata="true">
      <section data-ai-block="AI-MAP" aria-label="AI-MAP">
        <h2>AI-MAP</h2>
        <ul>
          {map.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>
      <section data-ai-block="AI-INTENT" aria-label="AI-INTENT">
        <h2>AI-INTENT</h2>
        <p>{intent}</p>
      </section>
      <section data-ai-block="AI-TAG" aria-label="AI-TAG">
        <h2>AI-TAG</h2>
        <ul>
          {tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
      </section>
      <section data-ai-block="AI-EXTRACT" aria-label="AI-EXTRACT">
        <h2>AI-EXTRACT</h2>
        <dl>
          {Object.entries(extract).map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
