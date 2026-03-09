# 项目状态管理系统：事件驱动的看板替代方案

传统看板是静态的，需要手动更新。你忘记移动卡片，在会话之间丢失上下文，无法追踪状态变更背后的"为什么"。项目在缺乏可见性的情况下偏离方向。

这个工作流用自动追踪项目状态的事件驱动系统取代看板：

- 在数据库中存储项目状态及完整历史
- 捕获上下文：决策、阻塞点、下一步、关键洞察
- 事件驱动更新："刚完成 X，被 Y 阻塞" → 自动状态转换
- 自然语言查询："[项目] 的状态是什么？"、"我们为什么在 [功能] 上转向了？"
- 每日站会摘要：昨天做了什么，今天计划做什么，什么被阻塞了
- Git 集成：将提交链接到项目事件以实现可追溯性

## 痛点

看板变得过时。你在更新卡片上浪费时间而非做实际工作。上下文丢失 —— 三个月后你想不起来为什么做出了某个关键决策。代码变更和项目进展之间没有自动关联。

## 功能

你不用拖拽卡片，而是和你的助理聊天："完成了认证流程，开始做仪表板了。"系统记录事件，更新项目状态，保留上下文。当你问"仪表板进展如何？"时，它会给你完整的故事：什么完成了，接下来做什么，什么阻塞了你，以及为什么。

Git 提交被自动扫描并链接到项目。你的每日站会摘要自动生成。

## 所需技能

- `postgres` 或 SQLite 用于项目状态数据库
- `github`（gh CLI）用于提交追踪
- Discord 或 Telegram 用于更新和查询
- 定时任务用于每日摘要
- 子智能体用于并行项目分析

## 如何设置

1. 设置项目状态数据库：

```sql
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE,
  status TEXT,
  current_phase TEXT,
  last_update TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id),
  event_type TEXT,
  description TEXT,
  context TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE blockers (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id),
  blocker_text TEXT,
  status TEXT DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);
```

2. 创建 Discord 频道用于项目更新（如 #project-state）。

3. 向 OpenClaw 发送：

```text
你是我的项目状态管理器。不用看板，我会用对话方式告诉你我在做什么。

当我说类似以下的话时：
- "完成了 [任务]" → 记录"进展"事件，更新项目状态
- "被 [问题] 阻塞" → 创建阻塞条目，更新项目状态为"阻塞"
- "开始 [新任务]" → 记录"进展"事件，更新当前阶段
- "决定 [决策]" → 记录"决策"事件，包含完整上下文
- "转向 [新方案]" → 记录"转向"事件，包含原因

当我询问：
- "[项目] 的状态是什么？" → 获取最新事件、阻塞点和当前阶段
- "我们为什么决定 [X]？" → 搜索决策上下文事件
- "什么阻塞了我们？" → 列出所有项目的未解决阻塞点

每天早上 9 点运行定时任务：
1. 扫描过去 24 小时的 git 提交（通过 gh CLI）
2. 根据分支名或提交消息将提交链接到项目
3. 向 Discord #project-state 发布每日站会摘要：
   - 昨天发生了什么（事件 + 提交）
   - 今天计划做什么（基于当前阶段和最近对话）
   - 什么被阻塞了（未解决的阻塞点）

当我规划冲刺时，生成子智能体分析每个项目的状态并建议优先级。
```

## 相关链接

- [事件溯源模式](https://martinfowler.com/eaaDev/EventSourcing.html)
