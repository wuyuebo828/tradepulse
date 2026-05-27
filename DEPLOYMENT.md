# Deployment Guide

TradePulse is a static MVP. It can be deployed with Cloudflare Pages, GitHub Pages, Netlify, or Vercel.

## Recommended: Cloudflare Pages

1. Create a GitHub repository.
2. Push this folder to the repository.
3. In Cloudflare Pages, choose `Connect to Git`.
4. Select the repository.
5. Use these settings:
   - Framework preset: `None`
   - Build command: leave empty
   - Build output directory: `/`
6. Deploy.

## Required Files

- `index.html`
- `data/items.json`
- `data/codes.json`
- `data/trades.json`
- `data/updates.json`
- `assets/items/*.svg`

## Pre-Launch Checks

- Open the deployed URL on mobile, iPad, and desktop.
- Confirm `data/*.json` loads from the deployed site.
- Confirm language switching works.
- Confirm `Clean` is the default style.
- Confirm `Admin Review` is hidden unless Admin Mode is enabled.
- Confirm `Post to Community` persists in local browser storage.
- Confirm item icons load.
- Confirm copy buttons work over HTTPS.

## Data Policy

Do not publish values as official prices. Use wording like:

- `Community estimate`
- `Last checked`
- `Needs verification`
- `Admin-reviewed`

Do not publish codes as active unless they have been checked in game or from a reliable official/community source.
