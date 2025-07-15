<template>
  <div class="lottery-wheel-container">
    <div class="wheel-wrapper">
      <!-- 外圈装饰 -->
      <div class="wheel-decoration">
        <div 
          v-for="i in 24" 
          :key="i" 
          class="decoration-dot"
          :style="{ transform: `rotate(${i * 15}deg) translateY(-120px)` }"
        ></div>
      </div>
      
      <!-- 转盘主体 -->
      <div 
        class="lottery-wheel"
        :style="{ transform: `rotate(${rotation}deg)` }"
        :class="{ spinning: isSpinning }"
      >
        <div 
          v-for="(prize, index) in prizes" 
          :key="prize.id"
          class="wheel-sector"
          :style="{ 
            transform: `rotate(${index * 45}deg)`,
            background: `conic-gradient(from 0deg, ${prize.color}, ${adjustBrightness(prize.color, 0.8)})`
          }"
        >
          <div class="sector-content">
            <div class="prize-icon">{{ prize.icon }}</div>
            <div class="prize-name">{{ prize.name }}</div>
          </div>
        </div>
      </div>
      
      <!-- 指针 -->
      <div class="wheel-pointer">
        <div class="pointer-arrow"></div>
      </div>
      
      <!-- 中心按钮 -->
      <div class="center-button" @click="spin" :class="{ disabled: !canSpin || isSpinning }">
        <div class="button-content">
          <div v-if="isSpinning" class="spinning-text">
            <n-icon size="24"><Refresh /></n-icon>
            <span>抽奖中...</span>
          </div>
          <div v-else class="ready-text">
            <n-icon size="28"><Gift /></n-icon>
            <span>开始抽奖</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 中奖结果弹窗 -->
    <n-modal v-model:show="showResult" class="result-modal">
      <n-card
        style="width: 400px"
        title="🎉 恭喜中奖！"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
        class="result-card"
      >
        <div class="result-content">
          <div class="result-icon">{{ currentResult?.prize.icon }}</div>
          <div class="result-name">{{ currentResult?.prize.name }}</div>
          <div v-if="currentResult?.prize.type === 'points'" class="result-points">
            +{{ currentResult?.prize.value }} 积分
          </div>
          <div v-else-if="currentResult?.prize.type === 'retry'" class="result-retry">
            可以再抽一次！
          </div>
        </div>
        <template #footer>
          <div class="result-footer">
            <n-button type="primary" @click="closeResult" size="large" block>
              确定
            </n-button>
          </div>
        </template>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NModal, NCard, NButton, NIcon } from 'naive-ui'
import { Gift, Refresh } from '@vicons/tabler'
import type { LotteryPrize, LotteryResult } from '@/types/lottery'

const props = defineProps<{
  prizes: LotteryPrize[]
  isSpinning: boolean
  canSpin: boolean
}>()

const emit = defineEmits<{
  spin: []
  result: [result: LotteryResult]
}>()

const rotation = ref(0)
const showResult = ref(false)
const currentResult = ref<LotteryResult | null>(null)

const spin = () => {
  if (!props.canSpin || props.isSpinning) return
  
  // 随机选择奖品
  const result = selectPrize()
  
  // 计算旋转角度
  const prizeAngle = result.prize.id * 45 // 每个扇形45度
  const randomOffset = Math.random() * 40 - 20 // 随机偏移
  const spins = 5 + Math.random() * 3 // 5-8圈
  const finalAngle = 360 * spins + (360 - prizeAngle) + randomOffset
  
  rotation.value += finalAngle
  
  // 发送抽奖事件
  emit('spin')
  
  // 3秒后显示结果
  setTimeout(() => {
    currentResult.value = {
      ...result,
      angle: finalAngle
    }
    showResult.value = true
    emit('result', currentResult.value)
  }, 3000)
}

const selectPrize = (): { prize: LotteryPrize; isWin: boolean } => {
  const random = Math.random() * 100
  let cumulative = 0
  
  for (const prize of props.prizes) {
    cumulative += prize.probability
    if (random <= cumulative) {
      return {
        prize,
        isWin: prize.type !== 'thanks'
      }
    }
  }
  
  // 兜底返回谢谢惠顾
  return {
    prize: props.prizes.find(p => p.type === 'thanks') || props.prizes[0],
    isWin: false
  }
}

