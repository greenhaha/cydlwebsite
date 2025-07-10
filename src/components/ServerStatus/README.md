# CS2 黄粱一梦社区服 - 前端项目

## 项目概述
CS2 黄粱一梦社区服官方网站，基于 Vue 3 + TypeScript + Naive UI 构建的现代化 Web 应用，提供服务器状态查看、周年庆活动、玩家注册等功能。

## 技术栈
- **框架**: Vue 3.5.13 + TypeScript 5.8
- **UI库**: Naive UI 2.41.0
- **样式**: TailwindCSS 4.0.17
- **图标**: @vicons/ionicons5, @vicons/tabler
- **路由**: Vue Router 4.5.0
- **状态管理**: Pinia 3.0.1
- **构建工具**: Vite 6.2.1
- **包管理**: pnpm 10.11.0

## 项目结构

```
src/
├── App.vue                        # 根组件
├── main.ts                        # 应用入口
├── assets/                        # 静态资源
│   ├── base.css                   # 基础样式
│   ├── main.css                   # 主样式
│   ├── tailwind.css               # TailwindCSS 配置
│   └── logo.svg                   # Logo
├── components/                    # 组件
│   ├── Layout/                    # 布局组件
│   │   ├── AppFooter.vue          # 页脚组件
│   │   └── HeaderMenu.vue         # 头部菜单
│   ├── ServerStatus/              # 服务器状态组件集
│   │   ├── index.ts               # 组件导出
│   │   ├── ServerStatusCard.vue   # 服务器状态卡片
│   │   ├── ServerInfoCard.vue     # 服务器信息卡片
│   │   ├── PlayerInfoCard.vue     # 玩家信息卡片
│   │   ├── ConnectionCard.vue     # 连接信息卡片
│   │   ├── PlayerList.vue         # 玩家列表
│   │   ├── PlayerListItem.vue     # 玩家列表项
│   │   ├── ServerInfoItem.vue     # 服务器信息项
│   │   ├── ServerStatusHeader.vue # 页面头部
│   │   └── LoadingErrorState.vue  # 加载/错误状态
│   └── icons/                     # 图标组件
│       ├── IconCommunity.vue      # 社区图标
│       ├── IconDocumentation.vue  # 文档图标
│       ├── IconEcosystem.vue      # 生态图标
│       ├── IconSupport.vue        # 支持图标
│       └── IconTooling.vue        # 工具图标
├── composables/                   # 组合式函数
│   ├── index.ts                   # composables 导出
│   └── useServerStatus.ts         # 服务器状态逻辑
├── const/                         # 常量配置
│   ├── const.ts                   # 通用常量
│   └── contribute.ts              # 贡献者相关
├── router/                        # 路由配置
│   └── index.ts                   # 路由定义
├── services/                      # 服务层
│   └── api.ts                     # API 接口
├── stores/                        # 状态管理
│   └── counter.ts                 # 计数器状态
├── types/                         # 类型定义
│   ├── index.ts                   # 类型导出
│   └── serverStatus.ts            # 服务器状态类型
└── views/                         # 页面组件
    ├── HomeView.vue               # 首页
    ├── AboutView.vue              # 关于页面
    ├── ModelsView.vue             # 模型图鉴
    ├── FaqView.vue                # 常见问题
    ├── RegistrationView.vue       # 签到页面
    ├── ServerStatusView.vue       # 服务器状态页面
    ├── AnniversaryView.vue        # 周年庆主页面
    ├── AnniversaryPreheatingView.vue # 周年庆预热页面
    ├── GiftView.vue               # 礼物页面
    └── ContributeView.vue         # 贡献者页面
```

## 核心功能模块

### 1. 服务器状态监控 (ServerStatus)
**位置**: `/server-status`
**功能**: 实时显示 CS2 服务器状态信息

#### 组件架构
```
ServerStatusView.vue (主页面)
├── ServerStatusHeader.vue      # 页面标题和刷新按钮
├── LoadingErrorState.vue       # 加载和错误处理
├── ServerStatusCard.vue        # 在线状态显示
├── ServerInfoCard.vue          # 服务器基本信息
│   └── ServerInfoItem.vue      # 信息项组件
├── PlayerInfoCard.vue          # 玩家统计信息
│   └── ServerInfoItem.vue      # 复用信息项
├── ConnectionCard.vue          # 连接信息和操作
│   └── ServerInfoItem.vue      # 复用信息项
└── PlayerList.vue              # 在线玩家列表
    └── PlayerListItem.vue      # 单个玩家信息
```

