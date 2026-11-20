import "dotenv/config";
import express, { type Request, type Response } from "express";
import audit from "../api/audit.js";
import auditLead from "../api/audit-lead.js";
import auditReport from "../api/audit-report.js";
import auditSave from "../api/audit-save.js";
import leadsList from "../api/leads-list.js";
import revamp from "../api/revamp.js";
import send from "../api/send.js";
import siteHeaders from "../api/site-headers.js";
import siteMeta from "../api/site-meta.js";
import testimonials from "../api/testimonials.js";
import testimonialsAdmin from "../api/testimonials-admin.js";
import track from "../api/track.js";

const app = express();
const handlers: Record<string, (req: Request, res: Response) => unknown> = {
  audit,
  "audit-lead": auditLead,
  "audit-report": (req, res) =>
    auditReport(
      {
        method: req.method,
        headers: req.headers,
        query: normalizeQuery(req.query),
      },
      res,
    ),
  "audit-save": auditSave,
  "leads-list": leadsList,
  revamp,
  send,
  "site-headers": siteHeaders,
  "site-meta": siteMeta,
  testimonials,
  "testimonials-admin": testimonialsAdmin,
  track,
};

function normalizeQuery(query: Request["query"]): Record<string, string | string[] | undefined> {
  const normalized: Record<string, string | string[] | undefined> = {};
  for (const [key, value] of Object.entries(query)) {
    if (typeof value === "string") {
      normalized[key] = value;
    } else if (Array.isArray(value)) {
      const strings = value.filter((item): item is string => typeof item === "string");
      if (strings.length > 0) normalized[key] = strings;
    }
  }
  return normalized;
}

app.use(express.json({ limit: "1mb" }));

app.all("/api/:endpoint", async (req, res) => {
  const handler = handlers[req.params.endpoint];
  if (!handler) {
    return res.status(404).json({ error: "API endpoint not found." });
  }
  return handler(req, res);
});

app.use((error: unknown, _req: Request, res: Response, next: express.NextFunction) => {
  console.error("Local API request failed:", error);
  if (res.headersSent) {
    return next(error);
  }
  return res.status(500).json({ error: "Internal server error." });
});

const port = Number(process.env.API_PORT ?? 4000);
app.listen(port, "127.0.0.1", () => {
  console.log(`Local API server listening on http://127.0.0.1:${port}`);
});
