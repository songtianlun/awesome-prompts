---
tags:
  - TextToImage
  - Prompt
---

# AI 绘画提示要点

来源：[AI Prompt 整理](https://frytea.com/archives/1396/)

## Prompt 原则

1、写出清晰而具体的指示，清晰不是指短，而是尽量详细，可采用分隔符避免自己的要求和内容的混淆，分隔符形式不限：`"""`, `< >`, `{}`
2、给模型思考的时间。如果答案不对，可以尝试不断变化提问方式，直到得出想要结果。可以采用简化或分解问题的方式。

## AI 绘画

### 插画领域应用

关键词描述写法：

```
主题描述：谁+在哪里+做什么+怎么做
使用场景：UI illustration(UI 插画)
设计风格: 我们一般输入 Flat illustration(扁平插画)、Minimalism（极简主义）即可
背景颜色：插画的背景的颜色，white background
整体色调：插画内颜色分布，如 Bright color scheme
详细参数 : 图片比例、质量等
```

举个例子：

```
a woman sitting in a chair,operating a computer,intelligent office,collaboration,flattening,e-commerce,illustration,minimalism
```

控制输出的背景为白色。

```
A group of young people sitting at home happily chatting,flat illustration,Minimalism,Bright color scheme,White background,GUI,graphic design
```

### 海报领域应用

关键词描述写法：

主题描述：海报包含的具体元素及内容

1. 设计风格：如等距风格（isometric）莫吉托（mojito）像素艺术（pixel art)等，这里可以选择个人想要的风格
2. 渲染方式: Octene render（如果想要立体，减少几何感的效果可加 oc 渲染器）
3. 背景颜色：海报背景颜色，如，White background
4. 整体色调：整体海报元素色调，如，Bright color scheme
5. 详细参数 : 图片比例、质量等

举个例子：

```
isometric,mojito,mint,lime,jelly,glass,flowers,pixel art,hyper detail ,Octene render,
```

### Banner 领域应用

关键词描述写法：

- 主题描述：包含的具体元素及内容
- 使用场景：banner
- 设计风格：如 ，Flat illustration(扁平插画)、Minimalism（极简主义）、trending on Dribbble, Behance 等，这里可以选择个人想要的风格
- 背景颜色：banner 的背景颜色
- 整体色调：banner 内容的色调
- 详细参数 : 图片比例、质量等

举个例子：

```
banner,about pet,pet medical,high quality, minimalism,flat design,trending on Dribbble, Behance
```

### 图标设计领域

关键词描述写法：

- 图标描述：图标描述及类型
- 使用场景：3D/2D icon
- 色调：整体颜色基调
- 材质：如常用的 frosted glass（磨砂玻璃）,transparent technology sense（透明开机）,industrial design（工业设计），metallic feel（金属质感）等
- 渲染方式：3d,c4d,blender oc renderer
- 灯光：渲染灯光是什么，如，studio lighting
- 背景颜色：如深色、浅色等
- 详细参数 : 图片比例、质量等

举个例子：

```
a data service icon,blue,frosted glass,transparent technology sense,industrial design,dark background,studio lighting,3d,c4d,blender oc renderer,pinterest,dribble,high detail,8k
```

2D 扁平化图标：

```
a data service 2d icon,minimalism,flat design,Macaron color,ios app
```

### UI 界面领域

关键词描述写法：

- 界面描述：什么类型应用及内容的界面
- 使用场景：app ui design
- 设计风格：如，trending on dribble,behance,clean UI
- 颜色基调：app 整体颜色基调，如，green and yellow
- 详细参数 : 图片比例、质量等

举个例子：

```
high-quality UI design, social mobile app, trending on dribble,behance,clean UI
```

### Logo 设计领域

关键词描述写法：

- 内容描述：什么样主题的 logo
- 设计风格：如，minimalist design, simplistic details,in the style of 风格描述词
- 颜色基调：常用的有，one color,simple colouring,thick black and white outline style
- 背景颜色：如，White background
- 视角：logo 的摆放视角
- 详细参数 : 图片比例、质量等

举例子：

