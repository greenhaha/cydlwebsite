<template>
  <div class="anniversary-preheating-page z-[0]">
    <!-- 动态背景 -->
    <div class="dynamic-background fixed inset-0 w-full h-full ">
      <div class="background-layer bg-layer-1"></div>
      <div class="background-layer bg-layer-2"></div>
      <div class="background-layer bg-layer-3"></div>
      <div class="background-stars"></div>
    </div>
    
    <!-- 背景遮罩 -->
    <div class="background-overlay fixed inset-0 z-1"></div>

    <!-- 主内容区域 -->
    <div class="anniversary-content relative z-10 min-h-screen flex flex-col items-center justify-start py-8 px-4">
      <!-- 英雄区域 -->
      <div class="hero-section w-full max-w-6xl mx-auto text-center pt-20 pb-12">
        <!-- 科技感标题 -->
        <div class="hero-title-wrapper mb-12">
          <div class="glitch-container mb-6">
            <n-h1 class="glitch-text text-center !text-[48px] md:!text-[64px] font-bold text-white mb-6 text-shadow-lg" style="color: #ffffff !important; text-align: center !important; text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.9), 0 0 25px rgba(255, 255, 255, 0.4) !important;">
              CS2 黄粱一梦社区服
            </n-h1>
            <n-h2 class="anniversary-subtitle text-center !text-[32px] md:!text-[42px] font-bold mb-6 text-shadow-lg tech-gradient-text" style="text-align: center !important; display: block !important; width: 100% !important; margin: 0 auto !important;">
              一周年庆典预热
            </n-h2>
          </div>
          <div class="hero-subtitle-wrapper">
            <n-h5 class="hero-subtitle text-center text-lg md:text-xl text-white/95 max-w-4xl mx-auto text-shadow leading-relaxed" style="color: rgba(255, 255, 255, 0.98) !important; text-align: center !important; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9) !important; display: block !important; width: 100% !important; margin: 0 auto !important;">
              感谢每一位玩家的支持，一年来我们共同见证了社区的成长！
            </n-h5>
          </div>
        </div>
        
        <!-- 科技感装饰线 -->
        <div class="tech-divider relative flex items-center justify-center mb-16 w-full max-w-lg mx-auto">
          <div class="tech-line h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent w-full"></div>
          <div class="tech-dot absolute w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      <!-- 倒计时区域 -->
      <div class="countdown-section w-full max-w-4xl mx-auto mb-16">
        <div class="countdown-title mb-12 text-center">
          <n-h3 class="text-2xl md:text-3xl font-bold text-white mb-6" style="color: #ffffff !important; text-align: center !important; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9), 0 0 15px rgba(255, 255, 255, 0.3) !important;">
            距离周年庆开启还有
          </n-h3>
          <div class="countdown-subtitle text-blue-300 text-base md:text-lg mb-8" style="color: #93c5fd !important; text-align: center !important; text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.9) !important;">
            {{ celebrationDate }}
          </div>
        </div>
        
        <!-- 倒计时显示 -->
        <div class="countdown-display grid grid-cols-4 gap-4 md:gap-6 max-w-lg mx-auto">
          <div class="countdown-item countdown-days">
            <div class="countdown-number bg-gradient-to-b from-blue-500 to-blue-700 text-white rounded-xl p-4 md:p-6 text-center shadow-lg">
              <div class="countdown-value text-2xl md:text-3xl font-bold mb-1">{{ countdown.days }}</div>
              <div class="text-xs md:text-sm text-blue-100">天</div>
            </div>
          </div>
          <div class="countdown-item countdown-hours">
            <div class="countdown-number bg-gradient-to-b from-purple-500 to-purple-700 text-white rounded-xl p-4 md:p-6 text-center shadow-lg">
              <div class="countdown-value text-2xl md:text-3xl font-bold mb-1">{{ countdown.hours }}</div>
              <div class="text-xs md:text-sm text-purple-100">时</div>
            </div>
          </div>
          <div class="countdown-item countdown-minutes">
            <div class="countdown-number bg-gradient-to-b from-green-500 to-green-700 text-white rounded-xl p-4 md:p-6 text-center shadow-lg">
              <div class="countdown-value text-2xl md:text-3xl font-bold mb-1">{{ countdown.minutes }}</div>
              <div class="text-xs md:text-sm text-green-100">分</div>
            </div>
          </div>
          <div class="countdown-item countdown-seconds">
            <div class="countdown-number bg-gradient-to-b from-orange-500 to-orange-700 text-white rounded-xl p-4 md:p-6 text-center shadow-lg">
              <div class="countdown-value text-2xl md:text-3xl font-bold mb-1">{{ countdown.seconds }}</div>
              <div class="text-xs md:text-sm text-orange-100">秒</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 活动预告区域 -->
      <div class="preview-section w-full max-w-6xl mx-auto mb-16">
        <div class="section-header text-center mb-12">
          <n-h3 class="text-2xl md:text-3xl font-bold text-white mb-6" style="color: #ffffff !important; text-align: center !important; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9), 0 0 15px rgba(255, 255, 255, 0.3) !important;">
            活动预告
          </n-h3>
          <div class="section-subtitle text-white/70 text-sm md:text-base max-w-2xl mx-auto mb-4" style="color: rgba(255, 255, 255, 0.9) !important; text-align: center !important; text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.9) !important; display: block !important; width: 100% !important; margin: 0 auto !important;">
            精彩活动即将开始，敬请期待！
          </div>
        </div>
        
        <!-- 预告卡片 -->
        <n-grid cols="1 s:2 m:2 l:4" x-gap="20" y-gap="20" responsive="screen">
          <n-grid-item v-for="(preview, index) in previews" :key="index">
            <n-card class="preview-card h-full backdrop-blur-lg bg-black/30 border border-blue-500/30 hover:bg-black/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-blue-400/60" hoverable>
              <template #header>
                <div class="preview-header flex items-center gap-3 min-h-[50px] p-2">
                  <div class="preview-icon-wrapper p-2 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 shadow-lg">
                    <component :is="preview.icon" class="w-[20px] h-[20px] text-white" />
                  </div>
                  <span class="preview-title text-white font-semibold text-sm">{{ preview.title }}</span>
                </div>
              </template>
              <div class="preview-content text-white/80 text-xs md:text-sm leading-relaxed p-2">
                {{ preview.description }}
              </div>
              <template #footer>
                <div class="preview-footer flex items-center justify-between p-2">
                  <span class="preview-date text-blue-300 text-xs">{{ preview.date }}</span>
                  <div class="preview-status">
                    <n-tag :type="preview.status === 'coming' ? 'warning' : 'success'" size="small">
                      {{ preview.status === 'coming' ? '即将开始' : '准备中' }}
                    </n-tag>
                  </div>
                </div>
              </template>
            </n-card>
          </n-grid-item>
        </n-grid>
      </div>

      <!-- 行动按钮 -->
      <div class="action-section w-full max-w-2xl mx-auto flex flex-col sm:flex-row gap-4 justify-center">
        <n-button 
          type="primary" 
          size="large" 
          class="action-button flex-1 sm:flex-none"
          @click="$router.push('/anniversary')"
        >
          <template #icon>
            <n-icon>
              <CalendarIcon />
            </n-icon>
          </template>
          查看周年庆详情
        </n-button>
        
        <n-button 
          type="default" 
          size="large" 
          class="action-button flex-1 sm:flex-none"
          @click="$router.push('/registration')"
        >
          <template #icon>
            <n-icon>
              <UserIcon />
            </n-icon>
          </template>
          立即参与活动
        </n-button>
      </div>
    </div>

    <!-- 科技感粒子效果 -->
    <div class="particles-container fixed inset-0 pointer-events-none z-0">
      <div 
        v-for="particle in particles" 
        :key="particle.id"
        class="particle absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
        :style="{ 
          left: particle.x + '%', 
          top: particle.y + '%',
          animationDelay: particle.delay + 's',
          animationDuration: particle.duration + 's'
        }"
      ></div>
    </div>

    <!-- 网格背景效果 -->
    <div class="grid-background fixed inset-0 pointer-events-none z-0">
      <div class="grid-lines"></div>
    </div>

    <!-- 光晕效果 -->
    <div class="glow-effects fixed inset-0 pointer-events-none z-0">
      <div class="glow-orb glow-orb-1"></div>
      <div class="glow-orb glow-orb-2"></div>
      <div class="glow-orb glow-orb-3"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  Calendar as CalendarIcon,
  Gift as GiftIcon,
  Trophy as TrophyIcon,
  People as UsersIcon,
  Person as UserIcon,
  Star as StarIcon
} from '@vicons/ionicons5'
import { NButton, NCard, NGrid, NGridItem, NH1, NH2, NH3, NH5, NIcon, NTag } from 'naive-ui'
import { onMounted, onUnmounted, ref } from 'vue'

