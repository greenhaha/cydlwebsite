<template>
  <div class="challenge-page">
    <!-- 专属背景 -->
    <div class="fixed inset-0 w-full h-full">
      <div class="absolute inset-0 bg-cover bg-center bg-no-repeat"
           style="background-image: url('https://hlympic.oss-cn-beijing.aliyuncs.com/frontend/assets/image/bg3.webp')">
      </div>
      <!-- 渐变遮罩层 -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80"></div>
      <!-- 动态粒子效果 -->
      <div class="particles"></div>
    </div>

    <!-- 主内容区域 -->
    <div class="challenge-content relative z-10 min-h-screen flex flex-col">
      <!-- 顶部导航 -->
      <div class="fixed top-0 left-0 right-0 z-30 bg-black/30 backdrop-blur-xl border-b border-white/10">
        <div class="w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <RouterLink
            to="/home"
            class="inline-flex items-center px-6 py-3 text-white/90 hover:text-white transition-all duration-300 rounded-xl hover:bg-white/10 bg-black/20 border border-white/20 hover:border-white/30 backdrop-blur-sm"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            返回主页
          </RouterLink>
        </div>
      </div>

      <!-- 标题区域 -->
      <div class="page-header flex-shrink-0 pt-22 pb-6">
        <div class="w-fulls mx-auto px-4 text-center flex justify-center flex-col items-center">
            <!-- 主标题 -->
          <div class="relative !mb-6">
            <h1 class="hero-title text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-purple-200 !mb-3 tracking-tight leading-none">
                全服挑战
              </h1>
            <div class="title-glow "></div>
            </div>

            <!-- 副标题 -->
          <div class="subtitle-container !mb-6 flex justify-center items-center flex-col">
            <h2 class="text-lg md:text-xl lg:text-2xl font-semibold text-white/95 !mb-3 tracking-wide">
              携手并进 · 共创辉煌 · 见证荣耀
            </h2>
            <div class="w-24 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
        </div>

        <!-- 描述文字 -->
          <div class="description-card max-w-xl mx-auto p-4 rounded-xl bg-black/30 backdrop-blur-xl border border-white/20 shadow-2xl">
            <p class="text-base text-white/90 leading-relaxed">
            见证黄粱一梦社区的集体力量，一起完成史诗级挑战！
          </p>
          </div>
        </div>
      </div>

      <!-- 主要内容区域 -->
      <div class="flex-1 pb-6">
        <!-- 加载状态 -->
        <div v-if="isLoading && !hasData" class="loading-container">
          <div class="loading-card">
            <div class="loading-spinner"></div>
            <p class="text-white text-lg font-semibold mt-3">正在加载挑战数据...</p>
          </div>
        </div>

        <!-- 错误状态 -->
        <div v-else-if="error" class="error-container">
          <div class="error-card">
            <div class="text-4xl !mb-3">❌</div>
            <p class="text-white text-lg !mb-2">加载数据失败</p>
            <p class="text-white/70 text-sm !mb-4">{{ error }}</p>
            <button @click="refreshStats" class="retry-btn">
              重试
            </button>
      </div>
        </div>

        <!-- 数据展示区域 -->
        <div v-else class="data-container  mx-auto px-4">
          <!-- 全服统计概览 -->
          <div class="stats-overview !mb-12">
            <div class="section-header">
              <h3 class="section-title">全服统计概览</h3>
              <p class="section-subtitle">全服玩家共同努力的成果</p>
            </div>

            <div class="stats-grid">
              <div class="stat-card">
                <div class="stat-icon">👥</div>
                <div class="stat-value">{{ formatNumber(totalPlayers) }}</div>
                <div class="stat-label">参与玩家总数</div>
                <div class="stat-glow"></div>
              </div>

              <div class="stat-card">
                <div class="stat-icon">⚔️</div>
                <div class="stat-value">{{ formatNumber(totalKills) }}</div>
                <div class="stat-label">总击杀数</div>
                <div class="stat-glow"></div>
              </div>

              <div class="stat-card">
                <div class="stat-icon">🤝</div>
                <div class="stat-value">{{ formatNumber(totalAssists) }}</div>
                <div class="stat-label">总助攻数</div>
                <div class="stat-glow"></div>
              </div>

              <div class="stat-card">
                <div class="stat-icon">⚡</div>
                <div class="stat-value">{{ formatNumber(totalFirstBlood) }}</div>
                <div class="stat-label">总首杀数</div>
                <div class="stat-glow"></div>
          </div>

              <div class="stat-card">
                <div class="stat-icon">🔫</div>
                <div class="stat-value">{{ formatNumber(totalShoots) }}</div>
                <div class="stat-label">总开火次数</div>
                <div class="stat-glow"></div>
          </div>

              <div class="stat-card">
                <div class="stat-icon">💣</div>
                <div class="stat-value">{{ formatNumber(totalGrenades) }}</div>
                <div class="stat-label">总道具投掷</div>
                <div class="stat-glow"></div>
          </div>
        </div>
      </div>

          <!-- 挑战任务区域 -->
          <div class="challenges-section">
            <div class="section-header">
              <h3 class="section-title">挑战任务排行榜</h3>
              <p class="section-subtitle">选择查看不同挑战任务的英雄榜</p>
            </div>

            <!-- 任务类型选择 -->
            <div class="task-selector !mb-8">
              <div class="task-buttons">
                <button
                  v-for="task in challengeTasks"
                  :key="task.id"
                  @click="selectedTask = task.id"
                  :class="[
                    'task-btn',
                    selectedTask === task.id ? 'task-btn-active' : 'task-btn-inactive'
                  ]"
                >
                  <span class="task-icon">{{ task.icon }}</span>
                  <span class="task-name">{{ task.name }}</span>
                  <div class="task-btn-glow"></div>
                </button>
              </div>
        </div>

            <!-- 排行榜区域 -->
            <div class="leaderboard-section">
              <!-- 任务描述卡片 -->
              <div class="task-description-card">
                <div class="task-desc-icon">{{ getCurrentTask().icon }}</div>
                <div class="task-desc-content">
                  <h4 class="task-desc-title">{{ getCurrentTask().name }}</h4>
                  <p class="task-desc-text">{{ getCurrentTask().description }}</p>
                </div>
              </div>

              <!-- 排行榜列表 -->
              <div class="leaderboard-container">
                <div v-if="getCurrentRanking().length > 0" class="ranking-list">
                  <div
                    v-for="(player, index) in getCurrentRanking()"
                    :key="`${selectedTask}-${player.steamId}`"
                    :class="[
                      'ranking-item',
                      index < 3 ? 'ranking-item-podium' : 'ranking-item-normal'
                    ]"
                    :style="{ '--delay': index * 0.1 + 's' }"
                  >
                    <!-- 排名图标 -->
                    <div class="rank-badge">
                      <span class="rank-icon">{{ getRankEmoji(index) }}</span>
                      <span class="rank-number">#{{ player.rank }}</span>
                    </div>

                    <!-- 玩家信息 -->
                    <div class="player-info">
                      <div class="player-avatar">
                        {{ player.name.charAt(0).toUpperCase() }}
                      </div>
                      <div class="player-details">
                        <div class="player-name">{{ player.name }}</div>
                        <div class="player-id">{{ player.steamId.slice(-8) }}</div>
                      </div>
                    </div>

                    <!-- 成绩显示 -->
                    <div class="score-display">
                      <div class="score-value">{{ formatNumber(player.value) }}</div>
                      <div class="score-unit">{{ getCurrentTask().unit }}</div>
                    </div>

                    <!-- 装饰光效 -->
                    <div class="item-glow"></div>
                  </div>
                </div>
                <div v-else class="no-data-display">
                  <div class="no-data-icon">🏆</div>
                  <p class="no-data-text">暂无排名数据</p>
                  <p class="no-data-hint">快来成为第一个上榜的玩家吧！</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部信息栏 -->
      <div class="footer-section">
        <div class="footer-card">
          <div class="footer-content">
            <p class="footer-slogan">🚀 团结就是力量，挑战永无止境 🚀</p>
            <p class="footer-subtitle">每个人的努力都是向胜利迈进的一步！</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { k4StatsApi, type K4AllStatistics, type K4CombinedRankingResponse, type K4RankingPlayer } from '@/services/api'

