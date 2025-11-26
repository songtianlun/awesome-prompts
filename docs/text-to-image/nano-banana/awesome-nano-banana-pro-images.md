---
title: Nano-banana Pro 精选图集（提示词/案例）
tags:
  - TextToImage
  - NanoBanana
  - NanoBananaPro
---

> 说明：本页模仿「Nano Banana 精选图集」的结构，持续收集与整理 Nano Banana Pro 的可复现案例（提示词 + 输入/输出）。上方将逐步补全带图示与提示词的“例 X”，文末保留原始链接作为参考文献。

## 🍌 Introduction

欢迎来到 Nano-banana Pro 提示词与案例合集！

Nano Banana Pro 是 Google 推出的高级图像生成与编辑模型，支持文生图、图生图、图像编辑等多种功能。本文档收录来自 X/Twitter 社区的优秀案例，帮助你快速上手并发挥 Nano Banana Pro 的强大能力。

### 📚 文档包含内容

- **输入/输出效果图**：直观展示效果对比
- **可复现提示词**：可直接复制使用的提示词模板
- **使用说明**：必要的参数说明与注意事项
- **实战案例**：15+ 个不同应用场景的实例

### 🎯 适用场景

- **创意设计**：插画风格转换、艺术风格迁移
- **照片编辑**：老照片修复、图像增强、风格化处理
- **商业应用**：产品可视化、建筑渲染、美食摄影
- **个性化创作**：虚拟形象、时间穿越、角色设计

喜欢就点 ⭐ Star 收藏，欢迎 PR 一起完善！

## 🖼️ 例子

### 例 1: [清代“早朝”视频会议（腾讯会议梗）](https://x.com/songguoxiansen/status/1993126993135902996)（by [@songguoxiansen](https://x.com/songguoxiansen)）

| 输入 | 输出 |
|:---:|:---:|
| <img src="/images/text-to-image/nano-banana/awesome-nano-banana-pro-images/case1/input.jpg" width="300" alt="输入图片"> | <img src="/images/text-to-image/nano-banana/awesome-nano-banana-pro-images/case1/output.jpg" width="300" alt="输出结果"> |

**提示词:**

```
传统的清代宫廷画风格。画面描绘了皇帝庄严肃穆地端坐在太和殿的龙椅上。然而，他面对的不是跪拜的大臣，而是盯着放在御案上的一块巨大的笔记本电脑屏幕。屏幕上显示着与大臣们进行“腾讯会议”的网格视图，大臣们都在各自的府邸中，有的看起来很无聊，有一个在偷偷吃面条。皇帝在朝冠外面戴着一副头戴式耳机。一名太监站在后边举着环形补光灯，以确保皇帝在镜头前看起来气色很好。屏幕上的文字写着“早朝”。
```

---

### 例 2: [3D 地标等距建筑可视化渲染](https://x.com/TechieBySA/status/1993271355987443955)（by [@TechieBySA](https://x.com/TechieBySA)）

| 输入 | 输出 |
|:---:|:---:|
| <img src="/images/text-to-image/nano-banana/awesome-nano-banana-pro-images/case2/input.jpg" width="300" alt="输入图片"> | <img src="/images/text-to-image/nano-banana/awesome-nano-banana-pro-images/case2/output.jpg" width="300" alt="输出结果"> |

**提示词:**

```
Create a highly detailed isometric 3D rendering of [LANDMARK] in architectural visualization style. The building is shown at a 45-degree angle from above, displaying three visible sides with intricate architectural detail. Photorealistic textures showing materials like stone, glass, metal, or brick. Include the base/ground level with tiny people, cars, and landscaping for scale. Clean white or light grey background. Professional architectural rendering with soft ambient shadows beneath the structure. Every window, column, ornamental detail, and structural element clearly visible. 1080x1080 dimension, centered composition. Style similar to video game building assets or architectural presentation models - clean, detailed, slightly stylized but realistic.
```

> 将 [LANDMARK] 替换为具体地标，例如 “Eiffel Tower, Paris”。

---

### 例 3: [参考图约束的姿态控制 + 身份匹配（瑜伽室场景）](https://x.com/songguoxiansen/status/1993160267975606367)（by [@songguoxiansen](https://x.com/songguoxiansen)）

