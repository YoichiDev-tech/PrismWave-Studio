import { useNavigate } from "react-router-dom";
import { ScanSearch, Sparkles } from "lucide-react";

export default function IntentRouter() {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <p className="font-mono text-xs uppercase tracking-widest text-ink-soft text-center mb-4">
        Start here
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        <button
          type="button"
          aria-label="Run free website audit"
          onClick={() => navigate("/audit")}
          className="group relative text-left rounded-2xl border border-ink-line bg-paper p-6 
                     hover:border-coral hover:shadow-md hover:shadow-ink-soft/20 
                     transition-all cursor-pointer active:scale-[0.99]
                     focus-visible:ring focus-visible:ring-coral/40"
        >
          <ScanSearch size={22} className="text-coral mb-3" />
          <p className="font-display text-base font-semibold text-ink">
            I already have a site
          </p>
          <p className="font-inter text-sm text-ink-soft mt-1 leading-relaxed">
            Find out if it still looks and performs like it should — free audit, no pitch attached.
          </p>
          <span className="font-mono text-xs text-coral mt-4 inline-block group-hover:translate-x-1 transition-transform">
            Run my free audit →
          </span>
        </button>

        <button
          type="button"
          aria-label="Start new website build"
          onClick={() => navigate("/start")}
          className="group relative text-left rounded-2xl border border-ink-line bg-paper p-6 
                     hover:border-violet hover:shadow-md hover:shadow-ink-soft/20 
                     transition-all cursor-pointer active:scale-[0.99]
                     focus-visible:ring focus-visible:ring-violet/40"
        >
          <Sparkles size={22} className="text-violet mb-3" />
          <p className="font-display text-base font-semibold text-ink">
            I have an idea, no site yet
          </p>
          <p className="font-inter text-sm text-ink-soft mt-1 leading-relaxed">
            Barbershop, supermarket, a passion project — tell us what it is and what it needs to become.
          </p>
          <span className="font-mono text-xs text-violet mt-4 inline-block group-hover:translate-x-1 transition-transform">
            Start my build →
          </span>
        </button>
      </div>
    </div>
  );
}
