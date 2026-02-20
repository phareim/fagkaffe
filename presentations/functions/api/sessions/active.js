// GET /api/sessions/active?presentation=ai-agile
// Returns the current open session and its polls
export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const presentation = url.searchParams.get('presentation');
  if (!presentation) {
    return json({ error: 'Missing presentation param' }, 400);
  }

  const session = await env.DB.prepare(
    `SELECT * FROM sessions WHERE presentation = ? AND status = 'open' ORDER BY created_at DESC LIMIT 1`
  ).bind(presentation).first();

  if (!session) {
    return json({ session: null, polls: [] });
  }

  const { results: polls } = await env.DB.prepare(
    `SELECT * FROM polls WHERE session_id = ? ORDER BY created_at ASC`
  ).bind(session.id).all();

  return json({ session, polls });
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
