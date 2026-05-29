import { error, json, requireDb, safePlayerId } from "../../_lib/http.js";
import { rowToTrade } from "../../_lib/trades.js";

export async function onRequestGet({ env, request }) {
  const db = requireDb(env);
  if (!db) return error("D1 binding DB is not configured", 503);
  const url = new URL(request.url);
  const playerId = safePlayerId(url.searchParams.get("playerId"));
  if (!playerId) return error("Valid playerId is required");

  const { results } = await db.prepare(`
    SELECT
      trades.*,
      (
        SELECT COUNT(*)
        FROM trade_comments
        WHERE trade_comments.trade_id = trades.id
      ) AS comment_count,
      (
        SELECT body
        FROM trade_comments
        WHERE trade_comments.trade_id = trades.id
        ORDER BY datetime(created_at) DESC
        LIMIT 1
      ) AS latest_comment
    FROM trades
    WHERE player_id = ?
    ORDER BY datetime(created_at) DESC
    LIMIT 50
  `).bind(playerId).all();

  return json({
    ok: true,
    trades: results.map(row => ({
      ...rowToTrade(row),
      commentCount: Number(row.comment_count) || 0,
      latestComment: row.latest_comment || ""
    }))
  });
}
