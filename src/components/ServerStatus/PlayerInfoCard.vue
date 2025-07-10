<template>
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
      
      <ServerInfoItem v-if="serverData.online" label="机器人" :value="String(serverData.bots)" />
      
      <div v-if="serverData.utilization > 0" class="info-item">
        <n-text depth="3">CPU使用率</n-text>
        <n-space align="center">
          <n-text style="font-weight: 600">{{ serverData.utilization.toFixed(1) }}%</n-text>
          <n-tag
            :type="getUtilizationTagType(serverData.utilization)"
            size="small"
          >
            {{ getUtilizationText(serverData.utilization) }}
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
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NCard, NSpace, NText, NProgress, NTag, NAlert } from 'naive-ui'
import ServerInfoItem from './ServerInfoItem.vue'

interface ServerData {
  online: boolean
  players: number
  maxPlayers: number
  bots: number
  utilization: number
}

const props = defineProps<{
  serverData: ServerData
}>()

const playerPercentage = computed(() => {
  if (!props.serverData.maxPlayers) return 0
  return Math.round((props.serverData.players / props.serverData.maxPlayers) * 100)
})

const getProgressColor = (percentage: number) => {
  if (percentage < 50) return '#52c41a'
  if (percentage < 80) return '#faad14'
  return '#ff4d4f'
}

const getUtilizationTagType = (utilization: number) => {
  if (utilization < 50) return 'success'
  if (utilization < 80) return 'warning'
  return 'error'
}

const getUtilizationText = (utilization: number) => {
  if (utilization < 50) return '正常'
  if (utilization < 80) return '较高'
  return '高负载'
}
</script>

<style scoped>
.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.progress-container {
  margin: 8px 0;
}

.offline-notice {
  margin-top: 12px;
}
</style>
