<template>
  <n-card title="在线玩家" embedded>
    <div class="player-list">
      <PlayerListItem 
        v-for="(player, index) in playerList" 
        :key="index" 
        :player="player" 
        :color="getPlayerColor(index)" 
      />
      
      <div v-if="playerList.length === 0" class="no-players">
        <n-text depth="3">当前无玩家在线</n-text>
      </div>
    </div>
  </n-card>
</template>

<script setup lang="ts">
import { NCard, NText } from 'naive-ui'
import PlayerListItem from './PlayerListItem.vue'

interface Player {
  name: string
  score: number
  time: number
}

defineProps<{
  playerList: Player[]
}>()

const getPlayerColor = (index: number) => {
  const colors = ['#1890ff', '#52c41a', '#faad14', '#f5222d', '#722ed1', '#13c2c2', '#eb2f96', '#fa8c16']
  return colors[index % colors.length]
}
</script>

<style scoped>
.player-list {
  max-height: 300px;
  overflow-y: auto;
}

.no-players {
  text-align: center;
  padding: 20px;
  color: #999;
}
</style>
