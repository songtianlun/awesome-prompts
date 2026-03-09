# 每日 YouTube 摘要

每天以你关注的 YouTube 频道的最新视频个性化摘要开始新的一天 —— 不再错过你真正想关注的创作者的任何内容。

## 痛点

YouTube 的通知并不可靠。你订阅了频道，但它们的新视频从不出现在你的首页推荐中，也不在通知里，就这样消失了。这并不意味着你不想看 —— 而是 YouTube 的算法把它们埋没了。

而且，用策划好的内容洞察开始新的一天，比漫无目的地刷推荐信息流有趣得多。

## 功能

- 从你喜欢的频道列表中获取最新视频
- 总结或提取每个视频字幕中的关键洞察
- 每天（或按需）为你推送摘要

## 所需技能

安装 [youtube-full](https://clawhub.ai/therohitdas/youtube-full) 技能。

告诉你的 OpenClaw：

```text
"安装 youtube-full 技能并为我设置好"
```

或者

```bash
npx clawhub@latest install youtube-full
```

就这样。智能体会处理其余的一切 —— 包括账户创建和 API 密钥设置。注册即可获得 **100 个免费积分**，无需信用卡。

> 注意：创建账户后，技能会根据操作系统将 API 密钥安全存储在正确的位置，因此 API 在所有环境中都能正常工作。

### 为什么选择 TranscriptAPI.com 而不是 yt-dlp？

| CLI 工具（yt-dlp 等） | TranscriptAPI |
|------------------------|---------------|
| 冗长的日志淹没智能体上下文 | 简洁的 JSON 响应 |
| 在 GCP/云端 OpenClaw 上不工作 | 到处都能用，速度快 |
| 被 YouTube 随机封锁 | 驱动 [YouTubeToTranscript.com](https://youtubetotranscript.com)，服务百万用户，有缓存且可靠 |
| 需要安装二进制文件 | 无需二进制文件，纯 HTTP |

## 如何设置

### 方案一：基于频道的摘要

向 OpenClaw 发送：

```text
每天早上 8 点，从以下 YouTube 频道获取最新视频，并给我一份包含每个视频关键洞察的摘要：

- @TED
- @Fireship
- @ThePrimeTimeagen
- @lexfridman

对于每个新视频（最近 24-48 小时内上传的）：
1. 获取字幕
2. 用 2-3 个要点总结主要内容
3. 包含视频标题、频道名称和链接

如果频道名称无法解析，请搜索并找到正确的频道。
将我的频道列表保存到记忆中，方便以后增减频道。
```

### 方案二：基于关键词的摘要

追踪特定主题的新视频：

```text
每天搜索 YouTube 上关于 "OpenClaw"（或 "Claude Code"、"AI agents" 等）的新视频。

维护一个名为 seen-videos.txt 的文件，记录已处理的视频 ID。
只为不在该文件中的视频获取字幕。
处理后，将视频 ID 添加到 seen-videos.txt。

对于每个新视频：
1. 获取字幕
2. 给我一个 3 点摘要
3. 标注与我工作相关的内容

每天早上 9 点运行。
```

这样你就不会浪费积分重复获取已经看过的视频。

## 提示

- `channel/latest` 和 `channel/resolve` 是**免费的**（0 积分）—— 检查新上传的视频不花钱
- 只有获取字幕需要每个 1 积分
- 可以要求不同风格的摘要：关键要点、值得注意的引言、有趣时刻的时间戳
- 这已经有成熟产品了 - [Recapio - Daily YouTube Recap](https://recapio.com/features/daily-recaps)