| 输入 | 输出 |
|:---:|:---:|
| <img src="/images/text-to-image/nano-banana/awesome-nano-banana-pro-images/case3/input_identity.jpg" width="300" alt="身份参考图"> | <img src="/images/text-to-image/nano-banana/awesome-nano-banana-pro-images/case3/output.jpg" width="300" alt="输出结果"> |

**提示词（摘录，按需精简/扩展）:**

```
参考图像：
参考图1（高优先级，身份和面部参考）：匹配这位女性的面部结构、眼型、肤色和发型（深棕色凌乱的盘发，带有几缕法式刘海）。保持她自然柔和的编辑风格外观。
参考图2（最高优先级，姿态参考深度图）：精确重现此深度图中的身体姿态和肢体几何形状。将其视为姿势、腿部角度、躯干倾斜和手部位置的硬性约束。

主题参数：
类型：成年女性。
身份匹配规则：面部、眼睛、鼻子、嘴唇和整体气质必须匹配身份参考图像（图1）。相同的深棕色头发，松散凌乱的盘发/发髻，带有柔软的几缕法式刘海。自然妆容，逼真的皮肤毛孔，微妙的桃色调。平静专注的表情。
姿态：精确使用深度图姿态（图2）。
姿态细节：重现深度参考中的姿态。

人体艺术：超逼真的3D视错觉蛇纹身盘绕在抬起的右小腿胫骨和腿肚子上。纹身必须看起来像是嵌入皮肤的墨水：清晰的鳞片微观纹理，逼真的深度阴影，以及与窗光和腿部弯曲对齐的柔和投射阴影。没有平坦或贴纸般的边缘。

服装：
物品：合身的钴蓝色运动文胸（哑光功能面料），紧身干净的白色瑜伽短裤（光滑压缩面料），赤脚。
规则：没有服装瑕疵，没有扭曲的接缝，没有透明伪影。

环境：
场景：室内家庭瑜伽空间。风格：波西米亚极简主义。
装饰元素：后墙上的大型花边挂毯，靠墙放置在地板上的带框瑜伽体式插图，透明玻璃花瓶中的干棉花茎，过滤日光的透明白色窗帘。
地板：带有微妙逼真反射的浅色光泽瓷砖。
道具：以拍摄对象为中心的紫色圆形瑜伽垫。
色调：温暖的奶油色和柔和的中性色，整洁舒适的房间。

技术参数：
构图：垂直9:16编辑健身肖像，中全景镜头（膝盖以上），视线高度，居中构图，头部留有轻微空间，背景柔和虚化。
相机：全画幅照片外观，50mm定焦镜头，f/2.0光圈，自然浅景深，焦点清晰对准面部和抬起的腿。
光线：来自相机左侧的柔和自然窗光，漫射阴影，光线在皮肤上轻柔包裹，纹身腿部有微妙高光，干净的HDR过渡。
真实感处理：阴影中有细腻的传感器噪点，轻微的暗角，高对比度边缘有微小的色差，无风格化。

负面提示：
未成年，儿童，青少年，CGI，3D渲染，卡通，动漫，插画，塑料皮肤，喷枪效果，过度光滑，解剖结构错误，多余的手指，变形的手，扭曲的脚，缺失脚趾，姿态不匹配，不同的姿态，错误的腿部角度，平面纹身，贴纸纹身，模糊的纹身，文本，标志，水印，UI，霓虹赛博朋克，过饱和，刺眼的闪光灯，杂乱无章的房间，不切实际的比例。
```

---

### 例 4: [4K 照片修复/超分辨率](https://x.com/0xluffy_eth/status/1992916113194414549)（by [@0xluffy_eth](https://x.com/0xluffy_eth)）

| 输入 | 输出 |
|:---:|:---:|
| <img src="/images/text-to-image/nano-banana/awesome-nano-banana-pro-images/case4/input.jpg" width="300" alt="输入图片（低清/模糊）"> | <img src="/images/text-to-image/nano-banana/awesome-nano-banana-pro-images/case4/output.jpg" width="300" alt="输出结果（4K清晰）"> |

**提示词:**

```
将此图像提升到4K分辨率，使其完全清晰
```

---

### 例 5: [词汇标注（记忆宫殿：宠物商店）](https://x.com/lxfater/status/1993238777033105634)（by [@lxfater](https://x.com/lxfater)）