// 响应式数据
const isLoading = ref(false)
const error = ref<string | null>(null)
const allStatistics = ref<K4AllStatistics | null>(null)
const combinedRankings = ref<K4CombinedRankingResponse | null>(null)
const selectedTask = ref('kills')

// 挑战任务配置
const challengeTasks = [
  { id: 'kills', name: '击杀大师', icon: '🎯', description: '在战斗中击败敌人，展现你的枪法精准度', unit: '击杀数' },
  { id: 'firstBlood', name: '首杀王者', icon: '⚡', description: '每回合率先取得首杀，掌控比赛节奏', unit: '首杀数' },
  { id: 'assists', name: '团队之星', icon: '🤝', description: '协助队友击败敌人，展现团队合作精神', unit: '助攻数' },
  { id: 'revengeKills', name: '复仇者', icon: '💀', description: '向击败你的敌人复仇，证明你的不屈精神', unit: '复仇数' },
  { id: 'noscopeKills', name: '盲射高手', icon: '🎪', description: '不开镜击杀敌人，展现极致的反应能力', unit: '盲射数' },
  { id: 'shoots', name: '火力压制', icon: '🔫', description: '展现强大的火力输出能力', unit: '开火数' },
  { id: 'grenades', name: '道具大师', icon: '💣', description: '熟练运用各种战术道具', unit: '道具数' },
  { id: 'bombPlanted', name: '爆破专家', icon: '💥', description: '成功下包，掌控比赛节奏', unit: '下包数' }
]

