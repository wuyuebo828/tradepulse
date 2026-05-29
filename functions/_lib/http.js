export function json(data, init = {}) {
  const headers = new Headers(init.headers || {});
  headers.set("content-type", "application/json; charset=utf-8");
  headers.set("cache-control", "no-store");
  return new Response(JSON.stringify(data), { ...init, headers });
}

export function error(message, status = 400) {
  return json({ ok: false, error: message }, { status });
}

export async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}

export function requireDb(env) {
  return env.DB || null;
}

export function newId(prefix) {
  return `${prefix}-${crypto.randomUUID()}`;
}

export function safeText(value, fallback = "", max = 500) {
  const text = String(value ?? fallback).trim();
  return text.slice(0, max);
}

export function safeItems(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map(item => String(item || "").trim())
    .filter(item => /^[a-z0-9-]{1,80}$/i.test(item))
    .slice(0, 12);
}

export function safePlayerId(value) {
  const text = String(value || "").trim();
  return /^[a-z0-9-]{8,80}$/i.test(text) ? text : null;
}
