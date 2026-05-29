# TradePulse Grow a Garden Value Research

Last research pass: 2026-05-28

This file is a review sheet, not final live pricing. Do not blindly copy one competitor list into production. Use this to decide which items should be added to `data/items.json` after manual verification.

## Community Links

- Reddit main community: https://www.reddit.com/r/growagarden/
- Reddit value search: https://www.reddit.com/search/?q=Grow%20a%20Garden%20values
- Discord server search: https://discord.com/servers?query=Grow%20a%20Garden%20Roblox

When checking Discord, avoid servers promising free Robux, free pets, scripts, dupes, or account-login verification.

## Source Notes

- Beebom published a May 2026 pet trading values list with Sheckles-style units such as `Qi`, `Sx`, and `Sp`.
- GardenCalc says pet values may use a token economy where 1 token is roughly 50,000 Sheckles, while crop values use base Sheckles.
- TradeKitsune says its Grow a Garden value page was updated on May 27, 2026 and is based on pet attributes plus offers/requests.

Because sources use different units, TradePulse should store both a numeric sort value and a human-readable value label later.

## Extracted Candidate Pool

Status: `data/extracted-candidates.json` stores the extracted source pool, and the current 20 selected rows have been merged into the live `data/items.json` database with `Cross-check` confidence.

- Purpose: quickly choose which names and value labels to add to TradePulse without carrying unnecessary fields such as growth time, XP/hour, or weight thresholds.
- Current scope: 20 candidates, split between high-value pets and high-value crops/plants.
- Keep before publishing: `name`, `type`, `rarity`, `valueLabel`, `sortValue`, `demand`, `trend`, `obtainMethod`, `sourceUrl`, and `confidence`.
- Drop for now: growth time, XP/hour, base weight, huge/titanic/godly thresholds, long guide text, and other fields that do not help the calculator or trade comparison MVP.
- Rule: keep imported rows marked as `Cross-check` until manual review or enough community feedback confirms them. Do not bulk-copy a full competitor database without selection.

## Full GAGData Extraction

Status: full visible extraction completed on 2026-05-29.

- `data/gagdata-pets-extracted.json`: 343 pet rows parsed from embedded page data.
- `data/gagdata-crops-extracted.json`: 340 crop rows parsed from the visible crop table.
- `data/gagdata-mutations-extracted.json`: 160 mutation rows parsed from the GAGData mutations page structured data. GAGData text mentions 158 in some places, but the structured item list currently exposes 160 rows.
- `data/items.json`: merged live lightweight database with 705 total rows after keeping existing Seed/Gear rows and selected existing items.
- `data/mutations.json`: live mutation database with 4 Variant choices and 157 Environmental choices. Of those Environmental rows, 151 have numeric multipliers and 6 are shown as `TBD`/disabled until values are confirmed.
- Live item rows intentionally keep only calculator/search fields: `id`, `name`, `type`, `rarity`, `value`, `valueLabel`, `sortValue`, `demand`, `trend`, `lastUpdated`, `confidence`, `sourceNote`, `sourceUrl`, `icon`, and `obtainMethod`.
- Detailed source-only fields such as pet XP/hour, base weight, huge/titanic/godly thresholds, crop growth time, seed cost, soil preference, and compatible mutations are retained only in the extracted source files, not in the live calculator database.

## Candidate Hot Pets

These are good first candidates for the live value list because they appear in public value pages or are repeatedly mentioned as high-value/high-demand pets.