// 计算属性
const hasData = computed(() => allStatistics.value !== null || combinedRankings.value !== null)

const totalPlayers = computed(() => {
  if (allStatistics.value?.combat?.totalPlayers) {
    return allStatistics.value.combat.totalPlayers
  }
  return 0
})

const totalKills = computed(() => {
  if (allStatistics.value?.combat?.statistics) {
    return allStatistics.value.combat.statistics['击杀次数'] || 0
  }
  return 0
})

const totalAssists = computed(() => {
  if (allStatistics.value?.combat?.statistics) {
    return allStatistics.value.combat.statistics['助攻次数'] || 0
  }
  return 0
})

const totalShoots = computed(() => {
  if (allStatistics.value?.combat?.statistics) {
    return allStatistics.value.combat.statistics['开火次数'] || 0
  }
  return 0
})

const totalGrenades = computed(() => {
  if (allStatistics.value?.others?.statistics) {
    return allStatistics.value.others.statistics['道具投掷次数'] || 0
  }
  return 0
})

const totalFirstBlood = computed(() => {
  if (allStatistics.value?.combat?.statistics) {
    return allStatistics.value.combat.statistics['首杀次数'] || 0
  }
  return 0
})

// 获取当前选中的任务
const getCurrentTask = () => {
  return challengeTasks.find(task => task.id === selectedTask.value) || challengeTasks[0]
}

// 响应式数据用于存储各种排名数据
const individualRankings = ref<{ [key: string]: K4RankingPlayer[] }>({})

// 获取当前选中任务的排行榜
const getCurrentRanking = (): K4RankingPlayer[] => {
  return individualRankings.value[selectedTask.value] || []
}

// 格式化数字
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toLocaleString()
}

// 获取排名表情
const getRankEmoji = (index: number) => {
  const emojis = ['🥇', '🥈', '🥉', '🏅', '⭐']
  return emojis[index] || '⭐'
}

