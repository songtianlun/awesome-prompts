# OpenClaw + n8n 工作流编排

让你的 AI 智能体直接管理 API 密钥和调用外部服务是安全事故的隐患。每增加一个新集成就意味着在 `.env.local` 中多一个凭证，多一个智能体可能意外泄露或滥用的攻击面。

这个用例描述了一种模式：OpenClaw 通过 webhook 将所有外部 API 交互委托给 n8n 工作流 —— 智能体永远不接触凭证，每个集成都是可视化检查和可锁定的。

## 痛点

当 OpenClaw 直接处理一切时，你会遇到三个叠加的问题：

- **缺乏可见性**：当智能体的实现埋在 JavaScript 技能文件或 shell 脚本中时，很难检查它到底构建了什么
- **凭证泛滥**：每个 API 密钥都在智能体的环境中，离暴露只差一次错误提交
- **浪费 token**：确定性子任务（发邮件、更新表格）本可以作为简单工作流运行，却消耗了 LLM 推理 token

## 功能

- **代理模式**：OpenClaw 编写带传入 webhook 的 n8n 工作流，然后通过调用这些 webhook 进行所有后续 API 交互
- **凭证隔离**：API 密钥存储在 n8n 的凭证存储中 —— 智能体只知道 webhook URL
- **可视化调试**：每个工作流都可以在 n8n 的拖放 UI 中检查
- **可锁定工作流**：工作流构建并测试后，你可以锁定它，防止智能体修改其与 API 的交互方式
- **安全门控**：你可以在 n8n 中添加验证、速率限制和审批环节

## 工作原理

1. **智能体设计工作流**：告诉 OpenClaw 你需要什么
2. **智能体在 n8n 中构建它**：OpenClaw 通过 n8n 的 API 创建工作流，包含传入 webhook 触发器
3. **你添加凭证**：打开 n8n 的 UI，手动添加你的 Slack token / GitHub token
4. **你锁定工作流**：防止智能体进一步修改
5. **智能体调用 webhook**：此后，OpenClaw 用 JSON 负载调用 `http://n8n:5678/webhook/my-workflow` —— 它永远看不到 API 密钥

```text
┌──────────────┐     webhook 调用     ┌─────────────────┐     API 调用     ┌──────────────┐
│   OpenClaw   │ ──────────────────→  │   n8n 工作流     │ ─────────────→  │   外部服务    │
│  （智能体）   │   （无凭证）          │ （已锁定，含      │  （凭证留在     │  （Slack 等）  │
│              │                      │   API 密钥）      │   这里）        │              │
└──────────────┘                      └─────────────────┘                  └──────────────┘
```

## 所需技能

- `n8n` API 访问（用于创建/触发工作流）
- `fetch` 或 `curl` 用于 webhook 调用
- Docker（如果使用预配置的技术栈）
- n8n 凭证管理（手动，每个集成一次性设置）

## 如何设置

### 方案一：预配置的 Docker 技术栈

社区维护的 Docker Compose 设置（[openclaw-n8n-stack](https://github.com/caprihan/openclaw-n8n-stack)）在共享 Docker 网络上预先连接了一切：

```bash
git clone https://github.com/caprihan/openclaw-n8n-stack.git
cd openclaw-n8n-stack
cp .env.template .env
# 在 .env 中添加你的 Anthropic API 密钥
docker-compose up -d
```

这将提供：

- OpenClaw 在端口 3456
- n8n 在端口 5678
- 共享 Docker 网络，OpenClaw 可以直接调用 `http://n8n:5678/webhook/...`
- 预构建的工作流模板（多 LLM 事实核查、邮件分类、社交监控）

### 方案二：手动设置

1. 安装 n8n（`npm install n8n -g` 或通过 Docker 运行）
2. 配置 OpenClaw 使其知道 n8n 的基础 URL
3. 在你的 AGENTS.md 中添加：

```text
## n8n 集成模式

当我需要与外部 API 交互时：

1. 永远不要在我的环境或技能文件中存储 API 密钥
2. 检查是否已有此集成的 n8n 工作流
3. 如果没有，通过 n8n API 创建一个带 webhook 触发器的工作流
4. 通知用户添加凭证并锁定工作流
5. 后续所有调用都使用 webhook URL 和 JSON 负载

工作流命名：openclaw-{服务}-{操作}
示例：openclaw-slack-send-message

Webhook 调用格式：
curl -X POST http://n8n:5678/webhook/{workflow-name} \
  -H "Content-Type: application/json" \
  -d '{"channel": "#general", "message": "Hello from OpenClaw"}'
```

## 关键洞察

- **一举三得**：可观测性（可视化 UI）、安全性（凭证隔离）和性能（确定性工作流不消耗 token）
- **测试后锁定**：构建 → 测试 → 锁定的循环至关重要 —— 不锁定的话，智能体可以静默修改工作流
- **n8n 有 400+ 集成**：大多数你想连接的外部服务都已有 n8n 节点，免去智能体编写自定义 API 调用
- **免费获得审计跟踪**：n8n 记录每次工作流执行的输入/输出数据

## 相关链接

- [n8n 文档](https://docs.n8n.io/)
- [openclaw-n8n-stack（Docker 设置）](https://github.com/caprihan/openclaw-n8n-stack)
- [n8n Webhook 触发器文档](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/)
