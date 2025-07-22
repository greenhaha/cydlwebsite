<template>
  <div class="preheating-page">
    <!-- 专属背景 -->
    <div class="fixed inset-0 w-full h-full">
      <div class="absolute inset-0 bg-cover bg-center bg-no-repeat"
           style="background-image: url('https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/cs2CTVST.png')">
      </div>
      <div class="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80"></div>
      <!-- 增加纹理遮罩提升对比度 -->
      <div class="absolute inset-0 bg-black/40"></div>
    </div>

    <!-- 主内容区域 -->
    <div class="preheating-content relative z-10 min-h-screen flex flex-col items-center pt-20 pb-16">
      <!-- 顶部导航 -->
      <div class="fixed top-0 left-0 right-0 z-30 bg-black/70 backdrop-blur-lg border-b border-purple-400/30">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div class="flex justify-center">
            <RouterLink
              to="/"
              class="inline-flex items-center px-6 py-3 text-white hover:text-purple-400 transition-all duration-300 rounded-xl hover:bg-purple-500/20 bg-black/40 border border-purple-400/30 backdrop-blur-sm font-medium"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              返回主页
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- 页面标题区域 -->
      <div class="page-header w-full max-w-6xl mx-auto px-6 !mt-8 !mb-12 text-center">
        <!-- 主标题容器 - 增强背景 -->
        <div class="relative bg-black/60 backdrop-blur-xl rounded-3xl border-2 border-purple-400/40 !p-6 shadow-2xl">
          <!-- 装饰性光效 -->
          <div class="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-red-500/10 animate-pulse"></div>

          <div class="relative z-10">
            <!-- 顶部装饰线 -->
            <div class="flex items-center justify-center !mb-5">
              <div class="h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent w-32 rounded-full"></div>
              <div class="mx-4 w-4 h-4 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50"></div>
              <div class="h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent w-32 rounded-full"></div>
            </div>

            <!-- 主标题 -->
            <div class="!mb-5">
              <h1 class="text-3xl md:text-4xl lg:text-5xl font-black text-white !mb-3 tracking-tight leading-tight">
                <span class="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent drop-shadow-2xl">
                  黄粱一梦周年庆预热
                </span>
              </h1>
              <div class="text-shadow-glow text-purple-400 text-base font-medium !mb-2">ANNIVERSARY PRE-HEATING</div>
            </div>

            <!-- 副标题 -->
            <h2 class="text-base md:text-lg lg:text-xl font-bold text-white/95 !mb-5 tracking-wide max-w-3xl mx-auto text-shadow-strong">
              热血沸腾 · 蓄势待发 · 精彩预告
            </h2>

            <!-- 底部装饰线 -->
            <div class="flex items-center justify-center">
              <div class="h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent w-48 rounded-full"></div>
              <div class="mx-4 w-2 h-2 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50"></div>
              <div class="h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent w-48 rounded-full"></div>
            </div>
          </div>
        </div>

        <!-- 描述文字 -->
        <div class="max-w-4xl mx-auto !mt-5">
          <div class="backdrop-blur-xl bg-black/60 rounded-2xl !p-5 border-2 border-white/30 shadow-2xl">
            <p class="text-base md:text-lg text-white font-medium leading-relaxed text-shadow-strong">
              周年庆即将来临，精彩活动蓄势待发！
            </p>
          </div>
        </div>
      </div>

      <!-- 倒计时区域 -->
      <div class="countdown-section w-full max-w-7xl mx-auto px-6 !mb-14">
        <div class="text-center !mb-10">
          <div class="game-section-header">
            <h3 class="game-section-title">周年庆倒计时</h3>
            <div class="game-section-subtitle">COUNTDOWN TIMER</div>
            <p class="game-section-desc">距离盛大开启还有</p>
          </div>
        </div>

        <div class="countdown-display flex justify-center items-center space-x-4 !mb-8">
          <div class="game-countdown-item">
            <div class="countdown-value">{{ countdown.days }}</div>
            <div class="countdown-label">天</div>
            <div class="countdown-label-en">DAYS</div>
          </div>
          <div class="countdown-separator">:</div>
          <div class="game-countdown-item">
            <div class="countdown-value">{{ countdown.hours }}</div>
            <div class="countdown-label">时</div>
            <div class="countdown-label-en">HOURS</div>
          </div>
          <div class="countdown-separator">:</div>
          <div class="game-countdown-item">
            <div class="countdown-value">{{ countdown.minutes }}</div>
            <div class="countdown-label">分</div>
            <div class="countdown-label-en">MINS</div>
          </div>
          <div class="countdown-separator">:</div>
          <div class="game-countdown-item">
            <div class="countdown-value">{{ countdown.seconds }}</div>
            <div class="countdown-label">秒</div>
            <div class="countdown-label-en">SECS</div>
          </div>
        </div>
      </div>

      <!-- 预热活动区域 -->
      <div class="activities-section w-full max-w-6xl mx-auto px-6 !mb-14">
        <div class="text-center !mb-10">
          <div class="game-section-header">
            <h3 class="game-section-title">预热活动</h3>
            <div class="game-section-subtitle">PRE-HEATING ACTIVITIES</div>
            <p class="game-section-desc">参与预热活动，抢先体验精彩内容</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 签到领礼包 -->
          <div class="game-activity-card group gift">
            <div class="activity-badge">ACTIVE</div>
            <div class="text-center !mb-6">
              <div class="activity-icon-container gift">
                <div class="activity-icon">🎁</div>
              </div>
              <h4 class="activity-title">签到领礼包</h4>
              <div class="activity-subtitle">DAILY CHECK-IN</div>
              <p class="activity-description">参与周年庆活动，获得周年庆专属礼包</p>
            </div>
            <div class="activity-progress">
              <div class="flex justify-between items-center !mb-3">
                <span class="progress-label">准备进度</span>
                <span class="progress-percentage gift">100%</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill gift-progress" :style="{ width: '100%' }"></div>
              </div>
              <div class="progress-status complete">活动已就绪</div>
            </div>
          </div>

          <!-- 预热任务 -->
          <div class="game-activity-card group task">
            <div class="activity-badge task-badge">READY</div>
            <div class="text-center !mb-6">
              <div class="activity-icon-container task">
                <div class="activity-icon">⚡</div>
              </div>
              <h4 class="activity-title">预热任务</h4>
              <div class="activity-subtitle">PRE-HEATING MISSIONS</div>
              <p class="activity-description">完成预热任务，解锁周年庆独家内容</p>
            </div>
            <div class="activity-progress">
              <div class="flex justify-between items-center !mb-3">
                <span class="progress-label">解锁进度</span>
                <span class="progress-percentage task">100%</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill task-progress" :style="{ width: '100%' }"></div>
              </div>
              <div class="progress-status complete">任务已开放</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 周年庆奖励物品展示 -->
      <div class="rewards-section w-full max-w-7xl mx-auto px-6 !mb-14">
        <div class="text-center !mb-10">
          <div class="game-section-header">
            <h3 class="game-section-title">周年庆丰厚奖励</h3>
            <div class="game-section-subtitle">ANNIVERSARY REWARDS</div>
            <p class="game-section-desc">精心准备的周年庆专属奖励，等你来拿！</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- CS2武器皮肤 -->
          <div class="game-reward-card orange group">
            <div class="reward-badge legendary">LEGENDARY</div>
            <div class="reward-icon-wrapper orange">
              <span class="reward-icon">🔫</span>
            </div>
            <h4 class="reward-title">CS2武器皮肤</h4>
            <div class="reward-subtitle">WEAPON SKINS</div>
            <p class="reward-description">精选稀有武器皮肤，彰显独特品味</p>
            <div class="reward-info">
              <div class="flex items-center justify-between !mb-2">
                <span class="reward-rarity-label">稀有度</span>
                <span class="reward-rarity orange-rarity">传说级</span>
              </div>
              <div class="reward-details">包含多款热门武器皮肤</div>
            </div>
          </div>

          <!-- 周年庆专属模型皮肤 -->
          <div class="game-reward-card purple group">
            <div class="reward-badge limited">LIMITED</div>
            <div class="reward-icon-wrapper purple">
              <span class="reward-icon">👤</span>
            </div>
            <h4 class="reward-title">专属模型皮肤</h4>
            <div class="reward-subtitle">PLAYER MODELS</div>
            <p class="reward-description">周年庆限定角色皮肤，独一无二</p>
            <div class="reward-info">
              <div class="flex items-center justify-between !mb-2">
                <span class="reward-rarity-label">稀有度</span>
                <span class="reward-rarity purple-rarity">限定版</span>
              </div>
              <div class="reward-details">周年庆专属设计，过期不候</div>
            </div>
          </div>

          <!-- 积分抽奖 -->
          <div class="game-reward-card yellow group">
            <div class="reward-badge bonus">BONUS</div>
            <div class="reward-icon-wrapper yellow">
              <span class="reward-icon">🎰</span>
            </div>
            <h4 class="reward-title">积分抽奖</h4>
            <div class="reward-subtitle">POINT LOTTERY</div>
            <p class="reward-description">海量积分奖励，畅享抽奖乐趣</p>
            <div class="reward-info">
              <div class="flex items-center justify-between !mb-2">
                <span class="reward-rarity-label">奖励范围</span>
                <span class="reward-rarity yellow-rarity">100-10000</span>
              </div>
              <div class="reward-details">每日免费抽奖机会</div>
            </div>
          </div>

          <!-- 精美壁纸 -->
          <div class="game-reward-card cyan group">
            <div class="reward-badge premium">4K PREMIUM</div>
            <div class="reward-icon-wrapper cyan">
              <span class="reward-icon">🖼️</span>
            </div>
            <h4 class="reward-title">精美壁纸</h4>
            <div class="reward-subtitle">WALLPAPERS</div>
            <p class="reward-description">高清周年庆主题壁纸合集</p>
            <div class="reward-info">
              <div class="flex items-center justify-between !mb-2">
                <span class="reward-rarity-label">分辨率</span>
                <span class="reward-rarity cyan-rarity">4K超清</span>
              </div>
              <div class="reward-details">包含多款精美设计</div>
            </div>
          </div>

          <!-- 专属换肤模型 -->
          <div class="game-reward-card green group">
            <div class="reward-badge interactive">INTERACTIVE</div>
            <div class="reward-icon-wrapper green">
              <span class="reward-icon">🎨</span>
            </div>
            <h4 class="reward-title">专属换肤模型</h4>
            <div class="reward-subtitle">CUSTOM MODELS</div>
            <p class="reward-description">周年庆特制换肤系统</p>
            <div class="reward-info">
              <div class="flex items-center justify-between !mb-2">
                <span class="reward-rarity-label">类型</span>
                <span class="reward-rarity green-rarity">互动式</span>
              </div>
              <div class="reward-details">支持自定义换肤</div>
            </div>
          </div>

          <!-- 神秘大奖 -->
          <div class="game-reward-card indigo group mystery">
            <div class="reward-badge mystery-badge animate-pulse">MYSTERY</div>
            <div class="reward-icon-wrapper indigo">
              <span class="reward-icon animate-pulse">🎁</span>
            </div>
            <h4 class="reward-title">神秘大奖</h4>
            <div class="reward-subtitle">MYSTERY PRIZE</div>
            <p class="reward-description">周年庆终极奖励，敬请期待</p>
            <div class="reward-info">
              <div class="flex items-center justify-between !mb-2">
                <span class="reward-rarity-label">稀有度</span>
                <span class="reward-rarity indigo-rarity">???</span>
              </div>
              <div class="reward-details">周年庆当日揭晓</div>
            </div>
          </div>
        </div>

        <!-- 奖励说明 -->
        <div class="reward-notice !mt-10">
          <div class="game-footer-container">
            <p class="text-lg text-white font-bold !mb-3 text-shadow-strong">
              <span class="inline-flex items-center">
                <span class="!mr-2">🎉</span>
                所有奖励均为周年庆专属，参与活动即有机会获得
                <span class="!ml-2">🎉</span>
              </span>
            </p>
            <p class="text-white/90 text-base">
              更多惊喜奖励将在周年庆正式开启时公布，敬请期待！
            </p>
          </div>
        </div>
      </div>

      <!-- 快捷按钮 -->
      <div class="actions-section w-full max-w-4xl mx-auto px-6 !mb-12">
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <RouterLink
            v-if="isAnniversaryStarted"
            to="/anniversary"
            class="game-btn-primary group"
          >
            <span class="!mr-3 text-xl group-hover:scale-110 transition-transform duration-300">🎉</span>
            立即参与
          </RouterLink>
          <button
            v-else
            disabled
            class="game-btn-disabled"
          >
            <span class="!mr-3 text-xl">⏳</span>
            敬请期待
          </button>
          <button
            @click="sharePreheating"
            class="game-btn-secondary group"
          >
            <span class="!mr-3 text-xl group-hover:scale-110 transition-transform duration-300">📢</span>
            分享预热
          </button>
        </div>
      </div>

      <!-- 底部信息栏 -->
      <div class="footer-info w-full max-w-6xl mx-auto px-6">
        <div class="game-footer-container">
          <p class="text-lg text-white font-bold !mb-3 text-shadow-strong">
            <span class="inline-flex items-center">
              <span class="!mr-2">🔥</span>
              预热阶段精彩纷呈，正式庆典更加震撼
              <span class="!ml-2">🔥</span>
            </span>
          </p>
          <p class="text-white/90 text-base">
            邀请好友一起预热，共同见证历史时刻！
          </p>
        </div>
      </div>
    </div>

    <!-- 分享弹窗 -->
    <div
      v-if="showShareModal"
      class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
      @click="closeShareModal"
    >
      <div
        class="game-modal-content"
        @click.stop
      >
        <div class="text-center !mb-8">
          <h3 class="text-2xl font-black text-gray-800 !mb-3 text-shadow">分享预热活动</h3>
          <p class="text-gray-600 text-base">邀请好友一起参与周年庆预热！</p>
        </div>

        <div class="!mb-8">
          <label class="block text-base font-black text-gray-700 !mb-3">分享链接</label>
          <div class="flex items-center space-x-3">
            <input
              v-model="shareUrl"
              readonly
              class="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50 text-sm font-mono shadow-inner"
            >
            <button
              @click="copyToClipboard"
              class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-black text-base shadow-lg"
            >
              复制
            </button>
          </div>
        </div>

        <div class="flex space-x-4">
          <button
            @click="shareToQQ"
            class="flex-1 flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-xl font-black text-base"
          >
            <span class="!mr-2 text-lg">🐧</span>
            分享到QQ
          </button>
          <button
            @click="closeShareModal"
            class="px-8 py-4 bg-gray-400 text-gray-700 rounded-xl hover:bg-gray-500 transition-colors font-black text-base shadow-lg"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { RouterLink } from 'vue-router'

