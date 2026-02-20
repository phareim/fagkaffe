// GET  /api/admin/sessions?presentation=ai-agile  — list sessions with vote tallies
// POST /api/admin/sessions                        — create a session

function requireAdmin(request, env) {
  const auth = request.headers.get('Authorization') || '';
  const token = auth.replace('Bearer ', '');
  if (token !== env.ADMIN_TOKEN) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return null;
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function onRequestGet({ request, env }) {
  const denied = requireAdmin(request, env);
  if (denied) return denied;

  const url = new URL(request.url);
  const presentation = url.searchParams.get('presentation');
  if (!presentation) return json({ error: 'Missing presentation param' }, 400);

  const { results: sessions } = await env.DB.prepare(
    `SELECT * FROM sessions WHERE presentation = ? ORDER BY created_at DESC`
  ).bind(presentation).all();

  // Attach poll count and vote count to each session
  const enriched = await Promise.all(sessions.map(async (s) => {
    const { results: polls } = await env.DB.prepare(
      `SELECT id FROM polls WHERE session_id = ?`
    ).bind(s.id).all();

    const pollIds = polls.map(p => p.id);
    let voteCount = 0;
    if (pollIds.length > 0) {
      const placeholders = pollIds.map(() => '?').join(',');
      const row = await env.DB.prepare(
        `SELECT COUNT(*) as c FROM votes WHERE poll_id IN (${placeholders})`
      ).bind(...pollIds).first();
      voteCount = row ? row.c : 0;
    }
    return { ...s, poll_count: polls.length, vote_count: voteCount };
  }));

  return json(enriched);
}

export async function onRequestPost({ request, env }) {
  const denied = requireAdmin(request, env);
  if (denied) return denied;

  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid JSON' }, 400); }

  const { presentation, label } = body;
  if (!presentation) return json({ error: 'Missing presentation' }, 400);

  // Close any existing open session for this presentation
  await env.DB.prepare(
    `UPDATE sessions SET status = 'closed', closed_at = ? WHERE presentation = ? AND status = 'open'`
  ).bind(Date.now(), presentation).run();

  const id = crypto.randomUUID();
  const now = Date.now();
  await env.DB.prepare(
    `INSERT INTO sessions (id, presentation, label, status, created_at) VALUES (?, ?, ?, 'open', ?)`
  ).bind(id, presentation, label || null, now).run();

  const session = await env.DB.prepare(`SELECT * FROM sessions WHERE id = ?`).bind(id).first();
  return json(session, 201);
}
