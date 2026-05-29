# Competitor Analysis: GAGData Crop Values

Source checked: https://www.gagdata.com/crops/values

Checked on: 2026-05-29

## What This Competitor Does Well

- Dedicated SEO page for all Grow a Garden crop values.
- Claims live data and a weekly update cadence.
- Shows total database size: 340 crops on the visible page.
- Breaks the list down by rarity: Common, Uncommon, Rare, Epic, Legendary, Mythical, Divine, Prismatic, Transcendent, and Event.
- Provides more than just price: rarity, base value, growth time, seed cost, mutation compatibility, soil preference, and availability.
- Uses strong trust language: published/updated dates, named database manager, and stated verification process.

## What TradePulse Should Learn

- We should not only list prices; we should show when and how the price was verified.
- The value table needs richer fields over time:
  - `rarity`
  - `baseValue`
  - `valueLabel`
  - `growthTime`
  - `seedCost`
  - `availability`
  - `confidence`
  - `sourceNote`
- Our edge should stay different: trade voting, W/F/L sharing, profile pages, and anti-manipulation signals.

## Important Caution

Do not blindly copy the full competitor database. Use it as one comparison source only. Cross-check with Discord, Reddit, in-game testing, and player reports before marking TradePulse values as verified.

## High-Value Crop Rows Read From The Public Page

This is a partial research sample from the public page, useful for comparison and schema design.

| Crop | Rarity | Base Value | Growth Time | Seed Cost | Availability |
| --- | --- | --- | --- | --- | --- |
| Eggsnapper | Transcendent | 1000K S | 50 min | 1000000M S | Always |
| Omniblossom | Prismatic | 950K S | 2h 30m | 1.3M S | Always |
| Infinite Prism | Prismatic | 940K S | 2h 29m | 1.2M S | Always |
| Cosmic Lotus | Prismatic | 910K S | 2h 26m | 1.2M S | Always |
| Soul Prism | Prismatic | 880K S | 2h 23m | 1.1M S | Always |
| Divine Prism | Prismatic | 850K S | 2h 20m | 1.1M S | Always |
| Void Crystal Vine | Prismatic | 820K S | 2h 15m | 1.1M S | Always |
| Chaos Prism | Prismatic | 810K S | 2h 18m | 1.1M S | Always |
| Eternal Prism | Prismatic | 780K S | 2h 15m | 1M S | Always |
| Star Prism | Prismatic | 740K S | 2h 10m | 962K S | Always |
| Void Prism | Prismatic | 700K S | 2h 5m | 910K S | Always |
| Cosmic Prism | Prismatic | 660K S | 2h 0m | 858K S | Always |
| Prismatic Lotus | Prismatic | 650K S | 2h 0m | 850K S | Always |
| Golden Goose | Event | 500K S | 1h 0m | 650K S | Event Only |
| Divinity Fruit | Divine | 490K S | 1h 45m | 640K S | Always |
| Universalbloom | Divine | 480K S | 1h 45m | 624K S | Always |
| Omnidivine | Divine | 475K S | 1h 44m | 618K S | Always |
| Sacred Lotus | Divine | 465K S | 1h 44m | 605K S | Always |
| Celestialdivine | Divine | 455K S | 1h 43m | 592K S | Always |
| Eternity Blossom | Divine | 450K S | 1h 40m | 590K S | Always |
| Abyssaldivine | Divine | 445K S | 1h 43m | 579K S | Always |
| Eggfruit | Prismatic | 444.4K S | 1h 0m | 50K S | Always |
| Primordialdivine | Divine | 435K S | 1h 42m | 566K S | Always |
| Eternaldivine | Divine | 420K S | 1h 40m | 546K S | Always |
| Void Event Vine | Event | 420K S | 55 min | 546K S | Event Only |
| Chaosdivine | Divine | 405K S | 1h 38m | 527K S | Always |
| Titandivinity | Divine | 385K S | 1h 36m | 501K S | Always |
| Soulgarden | Divine | 380K S | 1h 35m | 500K S | Always |
| Cosmic Event Bloom | Event | 380K S | 50 min | 494K S | Event Only |
| Voidgarden | Divine | 365K S | 1h 34m | 475K S | Always |

## Recommended Next Step For TradePulse

Upgrade `data/items.json` to support `valueLabel`, `baseValue`, `sortValue`, `growthTime`, `seedCost`, and `availability`. Then import a smaller, cross-checked subset instead of a full competitor clone.

## Pet Values Page Notes

Source checked: https://www.gagdata.com/pets/pet-values

The competitor also has a pet-only page that claims a database of 336 pets. The visible page text says the page covers pet values, weight thresholds, XP/hour, and growth formulas. It is positioned as the canonical pet values source and links into their calculators.

Fields shown on the public table:

- Pet
- Rarity
- Trade Value Range
- XP/Hour
- Base Weight
- Huge threshold
- Titanic threshold
- Godly threshold
- How to Obtain