// 周年庆开始时间 - 8月1日 2025年
const ANNIVERSARY_START_DATE = new Date('2025-08-01 00:00:00')

// 响应式数据
const signInDays = ref(0)
const taskProgress = ref(0)
const showShareModal = ref(false)
const shareUrl = ref('')

// 倒计时数据
const countdown = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
})

let countdownTimer: number | null = null

// 计算是否已经开始周年庆
const isAnniversaryStarted = computed(() => {
  return new Date() >= ANNIVERSARY_START_DATE
})

// 分享预热活动
const sharePreheating = () => {
  shareUrl.value = window.location.href
  showShareModal.value = true
}

// 关闭分享弹窗
const closeShareModal = () => {
  showShareModal.value = false
}

// 复制链接到剪贴板
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(shareUrl.value)
    alert('链接已复制到剪贴板！')
  } catch (err) {
    console.error('复制失败:', err)
    // 兜底方案
    const textArea = document.createElement('textarea')
    textArea.value = shareUrl.value
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    alert('链接已复制到剪贴板！')
  }
}

// 分享到QQ
const shareToQQ = () => {
  const title = '周年庆预热活动'
  const description = '热血沸腾·蓄势待发·精彩预告，快来参与周年庆预热活动！'
  const qqShareUrl = `https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(shareUrl.value)}&title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}`
  window.open(qqShareUrl, '_blank')
}