| 输入 | 输出 |
|:---:|:---:|
| <img src="/images/text-to-image/nano-banana/awesome-nano-banana-pro-images/case5/input.jpg" width="300" alt="输入图片/主题"> | <img src="/images/text-to-image/nano-banana/awesome-nano-banana-pro-images/case5/output.jpg" width="300" alt="输出结果（带三行标注）"> |

**提示词:**

```
为我绘制一个详细的「宠物商店」场景，并标注所有物体的英语单词。
标注格式：
第一行：英文单词
第二行：音标（国际音标 IPA 格式）
第三行：中文翻译
```

> 将「宠物商店」替换为你的学习主题，如「厨房」「卧室」「超市」。

---

### 例 6: [1880→2020 的 4×4 穿越影集](https://x.com/0xluffy_eth/status/1993168777677357332)（by [@0xluffy_eth](https://x.com/0xluffy_eth)）

| 输入 | 输出 |
|:---:|:---:|
| <img src="/images/text-to-image/nano-banana/awesome-nano-banana-pro-images/case6/input.jpg" width="300" alt="输入图片（本人照片，可选）"> | <img src="/images/text-to-image/nano-banana/awesome-nano-banana-pro-images/case6/output.jpg" width="300" alt="输出结果（4×4不同时代）"> |

**提示词:**

```
做一张 “1880→2020 的 4×4 穿越影集”。
从 1880 年代的油画质感、羊毛大衣，到 1960 的复古街拍，再到 2000 年代的数码相片；
每一格都是不同时代的我，发型、胡子、服装、背景风格与时代一致。
```

> 可将年代段进行自定义，并补充每格的镜头与光照风格以增强一致性。

---

### 例 7: [小红书风格女星穿搭](https://x.com/servasyy/status/1992891515186925952)（by [@servasyy](https://x.com/servasyy)）

| 输出示例 |
|:---:|
| <img src="/images/text-to-image/nano-banana/awesome-nano-banana-pro-images/case7/output1.jpg" width="300" alt="输出结果1"> |
| <img src="/images/text-to-image/nano-banana/awesome-nano-banana-pro-images/case7/output2.jpg" width="300" alt="输出结果2"> |
| <img src="/images/text-to-image/nano-banana/awesome-nano-banana-pro-images/case7/output3.jpg" width="300" alt="输出结果3"> |
| <img src="/images/text-to-image/nano-banana/awesome-nano-banana-pro-images/case7/output4.jpg" width="300" alt="输出结果4"> |

**提示词:**

```
小红书风格的女性时尚穿搭照片。自然光线，清新干净的背景，展现日常穿搭的高级感。
服装：[描述具体穿搭风格，如"针织开衫+白色T恤+牛仔裤"]
场景：[描述场景，如"咖啡厅/街道/公园"]
风格：小红书博主风格，自然亲和，生活化
```

> 提示词在推文评论区，具体内容需访问原推文查看。

---

### 例 8: [Q版表情包生成（LINE风格）](https://x.com/dotey/status/1993042754008686712)（by [@dotey](https://x.com/dotey)）

| 输入 | 输出 |
|:---:|:---:|
| <img src="/images/text-to-image/nano-banana/awesome-nano-banana-pro-images/case8/input.jpg" width="300" alt="输入图片"> | <img src="/images/text-to-image/nano-banana/awesome-nano-banana-pro-images/case8/output.jpg" width="300" alt="输出结果"> |

**提示词:**

```
Create a set of colorful, hand-drawn LINE-style half-body Q-version emoji portraits based on the characters shown, ensuring accurate depiction of their head accessories.

Arrange the images in a 4x6 layout, featuring common chat phrases or relevant humorous memes.
Use handwritten-style fonts for text.
Output must be original—avoid direct copying of the reference image.
Final image should be in 4K resolution, 16:9 aspect ratio.
```

**中文版提示词:**

```
为我生成图中角色的绘制 Q 版的，LINE 风格的半身像表情包，注意头饰要正确
彩色手绘风格，使用 4x6 布局，涵盖各种各样的常用聊天语句，或是一些有关的娱乐 meme
其他需求：不要原图复制。所有标注为手写简体中文。
生成的图片需为 4K 分辨率 16:9
```

> 💡 需要上传参考图片作为角色输入。

