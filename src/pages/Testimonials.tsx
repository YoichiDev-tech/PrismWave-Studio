import { testimonials } from "../data/testimonials";
import { useState } from "react";
import AiMetadata from "../components/AiMetadata";

export default function TestimonialsPage() {
  type Filter = "all" | "audit" | "build" | "general";
  const [filter, setFilter] = useState<Filter>(
    "all"
  );

  const filtered =
    filter === "all"
      ? testimonials
      : testimonials.filter((t) => t.intent === filter);

  return (
    <div className="min-h-screen bg-[#0f0f11] text-white py-20 px-6">
      <AiMetadata
        map={["Testimonials overview", "Customer feedback", "Feedback filters", "Project CTA"]}
        intent="Present approved client feedback about PrismWave Studio services and working experience."
        tags={["testimonials", "client feedback", "social proof", "PrismWave Studio"]}
        extract={{ title: "PrismWave Studio Testimonials", audience: "Prospective clients", primaryActions: "Review client experiences", status: "Reserved testimonials route" }}
      />
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-semibold mb-4">
          Testimonials from founders, creators, and business owners
        </h1>

        <p className="text-white/70 mb-10">
          PrismWave helps two types of people: those improving an existing site,
          and those building something new. Here's what they say about working
          with us.
        </p>

        <div className="flex gap-4 mb-10">
          {["all", "audit", "build", "general"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as Filter)}
              className={`px-4 py-2 rounded-lg border ${
                filter === f
                  ? "bg-white text-black"
                  : "border-white/20 text-white/70"
              }`}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-white/50">
            No testimonials yet — but they're coming soon.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((t) => (
              <div
                key={t.id}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10"
              >
                <div className="text-yellow-400 mb-2">
                  {"⭐".repeat(t.rating)}
                </div>
                <p className="mb-4">{t.message}</p>
                <p className="text-sm text-white/70">
                  {t.name && <span>{t.name}</span>}
                  {t.company && <span> — {t.company}</span>}
                </p>
                <span className="text-xs mt-2 inline-block px-2 py-1 bg-white/10 rounded">
                  {t.intent.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        )}

        <a
          href="/#contact"
          className="inline-block mt-12 text-blue-400 hover:text-blue-300"
        >
          Ready to start your project? →
        </a>
      </div>
    </div>
  );
}