// 更新倒计时
const updateCountdown = () => {
  const now = new Date()
  const timeDiff = ANNIVERSARY_START_DATE.getTime() - now.getTime()

  if (timeDiff > 0) {
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)

    countdown.value = { days, hours, minutes, seconds }
  } else {
    countdown.value = { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }
}

// 计算进度
const calculateProgress = () => {
  const now = new Date()
  const preheatingStartDate = new Date('2025-07-01 00:00:00') // 预热开始时间
  const totalDuration = ANNIVERSARY_START_DATE.getTime() - preheatingStartDate.getTime()
  const elapsedTime = now.getTime() - preheatingStartDate.getTime()

  if (elapsedTime < 0) {
    // 预热还未开始
    signInDays.value = 0
    taskProgress.value = 0
  } else if (elapsedTime >= totalDuration) {
    // 周年庆已经开始
    signInDays.value = 7
    taskProgress.value = 100
  } else {
    // 预热进行中
    const progressRatio = elapsedTime / totalDuration
    signInDays.value = Math.floor(progressRatio * 7)
    taskProgress.value = Math.floor(progressRatio * 100)
  }
}

// 组件挂载时初始化数据
onMounted(() => {
  calculateProgress()
  updateCountdown()

  // 启动倒计时
  countdownTimer = window.setInterval(() => {
    updateCountdown()
    calculateProgress()
  }, 1000)
})

