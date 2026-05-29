import { error, json, newId, readJson, requireDb, safeText } from "../../_lib/http.js";

export async function onRequestGet({ env }) {
  const db = requireDb(env);
  if (!db) return error("D1 binding DB is not configured", 503);
  const { results } = await db.prepare(`
    SELECT id, type, target, value, note, status, created_at AS createdAt
    FROM reports
    ORDER BY datetime(created_at) DESC
    LIMIT 100
  `).all();
  return json({ ok: true, reports: results });
}

export async function onRequestPost({ env, request }) {
  const db = requireDb(env);
  if (!db) return error("D1 binding DB is not configured", 503);
  const body = await readJson(request);
  const target = safeText(body.target, "", 120);
  if (!target) return error("Target is required");

  const id = newId("report");
  const type = safeText(body.type, "price", 40) || "price";
  const value = safeText(body.value, "", 120);
  const note = safeText(body.note, "", 800);
  const createdAt = new Date().toISOString();

  await db.prepare(`
    INSERT INTO reports (id, type, target, value, note, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).bind(id, type, target, value, note, createdAt).run();

  return json({ ok: true, report: { id, type, target, value, note, status: "pending", createdAt } }, { status: 201 });
}
