# TradePulse Game Tools Website Plan

TradePulse 是一个可扩展的第三方游戏交易价值和社区投票工具站。当前第一款游戏先做 Roblox / Grow a Garden，后续可以扩展到其他 Roblox 热门体验或更多游戏品类。

当前优先级：

1. `01-roblox-tools`：先做，围绕 Roblox 热门体验的代码、价值表、交易计算器、活动追踪、分享传播。
2. `backlog/02-fps-tools`：后面做，围绕 Valorant / CS2 / Apex 的准星、灵敏度、职业选手设置。
3. `backlog/03-survival-sandbox-tools`：后面做，围绕 Rust / Minecraft 的计算器、资料库、服务器/地图工具。
4. `backlog/04-fortnite-tools`：后面做，围绕商店、任务、活动、皮肤和地图信息。

建议节奏：先用 Roblox 做出可上线的轻工具站，跑通 SEO、广告、内容更新流程，再复用页面结构和后台数据模型扩展到其他游戏。

## 当前数据文件

静态 MVP 的数据放在 `data/` 目录：

- `data/items.json`：物品价值、稀有度、需求和趋势。
- `data/codes.json`：兑换码、奖励和状态。
- `data/trades.json`：Community Trades / Flex & Roast Board 的模拟交易。
- `data/updates.json`：更新记录。
- `assets/items/`：当前物品的自制轻量 SVG 图标，不使用官方素材。

`index.html` 会优先读取这些 JSON。直接用 `file:///` 打开时，部分浏览器可能阻止读取本地 JSON，页面会自动使用内置兜底数据；部署到服务器后会正常读取 `data/` 文件。