// 组件卸载时清理定时器
onUnmounted(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer)
  }
})
</script>

<style scoped>
/* 游戏风格按钮样式 - 预热紫色主题 */
.game-btn-primary {
  @apply inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black rounded-xl shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105 backdrop-blur-lg border-2 border-purple-400/50 text-lg;
}

.game-btn-secondary {
  @apply inline-flex items-center px-8 py-4 backdrop-blur-xl bg-black/60 hover:bg-black/80 border-2 border-white/50 hover:border-purple-400/70 text-white font-black rounded-xl shadow-2xl hover:shadow-white/20 transition-all duration-300 transform hover:scale-105 text-lg;
}

.game-btn-disabled {
  @apply inline-flex items-center px-8 py-4 bg-gray-600/60 border-2 border-gray-400/30 text-white/60 font-black rounded-xl shadow-xl cursor-not-allowed backdrop-blur-lg text-lg;
}

/* 游戏风格倒计时 */
.game-countdown-item {
  @apply backdrop-blur-xl bg-black/70 rounded-2xl text-center shadow-2xl border-2 border-purple-400/40 hover:bg-black/80 transition-all duration-300 hover:scale-105;
  padding: 1.5rem !important;
  min-width: 110px !important;
}

.countdown-value {
  @apply text-3xl md:text-4xl font-black text-purple-400 text-shadow-strong;
  margin-bottom: 0.5rem !important;
}

