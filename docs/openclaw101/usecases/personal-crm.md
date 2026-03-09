# 个人 CRM 与自动联系人发现

跟踪你见过谁、什么时候见的、讨论了什么，手动做是不可能的。重要的跟进会被遗漏，而你在重要会议前忘记了上下文。

这个工作流自动构建和维护个人 CRM：

- 每日定时任务扫描邮件和日历中的新联系人和互动
- 将联系人存储在带关系上下文的结构化数据库中
- 自然语言查询："我知道关于 [某人] 的什么？"、"谁需要跟进？"、"我上次和 [某人] 聊是什么时候？"
- 每日会议准备简报：在每天的会议前，研究外部参会者的 CRM + 邮件历史并推送简报

## 所需技能

- `gog` CLI（用于 Gmail 和 Google Calendar）
- 自定义 CRM 数据库（SQLite 或类似）
- Telegram 主题用于 CRM 查询

## 如何设置

1. 创建 CRM 数据库：

```sql
CREATE TABLE contacts (
  id INTEGER PRIMARY KEY,
  name TEXT,
  email TEXT,
  first_seen TEXT,
  last_contact TEXT,
  interaction_count INTEGER,
  notes TEXT
);
```

2. 设置一个名为 "personal-crm" 的 Telegram 主题。

3. 向 OpenClaw 发送：

```text
每天早上 6 点运行定时任务：
1. 扫描过去 24 小时的 Gmail 和日历
2. 提取新联系人并更新现有联系人
3. 记录互动（会议、邮件），包含时间戳和上下文

同时，每天早上 7 点：
1. 检查今天的日历会议
2. 对每个外部参会者，搜索我的 CRM 和邮件历史
3. 向 Telegram 推送简报：他们是谁、上次联系时间、讨论了什么，以及任何跟进事项

当我在 personal-crm 主题中询问某个联系人时，搜索数据库并告诉我你知道的一切。
```