// 倒计时状态
const countdown = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
})

// 周年庆日期（可根据实际情况调整）
const celebrationDate = '2025年7月15日 20:00'
const targetDate = new Date('2025-07-15T20:00:00')

// 粒子效果
const particles = ref<Array<{
  id: number
  x: number
  y: number
  delay: number
  duration: number
}>>([])

// 活动预告数据
const previews = ref([
  {
    title: '限时武器皮肤',
    description: '专属周年庆武器皮肤免费领取，独特的纪念意义，错过不再有！',
    date: '7月15日',
    status: 'coming',
    icon: StarIcon
  },
  {
    title: '社区竞技赛',
    description: '举办周年庆专属竞技比赛，丰厚奖品等你来拿，展现你的实力！',
    date: '7月16日',
    status: 'preparing',
    icon: TrophyIcon
  },
  {
    title: '玩家聚会',
    description: '线上玩家聚会活动，与社区成员互动交流，分享游戏心得！',
    date: '7月17日',
    status: 'preparing',
    icon: UsersIcon
  },
  {
    title: '周年纪念品',
    description: '限量周年纪念品发放，见证社区一年来的成长历程！',
    date: '7月18日',
    status: 'preparing',
    icon: GiftIcon
  }
])

// 更新倒计时
const updateCountdown = () => {
  const now = new Date().getTime()
  const distance = targetDate.getTime() - now

  if (distance > 0) {
    const newCountdown = {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000)
    }
    
    // 检查是否有数字变化，添加跳动动画
    if (newCountdown.seconds !== countdown.value.seconds) {
      triggerNumberAnimation('seconds')
    }
    if (newCountdown.minutes !== countdown.value.minutes) {
      triggerNumberAnimation('minutes')
    }
    if (newCountdown.hours !== countdown.value.hours) {
      triggerNumberAnimation('hours')
    }
    if (newCountdown.days !== countdown.value.days) {
      triggerNumberAnimation('days')
    }
    
    countdown.value = newCountdown
  } else {
    countdown.value = { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }
}