---

### 例 9: [美食解构海报（垂直堆叠风格）](https://x.com/bozhou_ai/status/1993148760223023422)（by [@bozhou_ai](https://x.com/bozhou_ai)）

| 输出示例 |
|:---:|
| <img src="/images/text-to-image/nano-banana/awesome-nano-banana-pro-images/case9/output1.jpg" width="300" alt="西红柿炒鸡蛋"> |
| <img src="/images/text-to-image/nano-banana/awesome-nano-banana-pro-images/case9/output2.jpg" width="300" alt="红烧肉"> |

**提示词模板结构:**

```
【总述】：对象 + 风格 + 核心构图（Deconstructed/Vertical stack） + 背景色。

例如：Premium tech poster, deconstructed iPhone 16, vertical stack, pure black background.

【分层列表 1-N】：从上到下，详细描述每一层的材质、颜色、状态。

例如：Layer 1: Ceramic Shield screen; Layer 2: A18 Bionic chip...

【过渡层/留白】：这很重要！ 专门写一层叫 "Empty space/Gap"，加入漂浮的粒子或光效。

【成品层】：最底部放一个完整的产品，形成"零件 vs 整体"的呼应。

【光影归拢】：统一视角（Same perspective），统一光线（Studio lighting, Rim light），统一质感（Hyper-realistic）。
```

> 💡 **使用说明:** 这是一个通用的解构海报模板，适用于美食、产品、科技产品等各类物品的创意海报制作。详细提示词示例请查看推文。

---

### 例 10: [分格漫画生成（鬼灭风格）](https://x.com/lijigang_com/status/1992900099484320208)（by [@lijigang_com](https://x.com/lijigang_com)）

| 输出 |
|:---:|
| <img src="/images/text-to-image/nano-banana/awesome-nano-banana-pro-images/case10/output.jpg" width="300" alt="输出结果"> |

**提示词:**

```
你是一个擅长中文的日本漫画家，有着强烈的个人手绘风格。《鬼灭之刃》的原始草稿手绘图，你是作者之一。

请使用你擅长的个人漫画线稿图风格, 调用Nano Banana Pro 将如下内容，基于你的理解，生成你的分格漫画手稿图！

不要输出分析内容，直接输出分格漫画图片，图中使用中文表达。
────────────────
{你提供的待分析内容在此}
```

> 💡 **使用说明:** 将花括号内容替换为你的剧情或故事内容，AI 会自动生成日式漫画分格。

---

### 例 11: [摄影指导与照片优化](https://x.com/ZeroZ_JQ/status/1993229404093517906)（by [@ZeroZ_JQ](https://x.com/ZeroZ_JQ)）

| 修改建议批注 | 原图 | 优化后 |
|:---:|:---:|:---:|
| <img src="/images/text-to-image/nano-banana/awesome-nano-banana-pro-images/case11/annotation.jpg" width="250" alt="AI批注建议"> | <img src="/images/text-to-image/nano-banana/awesome-nano-banana-pro-images/case11/input.jpg" width="250" alt="原图"> | <img src="/images/text-to-image/nano-banana/awesome-nano-banana-pro-images/case11/output.jpg" width="250" alt="优化后"> |

**使用方法:**

```
学习摄影靠 Nano Banana！让 AI 为你调整和修改照片，提供专业的摄影指导建议。

步骤：
1. 上传你拍摄的照片
2. 让 Nano Banana Pro 分析并提供修改建议（会生成标注图）
3. 根据建议生成优化后的照片

功能：
- AI 自动分析照片构图、光线、色彩等问题
- 提供专业的修改建议批注
- 生成优化后的效果图
```

> 💡 **使用说明:** 这是一个摄影学习和照片优化的创新用法，AI 会像摄影老师一样给出批注和改进建议。

---

### 例 12: [建筑设计概念图](https://x.com/ZeroZ_JQ/status/1992818675376906723)（by [@ZeroZ_JQ](https://x.com/ZeroZ_JQ)）

| 输入 | 输出 |
|:---:|:---:|
| <img src="/images/text-to-image/nano-banana/awesome-nano-banana-pro-images/case12/input.jpg" width="300" alt="输入图片"> | <img src="/images/text-to-image/nano-banana/awesome-nano-banana-pro-images/case12/output.jpg" width="300" alt="输出结果"> |

