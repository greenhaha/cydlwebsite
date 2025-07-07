<template>
  <div class="server-status-container">
    <div class="server-status-card">
      <div class="card-header">
        <n-space align="center" justify="space-between" class="header-content">
          <n-space align="center" class="title-section">
            <n-icon size="32" color="#ff6b35" class="title-icon">
              <ServerIcon />
            </n-icon>
            <h1 class="page-title">CS2 服务器状态</h1>
          </n-space>
          <n-button
            @click="fetchServerStatus"
            :loading="loading"
            type="primary"
            circle
            size="large"
            class="refresh-button"
          >
            <template #icon>
              <n-icon><RefreshIcon /></n-icon>
            </template>
          </n-button>
        </n-space>
      </div>

      <n-divider />

      <div v-if="loading && !serverData" class="loading-container">
        <n-spin size="large">
          <template #description>
            正在获取服务器状态...
          </template>
        </n-spin>
      </div>

      <div v-else-if="error" class="error-container">
        <n-result status="error" title="无法获取服务器状态" :description="error">
          <template #footer>
            <n-button @click="fetchServerStatus" type="primary">
              重试
            </n-button>
          </template>
        </n-result>
      </div>

      <div v-else class="server-info">
        <n-grid 
          :cols="1" 
          :x-gap="16" 
          :y-gap="12" 
          responsive="screen"
          :item-responsive="true"
          :collapsed-rows="2"
          :cols-xl="2"
          :cols-lg="2"
          :cols-md="1"
          :cols-sm="1"
          :cols-xs="1"
        >
          <n-grid-item :span="1" :xl-span="2" :lg-span="2" :md-span="1" :sm-span="1" :xs-span="1">
            <n-card class="status-card primary-card" embedded>
              <n-space align="center" justify="space-between">
                <n-space align="center">
                  <n-icon
                    size="24"
                    :color="serverData.online ? '#52c41a' : '#ff4d4f'"
                  >
                    <component 
                      :is="serverData.online ? CheckCircleIcon : CloseCircleIcon" 
                    />
                  </n-icon>
                  <n-text style="font-size: 18px; font-weight: 600">
                    {{ serverData.online ? '在线' : '离线' }}
                  </n-text>
                </n-space>
                <n-tag
                  :type="serverData.online ? 'success' : 'error'"
                  :bordered="false"
                  round
                  size="large"
                >
                  {{ serverData.online ? 'ONLINE' : 'OFFLINE' }}
                </n-tag>
              </n-space>
            </n-card>
          </n-grid-item>

          <n-grid-item :span="1" :xl-span="1" :lg-span="1" :md-span="1" :sm-span="1" :xs-span="1">
            <n-card title="服务器信息" class="info-card" embedded>
              <n-space vertical size="medium">
                <div class="info-item">
                  <n-text depth="3">服务器名称</n-text>
                  <n-text style="font-weight: 600">
                    {{ serverData.name || (serverData.online ? '未知' : '服务器离线') }}
                  </n-text>
                </div>
                <div class="info-item">
                  <n-text depth="3">当前地图</n-text>
                  <n-text style="font-weight: 600">
                    {{ serverData.map || (serverData.online ? '未知' : '-') }}
                  </n-text>
                </div>
                <div class="info-item">
                  <n-text depth="3">游戏类型</n-text>
                  <n-text style="font-weight: 600">
                    {{ serverData.gameType || (serverData.online ? 'Counter-Strike 2' : '-') }}
                  </n-text>
                </div>
                <div v-if="serverData.version" class="info-item">
                  <n-text depth="3">游戏版本</n-text>
                  <n-text style="font-weight: 600">{{ serverData.version }}</n-text>
                </div>
                <div v-if="serverData.antiCheat" class="info-item">
                  <n-text depth="3">反外挂</n-text>
                  <n-space align="center">
                    <n-text style="font-weight: 600">{{ serverData.antiCheat }}</n-text>
                    <n-tag 
                      :type="serverData.vacEnabled ? 'success' : 'warning'"
                      size="small"
                    >
                      {{ serverData.vacEnabled ? 'VAC启用' : 'VAC未启用' }}
                    </n-tag>
                  </n-space>
                </div>
                <div v-if="serverData.passwordProtected !== null" class="info-item">
                  <n-text depth="3">密码保护</n-text>
                  <n-tag 
                    :type="serverData.passwordProtected ? 'warning' : 'success'"
                    size="small"
                  >
                    {{ serverData.passwordProtected ? '需要密码' : '无密码' }}
                  </n-tag>
                </div>
                <div v-if="serverData.ping !== null" class="info-item">
                  <n-text depth="3">延迟</n-text>
                  <n-space align="center">
                    <n-text style="font-weight: 600">{{ serverData.ping }}ms</n-text>
                    <n-tag 
                      :type="serverData.ping < 50 ? 'success' : serverData.ping < 100 ? 'warning' : 'error'"
                      size="small"
                    >
                      {{ serverData.ping < 50 ? '优秀' : serverData.ping < 100 ? '良好' : '较慢' }}
                    </n-tag>
                  </n-space>
                </div>
              </n-space>
            </n-card>
          </n-grid-item>

          <n-grid-item :span="1" :xl-span="1" :lg-span="1" :md-span="1" :sm-span="1" :xs-span="1">
            <n-card title="玩家信息" class="player-info-card" embedded>
              <n-space vertical size="medium">
                <div class="info-item">
                  <n-text depth="3">在线玩家</n-text>
                  <n-space align="center">
                    <n-text style="font-weight: 600; font-size: 18px">
                      {{ serverData.online ? serverData.players : '-' }}
                    </n-text>
                    <n-text depth="3">
                      {{ serverData.online && serverData.maxPlayers > 0 ? `/ ${serverData.maxPlayers}` : '' }}
                    </n-text>
                  </n-space>
                </div>
                <div v-if="serverData.online && serverData.maxPlayers > 0" class="progress-container">
                  <n-progress
                    type="line"
                    :percentage="playerPercentage"
                    :color="getProgressColor(playerPercentage)"
                    :show-indicator="false"
                    :height="8"
                  />
                  <n-text depth="3" style="font-size: 12px; margin-top: 4px;">
                    服务器容量: {{ playerPercentage }}%
                  </n-text>
                </div>
                <div v-if="serverData.online" class="info-item">
                  <n-text depth="3">机器人</n-text>
                  <n-text style="font-weight: 600">{{ serverData.bots }}</n-text>
                </div>
                <div v-if="serverData.utilization > 0" class="info-item">
                  <n-text depth="3">CPU使用率</n-text>
                  <n-space align="center">
                    <n-text style="font-weight: 600">{{ serverData.utilization.toFixed(1) }}%</n-text>
                    <n-tag 
                      :type="serverData.utilization < 50 ? 'success' : serverData.utilization < 80 ? 'warning' : 'error'"
                      size="small"
                    >
                      {{ serverData.utilization < 50 ? '正常' : serverData.utilization < 80 ? '较高' : '高负载' }}
                    </n-tag>
                  </n-space>
                </div>
                <div v-if="!serverData.online" class="offline-notice">
                  <n-alert type="warning" :show-icon="false">
                    服务器当前离线，无法获取玩家信息
                  </n-alert>
                </div>
              </n-space>
            </n-card>
          </n-grid-item>

          <n-grid-item :span="1" :xl-span="2" :lg-span="2" :md-span="1" :sm-span="1" :xs-span="1">
            <n-card title="连接信息" class="connection-card" embedded>
              <n-space vertical size="medium">
                <div class="connection-info">
                  <div class="info-item">
                    <n-text depth="3">服务器地址</n-text>
                    <n-space align="center">
                      <n-text 
                        style="font-weight: 600; font-family: 'Monaco', 'Courier New', monospace"
                      >
                        {{ serverData.address || serverAddress }}
                      </n-text>
                      <n-button
                        @click="copyServerAddress"
                        size="small"
                        type="primary"
                        text
                      >
                        <template #icon>
                          <n-icon><CopyIcon /></n-icon>
                        </template>
                        复制
                      </n-button>
                    </n-space>
                  </div>
                  <div v-if="serverData.queryDuration" class="info-item">
                    <n-text depth="3">查询耗时</n-text>
                    <n-text style="font-weight: 600">{{ serverData.queryDuration }}ms</n-text>
                  </div>
                  <div v-if="serverData.lastUpdate" class="info-item">
                    <n-text depth="3">数据更新时间</n-text>
                    <n-text style="font-weight: 600">
                      {{ new Date(serverData.lastUpdate).toLocaleString('zh-CN') }}
                    </n-text>
                  </div>
                </div>
                <div v-if="!serverData.online" class="offline-warning">
                  <n-alert type="warning" title="服务器离线">
                    当前无法连接到游戏服务器，请稍后再试或联系管理员。
                  </n-alert>
                </div>
                <div class="action-buttons">
                  <n-space>
                    <n-button
                      @click="connectViaSteam"
                      type="primary"
                      size="large"
                      :disabled="!serverData.online"
                    >
                      <template #icon>
                        <n-icon><GamepadIcon /></n-icon>
                      </template>
                      {{ serverData.online ? '通过 Steam 连接' : '服务器离线' }}
                    </n-button>
                    <n-button
                      @click="openInBrowser"
                      type="default"
                      size="large"
                      ghost
                    >
                      <template #icon>
                        <n-icon><ExternalLinkIcon /></n-icon>
                      </template>
                      服务器详情
                    </n-button>
                  </n-space>
                </div>
              </n-space>
            </n-card>
          </n-grid-item>

          <!-- 玩家列表 -->
          <n-grid-item v-if="serverData.online && serverData.playerList.length > 0" :span="1" :xl-span="2" :lg-span="2" :md-span="1" :sm-span="1" :xs-span="1">
            <n-card title="在线玩家" embedded>
              <div class="player-list">
                <div v-for="(player, index) in serverData.playerList" :key="index" class="player-item">
                  <n-space align="center" justify="space-between">
                    <n-space align="center">
                      <n-avatar size="small" :style="{ backgroundColor: getPlayerColor(index) }">
                        {{ player.name.charAt(0).toUpperCase() }}
                      </n-avatar>
                      <n-text style="font-weight: 600">{{ player.name }}</n-text>
                    </n-space>
                    <n-space align="center">
                      <n-text depth="3">得分:</n-text>
                      <n-text style="font-weight: 600">{{ player.score }}</n-text>
                      <n-text depth="3">时间:</n-text>
                      <n-text style="font-weight: 600">{{ formatPlayTime(player.time) }}</n-text>
                    </n-space>
                  </n-space>
                </div>
                <div v-if="serverData.playerList.length === 0" class="no-players">
                  <n-text depth="3">当前无玩家在线</n-text>
                </div>
              </div>
            </n-card>
          </n-grid-item>
        </n-grid>

        <div class="last-updated">
          <n-text depth="3">
            最后更新: {{ lastUpdated }}
          </n-text>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import {
  NCard,
  NSpace,
  NIcon,
  NButton,
  NGrid,
  NGridItem,
  NText,
  NTag,
  NProgress,
  NDivider,
  NSpin,
  NResult,
  NAlert,
  NAvatar,
  useMessage
} from 'naive-ui'
import {
  Server as ServerIcon,
  Refresh as RefreshIcon,
  CircleCheck as CheckCircleIcon,
  CircleX as CloseCircleIcon,
  Copy as CopyIcon,
  DeviceGamepad as GamepadIcon,
  ExternalLink as ExternalLinkIcon
} from '@vicons/tabler'

