// POST /api/admin/polls — create a poll in a session
// Body: { session_id, question, options, type? }

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

export async function onRequestPost({ request, env }) {
  const denied = requireAdmin(request, env);
  if (denied) return denied;

  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid JSON' }, 400); }

  const { session_id, question, options, type } = body;
  if (!session_id || !question || !options || !Array.isArray(options) || options.length < 2) {
    return json({ error: 'Required: session_id, question, options (array, min 2)' }, 400);
  }

  const session = await env.DB.prepare(`SELECT * FROM sessions WHERE id = ?`).bind(session_id).first();
  if (!session) return json({ error: 'Session not found' }, 404);

  const id = crypto.randomUUID();
  const now = Date.now();
  await env.DB.prepare(
    `INSERT INTO polls (id, session_id, question, options, type, status, created_at)
     VALUES (?, ?, ?, ?, ?, 'open', ?)`
  ).bind(id, session_id, question, JSON.stringify(options), type || 'binary', now).run();

  const poll = await env.DB.prepare(`SELECT * FROM polls WHERE id = ?`).bind(id).first();
  return json(poll, 201);
}
