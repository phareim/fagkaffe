// PATCH /api/admin/polls/:id — open or close a poll
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

  await env.DB.prepare(
    `UPDATE polls SET status = ? WHERE id = ?`
  ).bind(status, id).run();

  const poll = await env.DB.prepare(`SELECT * FROM polls WHERE id = ?`).bind(id).first();
  if (!poll) return json({ error: 'Poll not found' }, 404);

  return json(poll);
}
