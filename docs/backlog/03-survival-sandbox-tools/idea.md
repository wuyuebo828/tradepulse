# Survival and Sandbox Tools Backlog

## 目标游戏

优先考虑：

- Rust
- Minecraft

这类游戏生命周期长，玩家喜欢查配方、计算成本、看地图、找服务器，工具复用率高。

## Rust 玩家需求

高频需求：

- 炸一面墙需要多少炸药、火箭、硫磺？
- 物品回收能得到多少材料？
- 合成某个物品需要多少资源？
- 某个 monument 怎么解谜？
- 服务器什么时候 wipe？
- 基地设计怎么防 raid？

可做工具：

- Raid Cost Calculator
- Recycle Calculator
- Crafting Calculator
- Wipe Tracker
- Monument Puzzle Guides
- Base Build Planner

## Minecraft 玩家需求

高频需求：

- 某个物品怎么合成？
- 指令怎么生成？
- 附魔怎么搭配？
- 种子地图有什么结构？
- 模组之间兼不兼容？
- 服务器怎么找？

可做工具：

- Crafting Recipe Search
- Command Generator
- Enchantment Calculator
- Seed / Structure Notes
- Mod Compatibility List
- Server List

## 页面结构

- `/survival`
- `/rust/raid-calculator`
- `/rust/recycle-calculator`
- `/rust/crafting`
- `/rust/wipe-tracker`
- `/minecraft/crafting`
- `/minecraft/command-generator`
- `/minecraft/enchanting`

## 数据来源

- 官方 Wiki。
- 社区 Wiki。
- 游戏内测试。
- 公开服务器列表。
- 玩家投稿和人工审核。

## 竞争和机会

Rust 的工具需求更集中，适合先做计算器。Minecraft 的长尾搜索量巨大，但内容非常分散，适合从指令生成器或合成表切入。

差异化点：

- 手机端好用。
- 计算器步骤少。
- 每个工具都有可分享链接。
- 数据版本清晰。

## 风险

- Minecraft 版本很多，必须标注版本。
- Rust 平衡改动会影响计算器。
- 地图和服务器数据可能涉及第三方 API 限制。