线性风格 logo

```
minimal logo of pet, line style,minimalism,flat design,trending on Dribbble, Behance
```

文字 logo

```
logo design for a company called Uni minimalist design
```

吉祥物风格 logo

```
logo for brand using minimalist panda warrior mascotte
```

### 动漫角色设计领域（niji 模型）

关键词描述写法：

- 主题描述：什么样主题的角色
- 人物描述：性别+特征描述
- 场景描述：场景+装饰物点缀/道具
- 设计风格：in the style of Kyoto Animaiton
- 视角 : three views,front,side,back angles

举例子：

像素风格（Pixel style）

```
A female character design, short hair wearing headphones, background in the city,Pixel style, transparent pvc jacket
```

原宿风（Harajuku Style）

```
A female character design, short hair wearing headphones, background in the city,Harajuku Style,transparent pvc jacket
```

日本漫画风格（Manga style ）

```
A female character design, short hair wearing headphones, background in the city,Manga style,transparent pvc jacket
```

迪士尼风格（Disney style）

```
A female character design, short hair wearing headphones, background in the city,Disney style
```

### 角色 ip 设计领域

关键词描述写法：

- 应用领域：角色人物设计，如 fashion toys,clay models，character design
- 人物描述：性别+人物特征描述
- 场景描述：场景+装饰物/道具
- 设计风格：常用的有 mockup,blind box toy,pop mart，cartoon style 等
- 渲染：3d,c4d,blender oc renderer
- 详细参数 : 图片比例、质量等

举例子：

手办风格（pop mart）

```
fashion toys,clay models,cute girls wearing hanfu,mockup,blind box toy,pop mart,glossy materials,luster,clean background,3D,octane,best quality,c4d,blender,ultra detailed
```

卡通风格（cartoon style）

```
Girl with long curly hair, carrying Chanel bag with black-framed glasses, character character design, cartoon style, high detail, close-up shots,3d,c4d,blender oc renderer
```

Cyberpunk 风格（cyberpunk）

```
art toy,designer toy,mockup IP,a lovely girl in a jacket and skirt,detailed facial details,cyberpunk,3D render,octane render,c4d,zbrush,3d max,artstation,best quality,ultradetailed,studio lightning
```

吉祥物设计（mascot）

```
a simple mascot for a pet clinic saying hello,cute,3D,C4D,blender,studio lighting,OC rederer,pinterest,dribble,high detail,8k,1920 × 900
```

### 3D 模型设计领域

关键词描述写法：

- 画面主体：画面主体内容
- 应用领域：3D
- 设计风格：如写实风格、low poly 风格等
- 其他参数：灯光、角度、色彩等
- 渲染：3d,c4d,blender oc renderer
- 详细参数 : 图片比例、质量等

举例子：

写实风格

```
3d,air blower,Soft Lights,blender,octane render,Maxon Cinema 4D
```

low poly 风格

```
low poly，airplane
```

### 产品配图设计领域

关键词描述写法：

- 画面主体：主体产品内容
- 背景：环境背景+气氛
- 设计风格：风格化方向
- 镜头：如特写、中景、远景等
- 渲染：3d,c4d,blender oc renderer
- 详细参数 : 图片比例、质量等

举例子：

特写镜头（extreme closeup view）

```
A steak medium rare with salt and chips on top, extreme closeup view, FHD --ar 1:1
```

中远景（medium long shot）

```
there is a pink lipstick and a glass bottle of perfume,flowers and plants in the background,water and reflections on the ground,golden mean,medium long shot,depth of field,3D render
```

### 摄影作品

关键词描述写法：

- 应用领域：photos,realism,renderings
- 图片内容描述：物体/背景/人物细节描述
- 设计风格：写实风格
- 镜头：如特写、中景、远景等
- 渲染：3D max,vray,c4d,ue5,corona rendering,redshift,octane rendering
- 详细参数 : 图片比例、质量等

举例子：

```
photos,realism,renderings,modern kitchens combined with natural scenes,3D max,vray,c4d,ue5,corona rendering,redshift,octane rendering --ar 16:9
```


