# YouTube 内容流水线

作为日更 YouTube 创作者，在网络和 X/Twitter 上寻找新鲜、及时的视频创意非常耗时。追踪已覆盖的内容可以避免重复并帮助你保持领先。

这个工作流自动化了整个内容发掘和研究流程：

- 每小时定时任务扫描突发 AI 新闻（网页 + X/Twitter），并向 Telegram 推送视频创意
- 维护一个 90 天的视频目录，包含播放量和主题分析，避免重复覆盖
- 将所有创意存储在带向量嵌入的 SQLite 数据库中进行语义去重（不会被推荐相同的创意两次）
- 当你在 Slack 中分享链接时，OpenClaw 研究该主题、搜索 X 上的相关帖子、查询你的知识库，并在 Asana 中创建带完整大纲的卡片

## 所需技能

- `web_search`（内置）
- [x-research-v2](https://clawhub.ai) 或自定义 X/Twitter 搜索技能
- [knowledge-base](https://clawhub.ai) RAG 技能
- Asana 集成（或 Todoist）
- `gog` CLI 用于 YouTube Analytics
- Telegram 主题用于接收创意

## 如何设置

1. 设置一个用于视频创意的 Telegram 主题，并在 OpenClaw 中配置。
2. 安装 knowledge-base 技能和 x-research 技能。
3. 创建一个 SQLite 数据库用于创意追踪：

```sql
CREATE TABLE pitches (
  id INTEGER PRIMARY KEY,
  timestamp TEXT,
  topic TEXT,
  embedding BLOB,
  sources TEXT
);
```

4. 向 OpenClaw 发送：

```text
运行每小时定时任务：
1. 搜索网页和 X/Twitter 上的突发 AI 新闻
2. 与我的 90 天 YouTube 目录对比（通过 gog 从 YouTube Analytics 获取）
3. 与数据库中所有历史创意进行语义相似度检查
4. 如果是新颖的，将创意推送到我的 Telegram "视频创意"主题，并附上来源

另外：当我在 Slack #ai_trends 中分享链接时，自动：
1. 研究该主题
2. 搜索 X 上的相关帖子
3. 查询我的知识库
4. 在 Asana 的"视频流水线"项目中创建带完整大纲的卡片
```
