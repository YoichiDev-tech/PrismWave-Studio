import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Intent } from "../pages/Home";

// Href starting with "/" routes via react-router (Lab is its own page)
// Anchors ("#...") stay as in-page scroll links on the Home page
const LINKS: { label: string; href: string; intent?: Intent }[] = [
  { label: "Services", href: "#services" },
  { label: "Build", href: "#build", intent: "build" },
  { label: "Work", href: "/work" },
  { label: "Lab", href: "/lab" },
  { label: "Why Us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

interface NavProps {
  onSelectIntent: (intent: Intent) => void;
}

export default function Nav({ onSelectIntent }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLinkClick = () => setOpen(false);

  return (
    <header
      style={{ paddingTop: "env(safe-area-inset-top)" }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-ink/85 backdrop-blur-md border-b border-ink-line"
          : "bg-transparent border-b border-transparent cursor-default"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#top"
          className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight text-paper"
        >
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
            <path
              d="M2 15c2.5 0 2.5-6 5-6s2.5 6 5 6 2.5-6 5-6 2.5 6 5 6"
              stroke="url(#nav-wave)"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="nav-wave" x1="2" y1="0" x2="24" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFB84D" />
                <stop offset="0.5" stopColor="#FF7A59" />
                <stop offset="1" stopColor="#6C63FF" />
              </linearGradient>
            </defs>
          </svg>
          PrismWave
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) =>
            link.href.startsWith("/") ? (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className="font-mono text-[13px] uppercase tracking-wide text-ink-soft transition-colors hover:text-paper"
                >
                  {link.label}
                </Link>
              </li>
            ) : (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={link.intent ? () => onSelectIntent(link.intent as Intent) : undefined}
                  className="font-mono text-[13px] uppercase tracking-wide text-ink-soft transition-colors hover:text-paper"
                >
                  {link.label}
                </a>
              </li>
            )
          )}
        </ul>

        <a
          href="#contact"
          onClick={() => onSelectIntent("audit")}
          className="hidden rounded-full bg-paper px-5 py-2.5 font-display text-sm font-semibold text-ink transition-transform hover:scale-[1.03] md:inline-block"
        >
          Get a Free Audit
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="relative -mr-2.5 flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-[1.5px] w-5 bg-paper transition-transform duration-300 ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-[1.5px] w-5 bg-paper transition-transform duration-300 ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-ink-line bg-ink px-6 pb-6 md:hidden"
          style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
        >
          <ul className="flex flex-col gap-1 pt-4">
            {LINKS.map((link) =>
              link.href.startsWith("/") ? (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    onClick={handleLinkClick}
                    className="block py-2.5 font-mono text-sm uppercase tracking-wide text-ink-soft hover:text-paper"
                  >
                    {link.label}
                  </Link>
                </li>
              ) : (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => {
                      if (link.intent) onSelectIntent(link.intent);
                      handleLinkClick();
                    }}
                    className="block py-2.5 font-mono text-sm uppercase tracking-wide text-ink-soft hover:text-paper"
                  >
                    {link.label}
                  </a>
                </li>
              )
            )}
          </ul>
          <a
            href="#contact"
            onClick={() => {
              onSelectIntent("audit");
              handleLinkClick();
            }}
            className="mt-3 inline-block rounded-full bg-paper px-5 py-2.5 font-display text-sm font-semibold text-ink"
          >
            Get a Free Audit
          </a>
        </div>
      )}
    </header>
  );
}