interface Player {
  name: string
  score: number
  time: number
}

interface ServerData {
  online: boolean
  name: string | null
  map: string | null
  gameType: string | null
  players: number
  maxPlayers: number
  bots: number
  ping: number | null
  version: string | null
  passwordProtected: boolean
  vacEnabled: boolean
  antiCheat: string | null
  utilization: number
  address: string | null
  queryDuration: number | null
  playerList: Player[]
  lastUpdate: string | null
}

const message = useMessage()
const loading = ref(false)
const error = ref('')
const serverData = ref<ServerData>({
  online: false,
  name: null,
  map: null,
  gameType: null,
  players: 0,
  maxPlayers: 0,
  bots: 0,
  ping: null,
  version: null,
  passwordProtected: false,
  vacEnabled: false,
  antiCheat: null,
  utilization: 0,
  address: null,
  queryDuration: null,
  playerList: [],
  lastUpdate: null
})
const lastUpdated = ref('')

const serverAddress = '43.138.75.104:27015'

const playerPercentage = computed(() => {
  if (!serverData.value.maxPlayers) return 0
  return Math.round((serverData.value.players / serverData.value.maxPlayers) * 100)
})

const getProgressColor = (percentage: number) => {
  if (percentage < 50) return '#52c41a'
  if (percentage < 80) return '#faad14'
  return '#ff4d4f'
}