**提示词:**

```
创建一个现代建筑设计概念图。
建筑类型：[住宅/商业/公共建筑]
风格：[现代主义/未来主义/极简主义]
环境：展示建筑在环境中的效果，包括周围景观
渲染：专业建筑可视化，带有真实的光影效果
```

---

### 例 13: [高级美食解构海报（担担面示例）](https://x.com/berryxia_ai/status/1992989895850430908)（by [@berryxia_ai](https://x.com/berryxia_ai)）

| 输出 |
|:---:|
| <img src="/images/text-to-image/nano-banana/awesome-nano-banana-pro-images/case13/output.jpg" width="300" alt="担担面解构海报"> |

**提示词核心结构:**

```
At the very top center of the composition, floating prominently above the ingredient layers, is a luxurious title label. The text reads "[菜名 ENGLISH NAME]" rendered in expressive, handwritten Chinese brush calligraphy (毛笔字) style. The lettering possesses a heavy, three-dimensional sculpted gold metal texture (金属质感) with a brushed finish, warm golden sheen, and realistic metallic reflections catching the dramatic studio lighting.

Premium Chinese [food type] restaurant food poster featuring deconstructed layers of [Dish Name] floating in vertical stack on pure black background (#000000).

Seven distinct layers from top to bottom (below the main gold title) with extra spacing before the final dish:
* Top layer: [主要调料描述]
* Second layer: [配料1描述]
* Third layer: [主食材描述，如面条]
* Fourth layer: [配菜描述]
* Fifth layer: [汤底/酱汁描述]
* Sixth layer: EMPTY SPACE - a larger gap with only subtle floating oil droplets, steam wisps, and small ingredient particles drifting down, creating visual separation and breathing room
* Bottom/Final layer (with significantly larger gap above): a complete finished dish...

Chinese and English bilingual labels with elegant arrows pointing to each component.

NO white pedestal, NO platform base. All layers float freely in space against pure black background. Dramatic studio lighting from 45-degree angle, rim lighting highlighting textures. Subtle steam effects, oil droplets floating around layers. Star sparkle effect in bottom right corner. Dark moody aesthetic, luxurious commercial food photography style, ultra-realistic, highly detailed, professional restaurant advertising quality, 9:16 vertical format.
```

> 💡 **使用说明:** 这是一个完整的美食解构海报模板，适合制作高端餐厅菜品宣传海报。可替换菜名和食材描述来生成不同菜品。完整提示词详见推文。

---

### 例 14: [服装设计可视化](https://x.com/servasyy/status/1992800747830816768)（by [@servasyy](https://x.com/servasyy)）

| 输入 | 输出 |
|:---:|:---:|
| <img src="/images/text-to-image/nano-banana/awesome-nano-banana-pro-images/case14/input.jpg" width="300" alt="输入图片（草图/设计稿）"> | <img src="/images/text-to-image/nano-banana/awesome-nano-banana-pro-images/case14/output.jpg" width="300" alt="输出结果（成品效果）"> |

**提示词:**

```
将服装设计草图转换为真实的成品效果图。
模特：专业时装模特
场景：T台/工作室/户外场景
光线：专业摄影布光
细节：展现服装的面料质感、剪裁和设计细节
```

---

### 例 15: [游戏角色概念设计](https://x.com/cellinlab/status/1992880634096959811)（by [@cellinlab](https://x.com/cellinlab)）

| 输入 | 输出 |
|:---:|:---:|
| <img src="/images/text-to-image/nano-banana/awesome-nano-banana-pro-images/case15/input.jpg" width="300" alt="输入图片"> | <img src="/images/text-to-image/nano-banana/awesome-nano-banana-pro-images/case15/output.jpg" width="300" alt="输出结果"> |

**提示词:**

```
创建游戏角色概念设计图。
角色类型：[战士/法师/刺客/等]
风格：[奇幻/科幻/蒸汽朋克/等]
展示：全身角色设计，包括服装、武器、配饰细节
背景：简洁的概念设计背景或相关环境
艺术风格：专业游戏美术风格，高细节度
```

> 💡 **说明：** 以上例 7-15 的案例框架已创建，需要补充实际的提示词和效果图。这些案例基于参考链接中的推文整理，具体内容需要访问对应推文获取详细信息。

---

