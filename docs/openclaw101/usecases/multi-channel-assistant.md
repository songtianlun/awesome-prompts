# 多渠道个人助理

在应用间切换来管理任务、安排日程、发消息和跟踪工作令人疲惫。你需要一个路由到所有工具的统一界面。

这个工作流将一切整合到一个 AI 助理中：

- Telegram 作为主界面，基于主题路由（不同主题用于视频创意、CRM、财报、配置等）
- Slack 集成用于团队协作（任务分配、知识库保存、视频创意触发）
- Google Workspace：从聊天中创建日历事件、管理邮件、上传到 Drive
- Todoist 用于快速任务捕获
- Asana 用于项目管理
- 自动提醒：垃圾日、每周公司简报等

## 所需技能

- `gog` CLI（Google Workspace）
- Slack 集成（bot + 用户 token）
- Todoist API 或技能
- Asana API 或技能
- 配置了多个主题的 Telegram 频道

## 如何设置

1. 为不同上下文设置 Telegram 主题：
   - `config` —— 机器人设置和调试
   - `updates` —— 状态和通知
   - `video-ideas` —— 内容流水线
   - `personal-crm` —— 联系人管理
   - `earnings` —— 财务追踪
   - `knowledge-base` —— RAG 录入和查询

2. 通过 OpenClaw 配置连接所有工具：
   - Google OAuth（Gmail、Calendar、Drive）
   - Slack（app + 用户 token）
   - Todoist API token
   - Asana API token

3. 向 OpenClaw 发送：

```text
你是我的多渠道助理。根据上下文路由请求：

Telegram 主题：
- "config" → 系统设置、调试
- "updates" → 每日摘要、提醒、日历
- "video-ideas" → 内容流水线和研究
- "personal-crm" → 联系人查询和会议准备
- "earnings" → 财务追踪
- "knowledge-base" → 保存和搜索内容

当我要求你：
- "添加 [任务] 到我的待办" → 使用 Todoist
- "为 [主题] 创建卡片" → 使用 Asana 视频流水线项目
- "安排 [事件]" → 使用 gog 日历
- "给 [某人] 发邮件关于 [主题]" → 通过 gog gmail 起草邮件
- "上传 [文件] 到 Drive" → 使用 gog drive

设置自动提醒：
- 周一下午 6 点："明天是垃圾日"
- 周五下午 3 点："是时候写每周公司动态了"
```

4. 逐个测试每个集成，然后测试跨工作流交互（例如将 Slack 链接保存到知识库，然后在视频研究卡片中使用它）。
