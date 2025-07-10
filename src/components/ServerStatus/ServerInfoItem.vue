<template>
  <div class="info-item">
    <n-text depth="3">{{ label }}</n-text>
    <n-text style="font-weight: 600">{{ value }}</n-text>
  </div>
</template>

<script setup lang="ts">
import { NText } from 'naive-ui'

defineProps<{
  label: string
  value: string
}>()
</script>

<style scoped>
.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}
</style>
