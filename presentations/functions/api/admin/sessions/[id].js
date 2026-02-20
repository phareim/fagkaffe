// PATCH /api/admin/sessions/:id — open or close a session
// Body: { status: 'open' | 'closed' }

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

export async function onRequestPatch({ request, env, params }) {
  const denied = requireAdmin(request, env);
  if (denied) return denied;

  const { id } = params;
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid JSON' }, 400); }

  const { status } = body;
  if (!['open', 'closed'].includes(status)) {
    return json({ error: 'status must be open or closed' }, 400);
  }

  const now = Date.now();
  const closedAt = status === 'closed' ? now : null;

  await env.DB.prepare(
    `UPDATE sessions SET status = ?, closed_at = ? WHERE id = ?`
  ).bind(status, closedAt, id).run();

  const session = await env.DB.prepare(`SELECT * FROM sessions WHERE id = ?`).bind(id).first();
  if (!session) return json({ error: 'Session not found' }, 404);

  return json(session);
}
