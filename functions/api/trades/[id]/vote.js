import { error, json, readJson, requireDb } from "../../../_lib/http.js";
import { rowToTrade } from "../../../_lib/trades.js";

export async function onRequestPost({ env, params, request }) {
  const db = requireDb(env);
  const body = await readJson(request);
  const vote = String(body.vote || "").toUpperCase();
  const column = { W: "vote_w", F: "vote_f", L: "vote_l" }[vote];
  if (!column) return error("Vote must be W, F, or L");

  const current = await db.prepare("SELECT * FROM trades WHERE id = ?").bind(params.id).first();
  if (!current) return error("Trade not found", 404);

  const totalBefore = Number(current.vote_w) + Number(current.vote_f) + Number(current.vote_l);
  const decidedAt = totalBefore < 20 && totalBefore + 1 >= 20 ? new Date().toISOString() : current.decided_at;

  await db.prepare(`
    UPDATE trades
    SET ${column} = ${column} + 1, decided_at = COALESCE(decided_at, ?)
    WHERE id = ?
  `).bind(decidedAt, params.id).run();

  const row = await db.prepare("SELECT * FROM trades WHERE id = ?").bind(params.id).first();
  return json({ ok: true, trade: rowToTrade(row) });
}
