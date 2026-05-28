# TradePulse Roblox Tools Site Product Plan

## Community Feed Hall of Fame Update

- `Needs Vote` keeps posts under 20 votes and shuffles them on page load, so new posts do not bury older pending trades.
- `Decided` starts at 20 votes, but voting remains open forever. There is no vote cap and posts are not deleted.
- `Decided` has two sort modes: `Recent` sorts by the time the trade entered Decided, and `Top All-Time` sorts by total votes.
- If a Decided post has more than 50 total votes and W or L is above 85%, it becomes `Legendary W` or `Legendary L` with a gold highlighted card.
- If F reaches 70% after at least 30 votes, it becomes `Settled Fair` and sinks below more controversial or extreme W/L posts.

## Player Trade Profile MVP

- Players can post trades from the calculator into their lightweight trade profile.
- The profile shows a mix of recent and hot trades, capped at 6 items in the current no-backend MVP.
- `Copy Profile Link` packages those trades into the URL so other players can open the profile page and vote.
- This is temporary static-site behavior. After login/database work, the packed URL should become a real player profile ID.

## Mobile First Tool Entry

- On phone viewports, the trade calculator is visually promoted to the first screen.
- The large hero intro, quick cards, status cards and notice are hidden on mobile so players can start checking values immediately.
- Desktop and tablet still keep more brand/context space, while mobile prioritizes direct use.

## 定位

TradePulse 面向海外玩家，做一个轻量、手机优先的交易价值和社区投票工具站。第一阶段先服务 Roblox / Grow a Garden，重点解决玩家搜索频率高、更新快、容易分享的需求。

核心关键词方向：

- Roblox codes
- Grow a Garden values
- Grow a Garden calculator
- Roblox trade value
- Roblox event countdown
- Roblox update tracker
- Roblox pet value list

## 第一版 MVP

当前 `index.html` 已经是 `Grow a Garden Trading` 的交易价值与 W/F/L 计算器原型，可以作为第一版核心工具。

第一版建议包含：

- 交易价值计算器：玩家添加双方物品，自动判断 Win / Fair / Lose。
- 价值表：所有物品的价值、稀有度、需求热度、更新时间。
- 搜索与筛选：按名称、类型、稀有度、价值区间筛选。
- Codes 页面：展示 active codes、expired codes、兑换说明、更新时间。
- Update Tracker：记录游戏更新、活动倒计时、限时物品。
- 简短攻略：新手怎么交易、怎么判断价值、常见骗局提醒。

## 玩家需求

高频需求：

- 我这个交易赚还是亏？
- 某个宠物、种子、道具现在值多少？
- 最新兑换码是什么？
- 活动什么时候结束？
- 新版本新增了什么物品？
- 哪些物品需求高，容易交易出去？

可转化为页面：

- `/tools/trade-calculator`
- `/values`
- `/values/:item`
- `/codes`
- `/updates`
- `/guides/beginner-trading`
- `/guides/avoid-scams`

## 数据结构草案

物品字段：

- `id`
- `name`
- `game`
- `type`
- `rarity`
- `value`
- `demand`
- `trend`
- `obtain_method`
- `image_url`
- `last_updated`

兑换码字段：

- `code`
- `reward`
- `status`
- `game`
- `verified_at`
- `expires_at`

更新字段：

- `title`
- `game`
- `version`
- `summary`
- `published_at`
- `source_url`

## 内容获取方式

第一阶段可以手动维护，不要一开始做复杂爬虫。

建议来源：

- Roblox 游戏页面和官方社媒。
- Discord / Reddit / YouTube 评论区的社区价格讨论。
- 竞品价值表，仅作交叉验证，不要直接复制。
- 玩家投稿，后期再加审核流程。

## SEO 重点

页面标题示例：

- `Grow a Garden Value List - Updated Daily`
- `Grow a Garden Trade Calculator`
- `Grow a Garden Codes`
- `Is [Item Name] Worth It? Value, Demand and Trading Tips`

每个条目页都要有：

- 当前价值。
- 最近更新时间。
- 获取方式。
- 交易建议。
- 相关物品链接。

## 近期开发顺序

1. 修正当前单页原型中的乱码和演示数据。
2. 把物品数据从 JS 里抽成独立 JSON。已建立 `data/items.json`、`data/codes.json`、`data/trades.json`、`data/updates.json`。
3. 增加价值表页面。
4. 增加 codes 页面。
5. 增加简单导航和 SEO 文案。
6. 再考虑后台、数据库和自动化更新。

