<template>
  <div v-if="loading && !hasData" class="loading-container">
    <n-spin size="large">
      <template #description>
        正在获取服务器状态...
      </template>
    </n-spin>
  </div>

  <div v-else-if="error" class="error-container">
    <n-result status="error" title="无法获取服务器状态" :description="error">
      <template #footer>
        <n-button @click="onRetry" type="primary">
          重试
        </n-button>
      </template>
    </n-result>
  </div>
</template>

<script setup lang="ts">
import { NSpin, NResult, NButton } from 'naive-ui'

defineProps<{
  loading: boolean
  error: string
  hasData: boolean
}>()

const emit = defineEmits<{
  retry: []
}>()

const onRetry = () => {
  emit('retry')
}
</script>

<style scoped>
.loading-container {
  text-align: center;
  padding: 60px 20px;
}

.error-container {
  padding: 40px 20px;
}
</style>
