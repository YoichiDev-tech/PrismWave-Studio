import { useCallback, useSyncExternalStore } from "react";
import type { Theme } from "../types/theme";
import {
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
  applyTheme,
  getCurrentTheme,
  isTheme,
  storeTheme,
} from "../lib/theme";

// The <html data-theme> attribute is the single source of truth. Watching it means
// every ThemeToggle on screen (desktop + mobile nav) stays in sync with no provider.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  // Keep multiple open tabs in sync
  const onStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY && isTheme(event.newValue)) {
      applyTheme(event.newValue);
    }
  };
  window.addEventListener("storage", onStorage);

  return () => {
    observer.disconnect();
    window.removeEventListener("storage", onStorage);
  };
}

const getServerSnapshot = (): Theme => DEFAULT_THEME;

export default function useTheme() {
  const theme = useSyncExternalStore(subscribe, getCurrentTheme, getServerSnapshot);

  const setTheme = useCallback((next: Theme) => {
    applyTheme(next);
    storeTheme(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(getCurrentTheme() === "dark" ? "light" : "dark");
  }, [setTheme]);

  return { theme, setTheme, toggleTheme };
}