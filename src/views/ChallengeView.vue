<template>
  <div class="challenge-page">
    <!-- 专属背景 -->
    <div class="fixed inset-0 w-full h-full">
      <div class="absolute inset-0 bg-cover bg-center bg-no-repeat" 
           style="background-image: url('https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/bg3.webp')">
      </div>
    </div>

    <!-- 主内容区域 -->
    <div class="challenge-content inset-0 h-full top-[0px] z-10 flex flex-col items-center justify-start pt-[80px] pb-8">
      <!-- 顶部导航 -->
      <div class="fixed top-0 left-0 right-0 z-30 bg-black/60 backdrop-blur-md border-b border-white/20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
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
            <div class="flex items-center justify-center mb-6">
              <div class="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent w-24"></div>
              <div class="mx-3 w-2 h-2 bg-white/60 rounded-full"></div>
              <div class="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent w-24"></div>
            </div>
            
            <!-- 主标题 -->
            <div class="mb-4 relative text-center">
              <h1 class="text-[36px] md:text-[48px] lg:text-[56px] font-black text-white mb-3 tracking-tight leading-none drop-shadow-2xl text-shadow-lg">
                全服挑战
              </h1>
            </div>
            
            <!-- 副标题 -->
            <h2 class="text-[16px] md:text-[20px] lg:text-[24px] font-medium text-white/95 mb-6 tracking-wide text-center drop-shadow-lg text-shadow">
              携手并进 · 共创辉煌 · 见证荣耀
            </h2>
            
            <!-- 底部装饰线 -->
            <div class="flex items-center justify-center">
              <div class="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent w-32"></div>
              <div class="mx-3 w-1.5 h-1.5 bg-white/60 rounded-full"></div>
              <div class="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent w-32"></div>
            </div>
          </div>
        </div>
        
        <!-- 描述文字 -->
        <div class="backdrop-blur-lg !m-4 bg-black/50 rounded-lg p-4 border border-white/30 shadow-2xl">
          <p class="text-[14px] md:text-[16px] text-white leading-relaxed w-full text-center mx-auto text-center drop-shadow-lg text-shadow">
            见证黄粱一梦社区的集体力量，一起完成史诗级挑战！
          </p>
        </div>
      </div>

      <!-- 快捷按钮区域 -->
      <div class="actions-section w-full max-w-[800px] px-4 !mb-8 z-20">
        <div class="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <button 
            @click="refreshStats"
            class="inline-flex items-center px-6 py-3 backdrop-blur-lg bg-black/40 border border-white/30 text-white text-base font-medium rounded-lg transition-all duration-300 hover:scale-105 shadow-xl text-shadow"
          >
            <span class="mr-2 text-lg">📊</span>
            刷新数据
          </button>
          <RouterLink 
            to="/anniversary"
            class="inline-flex items-center px-6 py-3 backdrop-blur-lg bg-black/40 border border-white/30 text-white text-base font-medium rounded-lg transition-all duration-300 hover:scale-105 shadow-xl text-shadow"
          >
            <span class="mr-2 text-lg">🎉</span>
            查看周年庆
          </RouterLink>
        </div>
      </div>

      <!-- 挑战进度区域 -->
      <div class="stats-section w-full max-w-[800px] px-4 mb-8 z-20 text-center">
        <div class="text-center !mb-6">
          <h3 class="text-[20px] md:text-[24px] font-bold text-white mb-2 text-shadow-lg drop-shadow-lg">
            挑战进度
          </h3>
          <p class="text-[14px] md:text-[16px] text-white/95 w-full text-center mx-auto text-shadow drop-shadow">
            全服玩家共同努力的成果
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 !mb-6">
          <div class="stat-card p-4 rounded-lg backdrop-blur-lg bg-black/40 border border-white/30 text-center shadow-xl">
            <div class="text-2xl mb-2">⏰</div>
            <div class="text-xl font-bold text-white mb-1 text-shadow-lg">{{ challengeTime }}</div>
            <div class="text-white/90 text-sm text-shadow">挑战总时长</div>
          </div>
          
          <div class="stat-card p-4 rounded-lg backdrop-blur-lg bg-black/40 border border-white/30 text-center shadow-xl">
            <div class="text-2xl mb-2">👥</div>
            <div class="text-xl font-bold text-white mb-1 text-shadow-lg">{{ participants }}</div>
            <div class="text-white/90 text-sm text-shadow">参与玩家数</div>
          </div>
          
          <div class="stat-card p-4 rounded-lg backdrop-blur-lg bg-black/40 border border-white/30 text-center shadow-xl">
            <div class="text-2xl mb-2">🎯</div>
            <div class="text-xl font-bold text-white mb-1 text-shadow-lg">{{ completionRate }}%</div>
            <div class="text-white/90 text-sm text-shadow">挑战完成度</div>
          </div>
        </div>
      </div>

      <!-- 排行榜区域 -->
      <div class="leaderboard-section w-full max-w-[800px] px-4 !mb-8 z-20 text-center">
        <div class="text-center !mb-6">
          <h3 class="text-[20px] md:text-[24px] font-bold text-white !mb-2 text-shadow-lg drop-shadow-lg">
            荣誉排行榜
          </h3>
          <p class="text-[14px] md:text-[16px] text-white/95 w-full text-center mx-auto text-shadow drop-shadow">
            致敬每一位英雄
          </p>
        </div>

        <div class="backdrop-blur-lg bg-black/40 rounded-lg border border-white/30 p-4 shadow-xl">
          <div class="space-y-3">
            <div v-for="(player, index) in topPlayers" :key="index" 
                 class="flex items-center justify-between p-3 rounded-lg bg-black/30 hover:bg-black/40 transition-colors duration-200 border border-white/20 !mb-4">
              <div class="flex items-center space-x-3">
                <div class="text-lg">{{ getRankEmoji(index) }}</div>
                <div>
                  <div class="font-bold text-white text-sm text-shadow">{{ player.name }}</div>
                  <div class="text-white/90 text-xs text-shadow">贡献值: {{ player.contribution }}</div>
                </div>
              </div>
              <div class="text-right">
                <div class="text-base font-bold text-yellow-300 text-shadow-lg">{{ player.score }}</div>
                <div class="text-xs text-white/90 text-shadow">积分</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部信息栏 -->
      <div class="footer-info w-full max-w-[600px] px-4 z-20">
        <div class="text-center p-4 rounded-lg backdrop-blur-lg bg-black/50 border border-white/30 shadow-xl">
          <p class="text-white text-sm mb-1 text-center text-shadow drop-shadow">
            🚀 团结就是力量，挑战永无止境 🚀
          </p>
          <p class="text-white/90 text-xs text-center text-shadow">
            每个人的努力都是向胜利迈进的一步！
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

// 响应式数据
const challengeTime = ref('72小时')
const participants = ref(1234)
const completionRate = ref(78)

// 排行榜数据
const topPlayers = ref([
  { name: '传奇狙击手', contribution: '完成主线任务', score: 1250 },
  { name: '钢铁战士', contribution: '击败Boss', score: 1180 },
  { name: '影子刺客', contribution: '收集稀有道具', score: 1095 },
  { name: '火焰法师', contribution: '团队协作', score: 980 },
  { name: '圣光骑士', contribution: '帮助新手', score: 876 }
])

// 刷新统计数据
const refreshStats = () => {
  // 模拟数据刷新
  participants.value = Math.floor(Math.random() * 2000) + 1000
  completionRate.value = Math.floor(Math.random() * 30) + 70
}

// 获取排名表情
const getRankEmoji = (index: number) => {
  const emojis = ['🥇', '🥈', '🥉', '🏅', '⭐']
  return emojis[index] || '🏅'
}

// 组件挂载时初始化数据
onMounted(() => {
  loadChallengeData()
})

const loadChallengeData = () => {
  // 模拟加载挑战数据
  console.log('加载挑战数据...')
}
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
</style>