.countdown-label {
  @apply text-white font-bold text-base text-shadow;
  margin-bottom: 0.25rem !important;
}

.countdown-label-en {
  @apply text-purple-400/80 text-xs font-medium tracking-wider uppercase;
}

.countdown-separator {
  @apply text-2xl font-black text-white text-shadow-strong;
}

/* 游戏风格活动卡片 */
.game-activity-card {
  @apply p-6 rounded-2xl backdrop-blur-xl bg-black/70 border-2 shadow-2xl transition-all duration-500 transform hover:scale-105 hover:bg-black/80 text-center relative overflow-hidden;
}

.game-activity-card.gift {
  @apply border-yellow-400/60 hover:border-yellow-400/80 hover:shadow-yellow-500/30;
}

.game-activity-card.task {
  @apply border-blue-400/60 hover:border-blue-400/80 hover:shadow-blue-500/30;
}

.activity-badge {
  @apply absolute -top-2 -right-2 px-3 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-black rounded-full shadow-lg;
}

.task-badge {
  @apply bg-gradient-to-r from-blue-500 to-blue-600;
}

.activity-icon-container {
  @apply w-16 h-16 mx-auto rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300;
  margin-bottom: 1rem !important;
}

.activity-icon-container.gift {
  @apply bg-gradient-to-br from-yellow-400 to-orange-400;
}

