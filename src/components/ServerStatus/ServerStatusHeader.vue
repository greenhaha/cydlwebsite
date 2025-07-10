<template>
  <div class="card-header">
    <n-space align="center" justify="space-between" class="header-content">
      <n-space align="center" class="title-section">
        <n-icon size="32" color="#ff6b35" class="title-icon">
          <ServerIcon />
        </n-icon>
        <h1 class="page-title">CS2 服务器状态</h1>
      </n-space>
      <n-button
        @click="onRefresh"
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
</template>

<script setup lang="ts">
import { NSpace, NIcon, NButton } from 'naive-ui'
import { Server as ServerIcon, Refresh as RefreshIcon } from '@vicons/tabler'

defineProps<{
  loading: boolean
}>()

const emit = defineEmits<{
  refresh: []
}>()

const onRefresh = () => {
  emit('refresh')
}
</script>

<style scoped>
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

.refresh-button {
  flex-shrink: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-title {
    font-size: 22px;
    font-weight: 600;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 20px;
  }
}
</style>