// 触发数字跳动动画
const triggerNumberAnimation = (type: string) => {
  const element = document.querySelector(`.countdown-${type} .countdown-value`)
  if (element) {
    element.classList.add('animate')
    setTimeout(() => {
      element.classList.remove('animate')
    }, 500)
  }
}

// 初始化粒子效果
const initParticles = () => {
  particles.value = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4
  }))
}

let countdownInterval: number

onMounted(() => {
  updateCountdown()
  countdownInterval = setInterval(updateCountdown, 1000) as unknown as number
  initParticles()
})

onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval)
  }
})
</script>

<style scoped>
.anniversary-preheating-page {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
}

/* 动态背景 */
.dynamic-background {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #1e293b 75%, #0f172a 100%);
  background-size: 400% 400%;
  animation: gradient-animation 15s ease infinite;
}

@keyframes gradient-animation {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.background-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.6;
}

.bg-layer-1 {
  background: radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%);
  animation: float-1 8s ease-in-out infinite;
}

.bg-layer-2 {
  background: radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.3) 0%, transparent 50%);
  animation: float-2 12s ease-in-out infinite;
}

.bg-layer-3 {
  background: radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.2) 0%, transparent 60%);
  animation: float-3 10s ease-in-out infinite;
}

@keyframes float-1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(20px, -20px) scale(1.1); }
}

@keyframes float-2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-20px, 20px) scale(1.1); }
}

@keyframes float-3 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(10px, -10px) scale(1.05); }
}