// 加载挑战数据
const loadChallengeData = async () => {
  isLoading.value = true
  error.value = null

  try {
    // 并行请求所有数据
    const [
      statsResponse,
      killsResponse,
      firstBloodResponse,
      assistsResponse,
      revengeKillsResponse,
      noscopeKillsResponse,
      shootsResponse,
      grenadesResponse,
      bombPlantedResponse
    ] = await Promise.all([
      k4StatsApi.getAllStatistics(),
      k4StatsApi.getKillsRanking(10),
      k4StatsApi.getFirstBloodRanking(10),
      k4StatsApi.getAssistsRanking(10),
      k4StatsApi.getRevengeKillsRanking(10),
      k4StatsApi.getNoScopeKillsRanking(10),
      k4StatsApi.getShootsRanking(10),
      k4StatsApi.getGrenadesRanking(10),
      k4StatsApi.getBombPlantedRanking(10)
    ])

    // 处理统计数据
    if (statsResponse.success && statsResponse.data) {
      allStatistics.value = statsResponse.data
    }

    // 处理各种排名数据
    const rankingResponses = {
      kills: killsResponse,
      firstBlood: firstBloodResponse,
      assists: assistsResponse,
      revengeKills: revengeKillsResponse,
      noscopeKills: noscopeKillsResponse,
      shoots: shootsResponse,
      grenades: grenadesResponse,
      bombPlanted: bombPlantedResponse
    }

    // 转换排名数据格式
    Object.entries(rankingResponses).forEach(([key, response]) => {
      if (response.success && response.data) {
        individualRankings.value[key] = response.data.rankings.slice(0, 10).map((p, i) => ({
          rank: i + 1,
          steamId: p.steamId,
          name: p.playerName,
          value: p.value
        }))
      } else {
        individualRankings.value[key] = []
      }
    })

    if (!statsResponse.success) {
      throw new Error('无法获取挑战数据')
    }
  } catch (err) {
    console.error('加载挑战数据失败:', err)
    error.value = err instanceof Error ? err.message : '未知错误'
  } finally {
    isLoading.value = false
  }
}

// 刷新统计数据
const refreshStats = () => {
  loadChallengeData()
}

// 组件挂载时初始化数据
onMounted(() => {
  loadChallengeData()
})
</script>

<style scoped>
/* 基础样式 */
.challenge-page {
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

/* 粒子效果 */
.particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    radial-gradient(2px 2px at 20px 30px, rgba(255,255,255,0.2), transparent),
    radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.1), transparent),
    radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.3), transparent),
    radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.2), transparent),
    radial-gradient(2px 2px at 160px 30px, rgba(255,255,255,0.1), transparent);
  background-size: 200px 150px;
  animation: sparkle 20s linear infinite;
}

@keyframes sparkle {
  from { transform: translateY(0px); }
  to { transform: translateY(-200px); }
}

/* 英雄标题 */
.hero-title {
  position: relative;
  display: inline-block;
}

.title-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 110%;
  height: 110%;
  background: radial-gradient(ellipse, rgba(59, 130, 246, 0.2), transparent);
  filter: blur(15px);
  z-index: -1;
  animation: pulse 3s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.4; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.05); }
}

/* 按钮样式 */
.action-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2));
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.75rem;
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  overflow: hidden;
}

.action-btn:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3);
}

.action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-icon {
  font-size: 1rem;
  margin-right: 0.4rem;
}

.btn-text {
  font-size: 0.875rem;
}

.btn-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.action-btn:hover .btn-shine {
  left: 100%;
}

/* 加载和错误状态 */
.loading-container,
.error-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 1rem;
}

.loading-card,
.error-card {
  text-align: center;
  padding: 2rem;
  border-radius: 1rem;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 15px 45px rgba(0, 0, 0, 0.4);
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.retry-btn {
  padding: 0.6rem 1.2rem;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  border: none;
  border-radius: 0.5rem;
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
}

/* 区块标题 */
.section-header {
  text-align: center;
  margin-bottom: 2rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 800;
  color: white;
  margin-bottom: 0.75rem;
  background: linear-gradient(135deg, #ffffff, #e0e7ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
}

/* 统计卡片网格 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
}

.stat-card {
  position: relative;
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1));
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  text-align: center;
  transition: all 0.3s ease;
  overflow: hidden;
}

.stat-card:hover {
  transform: translateY(-6px);
  border-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 15px 45px rgba(59, 130, 246, 0.2);
}

.stat-icon {
  font-size: 2.5rem;
  margin-bottom: 0.75rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: 800;
  color: white;
  margin-bottom: 0.4rem;
}

.stat-label {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
}

.stat-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.stat-card:hover .stat-glow {
  opacity: 1;
}

/* 任务选择器 */
.task-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
}

.task-btn {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.75rem 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.75rem;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
}

.task-btn-active {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3));
  border-color: rgba(255, 255, 255, 0.4);
  color: white;
  transform: scale(1.02);
  box-shadow: 0 6px 24px rgba(59, 130, 246, 0.3);
}

