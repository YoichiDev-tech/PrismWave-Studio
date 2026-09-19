import type { ReactNode } from "react";
import { Link } from "react-router-dom";

const LINKS = [
  { label: "Work", href: "/#work" },
  { label: "Pricing", href: "/#pricing" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

// Build-in-public social channels 
// Centralized here so the same list can be reused (e.g. Nav, a future "Follow the build" section) 
// without duplicating hrefs across components
// Update handles in one place if they ever change
const SOCIALS: { label: string; href: string; icon: ReactNode }[] = [
  {
    label: "Threads",
    href: "https://www.threads.net/@yoichidev",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 2c5.2 0 8.5 3.3 8.5 8.2 0 4-2.1 6.5-5.4 7.4-.5.1-1-.2-1.1-.7-.1-.5.2-1 .7-1.1 2.5-.7 4-2.6 4-5.6 0-3.9-2.5-6.4-6.7-6.4-4.3 0-6.9 2.6-6.9 6.8 0 3.7 2 6.1 5.2 6.6.4-1.2.4-2.5-.1-3.6-.5-1.2-1.5-1.9-2.8-1.9-1 0-1.7.5-1.7 1.3 0 .7.5 1.1 1.3 1.1.3 0 .6-.1.8-.2.4-.2.9 0 1.1.4.2.4 0 .9-.4 1.1-.5.3-1 .4-1.5.4-1.8 0-3.1-1.1-3.1-2.8 0-1.7 1.4-3 3.5-3 1.9 0 3.4 1 4.1 2.7.6 1.4.6 3-.1 4.5 3.7-.9 5.7-3.6 5.7-7.7 0-4-2.6-6.4-6.7-6.4S5.3 6.3 5.3 10.5c0 1 .1 1.9.4 2.7.2.5-.1 1-.6 1.2-.5.2-1-.1-1.2-.6-.4-1-.5-2.1-.5-3.3C3.4 5.5 6.9 2 12 2Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/yoichidev",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer data-ai="footer" className="border-t border-ink-line bg-ink cursor-default">
      <div
        className="mx-auto max-w-6xl px-6 py-14"
        style={{ paddingBottom: "max(3.5rem, env(safe-area-inset-bottom))" }}
      >
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <a href="/" className="flex items-center gap-2.5 font-display text-lg font-semibold text-paper">
              <svg width="22" height="22" viewBox="0 0 26 26" fill="none" aria-hidden="true">
                <path
                  d="M2 15c2.5 0 2.5-6 5-6s2.5 6 5 6 2.5-6 5-6 2.5 6 5 6"
                  stroke="url(#footer-wave)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="footer-wave" x1="2" y1="0" x2="24" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFB84D" />
                    <stop offset="0.5" stopColor="#FF7A59" />
                    <stop offset="1" stopColor="#6C63FF" />
                  </linearGradient>
                </defs>
              </svg>
              PrismWave
            </a>
            <p className="mt-3 max-w-xs text-sm text-ink-soft">
              Websites for small businesses that want to look — and load — as
              good as they perform.
            </p>

            <div className="mt-5 flex items-center gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-line text-ink-soft transition-colors hover:border-amber hover:text-paper"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="flex gap-10 sm:gap-16">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">Menu</p>
              <ul className="mt-4 space-y-2.5">
                {LINKS.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className="text-sm text-paper/80 transition-colors hover:text-paper">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">Contact</p>
              <ul className="mt-4 space-y-2.5 text-sm text-paper/80">
                <li>yoichi_dev@proton.me</li>
                <li>Mon-Fri, 9:00am-5:30pm</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-ink-line pt-6">
          <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">Legal &amp; regulatory</p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm text-paper/70">
            <Link to="/terms" className="min-h-11 inline-flex items-center transition-colors hover:text-paper">Terms of Use</Link>
            <Link to="/privacy" className="min-h-11 inline-flex items-center transition-colors hover:text-paper">Privacy</Link>
            <Link to="/regulatory" className="min-h-11 inline-flex items-center transition-colors hover:text-paper">Regulatory Information</Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ink-line pt-6 font-mono text-[11px] uppercase tracking-wide text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} PrismWave Studio. All rights reserved.</p>
          <p>Designed &amp; built in-house.</p>
        </div>
      </div>
    </footer>
  );
}