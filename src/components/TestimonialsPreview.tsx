import { testimonials } from "../data/testimonials";

export default function TestimonialsPreview() {
  const preview = testimonials.slice(0, 3);

  return (
    <section className="py-20 bg-[#0f0f11] text-white cursor-default">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-semibold mb-8">
          Cosa dicono di PrismWave
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {preview.map((t) => (
            <div
              key={t.id}
              className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10"
            >
              <div className="text-yellow-400 mb-2">
                {"⭐".repeat(t.rating)}
              </div>
              <p className="text-sm mb-4">{t.message}</p>
              <p className="text-xs text-white/70">
                {t.name && <span>{t.name}</span>}
                {t.company && <span> — {t.company}</span>}
              </p>
              <span className="text-xs mt-2 inline-block px-2 py-1 bg-white/10 rounded">
                {t.intent.toUpperCase()}
              </span>
            </div>
          ))}
        </div>

        <a
          href="/testimonials"
          className="inline-block mt-8 text-blue-400 hover:text-blue-300"
        >
          Leggi tutte le testimonianze →
        </a>
      </div>
    </section>
  );
}