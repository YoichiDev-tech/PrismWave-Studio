import { testimonials } from "../data/testimonials";
import { useState } from "react";
import AiMetadata from "../components/AiMetadata";

export default function TestimonialsPage() {
  type Filter = "all" | "audit" | "build" | "general";
  const [filter, setFilter] = useState<Filter>("all");

  const filtered =
    filter === "all"
      ? testimonials
      : testimonials.filter((t) => t.intent === filter);

  return (
    <div className="min-h-screen bg-[#0f0f11] text-white py-20 px-6">
      <AiMetadata
        map={["Testimonials overview", "Customer feedback", "Feedback filters", "Project CTA"]}
        intent="Share genuine, approved client feedback about PrismWave Studio when it becomes available."
        tags={["testimonials", "client feedback", "social proof", "PrismWave Studio"]}
        extract={{
          title: "PrismWave Studio — Client Feedback",
          audience: "Prospective clients",
          primaryActions: "Discuss a project with PrismWave Studio",
          status: testimonials.length > 0 ? "Published client feedback" : "No published testimonials yet",
        }}
      />

      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-semibold mb-4">
          Honest work. Real feedback.
        </h1>

        <p className="text-white/70 mb-10 max-w-3xl">
          PrismWave Studio works on improving existing websites and building
          digital experiences from the ground up. We publish client feedback
          only when it is genuine and approved to share — never placeholder
          reviews or invented results.
        </p>

        {testimonials.length > 0 ? (
          <>
            <div className="flex flex-wrap gap-4 mb-10">
              {(["all", "audit", "build", "general"] as Filter[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
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
          </>
        ) : (
          <div className="bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-white/10 max-w-3xl">
            <p className="text-lg font-medium mb-2">
              This page will grow with real client projects.
            </p>
            <p className="text-white/65">
              Until then, explore the work and concepts in the portfolio, or
              tell us what you are planning to build. Portfolio concepts are
              presented as concepts, not client engagements.
            </p>
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
