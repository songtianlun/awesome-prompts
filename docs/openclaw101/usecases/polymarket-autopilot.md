# Polymarket 自动驾驶：自动化模拟交易

手动监控预测市场的套利机会和执行交易非常耗时，需要持续关注。你想在不冒真金白银风险的情况下测试和优化交易策略。

这个工作流在 Polymarket 上自动化模拟交易：

- 通过 API 监控市场数据（价格、交易量、价差）
- 使用 TAIL（趋势跟踪）和 BONDING（逆向）策略执行模拟交易
- 追踪投资组合表现、盈亏和胜率
- 每日向 Discord 推送摘要，包含交易日志和洞察
- 从模式中学习：根据回测结果调整策略参数

## 痛点

预测市场变化很快。手动交易意味着错过机会、情绪化决策，以及难以追踪什么有效。在理解市场行为之前用真钱测试策略意味着承担损失风险。

## 功能

自动驾驶持续扫描 Polymarket 寻找机会，使用可配置策略模拟交易，并记录一切用于分析。你醒来看到它隔夜"交易"了什么的摘要、什么有效、什么没有。

示例策略：

- **TAIL**：当交易量激增且动量明确时跟随趋势
- **BONDING**：当市场对新闻过度反应时买入逆向头寸
- **SPREAD**：识别定价错误的市场套利机会

## 所需技能

- `web_search` 或 `web_fetch`（用于 Polymarket API 数据）
- `postgres` 或 SQLite 用于交易日志和投资组合追踪
- Discord 集成用于每日报告
- 定时任务用于持续监控
- 子智能体用于并行市场分析

## 如何设置

1. 设置模拟交易数据库：

```sql
CREATE TABLE paper_trades (
  id SERIAL PRIMARY KEY,
  market_id TEXT,
  market_name TEXT,
  strategy TEXT,
  direction TEXT,
  entry_price DECIMAL,
  exit_price DECIMAL,
  quantity DECIMAL,
  pnl DECIMAL,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE portfolio (
  id SERIAL PRIMARY KEY,
  total_value DECIMAL,
  cash DECIMAL,
  positions JSONB,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

2. 创建 Discord 频道（如 #polymarket-autopilot）。

3. 向 OpenClaw 发送：

```text
你是 Polymarket 模拟交易自动驾驶。通过定时任务持续运行（每 15 分钟）：

1. 从 Polymarket API 获取当前市场数据
2. 使用以下策略分析机会：
   - TAIL：跟随强趋势（>60% 概率 + 交易量激增）
   - BONDING：对过度反应的逆向操作（新闻后骤降 >10%）
   - SPREAD：当 YES+NO > 1.05 时套利
3. 在数据库中执行模拟交易（初始资金：$10,000）
4. 追踪投资组合状态并更新持仓

每天早上 8 点向 Discord 发布摘要：
- 昨天的交易（入场/出场价格、盈亏）
- 当前投资组合价值和持仓
- 胜率和策略表现
- 市场洞察和建议

在高交易量时期使用子智能体并行分析多个市场。

永远不要使用真钱。这仅用于模拟交易。
```

## 相关链接

- [Polymarket API](https://docs.polymarket.com/)
