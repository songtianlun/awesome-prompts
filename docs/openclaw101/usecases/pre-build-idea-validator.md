# 构建前想法验证器

在 OpenClaw 开始构建任何新东西之前，它会自动检查这个想法是否已经存在于 GitHub、Hacker News、npm、PyPI 和 Product Hunt —— 并根据发现调整方案。

## 功能

- 在编写任何代码之前扫描 5 个真实数据源（GitHub、Hacker News、npm、PyPI、Product Hunt）
- 返回 `reality_signal` 分数（0-100），表示该领域的竞争程度
- 显示排名靠前的竞争者及其 star 数和描述
- 当领域饱和时建议转向方向
- 作为构建前门控：高分 = 停下来讨论，低分 = 继续

## 痛点

你告诉智能体"给我做一个 AI 代码审查工具"，它愉快地编码了 6 个小时。与此同时，GitHub 上已经有 143,000+ 个相关仓库 —— 排名第一的有 53,000 个 star。智能体从不检查因为你从没让它查，它也不知道要查。你只在投入大量时间后才发现竞争对手。

## 所需技能

- [idea-reality-mcp](https://github.com/mnemox-ai/idea-reality-mcp) —— MCP 服务器，扫描真实数据源并返回竞争分数

## 如何设置

1. 安装 idea-reality-mcp：

```bash
uvx idea-reality-mcp
```

2. 添加 MCP 服务器到 OpenClaw 配置：

```json
{
  "mcpServers": {
    "idea-reality": {
      "command": "uvx",
      "args": ["idea-reality-mcp"]
    }
  }
}
```

3. 在智能体指令中添加：

```text
在开始任何新项目、功能或工具之前，始终先运行 idea_check。

规则：
- 如果 reality_signal > 70：停下。报告前 3 个竞争者及 star 数。
  问我是否要继续、转向或放弃。
- 如果 reality_signal 30-70：显示结果和 pivot_hints。
  建议一个现有项目未覆盖的利基角度。
- 如果 reality_signal < 30：继续构建。
  提到该领域是开放的。
- 始终在编写任何代码之前显示 reality_signal 分数和排名靠前的竞争者。
```

## 关键洞察

- 这可以防止构建中最昂贵的错误：**解决一个已经被解决的问题**。
- `reality_signal` 基于真实数据（仓库数量、star 分布、HN 讨论量），而非 LLM 猜测。
- 高分不意味着"不要做" —— 意味着"差异化或别费力"。
- 低分意味着真正的空白市场。那是独立开发者成功概率最高的地方。

## 相关链接

- [idea-reality-mcp GitHub](https://github.com/mnemox-ai/idea-reality-mcp)
- [网页演示](https://mnemox.ai/check)（无需安装试用）