.background-stars {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(2px 2px at 20px 30px, rgba(255, 255, 255, 0.8), transparent),
    radial-gradient(2px 2px at 40px 70px, rgba(255, 255, 255, 0.6), transparent),
    radial-gradient(1px 1px at 90px 40px, rgba(255, 255, 255, 0.9), transparent),
    radial-gradient(1px 1px at 130px 80px, rgba(255, 255, 255, 0.7), transparent),
    radial-gradient(2px 2px at 160px 30px, rgba(255, 255, 255, 0.8), transparent);
  background-repeat: repeat;
  background-size: 200px 100px;
  animation: twinkle 20s linear infinite;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
}

.background-overlay {
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(1px);
}

.anniversary-content {
  position: relative;
  z-index: 10;
}

/* 英雄区域样式 */
.hero-section {
  padding: 2rem 1rem;
  text-align: center;
}

.hero-title-wrapper {
  margin-bottom: 3rem;
  text-align: center;
}

.glitch-container {
  margin-bottom: 2rem;
  text-align: center;
}

.hero-subtitle-wrapper {
  margin-top: 1.5rem;
  text-align: center;
}

/* 标题文字增强 */
.glitch-text {
  color: #ffffff !important;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.9), 0 0 25px rgba(255, 255, 255, 0.4) !important;
  display: block;
  width: 100%;
  text-align: center !important;
}

.anniversary-subtitle {
  text-align: center !important;
  display: block !important;
  width: 100% !important;
  margin: 0 auto !important;
  position: relative;
}

.tech-gradient-text {
  background: linear-gradient(
    45deg,
    #ff6b6b 0%,
    #4ecdc4 12.5%,
    #45b7d1 25%,
    #96ceb4 37.5%,
    #feca57 50%,
    #ff9ff3 62.5%,
    #54a0ff 75%,
    #5f27cd 87.5%,
    #ff6b6b 100%
  );
  background-size: 800% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: tech-gradient-animation 4s ease-in-out infinite;
  position: relative;
  text-shadow: none !important;
}

@keyframes tech-gradient-animation {
  0% {
    background-position: 0% 50%;
  }
  25% {
    background-position: 100% 50%;
  }
  50% {
    background-position: 200% 50%;
  }
  75% {
    background-position: 300% 50%;
  }
  100% {
    background-position: 400% 50%;
  }
}

.tech-gradient-text::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    rgba(255, 107, 107, 0.3) 0%,
    rgba(78, 205, 196, 0.3) 12.5%,
    rgba(69, 183, 209, 0.3) 25%,
    rgba(150, 206, 180, 0.3) 37.5%,
    rgba(254, 202, 87, 0.3) 50%,
    rgba(255, 159, 243, 0.3) 62.5%,
    rgba(84, 160, 255, 0.3) 75%,
    rgba(95, 39, 205, 0.3) 87.5%,
    rgba(255, 107, 107, 0.3) 100%
  );
  background-size: 800% 100%;
  animation: tech-gradient-animation 4s ease-in-out infinite;
  filter: blur(15px);
  opacity: 0.6;
  z-index: -1;
  border-radius: 8px;
}

.tech-gradient-text::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 45%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.1) 55%,
    transparent 100%
  );
  animation: tech-shimmer 3s ease-in-out infinite;
  z-index: 1;
  pointer-events: none;
}

@keyframes tech-shimmer {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  50% {
    transform: translateX(0%);
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}

.hero-subtitle {
  color: rgba(255, 255, 255, 0.98) !important;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9) !important;
  text-align: center !important;
  display: block !important;
  width: 100% !important;
  margin: 0 auto !important;
}

/* 区域标题增强 */
.countdown-title {
  text-align: center !important;
  display: block !important;
  width: 100% !important;
  margin: 0 auto !important;
}

.countdown-title h3 {
  color: #ffffff !important;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9), 0 0 15px rgba(255, 255, 255, 0.3) !important;
  text-align: center !important;
  display: block !important;
  width: 100% !important;
  margin: 0 auto !important;
}

.countdown-subtitle {
  color: #93c5fd !important;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.9) !important;
  text-align: center !important;
  display: block !important;
  width: 100% !important;
  margin: 0 auto !important;
}

