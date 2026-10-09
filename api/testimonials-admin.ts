import { timingSafeEqual } from 'crypto';

type Req = {
  method?: string;
  body?: unknown;
  headers: Record<string, string | string[] | undefined>;
};
type Res = {
  status(code: number): Res;
  json(body: unknown): void;
  setHeader(key: string, value: string): void;
  end(): void;
};

const URL_ = process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

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

function authorized(req: Req): boolean {
  const expected = process.env.TESTIMONIALS_ADMIN_TOKEN;
  const got = req.headers['x-admin-token'];
  if (!expected || expected.length < 32 || typeof got !== 'string') return false;
  const a = Buffer.from(got);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export default async function handler(req: Req, res: Res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'content-type, x-admin-token');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, OPTIONS');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (!URL_ || !KEY) return res.status(500).json({ error: 'Server not configured' });
  if (!authorized(req)) return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'GET') {
    const r = await sb('testimonials?select=*&order=created_at.desc&limit=200');
    if (!r.ok) return res.status(502).json({ error: 'Load failed' });
    return res.status(200).json({ items: await r.json() });
  }

  if (req.method === 'PATCH') {
    let b: Record<string, unknown>;
    try {
      b = (typeof req.body === 'string' ? JSON.parse(req.body) : req.body) as Record<string, unknown>;
    } catch {
      return res.status(400).json({ error: 'Invalid body' });
    }

    const id = String(b.id ?? '');
    if (!UUID.test(id)) return res.status(400).json({ error: 'Bad id' });

    const patch: Record<string, unknown> = {};
    if (b.status === 'pending' || b.status === 'approved' || b.status === 'rejected') {
      patch.status = b.status;
      patch.approved_at = b.status === 'approved' ? new Date().toISOString() : null;
    }
    if (typeof b.show_name === 'boolean') patch.show_name = b.show_name;
    if (typeof b.show_business === 'boolean') patch.show_business = b.show_business;
    if (typeof b.featured === 'boolean') patch.featured = b.featured;
    if (typeof b.public_text === 'string') {
      const t = b.public_text.trim().slice(0, 600);
      patch.public_text = t || null;
    }

    if (!Object.keys(patch).length) return res.status(400).json({ error: 'Nothing to update' });

    const r = await sb(`testimonials?id=eq.${id}`, {
      method: 'PATCH',
      headers: { Prefer: 'return=minimal' },
      body: JSON.stringify(patch),
    });
    if (!r.ok) return res.status(502).json({ error: 'Update failed' });
    return res.status(200).json({ ok: true });
  }

  res.setHeader('Allow', 'GET, PATCH, OPTIONS');
  return res.status(405).json({ error: 'Method not allowed' });
}