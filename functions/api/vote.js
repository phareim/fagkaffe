// POST /api/vote
// Body: { poll_id, device_id, answer }
export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  const { poll_id, device_id, answer } = body;
  if (!poll_id || !device_id || !answer) {
    return json({ error: 'Missing fields: poll_id, device_id, answer' }, 400);
  }

  // Verify poll exists and is open
  const poll = await env.DB.prepare(
    `SELECT * FROM polls WHERE id = ? AND status = 'open'`
  ).bind(poll_id).first();

  if (!poll) {
    return json({ error: 'Poll not found or closed' }, 404);
  }

  // Verify answer is valid
  const options = JSON.parse(poll.options);
  if (!options.includes(answer)) {
    return json({ error: 'Invalid answer' }, 400);
  }

  const id = crypto.randomUUID();
  const now = Date.now();

  try {
    await env.DB.prepare(
      `INSERT INTO votes (id, poll_id, device_id, answer, created_at) VALUES (?, ?, ?, ?, ?)`
    ).bind(id, poll_id, device_id, answer, now).run();
  } catch (err) {
    // UNIQUE constraint violation = already voted
    if (err.message && err.message.includes('UNIQUE')) {
      return json({ error: 'Already voted', already_voted: true }, 409);
    }
    return json({ error: 'DB error' }, 500);
  }

  return json({ ok: true });
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
