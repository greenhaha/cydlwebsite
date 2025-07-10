# CS2 黄粱一梦社区服 - 官方网站

## 🎮 项目简介

CS2 黄粱一梦社区服官方网站，为玩家提供服务器状态查看、周年庆活动、签到礼品等功能的现代化 Web 应用。

## ✨ 主要功能

- 🖥️ **实时服务器状态监控** - 查看服务器在线状态、玩家数量、延迟等信息
- 🎉 **周年庆活动页面** - 沉浸式周年庆体验，包含活动详情和奖励展示
- 📝 **玩家签到系统** - 每日签到获取奖励
- 🎁 **礼品展示** - 游戏内物品和奖励展示
- 📚 **常见问题解答** - 帮助玩家快速解决问题
- 👥 **贡献者展示** - 感谢社区贡献者
- 🏆 **模型图鉴** - 游戏模型和皮肤展示

## 🛠️ 技术栈

- **前端框架**: Vue 3.5.13 + TypeScript 5.8
- **UI 组件库**: Naive UI 2.41.0
- **样式框架**: TailwindCSS 4.0.17
- **图标库**: @vicons/ionicons5, @vicons/tabler
- **路由管理**: Vue Router 4.5.0
- **状态管理**: Pinia 3.0.1
- **构建工具**: Vite 6.2.1
- **包管理器**: pnpm 10.11.0

## 🚀 快速开始

### 环境要求
- Node.js 22+
- pnpm 10.11.0+

### 安装和运行
```bash
# 克隆项目
git clone <repository-url>
cd cydl-web

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览生产版本
pnpm preview
```

### 开发命令
```bash
# 类型检查
pnpm type-check

# 代码格式化
pnpm format

# 代码检查和修复
pnpm lint
```

## 📁 项目结构

```
cydl-web/
├── public/                        # 静态资源
├── src/
│   ├── App.vue                    # 根组件
│   ├── main.ts                    # 应用入口
│   ├── assets/                    # 资源文件
│   ├── components/                # 可复用组件
│   │   ├── Layout/                # 布局组件
│   │   ├── ServerStatus/          # 服务器状态组件集
│   │   └── icons/                 # 图标组件
│   ├── composables/               # 组合式函数
│   ├── const/                     # 常量配置
│   ├── router/                    # 路由配置
│   ├── services/                  # API 服务
│   ├── stores/                    # 状态管理
│   ├── types/                     # TypeScript 类型定义
│   └── views/                     # 页面组件
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## 🎯 核心页面

### 首页 (`/`)
- 网站介绍和导航
- 快速访问各功能模块

### 服务器状态 (`/server-status`)
- 实时服务器在线状态
- 玩家数量和详细信息
- 服务器连接地址
- 一键连接到游戏服务器

### 周年庆 (`/anniversary`)
- 全屏沉浸式体验（隐藏导航栏）
- 背景视频和动画效果
- 活动详情和奖励展示
- 参与入口和社区互动

### 周年庆预热 (`/anniversary-preheating`)
- 周年庆预告和倒计时
- 预热活动信息

### 其他功能页面
- `/registration` - 签到页面
- `/faq` - 常见问题
- `/gifts` - 礼物展示
- `/models` - 模型图鉴
- `/contribute` - 贡献者

## 🔧 开发亮点

### 1. 组件化架构
- 采用单一职责原则，每个组件功能明确
- 高度可重用的组件设计
- 完整的 TypeScript 类型支持

### 2. 响应式设计
- 支持桌面端和移动端
- 自适应布局和交互
- 移动端优化的抽屉式菜单

### 3. 性能优化
- Vite 快速构建
- 按需加载和代码分割
- 组件懒加载

### 4. 用户体验
- 流畅的页面动画
- 实时数据更新
- 友好的错误处理和加载状态

## 🎨 设计特色

### 视觉效果
- 现代化的渐变背景
- 玻璃拟态 (Glassmorphism) 设计
- 流畅的动画过渡效果
- 游戏主题的配色方案

### 交互体验
- 悬停效果和微动画
- 响应式触摸友好的操作
- 直观的信息层级展示
- 一键复制服务器地址

## 🔌 API 集成

### 服务器状态 API
```typescript
// 获取服务器详细信息
GET /api/v1/cs2/server/details

// 响应数据结构
interface ServerResponse {
  basic_info: {
    online: boolean
    name: string
    map: string
    password_protected: boolean
  }
  performance: {
    current_players: number
    max_players: number
    bots: number
    utilization_percent: number
  }
  connection: {
    address: string
    ping: number
    query_duration: number
  }
  players: Player[]
  timestamp: string
}
```

## 🏗️ 架构设计

### 组合式 API
使用 Vue 3 Composition API 提供更好的逻辑复用：

```typescript
// useServerStatus.ts
export const useServerStatus = () => {
  const loading = ref(false)
  const serverData = ref<ServerData>()
  
  const fetchServerStatus = async () => {
    // 获取服务器状态逻辑
  }
  
  return { loading, serverData, fetchServerStatus }
}
```

### 类型安全
完整的 TypeScript 类型定义确保开发期间的类型安全：

```typescript
// types/serverStatus.ts
export interface ServerData {
  online: boolean
  name: string | null
  players: number
  maxPlayers: number
  // ...更多字段
}
```

## 🌐 部署

### 环境变量
```env
# API 基础地址
VITE_API_BASE_URL=https://api.example.com

# 服务器地址
VITE_SERVER_ADDRESS=43.138.75.104:27015
```

### 构建和部署
```bash
# 构建生产版本
pnpm build

# 生成的文件在 dist/ 目录
# 可部署到任何静态文件服务器
```

## 🤝 贡献指南

### 开发规范
1. 遵循 Vue 3 Composition API 最佳实践
2. 使用 TypeScript 进行类型安全开发
3. 遵循 ESLint 和 Prettier 配置
4. 组件设计遵循单一职责原则
5. 添加适当的注释和文档

### 提交规范
```bash
# 功能开发
git commit -m "feat: 添加新功能描述"

# 问题修复
git commit -m "fix: 修复问题描述"

# 样式调整
git commit -m "style: 样式调整描述"

# 重构代码
git commit -m "refactor: 重构描述"
```

## 📝 更新日志

### v0.0.0 (Current)
- ✨ 初始版本发布
- 🎮 服务器状态监控功能
- 🎉 周年庆活动页面
- 📱 完整的移动端适配
- 🔧 组件化重构完成

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

---

**感谢所有为 CS2 黄粱一梦社区服做出贡献的开发者和玩家！** 🎮✨