.section-header {
  text-align: center !important;
  display: block !important;
  width: 100% !important;
  margin: 0 auto !important;
}

.section-header h3 {
  color: #ffffff !important;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9), 0 0 15px rgba(255, 255, 255, 0.3) !important;
  text-align: center !important;
  display: block !important;
  width: 100% !important;
  margin: 0 auto !important;
}

.section-subtitle {
  color: rgba(255, 255, 255, 0.9) !important;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.9) !important;
  text-align: center !important;
  display: block !important;
  width: 100% !important;
  margin: 0 auto !important;
}

/* 区域间距 */
.countdown-section {
  padding: 2rem 1rem;
  margin-bottom: 3rem;
}

.preview-section {
  padding: 2rem 1rem;
  margin-bottom: 3rem;
}

.action-section {
  padding: 2rem 1rem;
  margin-bottom: 2rem;
}

.section-header {
  margin-bottom: 3rem;
}

.section-header h3 {
  margin-bottom: 1.5rem !important;
}

.section-subtitle {
  margin-top: 1rem;
  margin-bottom: 1rem !important;
}

/* 倒计时区域优化 */
.countdown-title {
  margin-bottom: 3rem;
}

.countdown-title h3 {
  margin-bottom: 1.5rem !important;
}

.countdown-subtitle {
  margin-bottom: 2rem !important;
}

.countdown-display {
  margin: 0 auto;
  max-width: 28rem;
}

@media (min-width: 768px) {
  .countdown-display {
    max-width: 32rem;
  }
}

/* 预告卡片优化 */
.preview-card {
  min-height: 200px;
  display: flex;
  flex-direction: column;
}

.preview-header {
  padding: 1rem;
  border-bottom: 1px solid rgba(59, 130, 246, 0.1);
}

.preview-content {
  flex: 1;
  padding: 1rem;
}

.preview-footer {
  padding: 1rem;
  border-top: 1px solid rgba(59, 130, 246, 0.1);
}

/* 按钮区域优化 */
.action-button {
  min-width: 180px;
  height: 48px;
  font-size: 16px;
  font-weight: 600;
}
.glitch-container {
  position: relative;
  text-align: center;
}

.glitch-text {
  position: relative;
  animation: glitch 2s infinite;
  color: #ffffff !important;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 255, 255, 0.3) !important;
  text-align: center !important;
  display: block;
  width: 100%;
}

.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  text-align: center;
}

.glitch-text::before {
  animation: glitch-1 0.5s infinite;
  color: rgba(255, 0, 0, 0.3);
  z-index: -1;
  left: 2px;
}

.glitch-text::after {
  animation: glitch-2 0.5s infinite;
  color: rgba(0, 255, 0, 0.3);
  z-index: -2;
  left: -2px;
}

@keyframes glitch {
  0%, 100% { transform: translateX(0); }
  10% { transform: translateX(-2px); }
  20% { transform: translateX(2px); }
  30% { transform: translateX(-2px); }
  40% { transform: translateX(2px); }
  50% { transform: translateX(-2px); }
  60% { transform: translateX(2px); }
  70% { transform: translateX(-2px); }
  80% { transform: translateX(2px); }
  90% { transform: translateX(-2px); }
}

@keyframes glitch-1 {
  0% { transform: translateX(0); }
  10% { transform: translateX(-2px); }
  20% { transform: translateX(2px); }
  30% { transform: translateX(-2px); }
  40% { transform: translateX(2px); }
  50% { transform: translateX(-2px); }
  60% { transform: translateX(2px); }
  70% { transform: translateX(-2px); }
  80% { transform: translateX(2px); }
  90% { transform: translateX(-2px); }
  100% { transform: translateX(0); }
}

@keyframes glitch-2 {
  0% { transform: translateX(0); }
  10% { transform: translateX(2px); }
  20% { transform: translateX(-2px); }
  30% { transform: translateX(2px); }
  40% { transform: translateX(-2px); }
  50% { transform: translateX(2px); }
  60% { transform: translateX(-2px); }
  70% { transform: translateX(2px); }
  80% { transform: translateX(-2px); }
  90% { transform: translateX(2px); }
  100% { transform: translateX(0); }
}