## 移动端和多语言方向

页面优先移动端和平板端：

- 首屏直接给工具入口，不做复杂营销页。
- 区块尽量短，按钮高度适合手指点击。
- 不依赖大型前端框架，先保持静态页面轻量。
- 核心操作控制在 1-3 步：选物品、看结果、复制分享。

小语种优先级：

- 英文：默认语言，用于主 SEO。
- 葡萄牙语：覆盖巴西 Roblox 玩家。
- 印尼语：覆盖印尼移动端玩家。

当前 `index.html` 已有基础语言切换字典，支持 `en`、`pt`、`id`。后续正式上线时建议为每种语言做独立 SEO URL，例如 `/pt/codes`、`/id/codes`，而不是只依赖前端切换。

## 社区情报机制

站长不需要第一时间玩懂所有更新。MVP 采用玩家提交、管理员审核的模式：

- 玩家可以在 Value List 点击 `Report` 反馈价格可能不准。
- 玩家可以对 Codes 标记 `Works` 或 `Expired`。
- 玩家可以在 `Submit Intel` 提交新物品、价格变化或新 Code。
- 所有反馈进入 Admin Mode 下的 `Player Intel Queue`。
- 管理员只审核队列，不让玩家直接修改正式价格。

后续接数据库时，`Player Intel Queue` 可以变成 `intel_reports` 表，并增加截图、来源链接、用户信誉和处理状态。

## 广告位预留

MVP 已预留轻量广告槽，但默认隐藏且不占页面空间：

- Value List 下方：`data-ad-slot="values-bottom"`
- Community Trades 信息流中：`data-ad-slot="community-*"`
- Codes 下方：`data-ad-slot="codes-bottom"`

当前 `.ad-slot` 默认 `display: none`。以后接广告平台时，可以由广告脚本填充内容并给 `body` 添加 `ads-on` 类显示广告槽。

不建议做底部 sticky 广告、弹窗广告或遮挡主要按钮的广告。

## Meme 标签和徽章种子

MVP 已加入交易结果标签，用来增强传播感：

- 亏损严重：`Massive L: Donation Mode`
- 明显亏损：`Overpay Alert: Big L Energy`
- 轻微亏损：`Small L: Check twice`
- 明显赚：`Huge W: Certified Snipe`
- 公平交易：`Fair-ish: Let the comments decide`

Community Trades 会根据 L 投票比例显示群体吐槽标签，例如 `Public Roast: Donation Mode`。

这些标签后续可以接入徽章体系：

- `Roast Magnet`
- `Risky Trader`
- `Value Hunter`
- `Good Eye`
- `Fair Dealer`

完整徽章体系需要用户登录、投票历史和反作弊，暂时只做展示种子。

## Community Feed 上榜逻辑

投票墙分成两个 Tab：

- `Needs Vote`：总票数少于 20 的交易。每次页面加载都会随机打乱顺序，让等待投票的交易公平获得曝光。
- `Decided`：总票数达到 20 或以上的交易。默认按进入 `Decided` 的时间倒序展示，也可以切换到 `Top All-Time` 按总票数排序。

每个 Tab 最多显示 20 条。未满 20 票的交易不会被新帖按时间流直接冲走；达到 20 票后会从 `Needs Vote` 淡出并进入 `Decided`。进入 `Decided` 后不删除、不封顶，玩家仍然可以继续投票，用来沉淀长期热门案例。

`Decided` 的最终标签规则：

- L 票超过 70%：`Massive L`
- W 票超过 70%：`Massive W`
- F 票超过 55%：`Fair Trade`
- 总票数超过 50，并且 W 或 L 超过 85%：升级为 `Legendary W` / `Legendary L`，卡片显示金色高亮边框。
- 总票数至少 30，并且 F 超过 70%：标记为 `Settled Fair`，排序沉到更有争议或更极端的 W/L 帖子后面。
- 其余按 `Leaning L`、`Leaning W` 或 `Split Vote` 标记。

## 风险

- 数据准确性是信任核心，必须显示更新时间。
- Roblox 相关素材要注意版权和平台规则。
- 不做 free Robux、外挂、脚本作弊内容。
- 面向未成年人玩家时，广告和引导要谨慎。
