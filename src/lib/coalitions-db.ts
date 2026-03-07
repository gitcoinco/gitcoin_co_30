import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 3,
});

let _initialized = false;

async function ensureTables() {
  if (_initialized) return;
  await pool.query(`
    CREATE TABLE IF NOT EXISTS interest_signals (
      domain_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      created_at BIGINT NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT,
      PRIMARY KEY (domain_id, user_id)
    );

    CREATE TABLE IF NOT EXISTS stakes (
      id SERIAL PRIMARY KEY,
      domain_id TEXT NOT NULL,
      address TEXT NOT NULL,
      amount TEXT NOT NULL,
      tx_hash TEXT NOT NULL,
      timestamp BIGINT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS query_log (
      id SERIAL PRIMARY KEY,
      query TEXT NOT NULL,
      domain_id TEXT,
      timestamp BIGINT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS activity_feed (
      id SERIAL PRIMARY KEY,
      type TEXT NOT NULL CHECK(type IN ('stake', 'withdraw', 'interest')),
      domain_id TEXT NOT NULL,
      address TEXT NOT NULL,
      amount TEXT,
      timestamp BIGINT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_query_log_timestamp ON query_log(timestamp);
    CREATE INDEX IF NOT EXISTS idx_activity_feed_timestamp ON activity_feed(timestamp DESC);
  `);
  _initialized = true;
}

// ── Interest signals ─────────────────────────────────────────────────────

export async function addInterest(domainId: string, userId: string): Promise<number> {
  await ensureTables();
  await pool.query(
    "INSERT INTO interest_signals (domain_id, user_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
    [domainId, userId]
  );
  const res = await pool.query(
    "SELECT COUNT(*)::INT as count FROM interest_signals WHERE domain_id = $1",
    [domainId]
  );
  return res.rows[0].count;
}

export async function getInterestCounts(): Promise<Record<string, number>> {
  await ensureTables();
  const res = await pool.query(
    "SELECT domain_id, COUNT(*)::INT as count FROM interest_signals GROUP BY domain_id"
  );
  const result: Record<string, number> = {};
  for (const row of res.rows) {
    result[row.domain_id] = row.count;
  }
  return result;
}

// ── Stakes ────────────────────────────────────────────────────────────────

export async function addStake(domainId: string, address: string, amount: string, txHash: string) {
  await ensureTables();
  const now = Date.now();
  await pool.query(
    "INSERT INTO stakes (domain_id, address, amount, tx_hash, timestamp) VALUES ($1, $2, $3, $4, $5)",
    [domainId, address, amount, txHash, now]
  );
  await addInterest(domainId, address);
}

export async function getStakesByDomain(): Promise<Record<string, { totalEth: number; stakers: number }>> {
  await ensureTables();
  const res = await pool.query(
    "SELECT domain_id, SUM(amount::DOUBLE PRECISION) as total_eth, COUNT(DISTINCT address)::INT as stakers FROM stakes GROUP BY domain_id"
  );
  const result: Record<string, { totalEth: number; stakers: number }> = {};
  for (const row of res.rows) {
    result[row.domain_id] = { totalEth: row.total_eth, stakers: row.stakers };
  }
  return result;
}

// ── Query log ─────────────────────────────────────────────────────────────

export async function addQuery(query: string, domainId?: string) {
  await ensureTables();
  await pool.query(
    "INSERT INTO query_log (query, domain_id, timestamp) VALUES ($1, $2, $3)",
    [query, domainId ?? null, Date.now()]
  );
}

export async function getTrending(limit = 5): Promise<{ domainId: string; queryCount: number }[]> {
  await ensureTables();
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const res = await pool.query(
    `SELECT domain_id, COUNT(*)::INT as query_count
     FROM query_log
     WHERE domain_id IS NOT NULL AND timestamp > $1
     GROUP BY domain_id
     ORDER BY query_count DESC
     LIMIT $2`,
    [sevenDaysAgo, limit]
  );
  return res.rows.map((r) => ({ domainId: r.domain_id, queryCount: r.query_count }));
}

export async function getQueryCounts(): Promise<{ total: number; recent: number }> {
  await ensureTables();
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const res = await pool.query(
    `SELECT
       COUNT(*)::INT as total,
       COUNT(*) FILTER (WHERE timestamp > $1)::INT as recent
     FROM query_log`,
    [sevenDaysAgo]
  );
  return { total: res.rows[0].total, recent: res.rows[0].recent };
}

// ── Activity feed ─────────────────────────────────────────────────────────

export async function pushActivity(entry: {
  type: "stake" | "withdraw" | "interest";
  domainId: string;
  address: string;
  amount?: string;
}) {
  await ensureTables();
  await pool.query(
    "INSERT INTO activity_feed (type, domain_id, address, amount, timestamp) VALUES ($1, $2, $3, $4, $5)",
    [entry.type, entry.domainId, entry.address, entry.amount ?? null, Date.now()]
  );
}

export async function getRecentActivity(limit = 25, offset = 0): Promise<{
  type: string;
  domainId: string;
  address: string;
  amount?: string;
  timestamp: number;
}[]> {
  await ensureTables();
  const res = await pool.query(
    "SELECT type, domain_id, address, amount, timestamp FROM activity_feed ORDER BY timestamp DESC LIMIT $1 OFFSET $2",
    [limit, offset]
  );
  return res.rows.map((r) => ({
    type: r.type,
    domainId: r.domain_id,
    address: r.address,
    amount: r.amount ?? undefined,
    timestamp: Number(r.timestamp),
  }));
}

export async function getActivityCount(): Promise<number> {
  await ensureTables();
  const res = await pool.query("SELECT COUNT(*)::INT as c FROM activity_feed");
  return res.rows[0].c;
}
