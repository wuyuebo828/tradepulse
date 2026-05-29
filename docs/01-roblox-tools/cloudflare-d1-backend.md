# TradePulse Cloudflare D1 Backend

TradePulse now includes a Cloudflare Pages Functions backend so community trades, votes, likes, comments, and player reports can be shared across devices.

## Files

- `schema.sql`: D1 database tables.
- `functions/api/trades/index.js`: list and create community trades.
- `functions/api/trades/[id]/vote.js`: W/F/L voting.
- `functions/api/trades/[id]/like.js`: likes.
- `functions/api/trades/[id]/comments.js`: comment API for later UI expansion.
- `functions/api/reports/index.js`: price/code/item reports.

## Cloudflare Setup

1. Open Cloudflare Dashboard.
2. Go to `Workers & Pages`.
3. Open the `tradepulse` Pages project.
4. Go to `Settings` -> `Functions` -> `D1 database bindings`.
5. Create or select a D1 database, for example `tradepulse-db`.
6. Add a binding:
   - Variable name: `DB`
   - D1 database: `tradepulse-db`
7. Open the D1 database console and run the SQL from `schema.sql`.
8. Push the repo to GitHub. Cloudflare Pages will redeploy automatically.

## How It Works

- The static site still loads normally.
- If `/api/trades` works, the community feed uses D1 shared data.
- If the API is missing or D1 is not bound yet, the site falls back to local mock/localStorage data.
- User posts created before the backend remains local only; new posts after D1 is live are shared.

## First API Smoke Test

After deployment, open:

```text
https://tradepulsevalues.com/api/trades
```

Expected result:

```json
{"ok":true,"trades":[]}
```

If you see `D1 binding DB is not configured`, the Pages binding name is missing or not named exactly `DB`.
