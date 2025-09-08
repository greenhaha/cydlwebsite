<template>
  <n-card class="status-card primary-card" :class="serverData.online ? 'online' : 'offline'" embedded>
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
</template>

<script setup lang="ts">
import { NCard, NSpace, NIcon, NText, NTag } from 'naive-ui'
import { CircleCheck as CheckCircleIcon, CircleX as CloseCircleIcon } from '@vicons/tabler'

interface ServerData {
  online: boolean
}

defineProps<{
  serverData: ServerData
}>()
</script>

<style scoped>
.status-card {
  border:1px solid #e2e8f0;
  box-shadow:0 2px 4px -2px rgba(0,0,0,.04), 0 4px 10px -4px rgba(0,0,0,.06);
  transition:background .4s ease;
}
.status-card.online {
  background:linear-gradient(90deg,
    #ffffff 0%,
    #ffffff 30%,
    #f0fdf4 55%,
    #dcfce7 80%,
    #bbf7d0 100%
  );
  color:#065f46;
}
.status-card.offline {
  background:linear-gradient(90deg,
    #ffffff 0%,
    #ffffff 30%,
    #fef2f2 55%,
    #fee2e2 80%,
    #fecaca 100%
  );
  color:#7f1d1d;
}
</style>
