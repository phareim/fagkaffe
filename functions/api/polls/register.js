// POST /api/polls/register
// Body: { presentation, slug, question, options }
// Finds the active session, upserts poll by (session_id, slug), returns poll row with UUID.

export async function onRequestPost({ request, env }) {
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid JSON' }, 400); }

  const { presentation, slug, question, options } = body;
  if (!presentation || !slug || !question || !Array.isArray(options) || options.length < 2) {
    return json({ error: 'Required: presentation, slug, question, options (array, min 2)' }, 400);
  }

  const session = await env.DB.prepare(
    `SELECT * FROM sessions WHERE presentation = ? AND status = 'open' ORDER BY created_at DESC LIMIT 1`
  ).bind(presentation).first();

  if (!session) {
    return json({ error: 'No active session for this presentation' }, 404);
  }

  // INSERT OR IGNORE — if slug already exists in this session, skip insert
  const id = crypto.randomUUID();
  const now = Date.now();
  await env.DB.prepare(
    `INSERT OR IGNORE INTO polls (id, session_id, slug, question, options, type, status, created_at)
     VALUES (?, ?, ?, ?, ?, 'binary', 'open', ?)`
  ).bind(id, session.id, slug, question, JSON.stringify(options), now).run();

  // Return whichever row owns this slug (the existing one if slug already existed)
  const poll = await env.DB.prepare(
    `SELECT * FROM polls WHERE session_id = ? AND slug = ?`
  ).bind(session.id, slug).first();

  return json(poll, 200);
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
