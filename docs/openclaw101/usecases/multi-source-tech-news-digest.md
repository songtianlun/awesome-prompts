# 多源科技新闻摘要

自动从 109+ 来源聚合、评分并推送科技新闻，涵盖 RSS、Twitter/X、GitHub 发布和网页搜索 —— 全部通过自然语言管理。

## 痛点

紧跟 AI、开源和前沿技术需要每天查看数十个 RSS 订阅源、Twitter 账号、GitHub 仓库和新闻网站。手动策划非常耗时，而大多数现有工具要么缺乏质量过滤，要么需要复杂的配置。

## 功能

一个按计划运行的四层数据管道：

1. **RSS 订阅**（46 个来源）—— OpenAI、Hacker News、MIT Tech Review 等
2. **Twitter/X KOL**（44 个账号）—— @karpathy、@sama、@VitalikButerin 等
3. **GitHub 发布**（19 个仓库）—— vLLM、LangChain、Ollama、Dify 等
4. **网页搜索**（4 个主题搜索）—— 通过 Brave Search API

所有文章被合并、按标题相似度去重，并进行质量评分（优先来源 +3，多源提及 +5，新鲜度 +2，互动量 +1）。最终摘要推送到 Discord、邮箱或 Telegram。

框架完全可定制 —— 30 秒内即可添加你自己的 RSS 源、Twitter 账号、GitHub 仓库或搜索查询。

## 提示词

**安装并设置每日摘要：**

```text
从 ClawHub 安装 tech-news-digest。设置每天早上 9 点向 Discord #tech-news 频道发送科技摘要。同时发送到我的邮箱 myemail@example.com。
```

**添加自定义来源：**

```text
将以下内容添加到我的科技摘要来源中：
- RSS: https://my-company-blog.com/feed
- Twitter: @myFavResearcher
- GitHub: my-org/my-framework
```

**按需生成：**

```text
生成过去 24 小时的科技摘要并发送到这里。
```

## 所需技能

- [tech-news-digest](https://clawhub.ai/skills/tech-news-digest) —— 通过 `clawhub install tech-news-digest` 安装
- [gog](https://clawhub.ai/skills/gog)（可选）—— 通过 Gmail 发送邮件

## 环境变量（可选）

- `X_BEARER_TOKEN` —— Twitter/X API bearer token，用于 KOL 监控
- `BRAVE_API_KEY` —— Brave Search API 密钥，用于网页搜索层
- `GITHUB_TOKEN` —— GitHub token，用于提高 API 速率限制

## 相关链接

- [GitHub 仓库](https://github.com/draco-agent/tech-news-digest)
- [ClawHub 页面](https://clawhub.ai/skills/tech-news-digest)