/* 科技感装饰线 */
.tech-divider {
  position: relative;
  margin: 2rem auto;
}

.tech-line {
  position: relative;
  overflow: hidden;
  height: 2px;
}

.tech-line::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.8), transparent);
  animation: scan 2s infinite;
}

@keyframes scan {
  0% { left: -100%; }
  100% { left: 100%; }
}

.tech-dot {
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.4);
  animation: dot-pulse 2s ease-in-out infinite;
}

@keyframes dot-pulse {
  0%, 100% { 
    transform: scale(1);
    box-shadow: 0 0 15px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.4);
  }
  50% { 
    transform: scale(1.2);
    box-shadow: 0 0 20px rgba(59, 130, 246, 1), 0 0 40px rgba(59, 130, 246, 0.6);
  }
}

/* 倒计时样式 */
.countdown-display {
  animation: float 3s ease-in-out infinite;
  position: relative;
  gap: 1rem;
}

@media (min-width: 768px) {
  .countdown-display {
    gap: 1.5rem;
  }
}

.countdown-display::before {
  content: '';
  position: absolute;
  top: -15px;
  left: -15px;
  right: -15px;
  bottom: -15px;
  background: linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1));
  border-radius: 20px;
  z-index: -1;
  animation: pulse-glow 2s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% { 
    transform: scale(1);
    opacity: 0.5;
  }
  50% { 
    transform: scale(1.02);
    opacity: 0.8;
  }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
}

.countdown-item {
  position: relative;
}

.countdown-number {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.countdown-number:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
}

.countdown-number::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  animation: shine 3s infinite;
}

.countdown-number::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent);
  pointer-events: none;
}

.countdown-value {
  position: relative;
  z-index: 1;
}

@keyframes shine {
  0% { left: -100%; }
  100% { left: 100%; }
}

/* 倒计时数字跳动动画 */
.countdown-value {
  transition: all 0.3s ease;
}

.countdown-value.animate {
  animation: number-bounce 0.5s ease-in-out;
}

@keyframes number-bounce {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

/* 预告卡片样式 */
.preview-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.preview-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(59, 130, 246, 0.2);
  border-color: rgba(59, 130, 246, 0.6);
}

.preview-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
  transition: left 0.5s ease;
}

.preview-card:hover::before {
  left: 100%;
}

.preview-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.05), transparent);
  pointer-events: none;
}

.preview-icon-wrapper {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.preview-icon-wrapper:hover {
  transform: scale(1.1);
}

.preview-icon-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: icon-shine 2s infinite;
}

.preview-icon-wrapper::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(255, 255, 255, 0.1), transparent);
  pointer-events: none;
}

@keyframes icon-shine {
  0% { left: -100%; }
  100% { left: 100%; }
}

/* 行动按钮样式 */
.action-button {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  border-radius: 8px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(147, 51, 234, 0.8));
  border: none;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
}

.action-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.3s ease;
}

.action-button:hover::before {
  left: 100%;
}

.action-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.4);
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(147, 51, 234, 0.9));
}

.action-button:active {
  transform: translateY(-1px);
  box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);
}

/* 粒子效果 */
.particles-container {
  pointer-events: none;
  overflow: hidden;
}

.particle {
  opacity: 0.6;
  animation: particle-float 6s infinite ease-in-out;
  border-radius: 50%;
  box-shadow: 0 0 6px rgba(59, 130, 246, 0.8);
}

@keyframes particle-float {
  0%, 100% { 
    transform: translateY(0px) translateX(0px) rotate(0deg);
    opacity: 0.6;
    filter: blur(0px);
  }
  25% {
    transform: translateY(-10px) translateX(5px) rotate(90deg);
    opacity: 0.8;
    filter: blur(1px);
  }
  50% { 
    transform: translateY(-20px) translateX(10px) rotate(180deg);
    opacity: 1;
    filter: blur(0px);
  }
  75% {
    transform: translateY(-15px) translateX(-5px) rotate(270deg);
    opacity: 0.8;
    filter: blur(1px);
  }
}

/* 添加更多粒子变化 */
.particle:nth-child(2n) {
  animation-delay: 0.5s;
  animation-duration: 8s;
}

