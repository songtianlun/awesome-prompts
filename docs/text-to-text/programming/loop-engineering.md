---
tags:
  - Loop Engineering
  - Coding Agents
  - Agentic Workflow
  - Prompts
---

# Loop Engineering 专题提示词

> 来源：[loops!](https://loops.elorm.xyz/)；抓取日期：2026-06-29。loops! 将一次性提示词整理为“触发器 → 执行步骤 → 反馈检查 → 退出条件”的闭环工作流，让 Coding Agent 能自我节奏化地反复执行，直到达到可验证的完成状态。

## 如何使用这些 Loop

1. 选择与你当前任务最接近的 Loop。
2. 复制对应的 **Kickoff Prompt** 到 Cursor、Claude Code、Codex、Gemini CLI 或其他 Coding Agent。
3. 按照提示词中的检查命令在每轮迭代后验证结果。
4. 只有当退出条件满足时才停止；如果多轮后仍无法通过，应报告阻塞点，而不是修改检查命令或绕过测试。

## Loop 速览

| Loop | 场景 | 触发方式 | 检查命令 | 退出条件 |
| --- | --- | --- | --- | --- |
| [Ship PR Until Green](#ship-pr-until-green) | 开分支、提交 PR、修复 CI 直到可合并 | 手动 | `gh pr checks` | PR 检查全部成功 |
| [CI Failure Watcher](#ci-failure-watcher) | 定时查看当前分支 CI，失败就定位并修复 | 定时 | `gh run list --branch $(git branch --show-current) --limit 1` | 最新 CI run 成功 |
| [Independent Verifier Pass](#independent-verifier-pass) | 独立验证构建、Lint、测试，不依赖实现者自述 | 手动 | `npm run build && npm run lint && npm test` | 所有验证命令返回 0 |
| [Post-Edit Test Guard](#post-edit-test-guard) | 每批文件编辑后运行相关测试，提前发现回归 | 事件 | `npm test -- --findRelatedTests <edited files>` | 相关测试通过 |
| [Pre-Commit Guard](#pre-commit-guard) | 提交前运行测试，阻止红灯提交 | 事件 | `npm test` | 提交前测试通过 |
| [Deploy Verification Loop](#deploy-verification-loop) | 部署后定时检查健康检查与冒烟端点 | 定时 | `curl -fsS <your-health-url>` | 所有端点成功 |

## 通用防作弊规则

这些 Loop 的关键价值在于**验证驱动**，因此 Agent 必须遵守以下规则：

- 不要修改检查命令或退出条件来制造成功。
- 不要跳过、禁用或绕过检查。
- 如果多轮迭代后仍然卡住，停止并报告阻塞点。
- 涉及测试的 Loop 中，不要削弱、删除或跳过测试来让套件变绿。
- 不要把真实断言替换成永远通过的空断言。
- 优先修复生产代码，而不是为了变绿而随意改测试。

## Ship PR Until Green

**适用场景：** 实现一项变更，创建或更新 PR，然后持续修复 CI，直到 PR 处于可合并状态。

**工作步骤：**

1. 实现变更并在本地运行测试。
2. 使用清晰的提交信息提交并推送分支。
3. 创建或更新 PR，检查 PR 状态。
4. 如果 CI 失败，读取日志，修复根因，本地验证后再推送。

**Kickoff Prompt：**

```text
Start the "Ship PR Until Green" loop.

Goal: PR is open with all CI checks passing
Max iterations: 10
Between iterations run: gh pr checks
Exit when: all PR checks are success

Step 1: Implement the change, test locally, push, open PR, and fix CI until green.

Self-pace this loop. After each iteration, run the check command, read the output, and only continue if the exit condition is not met. Stop when the exit condition passes or max iterations is reached. Give a short status update each pass.
```

## CI Failure Watcher

**适用场景：** 当前分支已有 CI 运行，需要定时轮询，发现红灯后自动分析日志并修复。

**工作步骤：**

1. 使用 GitHub CLI 检查当前分支最新 CI run。
2. 如果 CI 失败，阅读日志并定位根因。
3. 本地复现失败的 CI 步骤，应用最小修复。
4. 必要时推送修复并继续轮询，直到最新 CI 成功。

**Kickoff Prompt：**

```text
Start the "CI Failure Watcher" loop.

Goal: latest CI run on this branch is green.
Max iterations: 12.
Between iterations run: gh run list --branch $(git branch --show-current) --limit 1
Exit when: latest run conclusion is success.

Step 1: Check CI status. If failed, read logs, fix root cause, verify locally, and push if needed.
```

## Independent Verifier Pass

**适用场景：** 实现者声称完成后，让一个独立验证轮次只相信命令输出，不相信口头结论。

**工作步骤：**

1. 作为独立验证者运行 build、lint 和测试。
2. 汇总所有失败检查，包含文件路径与错误摘录。
3. 如果可以，修复失败；否则把简洁的失败报告交回实现者。

**Kickoff Prompt：**

```text
Start the "Independent Verifier Pass" loop.

Goal: build, lint, and tests pass under independent verification
Max iterations: 8
Between iterations run: npm run build && npm run lint && npm test
Exit when: all verifier commands exit 0

Step 1: Run build, lint, and tests as a verifier. Trust only command output, not prior claims.

Self-pace this loop. After each iteration, run the check command, read the output, and only continue if the exit condition is not met. Stop when the exit condition passes or max iterations is reached. Give a short status update each pass.
```

## Post-Edit Test Guard

**适用场景：** 每次完成一批文件编辑后，先运行与改动相关的最小测试集合，防止回归继续扩大。

**工作步骤：**

1. 识别上一轮改动过的源文件。
2. 运行与这些文件相关的测试子集。
3. 如果测试失败，先修复失败，再继续做更多改动。

**Kickoff Prompt：**

```text
Install and run the "Post-Edit Test Guard" loop.

Goal: after each batch of file edits, related tests must pass before continuing.
Between iterations run: npm test -- --findRelatedTests <edited files>
Exit when: related tests exit 0.

Step 1: After edits, run related tests. If they fail, fix before making more changes.
```

## Pre-Commit Guard

**适用场景：** 在执行 `git commit` 前强制运行测试，避免把红灯状态提交进历史。

**工作步骤：**

1. 检测提交意图。
2. 提交前运行完整测试套件。
3. 测试失败则阻止提交并先修复；测试通过才继续提交。

**Kickoff Prompt：**

```text
Install and run the "Pre-Commit Guard" loop.

Goal: block git commits when tests are failing.
Between iterations run: npm test
Exit when: tests exit 0 before each commit.

Step 1: Before any git commit, run tests. Fix failures before committing.
```

## Deploy Verification Loop

**适用场景：** 部署后持续访问健康检查和冒烟测试端点，直到所有端点返回健康结果。

**工作步骤：**

1. 请求配置好的健康检查或冒烟测试 URL，记录状态码和响应体。
2. 如果任一端点失败，检查部署日志、环境变量和数据库迁移等。
3. 应用最小修复或做出回滚/升级判断，然后重新验证。

**Kickoff Prompt：**

```text
/loop 15m Start the "Deploy Verification Loop".
Goal: all post-deploy health and smoke endpoints return success.
Max iterations: 8.
Between iterations run: curl -fsS <your-health-url>
Exit when: every configured endpoint succeeds.
Step 1: Hit health/smoke URLs. If any fail, inspect deploy logs and fix or escalate.
```

## 设计自己的 Loop Prompt 模板

当你把普通提示词改写为 Loop Engineering 提示词时，可以使用下面的结构：

```text
Start the "<Loop Name>" loop.

Goal: <用可验证语言描述目标>
Max iterations: <最大迭代次数>
Between iterations run: <每轮必须运行的检查命令>
Exit when: <明确、客观、可观察的退出条件>

Step 1: <第一步行动>
Step 2: <第二步行动>
Step 3: <验证、修复或升级策略>

Self-pace this loop. After each iteration, run the check command, read the output, and only continue if the exit condition is not met. Stop when the exit condition passes or max iterations is reached. Give a short status update each pass.
```
