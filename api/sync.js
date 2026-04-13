// ============================================================
// AgroMach CRM — Vercel Serverless Sync API
// Proxies GitHub Contents API so the token stays server-side.
//
// Environment variables (set in Vercel dashboard):
//   GITHUB_TOKEN  — Personal Access Token with repo scope
//   GITHUB_REPO   — (optional) default: agromachclaude-lab/agromach-quotation
//   DATA_FILE     — (optional) default: crm_data.json
// ============================================================

export default async function handler(req, res) {
  const TOKEN = process.env.GITHUB_TOKEN;
  const REPO  = process.env.GITHUB_REPO  || 'agromachclaude-lab/agromach-quotation';
  const FILE  = process.env.DATA_FILE    || 'crm_data.json';

  // CORS headers — allow same-origin and any origin (safe since reads need no auth from client)
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (!TOKEN) {
    return res.status(500).json({
      error: 'Server not configured. Add GITHUB_TOKEN in Vercel Environment Variables.'
    });
  }

  const GH_URL = `https://api.github.com/repos/${REPO}/contents/${FILE}`;
  const GH_HEADERS = {
    Authorization: `token ${TOKEN}`,
    Accept: 'application/vnd.github+json',
    'User-Agent': 'AgroMach-CRM/2.0'
  };

  // ── GET: Read data from GitHub ──────────────────────────────
  if (req.method === 'GET') {
    try {
      const r = await fetch(GH_URL + '?t=' + Date.now(), { headers: GH_HEADERS });
      if (r.status === 404) return res.json({ exists: false });
      if (!r.ok) return res.status(r.status).json({ error: `GitHub error ${r.status}` });
      const data = await r.json();
      return res.json({ exists: true, content: data.content, sha: data.sha });
    } catch (e) {
      return res.status(500).json({ error: 'Failed to read from GitHub: ' + e.message });
    }
  }

  // ── PUT: Write data to GitHub ───────────────────────────────
  if (req.method === 'PUT') {
    try {
      const { content, sha, message } = req.body || {};
      if (!content) return res.status(400).json({ error: '"content" field is required (base64 encoded)' });

      const body = {
        message: message || `AgroMach CRM sync — ${new Date().toISOString()}`,
        content
      };
      if (sha) body.sha = sha; // Required for update; omit for first create

      const r = await fetch(GH_URL, {
        method: 'PUT',
        headers: { ...GH_HEADERS, 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!r.ok) {
        const text = await r.text();
        return res.status(r.status).json({ error: text.slice(0, 300) });
      }

      const data = await r.json();
      return res.json({ sha: data.content?.sha || null });
    } catch (e) {
      return res.status(500).json({ error: 'Failed to write to GitHub: ' + e.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