This is important for TradePulse because pet trading needs more than one flat value. Weight class can multiply final value, so our MVP trade calculator should eventually support:

- `valueLabel`
- `minValue`
- `maxValue`
- `sortValue`
- `xpPerHour`
- `baseWeightKg`
- `hugeKg`
- `titanicKg`
- `godlyKg`
- `obtainMethod`

## High-Value Pet Rows Read From The Public Page

This is a partial research sample from the public page, useful for schema design and cross-checking. Do not treat it as TradePulse verified pricing.

| Pet | Rarity | Trade Value Range | XP/Hour | Base Wt | Huge | Titanic | Godly | Obtain |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Fairy | Prismatic | 8.5M-11.5M S | 50,000 | 1000.0 | 5000.0 | 15000.0 | 40000.0 | Ultra-rare hatch from any Egg |
| Prismatic Dragon | Prismatic | 6.8M-9.2M S | 42,000 | 850.0 | 4250.0 | 12750.0 | 34000.0 | Ultra-rare hatch from any Egg |
| Rainbow Phoenix | Prismatic | 6M-8.1M S | 38,000 | 750.0 | 3750.0 | 11250.0 | 30000.0 | Ultra-rare hatch from any Egg |
| Cosmos Dragon | Mythical | 5.5M-7.5M S | 30,000 | 500.0 | 2500.0 | 7500.0 | 20000.0 | Hatch from Mythical Egg |
| Rainbow Unicorn | Mythical | 4.3M-5.8M S | 25,000 | 400.0 | 2000.0 | 6000.0 | 16000.0 | Hatch from Mythical Egg |
| Quantum Dragon | Mythical | 3.8M-5.2M S | 22,000 | 380.0 | 1900.0 | 5700.0 | 15200.0 | Hatch from Mythical Egg |
| Ethereal Phoenix | Mythical | 3.4M-4.6M S | 20,000 | 340.0 | 1700.0 | 5100.0 | 13600.0 | Hatch from Mythical Egg |
| Void Serpent | Mythical | 3M-4M S | 18,000 | 300.0 | 1500.0 | 4500.0 | 12000.0 | Hatch from Mythical Egg |
| Dimensional Fox | Mythical | 2.5M-3.5M S | 16,000 | 270.0 | 1350.0 | 4050.0 | 10800.0 | Hatch from Mythical Egg |
| Heaven's Gate | Divine | 442K-598K S | 7,000 | 210.0 | 1050.0 | 3150.0 | 8400.0 | Hatch from Divine Egg |
| Celestial Dragon | Divine | 425K-575K S | 6,500 | 200.0 | 1000.0 | 3000.0 | 8000.0 | Hatch from Divine Egg |
| Seraphim | Divine | 408K-552K S | 6,300 | 190.0 | 950.0 | 2850.0 | 7600.0 | Hatch from Divine Egg |
| Divine Phoenix | Divine | 382.5K-517.5K S | 6,000 | 180.0 | 900.0 | 2700.0 | 7200.0 | Hatch from Divine Egg |
| Archangel Falcon | Divine | 357K-483K S | 5,700 | 168.0 | 840.0 | 2520.0 | 6720.0 | Hatch from Divine Egg |
| Holy Unicorn | Divine | 340K-460K S | 5,500 | 160.0 | 800.0 | 2400.0 | 6400.0 | Hatch from Divine Egg |
| Sacred Griffin | Divine | 323K-437K S | 5,200 | 152.0 | 760.0 | 2280.0 | 6080.0 | Hatch from Divine Egg |
| Carnival Elephant | Divine | 320K-430K S | 5,200 | 160.0 | 800.0 | 2400.0 | 6400.0 | Garden Games Event |
| Angelic Bird | Divine | 306K-414K S | 5,050 | 150.0 | 750.0 | 2250.0 | 6000.0 | Hatch from Divine Egg |
| Celestial Wolf | Divine | 297.5K-402.5K S | 5,000 | 150.0 | 750.0 | 2250.0 | 6000.0 | Hatch from Divine Egg |
| Blessed Wyrm | Divine | 289K-391K S | 4,900 | 145.0 | 725.0 | 2175.0 | 5800.0 | Hatch from Divine Egg |
| Cherub | Divine | 280.5K-379.5K S | 4,850 | 142.0 | 710.0 | 2130.0 | 5680.0 | Hatch from Divine Egg |
| Celestial Fox | Divine | 272K-368K S | 4,800 | 140.0 | 700.0 | 2100.0 | 5600.0 | Hatch from Divine Egg |
| Blood Moon Wolf | Event | 212.5K-287.5K S | 8,000 | 100.0 | 500.0 | 1500.0 | 4000.0 | Blood Moon Event |
| Winter Solstice Bear | Event | 170K-230K S | 7,000 | 85.0 | 425.0 | 1275.0 | 3400.0 | Winter Solstice Event |
| Harvest Festival Fox | Event | 153K-207K S | 6,000 | 75.0 | 375.0 | 1125.0 | 3000.0 | Harvest Festival Event |
