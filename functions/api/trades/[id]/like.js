import { error, json, requireDb } from "../../../_lib/http.js";
import { rowToTrade } from "../../../_lib/trades.js";

export async function onRequestPost({ env, params }) {
  const db = requireDb(env);
  if (!db) return error("D1 binding DB is not configured", 503);
  await db.prepare("UPDATE trades SET likes = likes + 1 WHERE id = ?").bind(params.id).run();
  const row = await db.prepare("SELECT * FROM trades WHERE id = ?").bind(params.id).first();
  if (!row) return error("Trade not found", 404);
  return json({ ok: true, trade: rowToTrade(row) });
}
