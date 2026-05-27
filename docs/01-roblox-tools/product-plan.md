# TradePulse Roblox Tools Site Product Plan

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

## 风险

- 数据准确性是信任核心，必须显示更新时间。
- Roblox 相关素材要注意版权和平台规则。
- 不做 free Robux、外挂、脚本作弊内容。
- 面向未成年人玩家时，广告和引导要谨慎。
