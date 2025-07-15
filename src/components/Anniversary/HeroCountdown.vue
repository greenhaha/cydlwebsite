<template>
  <div class="hero-countdown">
    <div class="countdown-container bg-white rounded-2xl p-10 shadow-sm border border-gray-100 max-w-2xl mx-auto">
      <div class="text-center mb-8">
        <h3 class="text-2xl font-bold text-gray-900 mb-3">距离周年庆结束还有</h3>
        <p class="text-gray-600">把握最后机会，参与精彩活动！</p>
      </div>
      
      <div class="countdown-display grid grid-cols-4 gap-6 text-center">
        <div class="time-unit">
          <div class="time-value bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl p-5 mb-3">
            <span class="text-3xl font-bold">{{ timeLeft.days }}</span>
          </div>
          <div class="time-label text-gray-600 text-sm font-medium">天</div>
        </div>
        
        <div class="time-unit">
          <div class="time-value bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-xl p-5 mb-3">
            <span class="text-3xl font-bold">{{ timeLeft.hours }}</span>
          </div>
          <div class="time-label text-gray-600 text-sm font-medium">小时</div>
        </div>
        
        <div class="time-unit">
          <div class="time-value bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-xl p-5 mb-3">
            <span class="text-3xl font-bold">{{ timeLeft.minutes }}</span>
          </div>
          <div class="time-label text-gray-600 text-sm font-medium">分钟</div>
        </div>
        
        <div class="time-unit">
          <div class="time-value bg-gradient-to-br from-green-500 to-teal-600 text-white rounded-xl p-5 mb-3">
            <span class="text-3xl font-bold">{{ timeLeft.seconds }}</span>
          </div>
          <div class="time-label text-gray-600 text-sm font-medium">秒</div>
        </div>
      </div>
      
      <div v-if="isExpired" class="mt-8 text-center">
        <div class="inline-flex items-center space-x-2 bg-red-50 rounded-full px-4 py-2 border border-red-200">
          <span class="w-2 h-2 bg-red-500 rounded-full"></span>
          <span class="text-red-700 font-medium text-sm">周年庆已结束</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Props
const props = defineProps<{
  targetDate: string
}>()

// Emits
const emit = defineEmits<{
  expired: []
}>()

// 响应式数据
const currentTime = ref(Date.now())
let timer: number | null = null

// 计算剩余时间
const timeLeft = computed(() => {
  const target = new Date(props.targetDate).getTime()
  const now = currentTime.value
  const difference = target - now

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    }
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((difference % (1000 * 60)) / 1000)

  return {
    days: days.toString().padStart(2, '0'),
    hours: hours.toString().padStart(2, '0'),
    minutes: minutes.toString().padStart(2, '0'),
    seconds: seconds.toString().padStart(2, '0')
  }
})

// 是否已过期
const isExpired = computed(() => {
  const target = new Date(props.targetDate).getTime()
  return currentTime.value >= target
})

// 启动计时器
const startTimer = () => {
  timer = window.setInterval(() => {
    currentTime.value = Date.now()
    
    if (isExpired.value) {
      emit('expired')
      stopTimer()
    }
  }, 1000)
}

// 停止计时器
const stopTimer = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

// 生命周期
onMounted(() => {
  startTimer()
})

onUnmounted(() => {
  stopTimer()
})
</script>

<style scoped>
.hero-countdown {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.time-value {
  transition: all 0.3s ease;
}

.time-value:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* 响应式优化 */
@media (max-width: 768px) {
  .countdown-display {
    gap: 1rem;
  }
  
  .time-value {
    padding: 1rem;
  }
  
  .time-value span {
    font-size: 1.75rem;
  }
  
  .countdown-container {
    padding: 2rem;
  }
  
  .mb-8 {
    margin-bottom: 1.5rem;
  }
  
  .mb-3 {
    margin-bottom: 0.75rem;
  }
  
  .mt-8 {
    margin-top: 1.5rem;
  }
  
  .gap-6 {
    gap: 1rem;
  }
}

@media (max-width: 640px) {
  .countdown-display {
    gap: 0.75rem;
  }
  
  .time-value {
    padding: 0.75rem;
  }
  
  .time-value span {
    font-size: 1.5rem;
  }
  
  .countdown-container {
    padding: 1.5rem;
  }
  
  .mb-8 {
    margin-bottom: 1.25rem;
  }
  
  .gap-6 {
    gap: 0.75rem;
  }
}
</style>