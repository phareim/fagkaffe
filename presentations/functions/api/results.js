// GET /api/results?poll_id=xxx
// Returns { poll_id, question, options, total, breakdown }
export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const poll_id = url.searchParams.get('poll_id');
  if (!poll_id) {
    return json({ error: 'Missing poll_id param' }, 400);
  }

  const poll = await env.DB.prepare(
    `SELECT * FROM polls WHERE id = ?`
  ).bind(poll_id).first();

  if (!poll) {
    return json({ error: 'Poll not found' }, 404);
  }

  const { results: votes } = await env.DB.prepare(
    `SELECT answer, COUNT(*) as count FROM votes WHERE poll_id = ? GROUP BY answer`
  ).bind(poll_id).all();

  const options = JSON.parse(poll.options);
  const breakdown = {};
  for (const opt of options) breakdown[opt] = 0;
  for (const row of votes) breakdown[row.answer] = row.count;

  const total = Object.values(breakdown).reduce((a, b) => a + b, 0);

  return json({ poll_id, question: poll.question, options, total, breakdown });
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
