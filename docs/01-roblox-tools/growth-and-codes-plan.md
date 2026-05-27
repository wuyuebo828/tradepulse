# TradePulse Growth and Codes Plan

## 目标

让新用户因为免费信息进站，因为工具好用留下，因为可分享交易结果把更多玩家带回来。

第一阶段重点做：

- Codes 页面吸引搜索流量。
- Trade Calculator 提供实际工具价值。
- Share Link 让用户把交易单发到 Discord、Reddit、TikTok 评论区。
- Value List 让用户反复回来查价格。

## 用户传播链路

理想链路：

1. 玩家搜索 `Grow a Garden codes` 或 `Grow a Garden value list`。
2. 进入 Codes 或 Value List 页面。
3. 看到 Trade Calculator 入口。
4. 生成一笔交易并得到 W/F/L 判断。
5. 点击分享，把交易结果发到 Discord、Reddit、TikTok、YouTube 评论区。
6. 其他玩家点进来投票，形成二次传播。

## 核心分享功能

第一版可以做一个 `Copy Share Link` 按钮。

分享链接需要包含：

- 我方物品列表。
- 对方物品列表。
- 自动计算结果。
- 当前社区投票结果。
- 页面标题，例如 `Is this Grow a Garden trade a W or L?`

分享落地页需要突出：

- 双方 Offer。
- W / F / L 自动判断。
- Community Vote。
- `Create Your Own Trade` 按钮。

## 交易发布和投票模型

产品逻辑要分开：

- Trade Calculator：用户创建自己的交易，不在这里给自己投票。
- Trade Page：每一笔交易有独立分享页，其他玩家进来投 W/F/L。
- User Profile：用户可以保存或上传自己的交易记录。
- Trade Feed：像交易市场一样展示其他玩家发布的交易，让浏览用户顺手投票。

推荐流程：

1. 用户在计算器创建交易。
2. 点击 `Copy Share Link` 或 `Post to Profile`。
3. 交易进入个人主页和公共 Trade Feed。
4. 其他玩家在 Trade Feed 或分享页投 W/F/L。
5. 交易页显示社区投票结果、自动估值结果和评论/举报入口。

后续数据库需要的核心表：

- `users`
- `trades`
- `trade_items`
- `trade_votes`
- `items`

MVP 阶段可以先用假数据展示 Trade Feed，等有登录和数据库后再做真实上传。

## Codes 内容策略

Grow a Garden 这类 Roblox 游戏经常有兑换码需求，但可用码会过期，不同网站也可能记录不一致。

页面必须展示：

- Active Codes。
- Expired Codes。
- Last checked date。
- Reward。
- How to redeem。
- Source note。

不要写：

- Free Robux。
- Hack。
- Script。
- Guaranteed rewards。

推荐文案：

- `Codes are checked regularly, but Roblox game codes can expire without notice.`
- `We only list public codes from official or widely verified community sources.`

## 新用户免费价值

可以用 Codes 页面作为免费入口：

- 首页放 `Free Codes` 标签。
- Codes 页面放一键复制按钮。
- 显示兑换步骤。
- 如果当前没有可用码，也要保留页面，写清楚 `No active codes found today`，并展示过期码和订阅更新入口。

## 内容更新节奏

建议：

- Codes：每天检查一次。
- Value List：热门物品每 1-3 天检查一次。
- Updates：游戏大版本后当天更新。
- Guides：每周补 1-2 篇短攻略。

## 获客渠道

SEO：

- `Grow a Garden codes`
- `Grow a Garden value list`
- `Grow a Garden trade calculator`
- `Grow a Garden WFL calculator`
- `Grow a Garden pet values`

社交平台：

- Discord：分享交易投票链接。
- Reddit：发实用工具，不发硬广告。
- TikTok：短视频展示某笔交易是 W/F/L。
- YouTube Shorts：展示新 codes、热门交易、价值变化。

## 第一版增长功能清单

1. Codes 页面。
2. Value List 页面。
3. Trade Share Link。
4. Copy Results 按钮。
5. 页面显示 `Last updated`。
6. 每个工具页底部推荐其他工具。
7. 简单反馈入口：`Report wrong value`。

## 风险

- Codes 过期很快，必须标明检查日期。
- 不要假装是官方站。
- 不要引导用户输入 Roblox 账号密码。
- 不要承诺免费 Robux。
- 不要使用欺骗性倒计时或虚假奖励。
