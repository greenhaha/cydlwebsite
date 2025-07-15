<template>
  <div class="lottery-info-panel">
    <n-card class="info-card" title="🎰 抽奖信息">
      <n-space vertical size="medium">
        <div class="info-item">
          <span class="label">剩余抽奖次数</span>
          <n-tag :type="remainingChances > 0 ? 'success' : 'error'" size="large">
            {{ remainingChances }} 次
          </n-tag>
        </div>
        
        <div class="info-item">
          <span class="label">今日已抽奖</span>
          <n-tag type="info" size="large">
            {{ totalSpins }} 次
          </n-tag>
        </div>
        
        <n-divider />
        
        <div class="prize-rates">
          <h4>🎁 中奖概率</h4>
          <div class="rates-list">
            <div 
              v-for="prize in sortedPrizes" 
              :key="prize.id"
              class="rate-item"
              :class="{ highlight: prize.type === 'points' && prize.value >= 1000 }"
            >
              <span class="prize-info">
                <span class="prize-icon">{{ prize.icon }}</span>
                <span class="prize-name">{{ prize.name }}</span>
              </span>
              <span class="probability" :style="{ color: getProbabilityColor(prize.probability) }">
                {{ prize.probability }}%
              </span>
            </div>
          </div>
        </div>
        
        <n-divider />
        
        <div class="rules">
          <h4>📋 抽奖规则</h4>
          <ul class="rules-list">
            <li>每日免费抽奖次数：3次</li>
            <li>抽中"再来一次"不消耗次数</li>
            <li>积分直接加入账户余额</li>
            <li>抽奖次数每日0点重置</li>
          </ul>
        </div>
      </n-space>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NCard, NSpace, NTag, NDivider } from 'naive-ui'
import type { LotteryPrize } from '@/types/lottery'

const props = defineProps<{
  remainingChances: number
  totalSpins: number
  prizes: LotteryPrize[]
}>()

const sortedPrizes = computed(() => {
  return [...props.prizes].sort((a, b) => b.probability - a.probability)
})

const getProbabilityColor = (probability: number): string => {
  if (probability >= 30) return '#52c41a'  // 绿色 - 高概率
  if (probability >= 10) return '#faad14'  // 橙色 - 中概率
  if (probability >= 1) return '#ff7875'   // 红色 - 低概率
  return '#722ed1'  // 紫色 - 极低概率
}
</script>

<style scoped>
.lottery-info-panel {
  width: 100%;
  max-width: 400px;
}

.info-card {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8));
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.label {
  font-weight: 600;
  color: #333;
}

.prize-rates h4,
.rules h4 {
  margin: 0 0 12px 0;
  color: #333;
  font-weight: 700;
}

.rates-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.rate-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.rate-item:hover {
  background: rgba(255, 255, 255, 0.8);
  transform: translateX(4px);
}

.rate-item.highlight {
  background: linear-gradient(90deg, rgba(255, 215, 0, 0.2), rgba(255, 165, 0, 0.2));
  border: 1px solid rgba(255, 215, 0, 0.4);
}

.prize-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.prize-icon {
  font-size: 16px;
}

.prize-name {
  font-weight: 600;
  color: #333;
}

.probability {
  font-weight: 700;
  font-size: 14px;
}

.rules-list {
  margin: 0;
  padding-left: 16px;
  color: #666;
}

.rules-list li {
  margin-bottom: 4px;
  line-height: 1.5;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .lottery-info-panel {
    max-width: 100%;
  }
  
  .info-card {
    margin: 0 16px;
  }
  
  .rate-item {
    padding: 6px 10px;
  }
  
  .prize-name {
    font-size: 13px;
  }
  
  .probability {
    font-size: 13px;
  }
}
</style>
