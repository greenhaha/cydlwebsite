<template>
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
        
        <ServerInfoItem 
          v-if="serverData.queryDuration" 
          label="查询耗时" 
          :value="`${serverData.queryDuration}ms`" 
        />
        
        <ServerInfoItem 
          v-if="serverData.lastUpdate" 
          label="数据更新时间" 
          :value="formatUpdateTime(serverData.lastUpdate)" 
        />
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
</template>

<script setup lang="ts">
import { NCard, NSpace, NText, NButton, NIcon, NAlert, useMessage } from 'naive-ui'
import { Copy as CopyIcon, DeviceGamepad as GamepadIcon, ExternalLink as ExternalLinkIcon } from '@vicons/tabler'
import ServerInfoItem from './ServerInfoItem.vue'

interface ServerData {
  online: boolean
  address: string | null
  queryDuration: number | null
  lastUpdate: string | null
}

const props = defineProps<{
  serverData: ServerData
  serverAddress: string
}>()

const message = useMessage()

const formatUpdateTime = (timestamp: string) => {
  return new Date(timestamp).toLocaleString('zh-CN')
}

const copyServerAddress = async () => {
  try {
    const addressToCopy = props.serverData.address || props.serverAddress
    await navigator.clipboard.writeText(addressToCopy)
    message.success('服务器地址已复制到剪贴板')
  } catch (err) {
    console.error('复制失败:', err)
    message.error('复制失败，请手动复制')
  }
}

const connectViaSteam = () => {
  const addressToConnect = props.serverData.address || props.serverAddress
  const steamUrl = `steam://connect/${addressToConnect}`
  window.open(steamUrl, '_blank')
  message.info('正在启动 Steam 客户端...')
}

const openInBrowser = () => {
  message.info('服务器详情页功能开发中...')
}
</script>

<style scoped>
.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.connection-info {
  margin-bottom: 16px;
}

.action-buttons {
  text-align: center;
  margin-top: 20px;
}

.offline-warning {
  margin: 16px 0;
}
</style>
