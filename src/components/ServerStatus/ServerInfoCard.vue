<template>
  <n-card title="服务器信息" class="info-card" embedded>
    <n-space vertical size="medium">
      <ServerInfoItem label="服务器名称" :value="serverData.name || (serverData.online ? '未知' : '服务器离线')" />
      <ServerInfoItem label="当前地图" :value="serverData.map || (serverData.online ? '未知' : '-')" />
      <ServerInfoItem label="游戏类型" :value="serverData.gameType || (serverData.online ? 'Counter-Strike 2' : '-')" />
      
      <ServerInfoItem v-if="serverData.version" label="游戏版本" :value="serverData.version" />
      
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
            :type="getPingTagType(serverData.ping)"
            size="small"
          >
            {{ getPingText(serverData.ping) }}
          </n-tag>
        </n-space>
      </div>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { NCard, NSpace, NText, NTag } from 'naive-ui'
import ServerInfoItem from './ServerInfoItem.vue'

interface ServerData {
  online: boolean
  name: string | null
  map: string | null
  gameType: string | null
  version: string | null
  antiCheat: string | null
  vacEnabled: boolean
  passwordProtected: boolean
  ping: number | null
}

defineProps<{
  serverData: ServerData
}>()

const getPingTagType = (ping: number) => {
  if (ping < 50) return 'success'
  if (ping < 100) return 'warning'
  return 'error'
}

const getPingText = (ping: number) => {
  if (ping < 50) return '优秀'
  if (ping < 100) return '良好'
  return '较慢'
}
</script>

<style scoped>
.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}
</style>
