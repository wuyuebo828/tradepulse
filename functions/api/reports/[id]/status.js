import { error, json, readJson, requireDb, safeText } from "../../../_lib/http.js";

export async function onRequestPost({ env, params, request }) {
  const db = requireDb(env);
  if (!db) return error("D1 binding DB is not configured", 503);
  const body = await readJson(request);
  const status = safeText(body.status, "pending", 20);
  if (!["pending", "reviewed", "rejected"].includes(status)) {
    return error("Status must be pending, reviewed, or rejected");
  }

  await db.prepare("UPDATE reports SET status = ? WHERE id = ?").bind(status, params.id).run();
  const row = await db.prepare(`
    SELECT id, type, target, value, note, status, created_at AS createdAt
    FROM reports
    WHERE id = ?
  `).bind(params.id).first();
  if (!row) return error("Report not found", 404);
  return json({ ok: true, report: row });
}
