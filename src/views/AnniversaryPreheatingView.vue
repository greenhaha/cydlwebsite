<template>
  <div class="preheating-page">
    <!-- 专属背景 -->
    <div class="fixed inset-0 w-full h-full">
      <div class="absolute inset-0 bg-cover bg-center bg-no-repeat" 
           style="background-image: url('https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/cs2CTVST.png')">
      </div>
      <div class="home-grass pointer-events-none fixed inset-0 z-0"></div>
    </div>

    <!-- 主内容区域 -->
    <div class="preheating-content inset-0 h-full top-[0px] z-10 flex flex-col items-center justify-start pt-[80px] pb-8">
      <!-- 顶部导航 -->
      <div class="fixed top-0 left-0 right-0 z-30 bg-black/60 backdrop-blur-md border-b border-white/20">
        <div class="w-full mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <RouterLink 
            to="/"
            class="inline-flex items-center px-4 py-2 text-white/90 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/20 bg-black/30"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            返回主页
          </RouterLink>
        </div>
      </div>

      <!-- 大气标题设计 -->
      <div class="page-header w-full max-w-[1280px] px-4 mb-8 z-20 text-center">
        <!-- 背景装饰 -->
        <div class="relative mb-8">
          
          <!-- 主标题容器 -->
          <div class="relative z-10">
            <!-- 顶部装饰线 -->
            <div class="flex items-center justify-center !mb-6">
              <div class="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent w-24"></div>
              <div class="mx-3 w-2 h-2 bg-white/60 rounded-full"></div>
              <div class="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent w-24"></div>
            </div>
            
            <!-- 主标题 -->
            <div class="!mb-4 relative text-center">
              <h1 class="text-[36px] md:text-[48px] lg:text-[56px] font-black text-white mb-3 tracking-tight leading-none drop-shadow-2xl text-shadow-lg">
                黄粱一梦周年庆预热
              </h1>
            </div>
            
            <!-- 副标题 -->
            <h2 class="w-full text-[16px] md:text-[20px] lg:text-[24px] font-medium text-white/95 !mb-6 tracking-wide text-center drop-shadow-lg text-shadow">
              热血沸腾 · 蓄势待发 · 精彩预告
            </h2>
            
            <!-- 底部装饰线 -->
            <div class="flex items-center justify-center !mb-6">
              <div class="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent w-32"></div>
              <div class="mx-3 w-1.5 h-1.5 bg-white/60 rounded-full"></div>
              <div class="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent w-32"></div>
            </div>
          </div>
        </div>
        
        <!-- 描述文字 -->
        <div class="backdrop-blur-lg bg-black/50 rounded-lg p-4 border border-white/30 shadow-2xl">
          <p class="text-[14px] md:text-[16px] text-white leading-relaxed !w-full mx-auto text-center drop-shadow-lg text-shadow">
            周年庆即将来临，精彩活动蓄势待发！
          </p>
        </div>
      </div>
 <!-- 倒计时区域 -->
      <div class="countdown-section w-full max-w-[1280px] px-4 !mb-12 z-20">
        <div class="text-center mb-8">
          <h3 class="text-[24px] md:text-[32px] font-bold text-white !mb-4 text-shadow-lg">
            周年庆倒计时
          </h3>
          <p class="text-[16px] md:text-[18px] text-white/90 text-shadow w-full mx-auto">
            距离盛大开启还有
          </p>
        </div>

        <div class="countdown-display flex justify-center items-center space-x-4 !mb-8">
          <div class="countdown-item backdrop-blur-lg bg-white/95 rounded-xl p-6 text-center shadow-2xl">
            <div class="text-3xl font-bold text-purple-600">{{ countdown.days }}</div>
            <div class="text-sm text-gray-600">天</div>
          </div>
          <div class="text-2xl text-white font-bold">:</div>
          <div class="countdown-item backdrop-blur-lg bg-white/95 rounded-xl p-6 text-center shadow-2xl">
            <div class="text-3xl font-bold text-purple-600">{{ countdown.hours }}</div>
            <div class="text-sm text-gray-600">时</div>
          </div>
          <div class="text-2xl text-white font-bold">:</div>
          <div class="countdown-item backdrop-blur-lg bg-white/95 rounded-xl p-6 text-center shadow-2xl">
            <div class="text-3xl font-bold text-purple-600">{{ countdown.minutes }}</div>
            <div class="text-sm text-gray-600">分</div>
          </div>
          <div class="text-2xl text-white font-bold">:</div>
          <div class="countdown-item backdrop-blur-lg bg-white/95 rounded-xl p-6 text-center shadow-2xl">
            <div class="text-3xl font-bold text-purple-600">{{ countdown.seconds }}</div>
            <div class="text-sm text-gray-600">秒</div>
          </div>
        </div>
      </div>

      <!-- 预热活动区域 -->
      <div class="activities-section w-full max-w-[800px] px-4 !mb-8 z-20 text-center">
        <div class="text-center mb-6">
          <h3 class="text-[20px] md:text-[24px] font-bold text-white !mb-2 text-shadow-lg drop-shadow-lg">
            预热活动
          </h3>
          <p class="text-[14px] md:text-[16px] text-white/95 w-full mx-auto text-shadow drop-shadow">
            参与预热活动，抢先体验精彩内容
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="activity-card p-4 rounded-lg backdrop-blur-lg bg-black/40 border border-white/30 shadow-xl">
            <div class="text-center !mb-3">
              <div class="text-2xl !mb-2">🎁</div>
              <h4 class="text-lg font-bold text-white !mb-1 text-shadow">签到领礼包</h4>
              <p class="text-white/90 text-sm text-shadow">参与周年庆活动，获得周年庆专属礼包</p>
            </div>
            <div class="bg-black/30 rounded-lg p-3 border border-white/20">
              <div class="flex justify-between items-center">
                <span class="text-xs text-white/90 text-shadow">准备进度</span>
                <span class="text-xs font-semibold text-yellow-300 text-shadow"></span>
              </div>
              <div class="w-full bg-gray-600 rounded-full h-1.5 !mt-2">
                <div class="bg-gradient-to-r from-yellow-400 to-orange-400 h-1.5 rounded-full transition-all duration-500" 
                     :style="{ width: (7 / 7 * 100) + '%' }"></div>
              </div>
            </div>
          </div>

          <div class="activity-card p-4 rounded-lg backdrop-blur-lg bg-black/40 border border-white/30 shadow-xl">
            <div class="text-center !mb-3">
              <div class="text-2xl !mb-2">⚡</div>
              <h4 class="text-lg font-bold text-white !mb-1 text-shadow">预热任务</h4>
              <p class="text-white/90 text-sm text-shadow">完成预热任务，解锁周年庆独家内容</p>
            </div>
            <div class="bg-black/30 rounded-lg p-3 border border-white/20">
              <div class="flex justify-between items-center">
                <span class="text-xs text-white/90 text-shadow">解锁进度</span>
                <span class="text-xs font-semibold text-blue-300 text-shadow"></span>
              </div>
              <div class="w-full bg-gray-600 rounded-full h-1.5 !mt-2">
                <div class="bg-gradient-to-r from-blue-400 to-indigo-400 h-1.5 rounded-full transition-all duration-500" 
                     :style="{ width: 100 + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 周年庆奖励物品展示 -->
      <div class="rewards-section w-full max-w-[1280px] px-4 !mb-12 z-20">
        <div class="text-center mb-8">
          <h3 class="text-[24px] md:text-[32px] font-bold text-white !mb-4 text-shadow-lg drop-shadow-lg">
            周年庆丰厚奖励
          </h3>
          <p class="text-[16px] md:text-[18px] text-white/90 text-shadow w-full mx-auto">
            精心准备的周年庆专属奖励，等你来拿！
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- CS2武器皮肤 -->
          <div class="reward-card group relative overflow-hidden rounded-2xl backdrop-blur-lg bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-300/30 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
            <div class="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-red-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="relative p-6 text-center">
              <div class="mb-4">
                <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center shadow-lg">
                  <span class="text-2xl">🔫</span>
                </div>
                <h4 class="text-xl font-bold text-white mb-2 text-shadow-lg">CS2武器皮肤</h4>
                <p class="text-white/90 text-sm text-shadow">精选稀有武器皮肤，彰显独特品味</p>
              </div>
              <div class="bg-black/20 rounded-lg p-3 border border-orange-300/20">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs text-orange-300 font-medium">稀有度</span>
                  <span class="text-xs font-bold text-orange-400 bg-orange-400/20 px-2 py-1 rounded">传说级</span>
                </div>
                <div class="text-xs text-white/80">包含多款热门武器皮肤</div>
              </div>
            </div>
          </div>

          <!-- 周年庆专属模型皮肤 -->
          <div class="reward-card group relative overflow-hidden rounded-2xl backdrop-blur-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-300/30 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
            <div class="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="relative p-6 text-center">
              <div class="mb-4">
                <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
                  <span class="text-2xl">👤</span>
                </div>
                <h4 class="text-xl font-bold text-white mb-2 text-shadow-lg">专属模型皮肤</h4>
                <p class="text-white/90 text-sm text-shadow">周年庆限定角色皮肤，独一无二</p>
              </div>
              <div class="bg-black/20 rounded-lg p-3 border border-purple-300/20">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs text-purple-300 font-medium">稀有度</span>
                  <span class="text-xs font-bold text-purple-400 bg-purple-400/20 px-2 py-1 rounded">限定版</span>
                </div>
                <div class="text-xs text-white/80">周年庆专属设计，过期不候</div>
              </div>
            </div>
          </div>

          <!-- 积分抽奖 -->
          <div class="reward-card group relative overflow-hidden rounded-2xl backdrop-blur-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-300/30 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
            <div class="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="relative p-6 text-center">
              <div class="mb-4">
                <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                  <span class="text-2xl">🎰</span>
                </div>
                <h4 class="text-xl font-bold text-white mb-2 text-shadow-lg">积分抽奖</h4>
                <p class="text-white/90 text-sm text-shadow">海量积分奖励，畅享抽奖乐趣</p>
              </div>
              <div class="bg-black/20 rounded-lg p-3 border border-yellow-300/20">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs text-yellow-300 font-medium">奖励范围</span>
                  <span class="text-xs font-bold text-yellow-400 bg-yellow-400/20 px-2 py-1 rounded">100-10000</span>
                </div>
                <div class="text-xs text-white/80">每日免费抽奖机会</div>
              </div>
            </div>
          </div>

          <!-- 精美壁纸 -->
          <div class="reward-card group relative overflow-hidden rounded-2xl backdrop-blur-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-300/30 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
            <div class="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="relative p-6 text-center">
              <div class="mb-4">
                <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full flex items-center justify-center shadow-lg">
                  <span class="text-2xl">🖼️</span>
                </div>
                <h4 class="text-xl font-bold text-white mb-2 text-shadow-lg">精美壁纸</h4>
                <p class="text-white/90 text-sm text-shadow">高清周年庆主题壁纸合集</p>
              </div>
              <div class="bg-black/20 rounded-lg p-3 border border-cyan-300/20">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs text-cyan-300 font-medium">分辨率</span>
                  <span class="text-xs font-bold text-cyan-400 bg-cyan-400/20 px-2 py-1 rounded">4K超清</span>
                </div>
                <div class="text-xs text-white/80">包含多款精美设计</div>
              </div>
            </div>
          </div>

          <!-- 专属换肤模型 -->
          <div class="reward-card group relative overflow-hidden rounded-2xl backdrop-blur-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-300/30 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
            <div class="absolute inset-0 bg-gradient-to-br from-green-400/10 to-emerald-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="relative p-6 text-center">
              <div class="mb-4">
                <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center shadow-lg">
                  <span class="text-2xl">🎨</span>
                </div>
                <h4 class="text-xl font-bold text-white mb-2 text-shadow-lg">专属换肤模型</h4>
                <p class="text-white/90 text-sm text-shadow">周年庆特制换肤系统</p>
              </div>
              <div class="bg-black/20 rounded-lg p-3 border border-green-300/20">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs text-green-300 font-medium">类型</span>
                  <span class="text-xs font-bold text-green-400 bg-green-400/20 px-2 py-1 rounded">互动式</span>
                </div>
                <div class="text-xs text-white/80">支持自定义换肤</div>
              </div>
            </div>
          </div>

          <!-- 神秘大奖 -->
          <div class="reward-card group relative overflow-hidden rounded-2xl backdrop-blur-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-300/30 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
            <div class="absolute inset-0 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="relative p-6 text-center">
              <div class="mb-4">
                <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <span class="text-2xl">🎁</span>
                </div>
                <h4 class="text-xl font-bold text-white mb-2 text-shadow-lg">神秘大奖</h4>
                <p class="text-white/90 text-sm text-shadow">周年庆终极奖励，敬请期待</p>
              </div>
              <div class="bg-black/20 rounded-lg p-3 border border-indigo-300/20">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs text-indigo-300 font-medium">稀有度</span>
                  <span class="text-xs font-bold text-indigo-400 bg-indigo-400/20 px-2 py-1 rounded">???</span>
                </div>
                <div class="text-xs text-white/80">周年庆当日揭晓</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 奖励说明 -->
        <div class="!mt-8 text-center">
          <div class="backdrop-blur-lg bg-black/30 rounded-xl p-4 border border-white/20 shadow-xl">
            <p class="text-white/90 text-sm text-shadow mb-2">
              🎉 所有奖励均为周年庆专属，参与活动即有机会获得 🎉
            </p>
            <p class="text-white/70 text-xs text-shadow">
              更多惊喜奖励将在周年庆正式开启时公布，敬请期待！
            </p>
          </div>
        </div>
      </div>

     
      <!-- 快捷按钮 -->
      <div class="actions-section w-full max-w-[1280px] px-4 !mb-12 z-20">
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <RouterLink 
            v-if="isAnniversaryStarted"
            to="/anniversary"
            class="inline-flex items-center px-8 py-4 backdrop-blur-lg bg-gradient-to-r from-purple-500/90 to-pink-500/90 border border-purple-300/30 text-white text-lg font-semibold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 text-shadow-sm"
          >
            <span class="mr-3 text-xl">🎉</span>
            立即参与
          </RouterLink>
          <button 
            v-else
            disabled
            class="inline-flex items-center px-8 py-4 backdrop-blur-lg bg-gray-600/60 border border-gray-400/30 text-white/60 text-lg font-semibold rounded-xl shadow-xl cursor-not-allowed text-shadow-sm"
          >
            <span class="mr-3 text-xl">⏳</span>
            敬请期待
          </button>
          <button 
            @click="sharePreheating"
            class="inline-flex items-center px-8 py-4 backdrop-blur-lg bg-gradient-to-r from-orange-500/90 to-red-500/90 border border-orange-300/30 text-white text-lg font-semibold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 text-shadow-sm"
          >
            <span class="mr-3 text-xl">📢</span>
            分享预热
          </button>
        </div>
      </div>

      <!-- 底部信息栏 -->
      <div class="footer-info w-full max-w-[1280px] px-4 z-20">
        <div class="text-center p-6 rounded-xl backdrop-blur-lg bg-black/20 border border-white/20">
          <p class="text-white/90 text-shadow !mb-2">
            🔥 预热阶段精彩纷呈，正式庆典更加震撼 🔥
          </p>
          <p class="text-white/70 text-sm text-shadow">
            邀请好友一起预热，共同见证历史时刻！
          </p>
        </div>
      </div>
    </div>

    <!-- 分享弹窗 -->
    <div 
      v-if="showShareModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      @click="closeShareModal"
    >
      <div 
        class="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl"
        @click.stop
      >
        <div class="text-center mb-6">
          <h3 class="text-xl font-bold text-gray-800 mb-2">分享预热活动</h3>
          <p class="text-gray-600">邀请好友一起参与周年庆预热！</p>
        </div>
        
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">分享链接</label>
          <div class="flex items-center space-x-2">
            <input 
              v-model="shareUrl" 
              readonly 
              class="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
            >
            <button 
              @click="copyToClipboard"
              class="px-4 !ml-2 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
            >
              复制
            </button>
          </div>
        </div>
        
        <div class="flex space-x-3 !mt-4">
          <button 
            @click="shareToQQ"
            class="flex-1 flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg"
          >
            <span class="mr-2">🐧</span>
            分享到QQ
          </button>
          <button 
            @click="closeShareModal"
            class="px-6 py-3 bg-gray-300 !ml-2 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
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
.bg-gradient-radial {
  background: radial-gradient(circle, var(--tw-gradient-stops));
}

.text-shadow {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.text-shadow-lg {
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
}

.text-shadow-sm {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.countdown-item {
  min-width: 80px;
}

@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0, 0, 0);
  }
  40%, 43% {
    transform: translate3d(0, -15px, 0);
  }
  70% {
    transform: translate3d(0, -7px, 0);
  }
  90% {
    transform: translate3d(0, -2px, 0);
  }
}

.animate-bounce {
  animation: bounce 2s infinite;
}
.home-grass {
  background: linear-gradient(180deg, hsla(0, 0%, 100%, 0.4), #f5f5f5);
}
</style>
