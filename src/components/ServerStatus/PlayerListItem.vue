<template>
  <div class="player-item">
    <n-space align="center" justify="space-between">
      <n-space align="center">
        <n-avatar size="small" :style="{ backgroundColor: color }">
          {{ player.name.charAt(0).toUpperCase() }}
        </n-avatar>
        <n-text style="font-weight: 600">{{ player.name }}</n-text>
      </n-space>
      <n-space align="center">
        <n-text depth="3">得分:</n-text>
        <n-text style="font-weight: 600">{{ player.score }}</n-text>
        <n-text depth="3">时间:</n-text>
        <n-text style="font-weight: 600">{{ formatPlayTime(player.time) }}</n-text>
      </n-space>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { NSpace, NAvatar, NText } from 'naive-ui'

interface Player {
  name: string
  score: number
  time: number
}

defineProps<{
  player: Player
  color: string
}>()

const formatPlayTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}
</script>

<style scoped>
.player-item {
  padding: 12px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.5);
  margin-bottom: 8px;
  transition: all 0.3s ease;
}

.player-item:hover {
  background: rgba(255, 255, 255, 0.8);
  transform: translateX(4px);
}

.player-item:last-child {
  margin-bottom: 0;
}
</style>