| Name | Type | Rarity | Public value label | Demand note | Confidence |
| --- | --- | --- | --- | --- | --- |
| Kitsune | Pet | Prismatic | 2Sp | Top-tier, very high demand | Cross-check |
| Corrupted Kitsune | Pet | Prismatic | 45Sx | High value, lower than Kitsune in Beebom | Cross-check |
| Raccoon | Pet | Divine | 850Sx | Very high demand | Cross-check |
| Disco Bee | Pet | Divine | 550Sx | Very high demand | Cross-check |
| Fennec Fox | Pet | Divine | 350Sx | High value | Cross-check |
| Butterfly | Pet | Mythical | 250Sx | High value | Cross-check |
| Spinosaurus | Pet | Divine | 200Sx | High value | Cross-check |
| Panda | Pet | Legendary | 100Sx | Public top list mention | Cross-check |
| Mimic Octopus | Pet | Divine | 80Sx | Hot trade mention | Cross-check |
| T-Rex | Pet | Divine | 65Sx | High value | Cross-check |
| Brontosaurus | Pet | Mythical | 65Sx | Hot trade mention | Cross-check |
| Tiger | Pet | Divine | 60Sx | Strong demand | Cross-check |
| Queen Bee | Pet | Divine | 55Sx | Popular Divine | Cross-check |
| Dragonfly | Pet | Divine | 55Sx | Popular Divine | Cross-check |
| Luminous Sprite | Pet | Divine | 50Sx | Lower demand in public list | Cross-check |
| Space Squirrel | Pet | Divine | 45Sx | Popular Divine | Cross-check |
| French Fry Ferret | Pet | Divine | 40Sx | Hot trade mention | Cross-check |
| Lobster Thermidor | Pet | Divine | 35Sx | Popular Divine | Cross-check |
| Swan | Pet | Divine | 30Sx | Strong demand | Cross-check |
| Red Panda | Pet | Divine | 20Sx | Very high demand | Cross-check |
| Blood Owl | Pet | Divine | 20Sx | Public list mention | Cross-check |
| Phoenix | Pet | Divine | 20Sx | Strong demand | Cross-check |
| Green Bean | Pet | Divine | 20Sx | Strong demand | Cross-check |
| Apple Gazelle | Pet | Mythical | 24Sx | Strong demand | Cross-check |
| Red Fox | Pet | Mythical | 20Sx | Strong demand | Cross-check |
| Koi | Pet | Mythical | 20Sx | Strong demand | Cross-check |
| Dilophosaurus | Pet | Mythical | 20Sx | Hot trade mention for huge pets | Cross-check |
| Barn Owl | Pet | Mythical | 20Sx | Public list mention | Cross-check |
| Echo Frog | Pet | Mythical | 20Sx | Public list mention | Cross-check |
| Sugar Glider | Pet | Mythical | 15Sx | Mid-high value | Cross-check |
| Griffin | Pet | Divine | 9Sx | Lower Divine value | Cross-check |
| Night Owl | Pet | Divine | 1Sx | Lower Divine value | Cross-check |

## Candidate Crop/Plant Research Needed

The public sources found so far are much cleaner for pet values than crop trade values. Before making crops live, verify:

- Zebrazinkle
- Bone Blossom
- Maple Resin
- Candy Blossom
- Moon Blossom

For crops, we should store base value separately from mutated/weighted value because mutations and weight can multiply the final price.

## Recommended Data Model Upgrade

Status: implemented in the current MVP data layer for `valueLabel`, `sortValue`, and `obtainMethod`.

Current app uses:

```json
{
  "value": 100,
  "confidence": "Sample"
}
```

Recommended next version:

```json
{
  "value": 850000000000000000000000,
  "valueLabel": "850Sx",
  "valueUnit": "Sheckles",
  "sortValue": 850000,
  "confidence": "Cross-check",
  "sourceNote": "Compare Beebom, GardenCalc, TradeKitsune, Discord trades"
}
```

`sortValue` can be a normalized ranking number so the site can sort without printing unreadable full Sheckles numbers.

## Implemented Compatibility Rule

- `valueLabel` is the human-facing value shown in value lists and item pickers.
- `sortValue` is the normalized numeric value used for sorting and W/F/L math.
- `value` remains as a legacy numeric fallback for older data.
- `obtainMethod` is shown as extra context in the Value List when available.

## Mutation Calculator MVP

- Added a mutation calculator section to the website.
- Crop source uses current `Crop`, `Plant`, and `Seed` items from `data/items.json`.
- Formula: `base value * weight^2 * selected variant multiplier * all selected environmental multipliers`.
- Variant mutations are single-choice: Ripe, Silver, Gold, Rainbow.
- Environmental mutations are multi-choice and grouped by tier S/A/B/C/D.
- Output includes final Sheckles estimate, formula string, strength rating, and copy button.
- Next step: connect mutated crop estimates into the trade comparison and community voting flow.
