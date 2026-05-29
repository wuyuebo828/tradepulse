import { error, json, newId, readJson, requireDb, safeText } from "../../../_lib/http.js";

export async function onRequestGet({ env, params }) {
  const db = requireDb(env);
  const { results } = await db.prepare(`
    SELECT id, trade_id AS tradeId, author, body, created_at AS createdAt
    FROM trade_comments
    WHERE trade_id = ?
    ORDER BY datetime(created_at) DESC
    LIMIT 50
  `).bind(params.id).all();
  return json({ ok: true, comments: results });
}

export async function onRequestPost({ env, params, request }) {
  const db = requireDb(env);
  const body = await readJson(request);
  const comment = safeText(body.body, "", 300);
  if (!comment) return error("Comment is empty");

  const exists = await db.prepare("SELECT id FROM trades WHERE id = ?").bind(params.id).first();
  if (!exists) return error("Trade not found", 404);

  const id = newId("comment");
  const author = safeText(body.author, "Anonymous", 40) || "Anonymous";
  const createdAt = new Date().toISOString();
  await db.prepare(`
    INSERT INTO trade_comments (id, trade_id, author, body, created_at)
    VALUES (?, ?, ?, ?, ?)
  `).bind(id, params.id, author, comment, createdAt).run();

  return json({ ok: true, comment: { id, tradeId: params.id, author, body: comment, createdAt } }, { status: 201 });
}
