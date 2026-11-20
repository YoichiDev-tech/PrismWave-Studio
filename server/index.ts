import "dotenv/config";
import { createHash } from "node:crypto";
import express, { type NextFunction, type Request, type Response } from "express";
import helmet from "helmet";
import { Pool } from "pg";
import { z } from "zod";

const app = express();
const port = Number(process.env.PORT ?? 4000);
const pool = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL, max: 5, ssl: process.env.DATABASE_SSL === "false" ? false : { rejectUnauthorized: true } })
  : null;
const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? "http://localhost:5173,http://127.0.0.1:5173")
  .split(",").map((value) => value.trim()).filter(Boolean);

app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use(helmet());
app.use(express.json({ limit: "20kb" }));
app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;
  if (origin && !allowedOrigins.includes(origin)) {
    res.status(403).json({ ok: false, error: "Origine non autorizzata." });
    return;
  }
  if (origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  }
  if (req.method === "OPTIONS") { res.sendStatus(204); return; }
  next();
});

const leadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  business: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(40).optional().default(""),
  city: z.string().trim().max(120).optional().default(""),
  website: z.string().trim().max(500).optional().default(""),
  message: z.string().trim().min(10).max(3000),
  privacyAccepted: z.literal(true),
});

function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT;
  if (!salt && process.env.NODE_ENV === "production") throw new Error("IP_HASH_SALT must be configured in production.");
  return createHash("sha256").update(`${salt ?? "local-development-only"}:${ip}`).digest("hex");
}

async function rateLimited(ipHash: string): Promise<boolean> {
  if (!pool) return false;
  const result = await pool.query<{ request_count: number }>(
    `insert into api_rate_limits (ip_hash, window_started_at, request_count)
     values ($1, now(), 1)
     on conflict (ip_hash) do update set
       request_count = case when api_rate_limits.window_started_at <= now() - interval '10 minutes' then 1 else api_rate_limits.request_count + 1 end,
       window_started_at = case when api_rate_limits.window_started_at <= now() - interval '10 minutes' then now() else api_rate_limits.window_started_at end
     returning request_count`,
    [ipHash],
  );
  return result.rows[0].request_count > 5;
}

app.get("/api/health", async (_req: Request, res: Response) => {
  if (!pool) { res.status(503).json({ ok: false, databaseConfigured: false }); return; }
  try {
    await pool.query("select 1");
    res.status(200).json({ ok: true, service: "prismwave-leads-api", database: "connected" });
  } catch {
    res.status(503).json({ ok: false, service: "prismwave-leads-api", database: "unavailable" });
  }
});

app.post(["/api/send", "/api/leads"], async (req: Request, res: Response) => {
  const parsed = leadSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ ok: false, error: "Controlla i campi obbligatori e riprova." }); return; }
  if (!pool) { res.status(503).json({ ok: false, error: "Il servizio di contatto non è ancora configurato. Riprova più tardi." }); return; }

  const lead = parsed.data;
  let ipHash: string;
  try {
    ipHash = hashIp(req.ip || "unknown");
    if (await rateLimited(ipHash)) { res.status(429).json({ ok: false, error: "Troppe richieste. Riprova tra qualche minuto." }); return; }
  } catch (error) {
    console.error("Rate-limit preparation failed:", error);
    res.status(503).json({ ok: false, error: "Servizio temporaneamente non disponibile." });
    return;
  }

  let leadId: string;
  try {
    const result = await pool.query<{ id: string }>(
      `insert into leads (name, business, email, phone, city, website, message, ip_hash, user_agent, privacy_notice_acknowledged)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9,true) returning id`,
      [lead.name, lead.business, lead.email, lead.phone || null, lead.city || null, lead.website || null, lead.message, ipHash, (req.headers["user-agent"] ?? "").toString().slice(0, 500)],
    );
    leadId = result.rows[0].id;
  } catch (error) {
    console.error("Lead persistence failed:", error);
    res.status(500).json({ ok: false, error: "Non siamo riusciti a registrare la richiesta. Riprova più tardi." });
    return;
  }

  let notificationSent = false;
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;
  if (apiKey && from && to) {
    try {
      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        signal: AbortSignal.timeout(8000),
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from, to: [to], reply_to: lead.email,
          subject: `Nuova richiesta dal sito — ${lead.business}`,
          text: [
            `ID richiesta: ${leadId}`, `Nome: ${lead.name}`, `Impresa: ${lead.business}`,
            `Email: ${lead.email}`, `Telefono: ${lead.phone || "Non indicato"}`,
            `Comune: ${lead.city || "Non indicato"}`, `Sito: ${lead.website || "Non indicato"}`,
            "", "Richiesta:", lead.message,
          ].join("\n"),
        }),
      });
      notificationSent = emailResponse.ok;
      if (!emailResponse.ok) console.error("Email provider rejected notification:", await emailResponse.text());
    } catch (error) { console.error("Email notification failed:", error); }
  } else {
    console.error("Lead saved but notification is not configured. Set RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL.");
  }

  res.status(201).json({ ok: true, id: leadId, notificationSent });
});

app.use((_req: Request, res: Response) => { res.status(404).json({ ok: false, error: "Risorsa non trovata." }); });
app.listen(port, () => console.info(`PrismWave API listening on port ${port}`));
