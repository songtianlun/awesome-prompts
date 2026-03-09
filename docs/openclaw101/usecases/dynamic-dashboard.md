# 动态仪表板与子智能体并发

静态仪表板显示过时数据，需要不断手动更新。你需要跨多个数据源的实时可见性，而不必构建自定义前端或触及 API 速率限制。

这个工作流创建一个实时仪表板，通过生成子智能体并行获取和处理数据：

- 同时监控多个数据源（API、数据库、GitHub、社交媒体）
- 为每个数据源生成子智能体，避免阻塞并分散 API 负载
- 将结果聚合到统一仪表板（文本、HTML 或 Canvas）
- 每 N 分钟自动更新
- 当指标超过阈值时发送告警
- 在数据库中维护历史趋势用于可视化

## 痛点

构建自定义仪表板需要数周。等做好了，需求已经变了。顺序轮询多个 API 速度慢且触及速率限制。你需要即时洞察，而非周末编码后才能看到。

## 功能

你用对话定义要监控的内容："追踪 GitHub 星标数、Twitter 提及、Polymarket 交易量和系统健康。"OpenClaw 生成子智能体并行获取每个数据源，聚合结果，并将格式化的仪表板推送到 Discord 或 HTML 文件。更新按定时计划自动运行。

## 所需技能

- 子智能体并发执行
- `github`（gh CLI）用于 GitHub 指标
- `bird`（Twitter）用于社交数据
- `web_search` 或 `web_fetch` 用于外部 API
- `postgres` 用于存储历史指标
- Discord 或 Canvas 用于渲染仪表板
- 定时任务用于计划更新

## 如何设置

1. 设置指标数据库：

```sql
CREATE TABLE metrics (
  id SERIAL PRIMARY KEY,
  source TEXT,
  metric_name TEXT,
  metric_value NUMERIC,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE alerts (
  id SERIAL PRIMARY KEY,
  source TEXT,
  condition TEXT,
  threshold NUMERIC,
  last_triggered TIMESTAMPTZ
);
```

2. 创建 Discord 频道用于仪表板更新（如 #dashboard）。

3. 向 OpenClaw 发送：

```text
你是我的动态仪表板管理器。每 15 分钟运行定时任务：

1. 并行生成子智能体获取数据：
   - GitHub：星标、fork、未关闭 issue、提交（过去 24h）
   - Twitter：提及 "@username"，情感分析
   - Polymarket：追踪市场的交易量
   - 系统：通过 shell 命令获取 CPU、内存、磁盘使用率

2. 每个子智能体将结果写入指标数据库。

3. 聚合所有结果并格式化仪表板。

4. 发布到 Discord #dashboard。

5. 检查告警条件：
   - 如果 GitHub 星标 1 小时内变化 > 50 → 通知我
   - 如果系统 CPU > 90% → 告警
   - 如果 Twitter 出现负面情感激增 → 通知

将所有指标存储到数据库用于历史分析。
```

## 相关链接

- [子智能体并行处理](https://docs.openclaw.ai/subagents)