.activity-icon-container.task {
  @apply bg-gradient-to-br from-blue-400 to-indigo-400;
}

.activity-icon {
  @apply text-2xl drop-shadow-lg;
}

.activity-title {
  @apply text-xl font-black text-white text-shadow-strong;
  margin-bottom: 0.5rem !important;
}

.activity-subtitle {
  @apply text-purple-400/80 text-xs font-bold tracking-widest uppercase;
  margin-bottom: 1rem !important;
}

.activity-description {
  @apply text-white/90 leading-relaxed text-base font-medium text-shadow;
}

.activity-progress {
  @apply bg-black/40 rounded-xl border-2 border-white/20 shadow-inner;
  padding: 1rem !important;
}

.progress-label {
  @apply text-sm text-white font-bold;
}

.progress-percentage {
  @apply text-sm font-black;
}

.progress-percentage.gift {
  @apply text-yellow-400;
}

.progress-percentage.task {
  @apply text-blue-400;
}

.progress-bar {
  @apply w-full bg-gray-600 rounded-full shadow-inner;
  height: 8px !important;
}

.progress-fill {
  @apply rounded-full transition-all duration-500;
  height: 8px !important;
}

.gift-progress {
  @apply bg-gradient-to-r from-yellow-400 to-orange-400 shadow-lg;
}

.task-progress {
  @apply bg-gradient-to-r from-blue-400 to-indigo-400 shadow-lg;
}

.progress-status {
  @apply text-center font-bold text-sm;
  margin-top: 0.75rem !important;
}

.progress-status.complete {
  @apply text-green-400;
}

/* 游戏风格奖励卡片 */
.game-reward-card {
  @apply p-6 rounded-2xl backdrop-blur-xl border-2 shadow-2xl transition-all duration-500 transform hover:scale-105 relative overflow-hidden text-center;
}

.game-reward-card.orange {
  @apply bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-400/80 hover:from-orange-500/30 hover:to-red-500/30 hover:shadow-orange-500/30;
}

.game-reward-card.purple {
  @apply bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-400/80 hover:from-purple-500/30 hover:to-pink-500/30 hover:shadow-purple-500/30;
}

.game-reward-card.yellow {
  @apply bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-400/80 hover:from-yellow-500/30 hover:to-orange-500/30 hover:shadow-yellow-500/30;
}

.game-reward-card.cyan {
  @apply bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-cyan-400/80 hover:from-cyan-500/30 hover:to-blue-500/30 hover:shadow-cyan-500/30;
}

.game-reward-card.green {
  @apply bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-400/80 hover:from-green-500/30 hover:to-emerald-500/30 hover:shadow-green-500/30;
}

.game-reward-card.indigo {
  @apply bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-indigo-400/80 hover:from-indigo-500/30 hover:to-purple-500/30 hover:shadow-indigo-500/30;
}

.reward-badge {
  @apply absolute -top-2 -left-2 px-2 py-1 text-white text-xs font-black rounded-full shadow-lg transform -rotate-12;
}

.reward-badge.legendary {
  @apply bg-gradient-to-r from-orange-500 to-red-500;
}

.reward-badge.limited {
  @apply bg-gradient-to-r from-purple-500 to-pink-500;
}

.reward-badge.bonus {
  @apply bg-gradient-to-r from-yellow-500 to-orange-500;
}

.reward-badge.premium {
  @apply bg-gradient-to-r from-cyan-500 to-blue-500;
}

.reward-badge.interactive {
  @apply bg-gradient-to-r from-green-500 to-emerald-500;
}

.mystery-badge {
  @apply bg-gradient-to-r from-indigo-500 to-purple-500;
}

.reward-icon-wrapper {
  @apply w-16 h-16 mx-auto rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300;
  margin-bottom: 1rem !important;
}

.reward-icon-wrapper.orange {
  @apply bg-gradient-to-br from-orange-400 to-red-400;
}

.reward-icon-wrapper.purple {
  @apply bg-gradient-to-br from-purple-400 to-pink-400;
}

.reward-icon-wrapper.yellow {
  @apply bg-gradient-to-br from-yellow-400 to-orange-400;
}