#### 数据流
```
useServerStatus (composable)
├── 自动获取服务器数据 (30秒间隔)
├── 错误处理和重试机制
├── 响应式数据管理
└── API: /api/v1/cs2/server/details
```

### 2. 周年庆活动页面
**位置**: `/anniversary` (主页面，隐藏Header), `/anniversary-preheating` (预热页面)
**功能**: 周年庆活动展示和互动

#### 特性
- 全屏沉浸式体验 (主页面隐藏导航)
- 背景视频和动画效果
- 响应式设计适配移动端
- 活动信息和奖励展示

### 3. 布局系统
**Header**: 条件渲染，在周年庆主页面自动隐藏
**Footer**: 全局显示
**响应式**: 移动端自动切换抽屉式菜单

## 开发规范

### 组件设计原则
1. **单一职责**: 每个组件功能明确，职责单一
2. **可重用性**: 通用组件可在多处使用
3. **类型安全**: 完整的 TypeScript 类型定义
4. **响应式**: 支持移动端和桌面端

### 代码组织
```typescript
// 组件 Props 定义
interface Props {
  serverData: ServerData
  loading?: boolean
}

// 事件定义
const emit = defineEmits<{
  refresh: []
  retry: []
}>()

// 组合式函数使用
const { loading, error, serverData } = useServerStatus()
```

### 样式规范
- 使用 TailwindCSS 工具类优先
- 组件内部样式使用 scoped
- 响应式断点: 768px (移动端), 1400px (大屏)
- 深度样式使用 `:deep()` 语法

## 开发命令

```bash
# 安装依赖
pnpm install

# 开发服务器
pnpm dev

# 类型检查
pnpm type-check

# 构建生产版本
pnpm build

# 预览生产版本
pnpm preview

# 代码格式化
pnpm format

# 代码检查和修复
pnpm lint
```

## 组件重构亮点

### ServerStatus 模块重构
原本 600+ 行的单体组件拆分为 9 个职责明确的子组件：

#### 优势
1. **可维护性**: 组件功能独立，修改影响范围小
2. **可重用性**: 子组件可在其他页面复用
3. **类型安全**: 完整的 TypeScript 支持
4. **性能优化**: 按需加载，减少重复渲染
5. **团队协作**: 多人可并行开发不同组件

#### 示例用法
```vue
<template>
  <!-- 复用单个组件 -->
  <ServerStatusCard :server-data="data" />
  
  <!-- 复用整套组件 -->
  <PlayerList :player-list="players" />
  <ConnectionCard :server-data="data" :server-address="address" />
</template>

<script setup>
import { ServerStatusCard, PlayerList, ConnectionCard } from '@/components/ServerStatus'
import { useServerStatus } from '@/composables'

const { serverData, loading } = useServerStatus()
</script>
```

## 环境配置

### 开发环境要求
- Node.js 22+
- pnpm 10.11.0+
- TypeScript 5.8+

### IDE 推荐配置
- VS Code + Volar 扩展
- TypeScript 严格模式
- Prettier 代码格式化
- ESLint 代码检查

## 部署说明

### 构建输出
```bash
pnpm build
# 输出到 dist/ 目录
```

### 环境变量
```env
# API 基础地址
VITE_API_BASE_URL=https://api.example.com

# 服务器地址
VITE_SERVER_ADDRESS=43.138.75.104:27015
```

## 贡献指南

1. **功能开发**: 新功能请创建对应的组件和类型定义
2. **样式规范**: 遵循 TailwindCSS 和响应式设计原则
3. **类型安全**: 所有新增代码必须有完整的 TypeScript 类型
4. **组件设计**: 遵循单一职责和可重用性原则
5. **测试**: 重要功能需要编写对应的测试用例

## 项目特色

- 🎮 专为 CS2 游戏社区打造
- 🌟 现代化的 Vue 3 Composition API
- 📱 完整的移动端适配
- 🎨 精美的 UI 设计和动画效果
- 🔧 高度模块化的组件架构
- 📈 实时服务器状态监控
- 🎉 沉浸式周年庆体验
- ⚡ 高性能的 Vite 构建工具
