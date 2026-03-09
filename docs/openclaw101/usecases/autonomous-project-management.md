# 子智能体自主项目管理

管理具有多个并行工作流的复杂项目令人疲惫。你不断地切换上下文，跨工具追踪状态，手动协调交接。

这个用例实现了一种去中心化的项目管理模式，子智能体通过共享状态文件而非中央编排器进行协调，自主地处理任务。

## 痛点

传统的编排器模式会造成瓶颈 —— 主智能体变成交通警察。对于复杂项目（多仓库重构、研究冲刺、内容流水线），你需要能够并行工作而无需持续监督的智能体。

## 功能

- **去中心化协调**：智能体读写共享的 `STATE.yaml` 文件
- **并行执行**：多个子智能体同时处理独立任务
- **无编排器开销**：主会话保持精简（CEO 模式 —— 仅负责战略）
- **自文档化**：所有任务状态持久化在版本控制的文件中

## 核心模式：STATE.yaml

每个项目维护一个 `STATE.yaml` 文件作为唯一真实来源：

```yaml
# STATE.yaml - 项目协调文件
project: website-redesign
updated: 2026-02-10T14:30:00Z

tasks:
  - id: homepage-hero
    status: in_progress
    owner: pm-frontend
    started: 2026-02-10T12:00:00Z
    notes: "正在处理响应式布局"

  - id: api-auth
    status: done
    owner: pm-backend
    completed: 2026-02-10T14:00:00Z
    output: "src/api/auth.ts"

  - id: content-migration
    status: blocked
    owner: pm-content
    blocked_by: api-auth
    notes: "等待新端点的 schema"

next_actions:
  - "pm-content: api-auth 完成后恢复迁移"
  - "pm-frontend: 与设计团队评审首页"
```

## 工作原理

1. **主智能体接收任务** → 生成带特定范围的子智能体
2. **子智能体读取 STATE.yaml** → 找到分配给它的任务
3. **子智能体自主工作** → 进度更新到 STATE.yaml
4. **其他智能体轮询 STATE.yaml** → 接手已解锁的工作
5. **主智能体定期检查** → 审查状态，调整优先级

## 所需技能

- `sessions_spawn` / `sessions_send` 用于子智能体管理
- 文件系统访问 STATE.yaml
- Git 用于状态版本化（可选但推荐）

## 设置：AGENTS.md 配置

```text
## PM 委派模式

主会话 = 仅协调。所有执行交给子智能体。

工作流：
1. 新任务到达
2. 检查 PROJECT_REGISTRY.md 是否有现有 PM
3. 如果 PM 存在 → sessions_send(label="pm-xxx", message="[任务]")
4. 如果是新项目 → sessions_spawn(label="pm-xxx", task="[任务]")
5. PM 执行，更新 STATE.yaml，汇报
6. 主智能体向用户总结

规则：
- 主会话：最多 0-2 个工具调用（仅 spawn/send）
- PM 拥有其 STATE.yaml 文件
- PM 可以生成子子智能体处理并行子任务
- 所有状态更改提交到 git
```

## 关键洞察

- **STATE.yaml > 编排器**：基于文件的协调比消息传递扩展性更好
- **Git 作为审计日志**：提交 STATE.yaml 的更改获得完整历史
- **标签规范很重要**：使用 `pm-{项目}-{范围}` 方便追踪
- **精简的主会话**：主智能体做得越少，响应越快

## 相关链接

- [OpenClaw 子智能体文档](https://github.com/openclaw/openclaw)
- [Anthropic: 构建高效智能体](https://www.anthropic.com/research/building-effective-agents)