.reward-icon-wrapper.cyan {
  @apply bg-gradient-to-br from-cyan-400 to-blue-400;
}

.reward-icon-wrapper.green {
  @apply bg-gradient-to-br from-green-400 to-emerald-400;
}

.reward-icon-wrapper.indigo {
  @apply bg-gradient-to-br from-indigo-400 to-purple-400;
}

.reward-icon {
  @apply text-2xl drop-shadow-lg;
}

.reward-title {
  @apply text-lg font-black text-white text-shadow-strong;
  margin-bottom: 0.5rem !important;
}

.reward-subtitle {
  @apply text-purple-400/80 text-xs font-bold tracking-widest uppercase;
  margin-bottom: 1rem !important;
}

.reward-description {
  @apply text-white/90 text-sm leading-relaxed font-medium text-shadow;
  margin-bottom: 1.5rem !important;
}

.reward-info {
  @apply bg-black/30 rounded-lg border-2 border-white/20 shadow-inner;
  padding: 1rem !important;
}

.reward-rarity-label {
  @apply text-xs font-bold text-white/90;
}

.reward-rarity {
  @apply text-xs font-black px-3 py-1 rounded-full;
}

.orange-rarity {
  @apply text-orange-200 bg-orange-400/30 border border-orange-400/50;
}

.purple-rarity {
  @apply text-purple-200 bg-purple-400/30 border border-purple-400/50;
}

.yellow-rarity {
  @apply text-yellow-200 bg-yellow-400/30 border border-yellow-400/50;
}

.cyan-rarity {
  @apply text-cyan-200 bg-cyan-400/30 border border-cyan-400/50;
}

.green-rarity {
  @apply text-green-200 bg-green-400/30 border border-green-400/50;
}

.indigo-rarity {
  @apply text-indigo-200 bg-indigo-400/30 border border-indigo-400/50;
}

.reward-details {
  @apply text-xs text-white/80 font-medium;
  margin-top: 0.75rem !important;
}

/* 游戏风格区域标题 */
.game-section-header {
  @apply backdrop-blur-xl bg-black/60 rounded-2xl border-2 border-white/30 shadow-2xl;
  padding: 1.5rem !important;
}

.game-section-title {
  @apply text-2xl md:text-3xl font-black text-white text-shadow-strong;
  margin-bottom: 0.5rem !important;
}

.game-section-subtitle {
  @apply text-purple-400 font-bold text-sm tracking-widest;
  margin-bottom: 0.75rem !important;
}

.game-section-desc {
  @apply text-base md:text-lg text-white/90 max-w-3xl mx-auto font-medium text-shadow;
}

/* 游戏风格分享弹窗 */
.game-modal-content {
  @apply bg-white rounded-2xl max-w-lg w-full mx-4 shadow-2xl backdrop-blur-xl border-2 border-gray-200;
  padding: 2rem !important;
}

.game-footer-container {
  @apply text-center rounded-2xl backdrop-blur-xl bg-black/60 border-2 border-white/30 shadow-2xl;
  padding: 1.5rem !important;
}

/* 响应式优化 */
@media (max-width: 768px) {
  .game-countdown-item {
    padding: 1rem !important;
    min-width: 80px !important;
  }

  .countdown-value {
    @apply text-xl;
  }

  .game-activity-card {
    padding: 1.5rem !important;
  }

  .game-reward-card {
    padding: 1.5rem !important;
  }

  .reward-icon-wrapper, .activity-icon-container {
    @apply w-14 h-14;
    margin-bottom: 0.75rem !important;
  }

  .reward-icon, .activity-icon {
    @apply text-lg;
  }

  .reward-title, .activity-title {
    @apply text-base;
  }

  .game-modal-content {
    padding: 1.5rem !important;
  }

  .game-section-header {
    padding: 1rem !important;
  }
}

/* 文字阴影效果 */
.text-shadow {
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
}

.text-shadow-strong {
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.6);
}

.text-shadow-glow {
  text-shadow: 0 0 20px currentColor, 0 4px 12px rgba(0, 0, 0, 0.8);
}

/* 页面特定样式 */
.preheating-page {
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

/* 动画效果 */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
