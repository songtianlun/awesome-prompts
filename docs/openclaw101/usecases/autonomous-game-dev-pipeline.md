# 自主教育游戏开发流水线

## 痛点

**起源故事：** 一位"老派 LAN 玩家"爸爸想为他的女儿们 Susana（3 岁）和即将出生的 Julieta 创建一个安全、无广告、高质量的游戏门户。现有网站充斥着垃圾信息、侵入性广告和欺骗性按钮（暗黑模式），让他的幼女非常沮丧。

**挑战：** 构建一个"简洁、快速、简单"的门户是容易的部分。真正的挑战是在没有开发团队的情况下，用**40+ 款教育游戏**填充它，这些游戏要针对特定的发展阶段（0-15 岁）。对于独立开发的父亲来说，手动开发太慢了，而维护数十款游戏的一致性正在变成噩梦。

## 功能

这个用例定义了一个"游戏开发智能体"，它自主管理游戏创建和维护的完整生命周期。工作流执行**"Bug 优先"**策略，智能体必须在实现新功能之前检查并解决已报告的 bug。

**效率：** 这个流水线能够每 **7 分钟生产 1 个新游戏或 bug 修复**。智能体不知疲倦地迭代 41+ 个计划游戏的积压，在创建新内容和纠正之前周期中检测到的问题之间交替。

当路径畅通时，智能体会：

1. **选择**：根据"轮询"策略从队列（`development-queue.md`）中识别下一个游戏，以平衡各年龄段的内容。
2. **实现**：按照严格的 `game-design-rules.md` 编写 HTML5/CSS3/JS 代码（无框架、移动优先、离线可用）。
3. **注册**：自动将游戏元数据添加到中央注册表（`games-list.json`）。
4. **文档**：更新 `CHANGELOG.md` 和 `master-game-plan.md` 状态。
5. **部署**：处理 Git 工作流：拉取 master、创建功能分支、使用约定式提交、合并回主分支。

## 提示词

此工作流的核心是给智能体的**系统指令**。此提示词将 LLM 变成一个遵守项目严格结构的纪律性开发者。

*（**注意：** 生产环境中使用的实际提示词是**西班牙语**（`es-419`），以配合项目的目标受众（拉丁美洲儿童）和该地区的潜在贡献者。以下版本是翻译版。）*

```text
作为网页游戏开发和儿童用户体验专家。
你的目标是开发生产队列中的下一个游戏。

在开始之前，请阅读并分析以下上下文文件：

1. BUG 上下文（最高优先级 - 关键）：
   @[bugs/]
   （检查此文件夹。如果有文件，你的任务是修复**第一个文件**（按字母顺序）。忽略其余 bug 和游戏队列。）

2. 队列上下文（下一个游戏是哪个）：
   @[development-queue.md]
   （识别"下一个游戏"部分中标记为 [NEXT] 的游戏。仅在没有 bug 时执行。）

3. 设计规则（技术标准）：
   @[game-design-rules.md]
   （严格遵循这些规则：纯 HTML/CSS/JS，文件夹结构，移动端响应式）

4. 游戏规格（机制和资产）：
   （根据游戏 ID 在 games-backlog/ 中找到对应文件）

5. 中央注册表（集成）：
   @[public/js/games-list.json]
   （你必须在此文件中注册新游戏，使其出现在首页）

任务：
0. **Bug 优先！**：如果 `bugs/` 文件夹有内容，你唯一的优先事项是修复**按字母顺序排列的第一个 bug**。创建 `fix/...` 分支，解决**该** bug，更新状态，并合并。**不要尝试同时修复多个 bug。**
   - 如果没有 BUG，继续下一个游戏：

1. **同步**：`git fetch && git pull origin master`（关键）。
2. 创建新分支：`git checkout -b feature/[game-id]`。
3. 在 'public/games/[game-id]/' 中创建文件夹和文件。
4. 根据积压和设计规则实现逻辑和设计。
5. 在 'games-list.json' 中注册游戏（关键）。
6. 完成后：
   - 更新 `CHANGELOG.md` 并升级版本号。
   - 更新 `master-game-plan.md` 和 `development-queue.md`。
   - 记录更改：`git commit -m "feat: add [game-id]"`。
7. **交付**：
   - 推送：`git push origin feature/[game-id]`。
   - 请求合并到 master。
   - 进入 master 后，推送更改（`git push origin master`）。
```

## 所需技能

- **Git**：管理分支、提交和合并。

## 相关链接

- [项目起源故事（LinkedIn）](https://www.linkedin.com/feed/update/urn:li:activity:7429739200301772800/)
- [El Bebe Games 仓库](https://github.com/duberblockito/elbebe/tree/master)
- [El Bebe Games 在线网站](https://elbebe.co/)
- [HTML5 游戏开发最佳实践](https://developer.mozilla.org/en-US/docs/Games)
