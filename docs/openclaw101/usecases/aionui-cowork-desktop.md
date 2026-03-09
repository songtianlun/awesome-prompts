# OpenClaw 桌面 Cowork（AionUi）—— 远程救援与多智能体中心

从桌面 Cowork UI 使用 OpenClaw，外出时通过 Telegram 或 WebUI 访问，连不上时远程修复。AionUi 是一个免费开源应用，将 **OpenClaw 作为一等智能体**运行，同时支持 12+ 个其他智能体（Claude Code、Codex、Qwen Code 等），内置 **OpenClaw 部署专家**用于安装、诊断和修复 —— 包括 OpenClaw 宕机且你不在机器旁时的**远程救援**。

## 为什么选择 OpenClaw + AionUi

| 你想要... | AionUi 提供... |
|-----------|----------------|
| **用真正的桌面 UI 使用 OpenClaw** | Cowork 工作区，可以看到 OpenClaw（和其他智能体）读写文件、运行命令、浏览网页 —— 不仅仅是终端/聊天。 |
| **远程时修复损坏的 OpenClaw** | 从任何地方通过 **Telegram 或 WebUI** 打开 AionUi → 使用 **OpenClaw 部署专家**运行 `openclaw doctor`、修复配置、重启网关。 |
| **一个地方管理 OpenClaw + 其他智能体** | OpenClaw、内置智能体、Claude Code、Codex 等在一个应用中；切换或并行运行，所有智能体共享同一 MCP 配置。 |
| **远程访问你的 OpenClaw** | WebUI、Telegram、飞书、钉钉 —— 从手机或其他设备与同一个 AionUi 实例（进而访问 OpenClaw）对话。 |

## 痛点

你已经通过 CLI 或 Telegram 使用 OpenClaw，但是：

- 你想**看到**智能体在做什么（文件、终端、网页），而不是从日志推断
- 当 **OpenClaw 连不上**且你不在机器旁时，你无法运行 `openclaw doctor` 或修复配置 —— 你需要远程访问来修复 OpenClaw
- 你使用多个 CLI 智能体（OpenClaw、Claude Code、Codex……），不想为每个单独配置 MCP

## 功能

- **OpenClaw 作为 Cowork 智能体**：安装 AionUi 和 OpenClaw；AionUi 自动检测 OpenClaw
- **远程 OpenClaw 救援**：当 OpenClaw 损坏或不可达时，通过 **Telegram 或 WebUI** 打开 AionUi，使用内置的 **OpenClaw 部署专家**
- **多智能体一个应用**：在同一界面并行运行 OpenClaw 和其他 12+ 个智能体
- **MCP 一次配置，所有智能体共享**：在 AionUi 中配置一次 MCP 服务器，自动同步到 OpenClaw 和每个其他智能体
- **远程访问**：通过 WebUI、Telegram、飞书或钉钉从任何地方访问

## 所需技能

- **OpenClaw**（如 `npm install -g openclaw@latest`）
- 模型的 API 密钥或认证

## 如何设置

1. **安装 AionUi**：[AionUi Releases](https://github.com/iOfficeAI/AionUi/releases)（macOS / Windows / Linux）
2. **安装 OpenClaw**（如需）：
   ```bash
   npm install -g openclaw@latest
   openclaw onboard --install-daemon   # 可选：守护进程用于 24/7
   ```
3. **打开 AionUi**：它会自动检测 OpenClaw。如未检测到，使用应用内的 **OpenClaw 设置**助手。
4. **创建 Cowork 会话**并选择 OpenClaw。

## 相关链接

- [AionUi GitHub](https://github.com/iOfficeAI/AionUi)
- [AionUi 网站](https://www.aionui.com)
- [OpenClaw GitHub](https://github.com/openclaw/openclaw)
