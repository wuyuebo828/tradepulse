import { error, json, newId, readJson, requireDb, safeItems, safeText } from "../../_lib/http.js";
import { rowToTrade } from "../../_lib/trades.js";

export async function onRequestGet({ env, request }) {
  const db = requireDb(env);
  if (!db) return error("D1 binding DB is not configured", 503);
  const url = new URL(request.url);
  const limit = Math.min(Math.max(Number(url.searchParams.get("limit")) || 100, 1), 200);
  const { results } = await db.prepare(`
    SELECT * FROM trades
    ORDER BY datetime(created_at) DESC
    LIMIT ?
  `).bind(limit).all();

  return json({ ok: true, trades: results.map(rowToTrade) });
}

export async function onRequestPost({ env, request }) {
  const db = requireDb(env);
  if (!db) return error("D1 binding DB is not configured", 503);
  const body = await readJson(request);
  const my = safeItems(body.my);
  const their = safeItems(body.their);

  if (!my.length || !their.length) return error("Both sides need at least one item");

  const tag = ["W", "F", "L"].includes(body.tag) ? body.tag : "F";
  const id = newId("trade");
  const owner = safeText(body.owner, "Anonymous", 40) || "Anonymous";
  const title = safeText(body.title, "Fresh trade check", 120) || "Fresh trade check";
  const note = safeText(body.note, "", 500);
  const createdAt = new Date().toISOString();

  await db.prepare(`
    INSERT INTO trades (id, owner, title, note, tag, my_json, their_json, likes, vote_w, vote_f, vote_l, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, 0, 0, 0, 0, ?)
  `).bind(id, owner, title, note, tag, JSON.stringify(my), JSON.stringify(their), createdAt).run();

  const row = await db.prepare("SELECT * FROM trades WHERE id = ?").bind(id).first();
  return json({ ok: true, trade: rowToTrade(row) }, { status: 201 });
}
