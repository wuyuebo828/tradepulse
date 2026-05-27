# FPS Tools Backlog

## 目标游戏

优先考虑：

- Valorant
- Counter-Strike 2
- Apex Legends

这类游戏的玩家会反复查询设置、准星、灵敏度、地图点位和职业选手配置，适合做轻工具站。

## 玩家需求

高频需求：

- 从一个游戏切换到另一个游戏，鼠标灵敏度怎么换算？
- 某个职业选手用什么准星、DPI、分辨率、按键？
- 什么准星代码适合新手？
- 地图点位怎么叫？
- 烟雾弹、闪光弹、技能怎么丢？
- 当前版本什么武器、角色、地图强？

## 可做工具

第一批工具：

- Sensitivity Converter：Valorant / CS2 / Apex / Overwatch 之间互转。
- Crosshair Generator：生成 Valorant / CS2 准星配置。
- Pro Settings Database：职业选手设置库。
- eDPI Calculator：DPI x 游戏内灵敏度。
- Map Callouts：地图点位图。

第二批工具：

- Aim Routine Generator：根据段位生成练枪计划。
- Agent / Weapon Tier List：版本强度榜。
- Lineup Library：技能点位库。

## 页面结构

- `/fps`
- `/fps/sensitivity-converter`
- `/fps/crosshair-generator`
- `/fps/pro-settings`
- `/fps/pro-settings/:player`
- `/fps/maps/:game/:map`
- `/fps/guides`

## 数据来源

- 职业选手公开设置。
- 游戏官方 patch notes。
- 社区攻略、视频和赛事资料。
- 用户提交表单，后期人工审核。

## 竞争和机会

竞争很强，但工具可以做得更轻、更快、更适合手机端。

差异化点：

- 多游戏统一转换。
- 职业选手设置的更新时间和来源链接。
- 一键复制准星代码。
- 简洁无登录体验。

## 风险

- 职业选手设置变化频繁。
- 地图点位和技能点位需要懂游戏的人校验。
- 不要承诺“最佳设置”，更适合写成“常用设置”或“可作为起点”。
