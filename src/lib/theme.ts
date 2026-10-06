import type { Theme } from "../types/theme";

/* localStorage key. The inline script in index.html reads the SAME key — keep both in sync */
export const THEME_STORAGE_KEY = "prismwave-theme";

/* Dark is the brand default. Only an explicit visitor choice ever overrides it */
export const DEFAULT_THEME: Theme = "dark";

/* Mirrors --color-ink in each theme, for the mobile browser chrome (<meta name="theme-color">) */
export const THEME_META_COLOR: Record<Theme, string> = {
  dark: "#0A0E1A",
  light: "#F3F4F1",
};

export function isTheme(value: unknown): value is Theme {
  return value === "dark" || value === "light";
}

export function readStoredTheme(): Theme | null {
  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(value) ? value : null;
  } catch {
    // Private mode / blocked storage — just fall back to the default
    return null;
  }
}

export function storeTheme(theme: Theme): void {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Non-fatal: the theme still applies for this session
  }
}

export function getCurrentTheme(): Theme {
  if (typeof document === "undefined") return DEFAULT_THEME;
  const attr = document.documentElement.getAttribute("data-theme");
  return isTheme(attr) ? attr : DEFAULT_THEME;
}

export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);

  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", THEME_META_COLOR[theme]);
}