.particle:nth-child(3n) {
  animation-delay: 1s;
  animation-duration: 10s;
}

.particle:nth-child(4n) {
  animation-delay: 1.5s;
  animation-duration: 12s;
}

.particle:nth-child(5n) {
  box-shadow: 0 0 8px rgba(147, 51, 234, 0.8);
}

.particle:nth-child(6n) {
  box-shadow: 0 0 10px rgba(6, 182, 212, 0.8);
}

/* 网格背景效果 */
.grid-background {
  opacity: 0.1;
}

.grid-lines {
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: grid-move 20s linear infinite;
}

@keyframes grid-move {
  0% { transform: translate(0, 0); }
  100% { transform: translate(50px, 50px); }
}

/* 光晕效果 */
.glow-effects {
  overflow: hidden;
  z-index: 1;
}

.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.4;
  animation: float-glow 12s ease-in-out infinite;
}

.glow-orb-1 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent);
  top: 5%;
  left: 5%;
  animation-delay: 0s;
}

.glow-orb-2 {
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(147, 51, 234, 0.3), transparent);
  top: 70%;
  right: 5%;
  animation-delay: 3s;
}

.glow-orb-3 {
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, rgba(6, 182, 212, 0.3), transparent);
  bottom: 10%;
  left: 60%;
  animation-delay: 6s;
}

@keyframes float-glow {
  0%, 100% { 
    transform: translateY(0px) translateX(0px) scale(1);
    opacity: 0.4;
  }
  25% {
    transform: translateY(-30px) translateX(15px) scale(1.1);
    opacity: 0.6;
  }
  50% { 
    transform: translateY(-60px) translateX(30px) scale(1.2);
    opacity: 0.8;
  }
  75% {
    transform: translateY(-30px) translateX(15px) scale(1.1);
    opacity: 0.6;
  }
}

/* 响应式设计 */
@media (max-width: 640px) {
  .hero-section {
    padding-top: 1rem;
    padding-bottom: 1.5rem;
  }
  
  .hero-title-wrapper {
    margin-bottom: 2rem;
  }
  
  .glitch-container {
    margin-bottom: 1.5rem;
  }
  
  .tech-divider {
    margin-bottom: 2rem;
  }
  
  .countdown-section {
    padding: 1.5rem 1rem;
    margin-bottom: 2rem;
  }
  
  .countdown-title {
    margin-bottom: 2rem;
  }
  
  .countdown-title h3 {
    margin-bottom: 1rem !important;
  }
  
  .countdown-subtitle {
    margin-bottom: 1.5rem !important;
  }
  
  .countdown-display {
    gap: 0.75rem;
    max-width: 20rem;
  }
  
  .countdown-number {
    padding: 0.75rem;
  }
  
  .countdown-value {
    font-size: 1.25rem !important;
  }
  
  .preview-section {
    padding: 1.5rem 1rem;
    margin-bottom: 2rem;
  }
  
  .section-header {
    margin-bottom: 2rem;
  }
  
  .section-header h3 {
    margin-bottom: 1rem !important;
  }
  
  .section-subtitle {
    margin-bottom: 0.75rem !important;
  }
  
  .preview-card {
    min-height: 180px;
  }
  
  .preview-header {
    padding: 0.75rem;
  }
  
  .preview-content {
    padding: 0.75rem;
    font-size: 0.75rem;
  }
  
  .preview-footer {
    padding: 0.75rem;
  }
  
  .action-section {
    padding: 1.5rem 1rem;
    gap: 0.75rem;
  }
  
  .action-button {
    min-width: 160px;
    height: 44px;
    font-size: 14px;
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  .hero-section {
    padding-top: 1.5rem;
    padding-bottom: 2rem;
  }
  
  .countdown-display {
    max-width: 24rem;
  }
  
  .preview-card {
    min-height: 190px;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .hero-section {
    padding-top: 2rem;
    padding-bottom: 2.5rem;
  }
  
  .countdown-display {
    max-width: 28rem;
  }
}

@media (min-width: 1025px) {
  .hero-section {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
  
  .countdown-section {
    margin-bottom: 4rem;
  }
  
  .preview-section {
    margin-bottom: 4rem;
  }
}
</style>
