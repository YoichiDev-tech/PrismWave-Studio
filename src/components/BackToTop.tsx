import { useEffect, useState } from "react";
import { scrollToSection } from "../lib/scroll";

/*
  Fixed back-to-top control.
  Shows when the visitor is near the bottom of the page (contact / footer zone).
  Scrolls to #top with the same helper as the rest of the site — no navigation,
  no remount, no full reload. Safer than the logo link on slow connections.
*/

const NEAR_BOTTOM_PX = 900;

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const scrollY = window.scrollY;
      const viewport = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const distanceFromBottom = docHeight - (scrollY + viewport);
      // Near contact/footer, and not still at the very top
      setVisible(distanceFromBottom < NEAR_BOTTOM_PX && scrollY > 400);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const goTop = () => {
    // Prefer the hero anchor so scroll-margin under the fixed nav is respected
    if (document.getElementById("top")) {
      scrollToSection("top");
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={goTop}
      aria-label="Back to top"
      title="Back to top"
      className={`fixed bottom-24 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-ink-line bg-ink-2 text-paper shadow-lg transition-all duration-300 hover:border-amber hover:text-amber focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber sm:bottom-28 sm:right-6 ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12 19V5M12 5l-6 6M12 5l6 6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}