const adjustBrightness = (color: string, factor: number): string => {
  const hex = color.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  
  return `rgb(${Math.floor(r * factor)}, ${Math.floor(g * factor)}, ${Math.floor(b * factor)})`
}

const closeResult = () => {
  showResult.value = false
  currentResult.value = null
}
</script>

<style scoped>
.lottery-wheel-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.wheel-wrapper {
  position: relative;
  width: 320px;
  height: 320px;
}

.wheel-decoration {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 280px;
  height: 280px;
  transform: translate(-50%, -50%);
  z-index: 0;
}

.decoration-dot {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  background: linear-gradient(45deg, #ffd700, #ffed4e);
  border-radius: 50%;
  transform-origin: center 140px;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.6);
  animation: twinkle 2s infinite alternate;
}

@keyframes twinkle {
  0% { opacity: 0.5; transform: scale(0.8); }
  100% { opacity: 1; transform: scale(1.2); }
}

.lottery-wheel {
  position: relative;
  width: 280px;
  height: 280px;
  border-radius: 50%;
  overflow: hidden;
  transition: transform 3s cubic-bezier(0.23, 1, 0.32, 1);
  border: 4px solid #ffd700;
  box-shadow: 
    0 0 20px rgba(255, 215, 0, 0.5),
    inset 0 0 20px rgba(255, 255, 255, 0.1);
}

.lottery-wheel.spinning {
  transition: transform 3s cubic-bezier(0.23, 1, 0.32, 1);
}

.wheel-sector {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50%;
  height: 50%;
  transform-origin: 0 0;
  clip-path: polygon(0 0, 0 100%, 100% 50%);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.sector-content {
  position: absolute;
  top: 15%;
  left: 25%;
  transform: rotate(-22.5deg);
  text-align: center;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.prize-icon {
  font-size: 20px;
  margin-bottom: 2px;
}

.prize-name {
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
}

.wheel-pointer {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

.pointer-arrow {
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-top: 30px solid #ff4757;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.center-button {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80px;
  height: 80px;
  transform: translate(-50%, -50%);
  background: linear-gradient(145deg, #ff6b6b, #ff5252);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
  transition: all 0.3s ease;
  box-shadow: 
    0 4px 15px rgba(255, 107, 107, 0.4),
    inset 0 2px 4px rgba(255, 255, 255, 0.2);
}

.center-button:hover:not(.disabled) {
  transform: translate(-50%, -50%) scale(1.05);
  box-shadow: 
    0 6px 20px rgba(255, 107, 107, 0.6),
    inset 0 2px 4px rgba(255, 255, 255, 0.3);
}

.center-button.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.button-content {
  text-align: center;
  color: white;
  font-weight: 600;
}

.spinning-text,
.ready-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.spinning-text span,
.ready-text span {
  font-size: 10px;
}

.spinning-text .n-icon {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.result-modal .result-card {
  background: linear-gradient(145deg, #667eea, #764ba2);
  color: white;
  text-align: center;
}

.result-content {
  padding: 2rem 0;
}

.result-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.result-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.result-points {
  font-size: 1.2rem;
  color: #ffd700;
  font-weight: 600;
}

.result-retry {
  font-size: 1.1rem;
  color: #4ecdc4;
  font-weight: 600;
}

.result-footer {
  padding-top: 1rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .wheel-wrapper {
    width: 280px;
    height: 280px;
  }
  
  .lottery-wheel {
    width: 240px;
    height: 240px;
  }
  
  .wheel-decoration {
    width: 240px;
    height: 240px;
  }
  
  .decoration-dot {
    width: 6px;
    height: 6px;
    transform-origin: center 120px;
  }
  
  .center-button {
    width: 70px;
    height: 70px;
  }
  
  .result-modal .n-card {
    width: 350px !important;
    margin: 1rem;
  }
}
</style>
