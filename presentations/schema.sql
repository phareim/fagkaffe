-- Fag-Kaffe Polling System — D1 Schema
-- Run once: wrangler d1 execute fag-kaffe-polls --file=presentations/schema.sql

CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  presentation TEXT NOT NULL,   -- e.g. "ai-agile"
  label TEXT,                   -- e.g. "Haugesund feb 2026"
  status TEXT DEFAULT 'closed', -- 'open' | 'closed'
  created_at INTEGER NOT NULL,
  closed_at INTEGER
);

CREATE TABLE IF NOT EXISTS polls (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  slug TEXT,                    -- stable identifier from slide data-poll attr
  question TEXT NOT NULL,
  options TEXT NOT NULL,        -- JSON array: ["Ja","Nei"]
  type TEXT DEFAULT 'binary',   -- 'binary' | 'multiple_choice'
  status TEXT DEFAULT 'open',
  created_at INTEGER NOT NULL,
  FOREIGN KEY (session_id) REFERENCES sessions(id)
);

CREATE UNIQUE INDEX IF NOT EXISTS polls_session_slug ON polls(session_id, slug);

CREATE TABLE IF NOT EXISTS votes (
  id TEXT PRIMARY KEY,
  poll_id TEXT NOT NULL,
  device_id TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (poll_id) REFERENCES polls(id),
  UNIQUE(poll_id, device_id)
);
