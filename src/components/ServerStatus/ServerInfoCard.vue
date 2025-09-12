<template>
  <n-card title="服务器信息" class="info-card" embedded>
    <n-space vertical size="medium">
  <ServerInfoItem label="服务器名称" :value="serverData.name || (serverData.online ? '未知' : '服务器离线')" />
  <ServerInfoItem label="当前地图" :value="serverData.map || '未知'" />
  <ServerInfoItem label="游戏类型" :value="serverData.gameType || '未知'" />

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

      <div class="info-item">
        <n-text depth="3">延迟</n-text>
        <n-space align="center">
          <n-text style="font-weight: 600">
            {{ displayPing !== null ? displayPing + 'ms' : '未知' }}
          </n-text>
          <n-tag
            :type="displayPing !== null ? getPingTagType(displayPing) : (serverData.online ? 'default' : 'error')"
            size="small"
          >
            {{ displayPing !== null ? getPingText(displayPing) : (serverData.online ? '未知' : '离线') }}
          </n-tag>
        </n-space>
      </div>
    </n-space>
  </n-card>
</template>

<script setup lang="ts">
import { NCard, NSpace, NText, NTag } from 'naive-ui'
import { computed } from 'vue'
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
  queryDuration?: number | null
}

const props = defineProps<{ serverData: ServerData }>()

const displayPing = computed(() => {
  if (props.serverData.ping !== null) return props.serverData.ping
  if (props.serverData.queryDuration !== null && props.serverData.queryDuration !== undefined) return props.serverData.queryDuration
  return null
})


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

.ping-item { align-items: stretch; position: relative; }
.ping-label { display:flex; flex-direction:column; justify-content:center; gap:2px; }
.mini-hint { font-size:10px; color:#64748B; font-weight:500; }
.ping-value-wrapper { position: relative; flex:1; margin-left:12px; }
.ping-value-wrapper :deep(svg) { opacity:.9; }
.ping-foreground { position:absolute; inset:0; display:flex; align-items:center; justify-content:flex-end; padding-right:4px; background:linear-gradient(90deg,rgba(255,255,255,0) 0%, rgba(255,255,255,0.25) 60%, rgba(255,255,255,0.55) 85%); backdrop-filter:blur(1px); }
.ping-item::after { content:""; position:absolute; left:0; right:0; bottom:0; height:1px; background:linear-gradient(90deg,rgba(99,102,241,0.25),rgba(99,102,241,0)); }
:deep(.n-card__header) { color:#1e293b; font-weight:600; }
:deep(.n-text[depth="3"]) { color:#64748b; }
:deep(.n-card) { color:#334155; }
</style>
