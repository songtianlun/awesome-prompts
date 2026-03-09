# 语义记忆搜索

OpenClaw 的内置记忆系统将所有内容存储为 markdown 文件 —— 但随着数周数月记忆的增长，找到上周二的那个决策变得不可能。没有搜索，只能滚动文件。

这个用例使用 [memsearch](https://github.com/zilliztech/memsearch) 在 OpenClaw 现有的 markdown 记忆文件之上添加**向量驱动的语义搜索**，让你可以按含义即时找到任何过去的记忆，而不仅是关键词。

## 功能

- 用一条命令将所有 OpenClaw markdown 记忆文件索引到向量数据库（Milvus）
- 按含义搜索："我们选了什么缓存方案？"即使"缓存"这个词没出现也能找到相关记忆
- 混合搜索（密集向量 + BM25 全文）配合 RRF 重排序获得最佳结果
- SHA-256 内容哈希意味着未变更的文件永远不会重新嵌入 —— 零浪费 API 调用
- 文件监听器在记忆文件变更时自动重新索引
- 支持任何嵌入提供商：OpenAI、Google、Voyage、Ollama，或完全本地（无需 API 密钥）

## 痛点

OpenClaw 的记忆存储为纯 markdown 文件。这对可移植性和可读性很好，但没有搜索。随着记忆增长，你要么 grep 文件（只能关键词，错过语义匹配），要么将整个文件加载到上下文（在不相关内容上浪费 token）。

## 所需技能

- 无需 OpenClaw 技能 —— memsearch 是独立的 Python CLI/库
- Python 3.10+ 及 pip 或 uv

## 如何设置

1. 安装 memsearch：

```bash
pip install memsearch
```

2. 运行交互式配置向导：

```bash
memsearch config init
```

3. 索引你的 OpenClaw 记忆目录：

```bash
memsearch index ~/path/to/your/memory/
```

4. 按含义搜索你的记忆：

```bash
memsearch search "我们选了什么缓存方案？"
```

5. 实时同步，启动文件监听器：

```bash
memsearch watch ~/path/to/your/memory/
```

6. 完全本地设置（无需 API 密钥）：

```bash
pip install "memsearch[local]"
memsearch config set embedding.provider local
memsearch index ~/path/to/your/memory/
```

## 关键洞察

- **Markdown 仍是真实来源**。向量索引只是派生缓存 —— 随时可以用 `memsearch index` 重建。你的记忆文件永远不会被修改。
- **智能去重省钱**。每个块通过 SHA-256 内容哈希标识。重新运行 `index` 只嵌入新的或变更的内容。
- **混合搜索优于纯向量搜索**。通过 RRF 结合语义相似度（密集向量）和关键词匹配（BM25）同时捕获基于含义和精确匹配的查询。

## 相关链接

- [memsearch GitHub](https://github.com/zilliztech/memsearch)
- [memsearch 文档](https://zilliztech.github.io/memsearch/)
- [Milvus](https://milvus.io/) —— 向量数据库后端
