# CS2 黄粱一梦社区服 - 官方网站

## 🎯 项目简介
这是 CS2 黄粱一梦社区服的官方前端站点，提供服务器状态、活动中心、模型图鉴、礼物展示、贡献者、签到/抽奖/挑战、兑换与个人中心等功能的现代化 Web 应用。

## ✅ 主要功能
- 🛰️ **服务器状态**：在线/离线、人数、延迟、地图信息与预览图，支持详情面板与一键加入
- 🎯 **活动中心**：活动入口、玩法说明与奖励展示
- 🎁 **礼物与直播展示**：礼物页内容与社区展示
- 🧩 **模型图鉴**：模型搜索、标签筛选、阵营筛选、排序与预览
- 📅 **签到/抽奖/挑战**：每日签到、抽奖、挑战玩法（需登录）
- 💎 **积分/热度兑换**：愿望值与积分兑换、热度兑换（需登录）
- 👤 **账户系统**：登录/注册、Steam 登录成功页、个人中心
- 📦 **APP 下载**：安卓客户端下载入口
- ❓ **FAQ/贡献者**：常见问题与贡献者展示

## 🧩 技术栈
- **框架**: Vue 3.5.13 + TypeScript 5.8
- **UI 组件**: Naive UI 2.41.0
- **状态管理**: Pinia 3.0.1
- **路由**: Vue Router 4.5.0
- **请求**: Axios 1.8.4
- **样式**: TailwindCSS 4.0.17
- **构建**: Vite 6.2.1
- **包管理**: pnpm 10.11.0

## 🚀 快速开始
### 环境要求
- Node.js 22+
- pnpm 10.11.0+

### 安装与运行
```bash
# 克隆项目
git clone <repository-url>
cd cydlwebsite

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览生产版本
pnpm preview
```

### 常用命令
```bash
# 类型检查
pnpm type-check

# 代码格式化
pnpm format

# 代码检查与修复
pnpm lint
```

## 📁 项目结构
```
cydlwebsite/
├─ public/                         # 静态资源
├─ src/
│  ├─ App.vue                      # 根组件
│  ├─ main.ts                      # 应用入口
│  ├─ assets/                      # 资源文件
│  ├─ components/                  # 复用组件
│  │  ├─ Layout/                   # 布局组件
│  │  ├─ ServerStatus/             # 服务器状态卡片
│  │  └─ common/                   # 通用组件
│  ├─ composables/                 # 组合式逻辑
│  ├─ const/                       # 常量配置
│  ├─ router/                      # 路由配置
│  ├─ services/                    # API 服务
│  ├─ stores/                      # 状态管理
│  ├─ types/                       # TS 类型
│  └─ views/                       # 页面组件
└─ README.md
```

## 🧭 核心页面
### 首页 (`/`)
- 站点介绍与核心能力概览

### 服务器状态 (`/server-status`)
- 多服务器批量查询
- 地图信息与预览图
- 详情面板、玩家列表与连接信息

### 模型图鉴 (`/models`)
- 搜索、标签/阵营筛选、排序与预览

### 活动中心 (`/activity`)
- 活动入口与奖励信息（需登录）

### 签到/抽奖/挑战
- `/registration`：每日签到（需登录）
- `/lottery`：抽奖（需登录）
- `/challenge`：挑战玩法（需登录）

### 兑换与个人中心
- `/wish-exchange`：愿望值兑换（需登录）
- `/wish-credit-exchange`：积分兑换（需登录）
- `/hotpoints-exchange`：热度兑换（需登录）
- `/profile`：个人中心（需登录）

### 其它页面
- `/gifts`：礼物展示/直播入口
- `/faq`：常见问题
- `/contribute`：贡献者
- `/app-download`：APP 下载
- `/login` `/register` `/login/success`：登录注册流程

## 🔌 API 集成
### 服务器状态 API
```typescript
// 批量查询服务器状态
GET /api/v1/cs2/servers/batch?servers=ip:port,ip:port

// 响应结构（节选）
interface ServerResponse {
  basic_info: {
    online: boolean
    name: string
    map: string
    map_image: string | null
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
    query_duration: number | null
  }
  players: Player[]
  timestamp: string
}
```

## 🧱 架构说明
### 组合式逻辑
使用 `useMultiServerStatus` 进行多服务器批量查询与状态聚合。
```typescript
// composables/useMultiServerStatus.ts
export const useMultiServerStatus = (serverAddresses: string[]) => {
  const loading = ref(false)
  const serverDataList = ref<ServerData[]>([])
  const fetchServers = async () => {
    // 批量拉取服务器状态
  }
  return { loading, serverDataList, fetchServers }
}
```

### 类型安全
```typescript
// types/serverStatus.ts
export interface ServerData {
  online: boolean
  name: string | null
  map: string | null
  mapImage?: string | null
  players: number
  maxPlayers: number
  ping: number | null
  // ...
}
```

## 📦 部署
```bash
pnpm build
# 产物输出到 dist/，可部署至任意静态服务器
```

## 🧾 提交规范
```bash
git commit -m "feat: add new feature"
git commit -m "fix: resolve issue"
git commit -m "style: adjust UI"
git commit -m "refactor: cleanup code"
```

## 📝 更新日志
### v1.0.0 (Current)
- ✅ 服务器状态页重构与地图预览支持
- ✅ 活动中心/签到/抽奖/挑战流程完善
- ✅ 模型图鉴与筛选体验升级
- ✅ 账户与兑换功能接入

## 📄 许可
项目遵循 MIT License。

---
**感谢所有为 CS2 黄粱一梦社区服做出贡献的开发者与玩家。**