const getPlayerColor = (index: number) => {
  const colors = ['#1890ff', '#52c41a', '#faad14', '#f5222d', '#722ed1', '#13c2c2', '#eb2f96', '#fa8c16']
  return colors[index % colors.length]
}

const formatPlayTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

const fetchServerStatus = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const response = await fetch('/api/v1/cs2/server/details')
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const data = await response.json()
    
    // 检查API返回的数据是否有效
    if (!data || typeof data !== 'object') {
      throw new Error('API返回的数据格式无效')
    }
    
    // 根据新的API数据结构更新服务器数据
    const basicInfo = data.basic_info || {}
    const performance = data.performance || {}
    const connection = data.connection || {}
    const rawData = data.raw_data || {}
    
    serverData.value = {
      online: Boolean(basicInfo.online),
      name: basicInfo.name || null,
      map: basicInfo.map || null,
      gameType: basicInfo.game_type || rawData.game || null,
      players: Number(performance.current_players || rawData.numplayers) || 0,
      maxPlayers: Number(performance.max_players || rawData.maxplayers) || 0,
      bots: Number(performance.bots || rawData.numbots) || 0,
      ping: connection.ping ? Number(connection.ping) : null,
      version: rawData.version || null,
      passwordProtected: Boolean(basicInfo.password_protected),
      vacEnabled: Boolean(performance.vac_enabled || rawData.secure),
      antiCheat: performance.anti_cheat || null,
      utilization: Number(performance.utilization_percent) || 0,
      address: connection.address || null,
      queryDuration: connection.query_duration ? Number(connection.query_duration) : null,
      playerList: Array.isArray(data.players) ? data.players : [],
      lastUpdate: data.timestamp ? new Date(data.timestamp).toISOString() : null
    }
    
    if (serverData.value.online) {
      message.success('服务器状态已更新')
    } else {
      message.warning('服务器当前离线')
    }
  } catch (err) {
    console.warn('API请求失败:', err)
    error.value = err instanceof Error ? err.message : '获取服务器状态失败'
    
    // 设置离线状态
    serverData.value = {
      online: false,
      name: null,
      map: null,
      gameType: null,
      players: 0,
      maxPlayers: 0,
      bots: 0,
      ping: null,
      version: null,
      passwordProtected: false,
      vacEnabled: false,
      antiCheat: null,
      utilization: 0,
      address: null,
      queryDuration: null,
      playerList: [],
      lastUpdate: null
    }
    
    message.error('无法连接到服务器')
  } finally {
    loading.value = false
    lastUpdated.value = new Date().toLocaleString('zh-CN')
  }
}

