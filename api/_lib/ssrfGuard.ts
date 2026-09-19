import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

// Hostnames that resolve to "here" no matter what DNS says.
const BLOCKED_HOSTNAMES = new Set(["localhost", "localhost.localdomain", "metadata.google.internal"]);

function isPrivateOrReservedIpv4(ip: string): boolean {
  const [a, b] = ip.split(".").map(Number);
  if (Number.isNaN(a) || Number.isNaN(b)) return true; // malformed — treat as unsafe
  if (a === 0) return true; // "this network"
  if (a === 10) return true; // 10.0.0.0/8
  if (a === 127) return true; // loopback
  if (a === 169 && b === 254) return true; // link-local, incl. 169.254.169.254 cloud metadata
  if (a === 172 && b >= 16 && b <= 31) return true; // 172.16.0.0/12
  if (a === 192 && b === 168) return true; // 192.168.0.0/16
  if (a === 100 && b >= 64 && b <= 127) return true; // 100.64.0.0/10 carrier-grade NAT
  return false;
}

function isPrivateOrReservedIpv6(ip: string): boolean {
  const lower = ip.toLowerCase();
  if (lower === "::1") return true; // loopback
  if (lower === "::") return true; // unspecified
  if (lower.startsWith("fe80:") || lower.startsWith("fe80::")) return true; // link-local
  if (lower.startsWith("fc") || lower.startsWith("fd")) return true; // unique local (fc00::/7)
  if (lower.startsWith("::ffff:")) {
    // IPv4-mapped IPv6 address — check the embedded IPv4 too
    const mapped = lower.split(":").pop();
    if (mapped && mapped.includes(".")) return isPrivateOrReservedIpv4(mapped);
  }
  return false;
}

function isPrivateOrReservedIp(ip: string): boolean {
  const version = isIP(ip);
  if (version === 4) return isPrivateOrReservedIpv4(ip);
  if (version === 6) return isPrivateOrReservedIpv6(ip);
  return true; // not a recognizable IP literal — treat as unsafe
}

/**
 * Throws if `rawUrl` isn't a safe target for a server-side fetch: wrong
 * protocol, a blocked hostname, or a hostname/IP that resolves into a
 * private, loopback, or link-local range (including the cloud metadata
 * endpoint at 169.254.169.254).
 *
 * Known limitation: this checks the DNS answer at call time, but fetch()
 * re-resolves the hostname itself a moment later, so a DNS record that
 * changes between the two lookups (DNS rebinding) isn't caught. That's an
 * acceptable risk for a free lead-gen tool; pin the resolved IP for the
 * actual request (custom dns lookup / undici Agent) if this ever needs to
 * be airtight.
 */
export async function assertPublicHttpUrl(rawUrl: string): Promise<void> {
  const url = new URL(rawUrl);

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("Only http(s) URLs are supported.");
  }

  const hostname = url.hostname.toLowerCase();
  if (BLOCKED_HOSTNAMES.has(hostname)) {
    throw new Error("That host can't be audited.");
  }

  if (isIP(hostname)) {
    if (isPrivateOrReservedIp(hostname)) throw new Error("That host can't be audited.");
    return;
  }

  const records = await lookup(hostname, { all: true });
  if (records.length === 0) {
    throw new Error("That host doesn't resolve to anything.");
  }
  for (const record of records) {
    if (isPrivateOrReservedIp(record.address)) {
      throw new Error("That host can't be audited.");
    }
  }
}