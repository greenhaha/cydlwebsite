<template>
  <div class="challenge-page">
    <!-- 专属背景 -->
    <div class="fixed inset-0 w-full h-full">
      <div class="absolute inset-0 bg-cover bg-center bg-no-repeat"
           style="background-image: url('https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/bg3.webp')">
      </div>
      <div class="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80"></div>
      <!-- 增加纹理遮罩提升对比度 -->
      <div class="absolute inset-0 bg-black/40"></div>
    </div>

    <!-- 主内容区域 -->
    <div class="challenge-content relative z-10 min-h-screen flex flex-col items-center pt-20 pb-16">
      <!-- 顶部导航 -->
      <div class="fixed top-0 left-0 right-0 z-30 bg-black/70 backdrop-blur-lg border-b border-cyan-400/30">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div class="flex justify-center">
            <RouterLink
              to="/"
              class="inline-flex items-center px-6 py-3 text-white hover:text-cyan-400 transition-all duration-300 rounded-xl hover:bg-cyan-500/20 bg-black/40 border border-cyan-400/30 backdrop-blur-sm font-medium"
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
      <div class="page-header w-full max-w-6xl mx-auto px-6 !mt-8 !mb-16 text-center">
        <!-- 主标题容器 - 增强背景 -->
        <div class="relative bg-black/60 backdrop-blur-xl rounded-3xl border-2 border-cyan-400/40 !p-8 shadow-2xl">
          <!-- 装饰性光效 -->
          <div class="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 animate-pulse"></div>

          <div class="relative z-10">
            <!-- 顶部装饰线 -->
            <div class="flex items-center justify-center !mb-6">
              <div class="h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-32 rounded-full"></div>
              <div class="mx-4 w-4 h-4 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"></div>
              <div class="h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-32 rounded-full"></div>
            </div>

            <!-- 主标题 -->
            <div class="!mb-6">
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-black text-white !mb-4 tracking-tight leading-tight">
                <span class="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl">
                  全服挑战统计
                </span>
              </h1>
              <div class="text-shadow-glow text-cyan-400 text-lg font-medium !mb-2">GLOBAL CHALLENGE STATISTICS</div>
            </div>

            <!-- 副标题 -->
            <h2 class="text-lg md:text-xl lg:text-2xl font-bold text-white/95 !mb-6 tracking-wide max-w-3xl mx-auto text-shadow-strong">
              携手并进 · 共创辉煌 · 见证荣耀
            </h2>

            <!-- 底部装饰线 -->
            <div class="flex items-center justify-center">
              <div class="h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-48 rounded-full"></div>
              <div class="mx-4 w-2 h-2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"></div>
              <div class="h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-48 rounded-full"></div>
            </div>
          </div>
        </div>

        <!-- 描述文字 -->
        <div class="max-w-4xl mx-auto !mt-6">
          <div class="backdrop-blur-xl bg-black/60 rounded-2xl !p-6 border-2 border-white/30 shadow-2xl">
            <p class="text-lg md:text-xl text-white font-medium leading-relaxed text-shadow-strong">
              见证黄粱一梦社区的集体力量，一起完成史诗级挑战！
            </p>
          </div>
        </div>
      </div>

      <!-- 快捷按钮区域 -->
      <div class="actions-section w-full max-w-4xl mx-auto px-6 !mb-12">
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            @click="refreshStats"
            :disabled="isLoading"
            class="game-btn-primary group"
          >
            <span class="!mr-3 text-xl transition-transform duration-300" :class="{ 'animate-spin': isLoading }">
              {{ isLoading ? '🔄' : '📊' }}
            </span>
            {{ isLoading ? '加载中...' : '刷新数据' }}
          </button>
          <RouterLink
            to="/anniversary"
            class="game-btn-secondary group"
          >
            <span class="!mr-3 text-xl group-hover:scale-110 transition-transform duration-300">🎉</span>
            查看周年庆
          </RouterLink>
        </div>
      </div>

      <!-- 全服统计数据区域 -->
      <div v-if="!isLoading || challengeData.combatStats" class="stats-section w-full max-w-7xl mx-auto px-6 !mb-16">
        <div class="text-center !mb-12">
          <div class="game-section-header">
            <h3 class="game-section-title">全服挑战统计</h3>
            <div class="game-section-subtitle">GLOBAL STATISTICS</div>
            <p class="game-section-desc">全服玩家共同努力的成果</p>
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="game-stat-card group">
            <div class="stat-icon-wrapper">
              <div class="stat-icon">🎯</div>
            </div>
            <div class="stat-value">
              {{ challengeData.combatStats ? formatNumber(challengeData.combatStats.totalKills) : '加载中...' }}
            </div>
            <div class="stat-label">总击杀数</div>
            <div class="stat-label-en">TOTAL KILLS</div>
          </div>

          <div class="game-stat-card group">
            <div class="stat-icon-wrapper">
              <div class="stat-icon">🤝</div>
            </div>
            <div class="stat-value">
              {{ challengeData.combatStats ? formatNumber(challengeData.combatStats.totalAssists) : '加载中...' }}
            </div>
            <div class="stat-label">总助攻数</div>
            <div class="stat-label-en">TOTAL ASSISTS</div>
          </div>

          <div class="game-stat-card group">
            <div class="stat-icon-wrapper">
              <div class="stat-icon">⚔️</div>
            </div>
            <div class="stat-value">
              {{ challengeData.specialKillsStats ? formatNumber(challengeData.specialKillsStats.totalRevengeKills) : '加载中...' }}
            </div>
            <div class="stat-label">复仇击杀</div>
            <div class="stat-label-en">REVENGE KILLS</div>
          </div>

          <div class="game-stat-card group">
            <div class="stat-icon-wrapper">
              <div class="stat-icon">🧱</div>
            </div>
            <div class="stat-value">
              {{ challengeData.specialKillsStats ? formatNumber(challengeData.specialKillsStats.totalNoScopeKills) : '加载中...' }}
            </div>
            <div class="stat-label">穿墙击杀</div>
            <div class="stat-label-en">WALLBANG KILLS</div>
          </div>

          <div class="game-stat-card group">
            <div class="stat-icon-wrapper">
              <div class="stat-icon">👥</div>
            </div>
            <div class="stat-value">
              {{ challengeData.combatStats ? formatNumber(challengeData.combatStats.activePlayersCount) : '加载中...' }}
            </div>
            <div class="stat-label">活跃玩家</div>
            <div class="stat-label-en">ACTIVE PLAYERS</div>
          </div>

          <div class="game-stat-card group">
            <div class="stat-icon-wrapper">
              <div class="stat-icon">💀</div>
            </div>
            <div class="stat-value">
              {{ challengeData.combatStats ? formatNumber(challengeData.combatStats.totalDeaths) : '加载中...' }}
            </div>
            <div class="stat-label">总死亡数</div>
            <div class="stat-label-en">TOTAL DEATHS</div>
          </div>

          <div class="game-stat-card group">
            <div class="stat-icon-wrapper">
              <div class="stat-icon">📊</div>
            </div>
            <div class="stat-value">
              {{ challengeData.combatStats ? challengeData.combatStats.avgKillsPerPlayer.toFixed(1) : '加载中...' }}
            </div>
            <div class="stat-label">平均K/D</div>
            <div class="stat-label-en">AVG K/D</div>
          </div>

          <div class="game-stat-card group">
            <div class="stat-icon-wrapper">
              <div class="stat-icon">⏰</div>
            </div>
            <div class="stat-value">实时</div>
            <div class="stat-label">数据更新</div>
            <div class="stat-label-en">REAL-TIME</div>
          </div>
        </div>
      </div>

      <!-- 排行榜区域 -->
      <div class="leaderboard-section w-full max-w-7xl mx-auto px-6 !mb-16">
        <div class="text-center !mb-12">
          <div class="game-section-header">
            <h3 class="game-section-title">挑战排行榜</h3>
            <div class="game-section-subtitle">LEADERBOARD</div>
            <p class="game-section-desc">致敬每一位英雄</p>
          </div>
        </div>

        <!-- 排名类型切换按钮 -->
        <div class="flex flex-wrap justify-center gap-3 !mb-10">
          <button
            v-for="rankType in rankingTypes"
            :key="rankType.key"
            @click="currentRankingType = rankType.key"
            :class="[
              'game-ranking-tab',
              currentRankingType === rankType.key ? 'game-ranking-tab-active' : ''
            ]"
          >
            <span class="!mr-2 text-lg">{{ rankType.emoji }}</span>
            <span class="font-bold">{{ rankType.name }}</span>
            <span class="text-xs opacity-80 !ml-2">{{ rankType.key.toUpperCase() }}</span>
          </button>
        </div>

        <!-- 前三名特殊展示 -->
        <div v-if="currentRanking.length > 0" class="top-three-section !mb-12">
          <div class="game-podium-header">
            <h4 class="text-2xl font-black text-white !mb-2 text-shadow-strong">
              <span class="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                🏆 荣誉殿堂 🏆
              </span>
            </h4>
            <div class="text-yellow-400 font-bold text-base tracking-wider">HALL OF FAME</div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 !mt-8">
            <div
              v-for="(player, index) in currentRanking.slice(0, 3)"
              :key="`top-${player.playerId}`"
              :class="[
                'game-podium-card group',
                index === 0 ? 'gold' : index === 1 ? 'silver' : 'bronze'
              ]"
            >
              <div class="podium-rank-badge">{{ index + 1 }}</div>
              <div class="text-center">
                <div class="podium-icon">{{ getRankDisplay(index).emoji }}</div>
                <div class="podium-name">
                  {{ formatPlayerName(player.playerName) }}
                </div>
                <div :class="[
                  'podium-score',
                  getRankDisplay(index).color
                ]">
                  {{ formatNumber(player.value) }}
                </div>
                <div class="podium-category">
                  {{ getCurrentRankingTypeName() }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 完整排名列表 -->
        <div v-if="!isLoading" class="ranking-list">
          <div class="game-ranking-container">
            <div class="space-y-3">
              <div v-if="currentRanking.length === 0" class="game-empty-state">
                <div class="text-5xl !mb-4">🎯</div>
                <div class="text-xl font-bold text-white !mb-2">暂无排名数据</div>
                <div class="text-white/70">数据正在收集中，请稍后再试</div>
              </div>
              <div
                v-else
                v-for="(player, index) in currentRanking"
                :key="`rank-${player.playerId}`"
                :class="[
                  'game-ranking-item',
                  index < 3 ? 'game-ranking-item-highlight' : ''
                ]"
              >
                <div class="flex items-center space-x-4">
                  <div class="ranking-position">
                    <span :class="[
                      'rank-display',
                      index < 3 ? getRankDisplay(index).color : 'text-white/80'
                    ]">
                      {{ index < 3 ? getRankDisplay(index).emoji : `#${index + 1}` }}
                    </span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div :class="[
                      'player-name-display',
                      index < 3 ? 'text-white text-lg' : 'text-white/90 text-base'
                    ]">
                      {{ formatPlayerName(player.playerName) }}
                    </div>
                    <div class="player-steam-id">
                      Steam ID: {{ player.steamId.slice(0, 15) }}...
                    </div>
                  </div>
                </div>
                <div class="text-right flex-shrink-0">
                  <div :class="[
                    'player-score-display',
                    index < 3 ? 'text-yellow-300 text-xl' : 'text-white text-lg'
                  ]">
                    {{ formatNumber(player.value) }}
                  </div>
                  <div class="score-category">
                    {{ getCurrentRankingTypeName() }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 加载状态 -->
        <div v-else class="game-loading-state">
          <div class="animate-spin text-5xl !mb-6">🔄</div>
          <div class="text-xl text-white font-bold !mb-3">加载排行榜数据中...</div>
          <div class="text-white/70">正在从服务器获取最新数据</div>
        </div>
      </div>

      <!-- 错误提示 -->
      <div v-if="errorMessage" class="error-message w-full max-w-5xl mx-auto px-6 !mb-16">
        <div class="game-error-container">
          <div class="text-center">
            <div class="text-5xl !mb-4">❌</div>
            <div class="text-xl text-white font-bold !mb-3">加载数据时出现错误</div>
            <div class="text-white/90 text-base !mb-6 max-w-2xl mx-auto">{{ errorMessage }}</div>
            <button
              @click="loadChallengeData"
              class="game-btn-primary"
            >
              <span class="!mr-2">🔄</span>
              重试
            </button>
          </div>
        </div>
      </div>

      <!-- 底部信息栏 -->
      <div class="footer-info w-full max-w-6xl mx-auto px-6">
        <div class="game-footer-container">
          <p class="text-xl text-white font-bold !mb-3 text-shadow-strong">
            <span class="inline-flex items-center">
              <span class="!mr-2">🚀</span>
              团结就是力量，挑战永无止境
              <span class="!ml-2">🚀</span>
            </span>
          </p>
          <p class="text-white/90 text-base">
            数据每5分钟自动更新 · 见证每位玩家的精彩表现！
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { k4StatsApi, type K4ChallengeData, type K4RankingPlayer } from '@/services/api'

// 响应式数据
const isLoading = ref(true)
const errorMessage = ref('')
const currentRankingType = ref<'kills' | 'assists' | 'revenge' | 'noscope'>('kills')

// 挑战数据
const challengeData = ref<K4ChallengeData>({
  combatStats: null,
  specialKillsStats: null,
  killsRanking: [],
  assistsRanking: [],
  revengeKillsRanking: [],
  noScopeKillsRanking: []
})

// 排名类型配置
const rankingTypes = [
  { key: 'kills' as const, name: '击杀排行', emoji: '🎯' },
  { key: 'assists' as const, name: '助攻排行', emoji: '🤝' },
  { key: 'revenge' as const, name: '复仇排行', emoji: '⚔️' },
  { key: 'noscope' as const, name: '穿墙排行', emoji: '🧱' }
]

// 当前排名数据
const currentRanking = computed((): K4RankingPlayer[] => {
  switch (currentRankingType.value) {
    case 'kills':
      return challengeData.value.killsRanking
    case 'assists':
      return challengeData.value.assistsRanking
    case 'revenge':
      return challengeData.value.revengeKillsRanking
    case 'noscope':
      return challengeData.value.noScopeKillsRanking
    default:
      return []
  }
})

// 获取当前排名类型名称
const getCurrentRankingTypeName = (): string => {
  const type = rankingTypes.find(t => t.key === currentRankingType.value)
  return type ? type.name.replace('排行', '') : '数值'
}

// 格式化数字显示
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`
  }
  return num.toString()
}

// 格式化玩家名称（限制长度）
const formatPlayerName = (name: string): string => {
  return name.length > 16 ? `${name.substring(0, 16)}...` : name
}

// 获取排名显示样式
const getRankDisplay = (index: number) => {
  const displays = [
    { emoji: '🥇', color: 'text-yellow-400' },
    { emoji: '🥈', color: 'text-gray-300' },
    { emoji: '🥉', color: 'text-orange-400' }
  ]
  return displays[index] || { emoji: '🏅', color: 'text-white' }
}

// 刷新统计数据
const refreshStats = async () => {
  await loadChallengeData()
}

// 加载挑战数据
const loadChallengeData = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const data = await k4StatsApi.getAllChallengeData()
    challengeData.value = data
    console.log('K4挑战数据加载成功:', data)
  } catch (error) {
    console.error('加载K4挑战数据失败:', error)
    errorMessage.value = error instanceof Error ? error.message : '网络连接异常，请检查网络后重试'
  } finally {
    isLoading.value = false
  }
}

// 组件挂载时初始化数据
onMounted(() => {
  loadChallengeData()

  // 设置定期刷新
  setInterval(() => {
    loadChallengeData()
  }, 5 * 60 * 1000) // 每5分钟刷新一次
})
</script>

<style scoped>
/* 游戏风格按钮样式 */
.game-btn-primary {
  @apply inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black rounded-xl shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105 backdrop-blur-lg border-2 border-cyan-400/50 text-lg;
}

.game-btn-primary:disabled {
  @apply opacity-60 cursor-not-allowed hover:scale-100;
}

.game-btn-secondary {
  @apply inline-flex items-center px-8 py-4 backdrop-blur-xl bg-black/60 hover:bg-black/80 border-2 border-white/50 hover:border-cyan-400/70 text-white font-black rounded-xl shadow-2xl hover:shadow-white/20 transition-all duration-300 transform hover:scale-105 text-lg;
}

/* 游戏风格统计卡片 */
.game-stat-card {
  @apply p-6 rounded-2xl backdrop-blur-xl bg-black/70 border-2 border-cyan-400/40 shadow-2xl hover:shadow-cyan-500/30 transition-all duration-500 transform hover:scale-105 hover:bg-black/80 text-center;
}

.stat-icon-wrapper {
  margin-bottom: 1rem !important;
  @apply flex justify-center;
}

.stat-icon {
  @apply text-4xl group-hover:scale-110 transition-transform duration-300 drop-shadow-lg;
}

.stat-value {
  @apply text-2xl md:text-3xl font-black text-white text-shadow-strong;
  margin-bottom: 0.5rem !important;
}

.stat-label {
  @apply text-white font-bold text-base text-shadow;
  margin-bottom: 0.25rem !important;
}

.stat-label-en {
  @apply text-cyan-400/80 text-xs font-medium tracking-wider uppercase;
}

/* 游戏风格区域标题 */
.game-section-header {
  @apply backdrop-blur-xl bg-black/60 rounded-2xl border-2 border-white/30 shadow-2xl;
  padding: 2rem !important;
}

.game-section-title {
  @apply text-3xl md:text-4xl font-black text-white text-shadow-strong;
  margin-bottom: 0.75rem !important;
}

.game-section-subtitle {
  @apply text-cyan-400 font-bold text-base tracking-widest;
  margin-bottom: 1rem !important;
}

.game-section-desc {
  @apply text-lg md:text-xl text-white/90 max-w-3xl mx-auto font-medium text-shadow;
}

/* 游戏风格排名标签 */
.game-ranking-tab {
  @apply px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 backdrop-blur-lg border-2 text-base;
}

.game-ranking-tab:not(.game-ranking-tab-active) {
  @apply bg-black/60 text-white/80 border-white/30 hover:bg-black/80 hover:text-white hover:border-cyan-400/50;
}

.game-ranking-tab-active {
  @apply bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-cyan-400/70 shadow-lg shadow-cyan-500/30;
}

/* 游戏风格领奖台 */
.game-podium-header {
  @apply text-center backdrop-blur-xl bg-black/60 rounded-2xl border-2 border-yellow-400/40 shadow-2xl;
  margin-bottom: 2rem !important;
  padding: 1.5rem !important;
}

.game-podium-card {
  @apply p-6 rounded-2xl backdrop-blur-xl border-4 shadow-2xl transition-all duration-500 transform hover:scale-105 relative overflow-hidden;
}

.game-podium-card.gold {
  @apply bg-gradient-to-br from-yellow-500/30 to-orange-500/30 border-yellow-400/80 hover:from-yellow-500/40 hover:to-orange-500/40 shadow-yellow-500/30;
}

.game-podium-card.silver {
  @apply bg-gradient-to-br from-gray-400/30 to-gray-600/30 border-gray-400/80 hover:from-gray-400/40 hover:to-gray-600/40 shadow-gray-500/30;
}

.game-podium-card.bronze {
  @apply bg-gradient-to-br from-orange-400/30 to-orange-600/30 border-orange-400/80 hover:from-orange-400/40 hover:to-orange-600/40 shadow-orange-500/30;
}

.podium-rank-badge {
  @apply absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-black font-black text-sm shadow-lg;
}

.podium-icon {
  @apply text-5xl drop-shadow-lg;
  margin-bottom: 1rem !important;
}

.podium-name {
  @apply text-lg font-black text-white truncate text-shadow-strong;
  margin-bottom: 0.75rem !important;
}

.podium-score {
  @apply text-2xl font-black text-shadow-strong;
  margin-bottom: 0.5rem !important;
}

.podium-category {
  @apply text-white/90 text-sm font-bold text-shadow;
}

/* 游戏风格排名列表 */
.game-ranking-container {
  @apply backdrop-blur-xl bg-black/70 rounded-2xl border-2 border-white/30 shadow-2xl;
  padding: 2rem !important;
}

.game-ranking-item {
  @apply flex items-center justify-between rounded-xl transition-all duration-300 border-2 backdrop-blur-lg;
  padding: 1rem !important;
}

.game-ranking-item:not(.game-ranking-item-highlight) {
  @apply bg-black/40 hover:bg-black/60 border-white/20 hover:border-white/40;
}

.game-ranking-item-highlight {
  @apply bg-gradient-to-r from-yellow-900/30 to-yellow-800/30 border-yellow-500/50 hover:from-yellow-900/40 hover:to-yellow-800/40;
}

.ranking-position {
  @apply flex-shrink-0 w-12 text-center;
}

.rank-display {
  @apply font-black text-xl;
}

.player-name-display {
  @apply font-black truncate max-w-[250px] text-shadow;
}

.player-steam-id {
  @apply text-white/60 text-xs font-mono;
  margin-top: 0.25rem !important;
}

.player-score-display {
  @apply font-black text-shadow-strong;
}

.score-category {
  @apply text-xs text-white/70 font-medium uppercase tracking-wider;
  margin-top: 0.25rem !important;
}

/* 游戏风格加载和错误状态 */
.game-loading-state,
.game-empty-state {
  @apply text-center backdrop-blur-xl bg-black/70 rounded-2xl border-2 border-white/30 shadow-2xl;
  padding: 3rem !important;
}

.game-error-container {
  @apply backdrop-blur-xl bg-red-900/40 border-2 border-red-500/60 rounded-2xl shadow-2xl;
  padding: 2rem !important;
}

.game-footer-container {
  @apply text-center rounded-2xl backdrop-blur-xl bg-black/60 border-2 border-white/30 shadow-2xl;
  padding: 2rem !important;
}

/* 响应式优化 */
@media (max-width: 768px) {
  .game-stat-card {
    padding: 1rem !important;
  }

  .stat-value {
    @apply text-xl;
  }

  .game-podium-card {
    padding: 1rem !important;
  }

  .podium-score {
    @apply text-lg;
  }

  .game-ranking-item {
    padding: 0.75rem !important;
  }

  .player-name-display {
    @apply max-w-[120px];
  }

  .game-section-header {
    padding: 1.5rem !important;
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
.challenge-page {
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
    opacity: 0.8;
  }
}

.animate-pulse {
  animation: pulse 3s ease-in-out infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
