# 多渠道 AI 客户服务平台

小型企业在多个应用间切换处理 WhatsApp、Instagram DM、邮件和 Google 评价。客户期望 7x24 小时即时回复，但雇人全天候覆盖成本高昂。

这个用例将所有客户触点整合到一个 AI 驱动的收件箱中，智能代替你回复。

## 功能

- **统一收件箱**：WhatsApp Business、Instagram DM、Gmail 和 Google 评价集于一处
- **AI 自动回复**：自动处理常见问题、预约请求和一般咨询
- **人工接管**：将复杂问题上报或标记待审
- **测试模式**：向客户演示系统而不影响真实客户
- **业务上下文**：基于你的服务、定价和政策进行训练

## 所需技能

- WhatsApp Business API 集成
- Instagram Graph API（通过 Meta Business）
- `gog` CLI 用于 Gmail
- Google Business Profile API 用于评价
- AGENTS.md 中的消息路由逻辑

## 如何设置

1. **连接渠道**：
   - WhatsApp Business API（通过 360dialog 或官方 API）
   - Instagram 通过 Meta Business Suite
   - Gmail 通过 `gog` OAuth
   - Google Business Profile API token

2. **创建业务知识库**：
   - 服务和定价
   - 营业时间和地址
   - FAQ 回复
   - 上报触发条件（如投诉、退款请求）

3. **配置 AGENTS.md** 路由逻辑：

```text
## 客户服务模式

收到客户消息时：

1. 识别渠道（WhatsApp/Instagram/邮件/评价）
2. 检查此客户是否启用了测试模式
3. 分类意图：
   - FAQ → 从知识库回复
   - 预约 → 检查可用时间，确认预约
   - 投诉 → 标记人工审查，确认收到
   - 评价 → 感谢反馈，回应关切

回复风格：
- 友好、专业、简洁
- 匹配客户语言（中文/英文/其他）
- 永远不编造知识库中没有的信息
- 以商家名称结尾
```

4. **设置心跳检查**用于回复监控：

```text
## 心跳：客户服务检查

每 30 分钟：
- 检查超过 5 分钟未回复的消息
- 如果回复队列积压则告警
- 记录每日回复指标
```

## 关键洞察

- **语言检测很重要**：自动检测并用客户的语言回复
- **测试模式不可缺少**：客户需要看到系统运行效果才会上线
- **接管规则**：定义清晰的上报触发条件，避免 AI 越权
- **回复模板**：为敏感话题（退款、投诉）准备预审核模板

## 相关链接

- [WhatsApp Business API](https://developers.facebook.com/docs/whatsapp)
- [Instagram Messaging API](https://developers.facebook.com/docs/instagram-api/guides/messaging)
- [Google Business Profile API](https://developers.google.com/my-business)
