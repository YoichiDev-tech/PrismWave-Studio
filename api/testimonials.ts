type Req = { method?: string; body?: unknown };
type Res = {
  status(code: number): Res;
  json(body: unknown): void;
  setHeader(key: string, value: string): void;
};

const URL_ = process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function sb(path: string, init: RequestInit = {}) {
  return fetch(`${URL_}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: KEY as string,
      Authorization: `Bearer ${KEY}`,
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
  });
}

function clean(v: unknown, max: number): string {
  return typeof v === 'string' ? v.replace(/\s+/g, ' ').trim().slice(0, max) : '';
}

export default async function handler(req: Req, res: Res) {
  if (!URL_ || !KEY) return res.status(500).json({ error: 'Server not configured' });

  if (req.method === 'GET') {
    const r = await sb(
      'testimonials?select=id,name,business,rating,message,public_text,show_name,show_business,featured' +
        '&status=eq.approved&order=featured.desc,approved_at.desc&limit=50',
    );
    if (!r.ok) return res.status(502).json({ error: 'Could not load reviews' });
    const rows = (await r.json()) as Array<{
      id: string;
      name: string;
      business: string;
      rating: number;
      message: string;
      public_text: string | null;
      show_name: boolean;
      show_business: boolean;
      featured: boolean;
    }>;
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    return res.status(200).json({
      items: rows.map((t) => ({
        id: t.id,
        name: t.show_name ? t.name : null,
        business: t.show_business ? t.business : null,
        rating: t.rating,
        text: t.public_text?.trim() || t.message,
        featured: t.featured,
      })),
    });
  }

  if (req.method === 'POST') {
    let b: Record<string, unknown> = {};
    try {
      b = (typeof req.body === 'string' ? JSON.parse(req.body) : req.body) as Record<string, unknown>;
    } catch {
      return res.status(400).json({ error: 'Invalid request' });
    }

    if (b?.website) return res.status(200).json({ ok: true }); // honeypot

    const name = clean(b.name, 80);
    const business = clean(b.business, 120);
    const message = clean(b.message, 600);
    const rating = Number(b.rating);

    if (!name || !business || message.length < 10) {
      return res.status(400).json({ error: 'Please fill in every field.' });
    }
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Please choose a rating.' });
    }
    if (b.consent !== true) {
      return res.status(400).json({ error: 'Consent to publish is required.' });
    }

    const r = await sb('testimonials', {
      method: 'POST',
      headers: { Prefer: 'return=minimal' },
      body: JSON.stringify({ name, business, rating, message, publish_consent: true }),
    });
    if (!r.ok) return res.status(502).json({ error: 'Could not save your review.' });
    return res.status(201).json({ ok: true });
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ error: 'Method not allowed' });
}