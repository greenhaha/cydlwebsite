<template>
  <div class="server-status-container">
    <div class="server-status-card">
      <!-- 页面头部 -->
      <ServerStatusHeader :loading="loading" @refresh="fetchServerStatus" />

      <n-divider />

      <!-- 加载和错误状态 -->
      <LoadingErrorState 
        :loading="loading" 
        :error="error" 
        :has-data="!!serverData" 
        @retry="fetchServerStatus" 
      />

      <!-- 服务器信息主体 -->
      <div v-if="!loading || serverData" class="server-info">
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
          <!-- 服务器状态卡片 -->
          <n-grid-item :span="1" :xl-span="2" :lg-span="2" :md-span="1" :sm-span="1" :xs-span="1">
            <ServerStatusCard :server-data="serverData" />
          </n-grid-item>

          <!-- 服务器信息卡片 -->
          <n-grid-item :span="1" :xl-span="1" :lg-span="1" :md-span="1" :sm-span="1" :xs-span="1">
            <ServerInfoCard :server-data="serverData" />
          </n-grid-item>

          <!-- 玩家信息卡片 -->
          <n-grid-item :span="1" :xl-span="1" :lg-span="1" :md-span="1" :sm-span="1" :xs-span="1">
            <PlayerInfoCard :server-data="serverData" />
          </n-grid-item>

          <!-- 连接信息卡片 -->
          <n-grid-item :span="1" :xl-span="2" :lg-span="2" :md-span="1" :sm-span="1" :xs-span="1">
            <ConnectionCard :server-data="serverData" :server-address="serverAddress" />
          </n-grid-item>

          <!-- 玩家列表 -->
          <n-grid-item v-if="serverData.online && serverData.playerList.length > 0" :span="1" :xl-span="2" :lg-span="2" :md-span="1" :sm-span="1" :xs-span="1">
            <PlayerList :player-list="serverData.playerList" />
          </n-grid-item>
        </n-grid>

        <!-- 最后更新时间 -->
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
import { NGrid, NGridItem, NDivider, NText } from 'naive-ui'
import { 
  ServerStatusCard, 
  ServerInfoCard, 
  PlayerInfoCard, 
  ConnectionCard, 
  PlayerList, 
  ServerStatusHeader, 
  LoadingErrorState 
} from '@/components/ServerStatus'
import { useServerStatus } from '@/composables/useServerStatus'

const serverAddress = '43.138.75.104:27015'

const {
  loading,
  error,
  serverData,
  lastUpdated,
  fetchServerStatus
} = useServerStatus()
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

.last-updated {
  text-align: center;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

/* 卡片悬停效果 */
:deep(.n-card) {
  transition: all 0.3s ease;
}

:deep(.n-card:hover) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* 响应式设计 */
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

  /* 调整网格间距 */
  .server-info :deep(.n-grid) {
    --n-gap: 12px 12px !important;
  }

  /* 最后更新时间移动端优化 */
  .last-updated {
    margin-top: 16px;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .server-status-container {
    padding: 16px 8px;
    padding-top: 70px!important;
  }

  .server-status-card {
    padding: 16px;
    border-radius: 12px;
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
}

/* 超宽屏优化 */
@media (min-width: 1400px) {
  .server-status-card {
    max-width: 1200px;
  }

  .server-info :deep(.n-grid) {
    --n-gap: 32px 32px !important;
  }
}
</style>