const copyServerAddress = async () => {
  try {
    const addressToCopy = serverData.value.address || serverAddress
    await navigator.clipboard.writeText(addressToCopy)
    message.success('服务器地址已复制到剪贴板')
  } catch (err) {
    console.error('复制失败:', err)
    message.error('复制失败，请手动复制')
  }
}

const connectViaSteam = () => {
  const addressToConnect = serverData.value.address || serverAddress
  const steamUrl = `steam://connect/${addressToConnect}`
  window.open(steamUrl, '_blank')
  message.info('正在启动 Steam 客户端...')
}

const openInBrowser = () => {
  message.info('服务器详情页功能开发中...')
}

onMounted(() => {
  fetchServerStatus()
  
  // 每30秒自动刷新一次
  setInterval(() => {
    fetchServerStatus()
  }, 30000)
})
</script>

<style scoped>
.server-status-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 60px 20px;
  padding-top: 75px!important;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.server-status-card {
  max-width: 1000px;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.card-header {
  margin-bottom: 0;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, #ff6b35, #f7931e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.loading-container {
  text-align: center;
  padding: 60px 20px;
}

.error-container {
  padding: 40px 20px;
}

.server-info {
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.status-card {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.progress-container {
  margin: 8px 0;
}

.connection-info {
  margin-bottom: 16px;
}

.action-buttons {
  text-align: center;
  margin-top: 20px;
}

.last-updated {
  text-align: center;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .server-status-container {
    padding: 20px 10px;
  }
  
  .server-status-card {
    padding: 20px;
  }
  
  .page-title {
    font-size: 24px;
  }
  
  .action-buttons {
    margin-top: 16px;
  }
  
  .action-buttons .n-space {
    flex-direction: column;
    width: 100%;
  }
  
  .action-buttons .n-button {
    width: 100%;
  }
}

/* 卡片悬停效果 */
.n-card {
  transition: all 0.3s ease;
}

.n-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* 按钮样式增强 */
.n-button {
  transition: all 0.3s ease;
}

.n-button:hover {
  transform: translateY(-1px);
}

/* 进度条样式 */
.n-progress {
  --n-rail-color: rgba(255, 255, 255, 0.3);
}

/* 离线提示样式 */
.offline-notice {
  margin-top: 12px;
}

.offline-warning {
  margin: 16px 0;
}

/* 状态卡片样式增强 */
.status-card .n-card__content {
  padding: 16px !important;
}

/* 延迟标签样式 */
.info-item .n-tag {
  font-size: 10px;
  padding: 2px 6px;
}

/* 玩家列表样式 */
.player-list {
  max-height: 300px;
  overflow-y: auto;
}

.player-item {
  padding: 12px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.5);
  margin-bottom: 8px;
  transition: all 0.3s ease;
}

.player-item:hover {
  background: rgba(255, 255, 255, 0.8);
  transform: translateX(4px);
}

.player-item:last-child {
  margin-bottom: 0;
}

.no-players {
  text-align: center;
  padding: 20px;
  color: #999;
}

/* 移动端响应式样式 */
@media (max-width: 768px) {
  .server-status-container {
    padding: 20px 12px;
    padding-top: 75px!important;
  }

  .server-status-card {
    padding: 20px;
    border-radius: 16px;
    margin: 0;
    max-width: 100%;
  }

  .card-header {
    margin-bottom: 16px;
  }

  .header-content {
    flex-wrap: wrap;
    gap: 12px;
  }

  .title-section {
    flex: 1;
    min-width: 0;
  }

  .title-icon {
    font-size: 28px !important;
  }

  .page-title {
    font-size: 22px;
    font-weight: 600;
  }

  .refresh-button {
    flex-shrink: 0;
  }

  /* 调整网格间距 */
  .server-info .n-grid {
    --n-gap: 12px 12px !important;
  }

  /* 优化卡片内边距 */
  .n-card {
    --n-padding-left: 16px !important;
    --n-padding-right: 16px !important;
    --n-padding-top: 16px !important;
    --n-padding-bottom: 16px !important;
  }

  /* 状态卡片移动端优化 */
  .status-card .n-space {
    flex-direction: column;
    align-items: flex-start !important;
    gap: 12px;
  }

  .status-card .n-tag {
    align-self: flex-end;
  }

  /* 信息项移动端布局 */
  .info-item {
    flex-direction: column;
    align-items: flex-start !important;
    gap: 4px;
  }

  .info-item .n-space {
    width: 100%;
    justify-content: space-between;
  }

  /* 连接信息移动端优化 */
  .connection-info .info-item .n-space {
    flex-direction: column;
    align-items: flex-start !important;
    gap: 8px;
  }

  .connection-info .n-button {
    align-self: flex-start;
  }

  /* 操作按钮移动端优化 */
  .action-buttons .n-space {
    flex-direction: column;
    width: 100%;
  }

  .action-buttons .n-button {
    width: 100%;
    justify-content: center;
  }

  /* 玩家列表移动端优化 */
  .player-item {
    padding: 10px;
  }

  .player-item .n-space {
    flex-direction: column;
    align-items: flex-start !important;
    gap: 8px;
  }

  .player-item .n-space:last-child {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 4px 12px;
  }

  .player-item .n-avatar {
    width: 28px !important;
    height: 28px !important;
    font-size: 14px !important;
  }

  /* 玩家得分和时间信息移动端布局 */
  .player-item .n-text {
    font-size: 13px;
  }

  .player-item .n-space .n-text:first-child {
    font-weight: 600;
    font-size: 14px;
  }

  /* 进度条容器移动端优化 */
  .progress-container {
    margin-top: 8px;
  }

  .progress-container .n-progress {
    margin-bottom: 6px;
  }

  .progress-container .n-text {
    font-size: 11px !important;
  }

  /* 加载和错误状态移动端优化 */
  .loading-container,
  .error-container {
    padding: 20px;
  }

  /* 最后更新时间移动端优化 */
  .last-updated {
    margin-top: 16px;
    text-align: center;
  }

  /* 标签在移动端的优化 */
  .n-tag {
    font-size: 12px !important;
    padding: 4px 8px !important;
    white-space: nowrap;
  }

  .status-card .n-tag {
    font-size: 14px !important;
    padding: 6px 12px !important;
  }

  /* 警告和错误提示移动端优化 */
  .n-alert {
    font-size: 13px;
  }

  .n-alert .n-alert__content {
    padding: 12px;
  }
}

/* 小屏幕设备进一步优化 */
@media (max-width: 480px) {
  .server-status-container {
    padding: 16px 8px;
    padding-top: 70px!important;
  }

  .server-status-card {
    padding: 16px;
    border-radius: 12px;
  }

  .page-title {
    font-size: 20px;
  }

  .n-card {
    --n-padding-left: 12px !important;
    --n-padding-right: 12px !important;
    --n-padding-top: 12px !important;
    --n-padding-bottom: 12px !important;
  }

  .player-item {
    padding: 8px;
  }

  /* 图标大小调整 */
  .n-icon {
    font-size: 20px !important;
  }

  /* 按钮大小调整 */
  .n-button--large {
    height: 44px;
    font-size: 14px;
    min-width: 44px; /* 保证触摸面积 */
  }

  /* 头部刷新按钮调整 */
  .card-header .n-button {
    width: 44px;
    height: 44px;
    min-width: 44px;
  }

  /* 复制按钮优化 */
  .connection-info .n-button {
    height: 40px;
    min-width: 40px;
    font-size: 13px;
  }

  /* 触摸优化 */
  .n-button,
  .player-item,
  .n-card {
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }

  /* 文本选择优化 */
  .connection-info .n-text[style*="monospace"] {
    user-select: all;
    -webkit-user-select: all;
  }
}

/* 横屏模式优化 */
@media (max-width: 768px) and (orientation: landscape) {
  .server-status-container {
    padding: 12px 16px;
    padding-top: 60px!important;
  }

  .server-status-card {
    padding: 16px;
  }

  .page-title {
    font-size: 20px;
  }

  /* 横屏时使用更紧凑的布局 */
  .n-card {
    --n-padding-left: 14px !important;
    --n-padding-right: 14px !important;
    --n-padding-top: 14px !important;
    --n-padding-bottom: 14px !important;
  }

  .player-item {
    padding: 8px 12px;
  }
}

/* 超宽屏优化 */
@media (min-width: 1400px) {
  .server-status-card {
    max-width: 1200px;
  }

  .server-info .n-grid {
    --n-gap: 32px 32px !important;
  }
}
</style>