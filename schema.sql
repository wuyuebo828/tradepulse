CREATE TABLE IF NOT EXISTS trades (
  id TEXT PRIMARY KEY,
  player_id TEXT,
  owner TEXT NOT NULL DEFAULT 'Anonymous',
  title TEXT NOT NULL,
  note TEXT NOT NULL DEFAULT '',
  tag TEXT NOT NULL CHECK (tag IN ('W', 'F', 'L')),
  my_json TEXT NOT NULL,
  their_json TEXT NOT NULL,
  likes INTEGER NOT NULL DEFAULT 0,
  vote_w INTEGER NOT NULL DEFAULT 0,
  vote_f INTEGER NOT NULL DEFAULT 0,
  vote_l INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  decided_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_trades_created_at ON trades(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_trades_player_id ON trades(player_id, created_at DESC);
CREATE TABLE IF NOT EXISTS trade_comments (
  id TEXT PRIMARY KEY,
  trade_id TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT 'Anonymous',
  body TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (trade_id) REFERENCES trades(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_trade_comments_trade_id ON trade_comments(trade_id, created_at DESC);

CREATE TABLE IF NOT EXISTS reports (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  target TEXT NOT NULL,
  value TEXT,
  note TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_reports_created_at ON reports(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status, created_at DESC);
