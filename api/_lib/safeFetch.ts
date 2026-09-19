import { TextDecoder } from "node:util";
import { assertPublicHttpUrl } from "./ssrfGuard.js";

const BOT_UA = "Mozilla/5.0 (compatible; PrismWaveStudio-PreviewBot/1.0; +https://prismwavestudio.com)";

/**
 * Fetches a URL following redirects manually so EVERY hop is SSRF-checked,
 * not just the first one (fetch()'s built-in redirect: "follow" would happily
 * chase a redirect into a private IP after the first check passed).
 */
export async function fetchPublicPage(
  startUrl: string,
  signal: AbortSignal,
  maxRedirects = 4
): Promise<{ response: Response; finalUrl: string }> {
  let currentUrl = startUrl;

  for (let hop = 0; hop <= maxRedirects; hop++) {
    await assertPublicHttpUrl(currentUrl);

    const response = await fetch(currentUrl, {
      signal,
      redirect: "manual",
      headers: {
        "User-Agent": BOT_UA,
        Accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.5",
        "Accept-Language": "en;q=0.9,*;q=0.5",
      },
    });

    const isRedirect = response.status >= 300 && response.status < 400;
    const location = response.headers.get("location");

    if (isRedirect && location) {
      currentUrl = new URL(location, currentUrl).toString();
      continue;
    }

    return { response, finalUrl: currentUrl };
  }

  throw new Error("Too many redirects.");
}

/** Reads a response body as text but stops after maxBytes so a huge page can't exhaust memory. */
export async function readTextCapped(response: Response, maxBytes: number): Promise<string> {
  const contentType = response.headers.get("content-type") ?? "";
  const charset = /charset=([^;\s]+)/i.exec(contentType)?.[1]?.replace(/["']/g, "") ?? "utf-8";

  let decoder: TextDecoder;
  try {
    decoder = new TextDecoder(charset);
  } catch {
    decoder = new TextDecoder("utf-8");
  }

  const reader = response.body?.getReader();
  if (!reader) return (await response.text()).slice(0, maxBytes);

  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    total += value.byteLength;
    if (total >= maxBytes) {
      await reader.cancel();
      break;
    }
  }

  return decoder.decode(Buffer.concat(chunks));
}