## 💡 使用技巧

### 提示词编写建议

1. **明确描述**：清晰描述想要的效果、风格、场景
2. **细节补充**：添加光线、角度、材质等细节描述
3. **参考图像**：配合参考图使用效果更佳
4. **迭代优化**：根据输出结果调整提示词

### 常见参数说明

- `[PLACEHOLDER]`：需要替换为具体内容的占位符
- **输入图片**：某些案例需要上传参考图片
- **风格关键词**：如"小红书风格"、"专业摄影"、"3D渲染"等

### 最佳实践

- 从简单提示词开始，逐步添加细节
- 参考成功案例的提示词结构
- 针对特定场景选择合适的案例模板
- 尝试不同的风格组合以获得独特效果

---

## 🤝 贡献指南

欢迎社区贡献更多优秀案例！

### 如何贡献

1. **Fork 本仓库**
2. **添加案例**：按照现有格式添加新案例
3. **准备素材**：
   - 输入图片（如有）
   - 输出效果图
   - 完整的提示词
   - 必要的说明
4. **提交 PR**：详细描述案例特点

### 案例要求

- ✅ 效果显著、可复现
- ✅ 提示词完整、清晰
- ✅ 图片清晰、格式正确
- ✅ 标注来源和作者

### 图片规范

- 格式：JPG/PNG
- 位置：`/images/text-to-image/nano-banana/awesome-nano-banana-pro-images/caseX/`
- 命名：`input.jpg`、`output.jpg`

---

## Refs

以下为收录的 Nano Banana Pro 相关推文链接（按提交顺序）：

- https://x.com/lxfater/status/1993238777033105634
- https://x.com/servasyy/status/1992891515186925952
- https://x.com/dotey/status/1993042754008686712
- https://x.com/songguoxiansen/status/1993126993135902996
- https://x.com/TechieBySA/status/1993271355987443955
- https://x.com/bozhou_ai/status/1993148760223023422
- https://x.com/ZeroZ_JQ/status/1993229404093517906
- https://x.com/MANISH1027512/status/1992884544278548721
- https://x.com/MindfulReturn/status/1993101356857729434
- https://x.com/ZeroZ_JQ/status/1992818675376906723
- https://x.com/lxfater/status/1992869294569324715
- https://x.com/0xluffy_eth/status/1993168777677357332
- https://x.com/songguoxiansen/status/1993160267975606367
- https://x.com/servasyy/status/1992800747830816768
- https://x.com/0xluffy_eth/status/1992916113194414549
- https://x.com/lijigang_com/status/1992900099484320208
- https://x.com/yinlin66/status/1992841467883323558
- https://x.com/berryxia_ai/status/1992989895850430908
- https://x.com/cellinlab/status/1992880634096959811
- https://x.com/songguoxiansen/status/1993135045846987053
- https://x.com/Lessnoise365/status/1992770582140924115
- https://x.com/berryxia_ai/status/1992474385811484933
- https://x.com/FinanceYF5/status/1992830924548104344
- https://x.com/frxiaobei/status/1992512801428938922
- https://x.com/bearbig/status/1992430714592366742
- https://x.com/op7418/status/1992479380237611249
- https://x.com/howie_serious/status/1992475624272007534
- https://x.com/ZeroZ_JQ/status/1992623816061980997
- https://x.com/Gorden_Sun/status/1992778144605212912
- https://x.com/yanhua1010/status/1992132235613647192
- https://x.com/servasyy/status/1992573963751264663
- https://x.com/dotey/status/1992366309288595681
- https://x.com/msjiaozhu/status/1992606917198557684
- https://x.com/iamtonyzhu/status/1992749018531959070
- https://x.com/0xluffy_eth/status/1992466159594299429
- https://x.com/ZHO_ZHO_ZHO/status/1992626598189867287
- https://x.com/laobaishare/status/1992382655334322674
- https://x.com/servasyy/status/1992476957250867353
- https://x.com/berryxia_ai/status/1992422194341957878
- https://x.com/songguoxiansen/status/1992587940724371939
- https://x.com/ZeroZ_JQ/status/1992239831502737775
- https://x.com/ZeroZ_JQ/status/1991544396584804585
- https://x.com/gkxspace/status/1991630263206527307
- https://x.com/canghecode/status/1991544433289097701
