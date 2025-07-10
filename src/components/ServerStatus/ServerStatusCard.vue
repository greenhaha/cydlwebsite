<template>
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
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}
</style>
