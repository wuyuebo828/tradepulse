#!/usr/bin/env python3
"""Check tradepulsevalues.com public URLs and push a minimal mobile report."""

from __future__ import annotations

import json
import os
import sys
import time
import urllib.error
import urllib.request
from datetime import datetime, time as datetime_time, timedelta, timezone
from pathlib import Path


SITE_URLS = [
    "https://tradepulsevalues.com/",
    "https://tradepulsevalues.com/values.html",
    "https://tradepulsevalues.com/trade-calculator.html",
    "https://tradepulsevalues.com/codes.html",
    "https://tradepulsevalues.com/mutations.html",
    "https://tradepulsevalues.com/articles.html",
    "https://tradepulsevalues.com/sitemap.xml",
    "https://tradepulsevalues.com/robots.txt",
]

CF_ZONE_ID = os.environ.get("CF_ZONE_ID", "5f3ff3679fc7b727947a71b579e3f3e2")
LOCAL_TZ = timezone(timedelta(hours=int(os.environ.get("TP_REPORT_UTC_OFFSET", "8"))))


def fetch_status(url: str) -> dict:
    started = time.perf_counter()
    req = urllib.request.Request(url, headers={"User-Agent": "tradepulse-health-check/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=20) as response:
            elapsed_ms = round((time.perf_counter() - started) * 1000)
            return {
                "url": url,
                "status": response.status,
                "ok": 200 <= response.status < 400,
                "ms": elapsed_ms,
            }
    except urllib.error.HTTPError as exc:
        elapsed_ms = round((time.perf_counter() - started) * 1000)
        return {"url": url, "status": exc.code, "ok": False, "ms": elapsed_ms}
    except Exception as exc:
        elapsed_ms = round((time.perf_counter() - started) * 1000)
        return {"url": url, "status": "error", "ok": False, "ms": elapsed_ms, "error": str(exc)}


def today_window_utc() -> tuple[str, str]:
    now_local = datetime.now(LOCAL_TZ)
    start_local = datetime.combine(now_local.date(), datetime_time.min, tzinfo=LOCAL_TZ)
    end_local = now_local
    return (
        start_local.astimezone(timezone.utc).isoformat().replace("+00:00", "Z"),
        end_local.astimezone(timezone.utc).isoformat().replace("+00:00", "Z"),
    )


def fetch_cloudflare_today() -> dict | None:
    token = os.environ.get("CF_API_TOKEN")
    if not token:
        cf_token_file = Path("E:/hermes/cache/cf_token.txt")
        if cf_token_file.exists():
            token = cf_token_file.read_text(encoding="utf-8-sig").strip()
    if not token:
        return None

    since, until = today_window_utc()
    query = """
    query($zoneTag: string!, $since: Time!, $until: Time!) {
      viewer {
        zones(filter: {zoneTag: $zoneTag}) {
          httpRequestsAdaptiveGroups(limit: 1, filter: {datetime_geq: $since, datetime_lt: $until}) {
            count
            sum {
              visits
              edgeResponseBytes
            }
          }
        }
      }
    }
    """
    payload = json.dumps(
        {
            "query": query,
            "variables": {"zoneTag": CF_ZONE_ID, "since": since, "until": until},
        }
    ).encode("utf-8")
    req = urllib.request.Request(
        "https://api.cloudflare.com/client/v4/graphql",
        data=payload,
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json; charset=utf-8",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=20) as response:
            body = json.loads(response.read().decode("utf-8"))
    except Exception as exc:
        return {"error": str(exc)}

    if body.get("errors"):
        return {"error": body["errors"][0].get("message", "Cloudflare GraphQL error")}

    groups = body["data"]["viewer"]["zones"][0]["httpRequestsAdaptiveGroups"]
    if not groups:
        return {"visits": 0, "requests": 0, "bytes": 0}

    group = groups[0]
    return {
        "visits": int(group["sum"].get("visits") or 0),
        "requests": int(group.get("count") or 0),
        "bytes": int(group["sum"].get("edgeResponseBytes") or 0),
    }


def format_analytics_line(analytics: dict | None) -> str:
    if analytics is None:
        return "访问量：未配置 CF_API_TOKEN"
    if analytics.get("error"):
        return f"访问量：读取失败（{analytics['error']}）"
    return f"访问量：{analytics['visits']} 访问 / {analytics['requests']} 请求"


TASK_TOKEN_PATH = Path(os.environ.get("HERMES_TASK_TOKEN_FILE", "E:/hermes/cache/task_app_token.txt"))


def _resolve_token() -> str:
    token = os.environ.get("HERMES_TASK_TOKEN")
    if token:
        return token
    if TASK_TOKEN_PATH.exists():
        return TASK_TOKEN_PATH.read_text(encoding="utf-8-sig").strip()
    raise RuntimeError("HERMES_TASK_TOKEN is required")


def push_report(results: list[dict], analytics: dict | None) -> None:
    app_url = os.environ.get("HERMES_TASK_APP_URL", "https://task.longhuaziqiang.vip").rstrip("/")
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    ok_count = sum(1 for item in results if item["ok"])
    failed = [item for item in results if not item["ok"]]

    if failed:
        lines = [
            "状态：异常",
            f"时间：{now}",
            format_analytics_line(analytics),
            f"页面检查：{ok_count}/{len(results)} 正常",
            "失败页面：",
        ]
        for item in failed:
            lines.append(f"- {item['status']} {item['url']}")
            if item.get("error"):
                lines.append(f"  {item['error']}")
    else:
        lines = [
            "状态：正常",
            f"时间：{now}",
            format_analytics_line(analytics),
            f"页面检查：{ok_count}/{len(results)} 正常",
        ]

    payload = {
        "reports": [
            {
                "id": "tradepulse-site-health-latest",
                "title": "TradePulse 每日状态",
                "body": "\n".join(lines),
            }
        ],
        "tasks": [],
    }

    try:
        token = _resolve_token()
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        old_proxy = os.environ.pop("http_proxy", None)
        old_https = os.environ.pop("https_proxy", None)
        try:
            req = urllib.request.Request(
                f"{app_url}/api/hermes/sync",
                data=body,
                headers={
                    "Authorization": f"Bearer {token}",
                    "Content-Type": "application/json; charset=utf-8",
                },
                method="POST",
            )
            with urllib.request.urlopen(req, timeout=20) as response:
                print("APP推送:", response.read().decode("utf-8"))
        except Exception as exc:
            print(f"APP推送失败（可忽略）: {exc}")
        finally:
            if old_proxy:
                os.environ["http_proxy"] = old_proxy
            if old_https:
                os.environ["https_proxy"] = old_https
    except RuntimeError:
        print("APP推送跳过：无 token")


def main() -> None:
    results = [fetch_status(url) for url in SITE_URLS]
    ok_count = sum(1 for item in results if item["ok"])
    analytics = fetch_cloudflare_today()
    print(
        json.dumps(
            {"ok": ok_count == len(results), "healthy": ok_count, "total": len(results), "analytics": analytics},
            ensure_ascii=False,
        )
    )
    push_report(results, analytics)


if __name__ == "__main__":
    main()