.task-btn-inactive:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
  color: white;
}

.task-icon {
  font-size: 1rem;
  margin-right: 0.4rem;
}

.task-name {
  font-size: 0.8rem;
}

.task-btn-glow {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s;
}

.task-btn:hover .task-btn-glow {
  left: 100%;
}

/* 任务描述卡片 */
.task-description-card {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6));
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.task-desc-icon {
  font-size: 2.5rem;
  margin-right: 1.25rem;
  flex-shrink: 0;
}

.task-desc-content {
  flex: 1;
}

.task-desc-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.4rem;
}

.task-desc-text {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
  font-size: 0.875rem;
}

/* 排行榜列表 */
.leaderboard-container {
  max-width: 700px;
  margin: 0 auto;
}

.ranking-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.ranking-item {
  display: flex;
  align-items: center;
  padding: 1.25rem;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6));
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  animation: slideInUp 0.5s ease-out;
  animation-delay: var(--delay);
  animation-fill-mode: both;
}

.ranking-item-podium {
  border-color: rgba(255, 215, 0, 0.3);
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(0, 0, 0, 0.6));
}

.ranking-item:hover {
  transform: translateX(6px);
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 6px 24px rgba(59, 130, 246, 0.2);
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 排名徽章 */
.rank-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 1.25rem;
  flex-shrink: 0;
}

.rank-icon {
  font-size: 1.75rem;
  margin-bottom: 0.2rem;
}

.rank-number {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 600;
}

/* 玩家信息 */
.player-info {
  display: flex;
  align-items: center;
  flex: 1;
  margin-right: 0.75rem;
}

.player-avatar {
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1rem;
  margin-right: 0.75rem;
  flex-shrink: 0;
}

.player-details {
  flex: 1;
}

.player-name {
  font-size: 1rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.2rem;
  line-height: 1.2;
}

.player-id {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  font-family: 'Courier New', monospace;
}

/* 成绩显示 */
.score-display {
  text-align: right;
  flex-shrink: 0;
}

.score-value {
  font-size: 1.25rem;
  font-weight: 800;
  color: #fbbf24;
  line-height: 1;
  margin-bottom: 0.2rem;
}

.score-unit {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
}

/* 项目光效 */
.item-glow {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
  transition: left 0.6s;
}

.ranking-item:hover .item-glow {
  left: 100%;
}

/* 无数据显示 */
.no-data-display {
  text-align: center;
  padding: 3rem 1.5rem;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
}

.no-data-icon {
  font-size: 3rem;
  margin-bottom: 0.75rem;
  opacity: 0.5;
}

.no-data-text {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.4rem;
}

.no-data-hint {
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.875rem;
}

/* 底部区域 */
.footer-section {
  margin-top: 3rem;
  padding: 1.5rem 1rem;
}

.footer-card {
  max-width: 500px;
  margin: 0 auto;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  text-align: center;
}

.footer-slogan {
  font-size: 1rem;
  color: white;
  font-weight: 600;
  margin-bottom: 0.4rem;
}

.footer-subtitle {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .section-title {
    font-size: 1.75rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .task-buttons {
    flex-direction: column;
    align-items: center;
  }

  .task-btn {
    width: 180px;
    justify-content: center;
  }

  .task-description-card {
    flex-direction: column;
    text-align: center;
    padding: 1.25rem;
  }

  .task-desc-icon {
    margin-right: 0;
    margin-bottom: 0.75rem;
  }

  .ranking-item {
    flex-wrap: wrap;
    gap: 0.75rem;
    padding: 1rem;
  }

  .player-info {
    margin-right: 0;
  }

  .score-display {
    text-align: center;
  }

  .stat-card {
    padding: 1.25rem;
  }

  .stat-icon {
    font-size: 2rem;
  }

  .stat-value {
    font-size: 1.75rem;
  }
}

/* 经典弹跳动画保留 */
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
