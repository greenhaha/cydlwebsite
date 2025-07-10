# ServerStatus 组件重构

## 概述
对 ServerStatusView.vue 进行了全面的组件化重构，提高了代码的可读性、可维护性和可重用性。

## 重构内容

### 1. 组件拆分
将原来的单体组件拆分为以下小组件：

#### 核心组件
- `ServerStatusCard.vue` - 服务器状态卡片（在线/离线状态）
- `ServerInfoCard.vue` - 服务器基本信息卡片
- `PlayerInfoCard.vue` - 玩家信息卡片（在线玩家数、CPU使用率等）
- `ConnectionCard.vue` - 连接信息卡片（服务器地址、连接按钮等）
- `PlayerList.vue` - 玩家列表容器
- `PlayerListItem.vue` - 单个玩家信息项

#### 辅助组件
- `ServerInfoItem.vue` - 通用信息项组件
- `ServerStatusHeader.vue` - 页面头部组件
- `LoadingErrorState.vue` - 加载和错误状态组件

### 2. 逻辑抽取
- `useServerStatus.ts` - 服务器状态管理 composable，包含数据获取、定时刷新等逻辑
- `serverStatus.ts` - TypeScript 类型定义

### 3. 目录结构
```
src/
├── components/
│   └── ServerStatus/
│       ├── index.ts                    # 组件导出
│       ├── ServerStatusCard.vue        # 状态卡片
│       ├── ServerInfoCard.vue          # 信息卡片
│       ├── PlayerInfoCard.vue          # 玩家信息卡片
│       ├── ConnectionCard.vue          # 连接信息卡片
│       ├── PlayerList.vue              # 玩家列表
│       ├── PlayerListItem.vue          # 玩家项
│       ├── ServerInfoItem.vue          # 通用信息项
│       ├── ServerStatusHeader.vue      # 页面头部
│       └── LoadingErrorState.vue       # 加载/错误状态
├── composables/
│   ├── index.ts                        # composables 导出
│   └── useServerStatus.ts              # 服务器状态逻辑
├── types/
│   ├── index.ts                        # 类型导出
│   └── serverStatus.ts                 # 服务器状态类型
└── views/
    └── ServerStatusView.vue            # 重构后的主页面
```

## 重构优势

### 1. 单一职责原则
每个组件都有明确的职责：
- `ServerStatusCard` 只负责显示服务器在线状态
- `PlayerInfoCard` 只负责显示玩家相关信息
- `ConnectionCard` 只负责连接相关功能

### 2. 可重用性
- 组件可以在其他页面中重用
- `ServerInfoItem` 是通用的信息展示组件
- `PlayerListItem` 可以独立使用

### 3. 可维护性
- 代码结构清晰，易于定位问题
- 组件功能独立，修改一个组件不会影响其他组件
- 逻辑和UI分离，便于测试

### 4. 类型安全
- 所有组件都有完整的 TypeScript 类型定义
- Props 和事件都有明确的类型约束

### 5. 性能优化
- 组件按需加载
- 逻辑复用减少重复代码
- 响应式数据管理更加高效

## 使用方式

### 在其他页面中使用组件
```vue
<template>
  <ServerStatusCard :server-data="data" />
  <PlayerList :player-list="players" />
</template>

<script setup>
import { ServerStatusCard, PlayerList } from '@/components/ServerStatus'
import { useServerStatus } from '@/composables'

const { serverData } = useServerStatus()
</script>
```

### 扩展功能
1. 添加新的信息卡片 - 创建新组件并在主页面中引用
2. 修改样式 - 只需修改对应组件的样式
3. 添加新的数据源 - 修改 `useServerStatus` composable

## 代码质量提升
- 移除了重复代码
- 提高了组件复用率
- 增强了代码的可读性
- 简化了维护工作
- 提供了更好的开发体验
