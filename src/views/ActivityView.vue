<template>
  <div class="activity-page">
    <!-- 专属背景 -->
    <div class="fixed inset-0 w-full h-full">
      <div class="absolute inset-0 bg-cover bg-center bg-no-repeat"
           style="background-image: url('https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/bg2.webp')">
      </div>
      <!-- 渐变遮罩层 -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80"></div>
      <!-- 动态粒子效果 -->
      <div class="particles"></div>
    </div>

    <!-- 主内容区域 -->
    <div class="activity-content relative z-10 min-h-screen flex flex-col">
      <!-- 顶部导航 -->
      <div class="fixed top-0 left-0 right-0 z-30 bg-black/30 backdrop-blur-xl border-b border-white/10">
        <div class="w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <RouterLink
            to="/"
            class="inline-flex items-center px-6 py-3 text-white/90 hover:text-white transition-all duration-300 rounded-xl hover:bg-white/10 bg-black/20 border border-white/20 hover:border-white/30 backdrop-blur-sm"
          >
            <svg class="w-5 h-5 !mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            返回主页
          </RouterLink>
        </div>
      </div>

      <!-- 标题区域 -->
      <div class="page-header flex-shrink-0 pt-22 !pb-6">
        <div class="w-full mx-auto px-4 text-center flex justify-center flex-col items-center">
          <!-- 主标题 -->
          <div class="relative !mb-6">
            <h1 class="hero-title text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-200 to-orange-200 !mb-3 tracking-tight leading-none">
              活动中心
            </h1>
            <div class="title-glow"></div>
          </div>

          <!-- 副标题 -->
          <div class="subtitle-container !mb-6 flex justify-center items-center flex-col">
            <h2 class="text-lg md:text-xl lg:text-2xl font-semibold text-white/95 !mb-3 tracking-wide">
              精彩活动 · 丰厚奖励 · 荣耀排行
            </h2>
            <div class="w-24 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto rounded-full"></div>
          </div>

          <!-- 描述文字 -->
          <div class="description-card max-w-xl mx-auto p-4 rounded-xl bg-black/30 backdrop-blur-xl border border-white/20 shadow-2xl">
            <p class="text-base text-white/90 leading-relaxed">
              参与精彩活动，赢取丰厚奖励，展示你的实力与荣耀！
            </p>
          </div>
        </div>
      </div>

      <!-- 主要内容区域 -->
      <div class="flex-1 !pb-6">
        <div class="data-container mx-auto px-4">

          <!-- 第一部分：奖品轮播展示 -->
          <div class="prize-showcase !mb-12">
            <div class="section-header">
              <h3 class="section-title">精彩奖品展示</h3>
              <p class="section-subtitle">点击奖品可快速跳转到兑换区域</p>
            </div>

            <div class="prize-carousel-container">
              <div class="prize-carousel">
                <div
                  class="carousel-track"
                  :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
                >
                  <div
                    v-for="(prize, index) in featuredPrizes"
                    :key="index"
                    class="carousel-slide"
                    @click="scrollToExchange"
                  >
                    <div class="prize-card">
                      <div class="prize-image-container">
                        <img :src="prize.image" :alt="prize.name" class="prize-image">
                        <div class="image-glow"></div>
                      </div>
                      <div class="prize-info">
                        <h3 class="prize-name">{{ prize.name }}</h3>
                        <p class="prize-description">{{ prize.description }}</p>
                        <div class="prize-details">
                          <span class="prize-price">{{ prize.price }} 祈愿值</span>
                          <span class="prize-rarity">{{ prize.rarity }}</span>
                        </div>
                      </div>
                      <div class="prize-card-glow"></div>
                    </div>
                  </div>
                </div>

                <!-- 轮播指示器 -->
                <div class="carousel-indicators">
                  <button
                    v-for="(_, index) in featuredPrizes"
                    :key="index"
                    @click="currentSlide = index"
                    class="carousel-indicator"
                    :class="{ active: currentSlide === index }"
                  ></button>
                </div>
              </div>
            </div>
          </div>

          <!-- 第二部分：个人信息 -->
          <div class="personal-info !mb-12">
            <div class="section-header">
              <h3 class="section-title">个人数据</h3>
              <p class="section-subtitle">查看你的活动积分和游戏数据</p>
            </div>

            <div v-if="!authStore.isAuthenticated" class="auth-prompt">
              <div class="auth-card">
                <div class="text-6xl !mb-4">🔒</div>
                <p class="text-white/70 !mb-6">请先登录查看个人数据</p>
                <button
                  @click="$router.push('/login')"
                  class="login-btn"
                >
                  立即登录
                </button>
              </div>
            </div>

            <div v-else-if="isLoadingUserData" class="loading-container">
              <div class="loading-card">
                <div class="loading-spinner"></div>
                <p class="text-white text-lg font-semibold !mt-3">正在加载个人数据...</p>
              </div>
            </div>

            <div v-else class="stats-grid">
              <!-- 活动积分 -->
              <div class="stat-card">
                <div class="stat-icon">💎</div>
                <div class="stat-value">{{ userBalances?.wishPoints || 0 }}</div>
                <div class="stat-label">活动积分</div>
                <div class="stat-sublabel">祈愿值</div>
                <div class="stat-glow"></div>
              </div>

              <!-- 热度值 -->
              <div class="stat-card">
                <div class="stat-icon">🔥</div>
                <div class="stat-value">{{ userBalances?.credits || 0 }}</div>
                <div class="stat-label">热度值</div>
                <div class="stat-sublabel">Credits</div>
                <div class="stat-glow"></div>
              </div>

              <!-- 游玩时长 -->
              <div class="stat-card">
                <div class="stat-icon">⏰</div>
                <div class="stat-value">{{ formatPlayTime(userPlayTime) }}</div>
                <div class="stat-label">游玩时长</div>
                <div class="stat-sublabel">总时长</div>
                <div class="stat-glow"></div>
              </div>
            </div>
          </div>

          <!-- 第三部分：兑换功能 -->
          <div ref="exchangeSection" class="exchange-section !mb-12">
            <div class="section-header">
              <h3 class="section-title">兑换中心</h3>
              <p class="section-subtitle">使用祈愿值兑换精美皮肤和道具</p>
            </div>

            <!-- 用户积分显示区域 -->
            <div v-if="authStore.isAuthenticated" class="user-balances-section !mb-8">
              <div class="balances-container">
                <div class="balance-card">
                  <div class="balance-icon">💎</div>
                  <div class="balance-info">
                    <div class="balance-label">祈愿值</div>
                    <div class="balance-value">{{ formatNumber(userBalances?.wishPoints || 0) }}</div>
                  </div>
                  <div class="balance-glow"></div>
                </div>
                <div class="balance-card">
                  <div class="balance-icon">🪙</div>
                  <div class="balance-info">
                    <div class="balance-label">积分</div>
                    <div class="balance-value">{{ formatNumber(userBalances?.credits || 0) }}</div>
                  </div>
                  <div class="balance-glow"></div>
                </div>
                <div class="balance-card">
                  <div class="balance-icon">👤</div>
                  <div class="balance-info">
                    <div class="balance-label">用户</div>
                    <div class="balance-name">{{ authStore.user?.username || '玩家' }}</div>
                  </div>
                  <div class="balance-glow"></div>
                </div>
              </div>

              <!-- 兑换功能快捷入口 -->
              <div class="exchange-actions !mt-6">
                <RouterLink
                  to="/wish-credit-exchange"
                  class="exchange-action-btn"
                >
                  <div class="action-btn-icon">🔄</div>
                  <div class="action-btn-content">
                    <div class="action-btn-title">积分兑换</div>
                    <div class="action-btn-subtitle">祈愿值 ⇄ 积分互换</div>
                  </div>
                  <div class="action-btn-arrow">→</div>
                  <div class="action-btn-glow"></div>
                </RouterLink>
              </div>
            </div>

            <div v-if="!authStore.isAuthenticated" class="auth-prompt">
              <div class="auth-card">
                <div class="text-6xl !mb-4">🔒</div>
                <p class="text-white/70 !mb-6">请先登录使用兑换功能</p>
                <button
                  @click="$router.push('/login')"
                  class="login-btn"
                >
                  立即登录
                </button>
              </div>
            </div>

            <div v-else-if="isLoadingExchangeItems" class="loading-container">
              <div class="loading-card">
                <div class="loading-spinner"></div>
                <p class="text-white text-lg font-semibold !mt-3">正在加载兑换商品...</p>
              </div>
            </div>

            <div v-else class="exchange-grid">
              <div
                v-for="item in exchangeItems"
                :key="item.id"
                class="exchange-card"
              >
                <div class="exchange-image-container">
                  <img :src="item.iconUrl" :alt="item.name" class="exchange-image">
                  <div class="image-glow"></div>
                </div>

                <div class="exchange-info">
                  <h3 class="exchange-name">{{ item.name }}</h3>
                  <p class="exchange-description">{{ item.description }}</p>

                  <div class="exchange-price">
                    <span class="price-value">{{ item.wishPoints }}</span>
                    <span class="price-unit">祈愿值</span>
                  </div>

                  <div class="exchange-rarity">{{ item.rarity }}</div>

                  <button
                    @click="handleExchange(item)"
                    :disabled="!item.canExchange || (userBalances?.wishPoints || 0) < item.wishPoints || isExchanging"
                    class="exchange-btn"
                    :class="{
                      'available': item.canExchange && (userBalances?.wishPoints || 0) >= item.wishPoints,
                      'disabled': !item.canExchange || (userBalances?.wishPoints || 0) < item.wishPoints || isExchanging
                    }"
                  >
                    <span v-if="isExchanging">兑换中...</span>
                    <span v-else-if="!item.canExchange">暂不可兑换</span>
                    <span v-else-if="(userBalances?.wishPoints || 0) < item.wishPoints">祈愿值不足</span>
                    <span v-else>立即兑换</span>
                  </button>
                </div>

                <div class="exchange-card-glow"></div>
              </div>
            </div>
          </div>

          <!-- 第四部分：全服排名 -->
          <div class="server-rankings !mb-12">
            <div class="section-header">
              <h3 class="section-title">全服排行榜</h3>
              <p class="section-subtitle">活动结束后前三名将获得额外热度值奖励</p>
            </div>

            <div v-if="isLoadingRankings" class="loading-container">
              <div class="loading-card">
                <div class="loading-spinner"></div>
                <p class="text-white text-lg font-semibold !mt-3">正在加载排行榜数据...</p>
              </div>
            </div>

            <div v-else class="rankings-grid">
              <!-- 击杀排行榜 -->
              <div class="ranking-section">
                <div class="ranking-header">
                  <div class="ranking-icon"></div>
                  <h4 class="ranking-title">击杀数排行榜</h4>
                </div>
                <div class="ranking-list">
                  <div
                    v-for="(player, index) in killsRanking.slice(0, 3)"
                    :key="player.steamId"
                    class="ranking-item"
                    :class="getRankingClass(index)"
                  >
                    <div class="rank-medal">{{ getMedal(index) }}</div>
                    <div class="player-info">
                      <p class="player-name">{{ player.playerName }}</p>
                      <p class="player-id">{{ player.steamId }}</p>
                    </div>
                    <div class="player-score">
                      <p class="score-value">{{ player.value }}</p>
                      <p class="score-label">击杀</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 开火次数排行榜 -->
              <div class="ranking-section">
                <div class="ranking-header">
                  <div class="ranking-icon"></div>
                  <h4 class="ranking-title">开火次数排行榜</h4>
                </div>
                <div class="ranking-list">
                  <div
                    v-for="(player, index) in shootsRanking.slice(0, 3)"
                    :key="player.steamId"
                    class="ranking-item"
                    :class="getRankingClass(index)"
                  >
                    <div class="rank-medal">{{ getMedal(index) }}</div>
                    <div class="player-info">
                      <p class="player-name">{{ player.playerName }}</p>
                      <p class="player-id">{{ player.steamId }}</p>
                    </div>
                    <div class="player-score">
                      <p class="score-value">{{ player.value }}</p>
                      <p class="score-label">开火</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 道具投掷排行榜 -->
              <div class="ranking-section">
                <div class="ranking-header">
                  <div class="ranking-icon"></div>
                  <h4 class="ranking-title">道具投掷排行榜</h4>
                </div>
                <div class="ranking-list">
                  <div
                    v-for="(player, index) in grenadesRanking.slice(0, 3)"
                    :key="player.steamId"
                    class="ranking-item"
                    :class="getRankingClass(index)"
                  >
                    <div class="rank-medal">{{ getMedal(index) }}</div>
                    <div class="player-info">
                      <p class="player-name">{{ player.playerName }}</p>
                      <p class="player-id">{{ player.steamId }}</p>
                    </div>
                    <div class="player-score">
                      <p class="score-value">{{ player.value }}</p>
                      <p class="score-label">投掷</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <!-- 第五部分：游玩时长排行榜 -->
          <div class="playtime-rankings !mb-12">
            <div class="section-header">
              <h3 class="section-title">游玩时长排行榜</h3>
              <p class="section-subtitle">感谢各位玩家的陪伴与支持！（此排名不参与奖励）</p>
            </div>

            <div v-if="isLoadingPlayTimeRankings" class="loading-container">
              <div class="loading-card">
                <div class="loading-spinner"></div>
                <p class="text-white text-lg font-semibold !mt-3">正在加载时长排行榜...</p>
              </div>
            </div>

            <div v-else class="playtime-list">
              <div
                v-for="(player, index) in playTimeRanking.slice(0, 10)"
                :key="player.steamId"
                class="playtime-item"
                :class="{ 'top-three': index < 3 }"
              >
                <div class="playtime-rank">
                  <span v-if="index < 3" class="medal">{{ getMedal(index) }}</span>
                  <span v-else class="rank-number">{{ index + 1 }}</span>
                </div>
                <div class="playtime-player">
                  <p class="player-name">{{ player.playerName }}</p>
                  <p class="player-id">{{ player.steamId }}</p>
                </div>
                <div class="playtime-duration">
                  <p class="duration-value">{{ formatPlayTime(player.value) }}</p>
                  <p class="duration-label">游玩时长</p>
                </div>
              </div>
            </div>

            <!-- 感谢语 -->
            <div class="thanks-section">
              <div class="thanks-card">
                <div class="text-4xl !mb-4">❤️</div>
                <h3 class="text-2xl font-bold text-white !mb-4">感谢每一位玩家</h3>
                <p class="text-white/80 leading-relaxed max-w-2xl mx-auto">
                  感谢各位玩家长期以来对服务器的支持与陪伴！无论你的游戏时长是多少，都是我们前进的动力。
                  希望大家在游戏中收获快乐，结识朋友，创造美好回忆。让我们一起继续在CS2的世界中探索更多精彩！
                </p>
                <div class="text-2xl !mt-4">🎮✨🚀</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { wishExchangeApi, k4StatsApi, k4TimesApi, type WishExchangeItem, type UserBalances, type K4PlayerRankingInfo, type K4TimesPlayerRankingInfo } from '@/services/api'

// 状态管理
const authStore = useAuthStore()

// 响应式数据
const currentSlide = ref(0)
const exchangeSection = ref<HTMLElement>()
const isLoadingUserData = ref(false)
const isLoadingExchangeItems = ref(false)
const isLoadingRankings = ref(false)
const isLoadingPlayTimeRankings = ref(false)
const isExchanging = ref(false)

// 用户数据
const userBalances = ref<UserBalances | null>(null)
const userPlayTime = ref(0)

// 兑换商品
const exchangeItems = ref<WishExchangeItem[]>([])

// 排行榜数据
const killsRanking = ref<K4PlayerRankingInfo[]>([])
const shootsRanking = ref<K4PlayerRankingInfo[]>([])
const grenadesRanking = ref<K4PlayerRankingInfo[]>([])
const bombPlantedRanking = ref<K4PlayerRankingInfo[]>([])
const playTimeRanking = ref<K4TimesPlayerRankingInfo[]>([])

// 精选奖品数据（轮播展示）
const featuredPrizes = ref([
  {
    name: '传说级换肤模型',
    description: '稀有传说级角色皮肤，让你在战场上脱颖而出',
    image: 'https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/eika_mode.webp',
    price: 5000,
    rarity: '传说'
  },
  // {
  //   name: '史诗级换肤模型',
  //   description: '精美史诗级角色皮肤，展现你的独特品味',
  //   image: 'https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/eika_mode.webp',
  //   price: 3000,
  //   rarity: '史诗'
  // },
  // {
  //   name: '稀有级换肤模型',
  //   description: '经典稀有级角色皮肤，性价比超高的选择',
  //   image: 'https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/eika_mode.webp',
  //   price: 1500,
  //   rarity: '稀有'
  // }
])

// 自动轮播
let slideInterval: number | null = null

const startAutoSlide = () => {
  slideInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % featuredPrizes.value.length
  }, 5000)
}

const stopAutoSlide = () => {
  if (slideInterval) {
    clearInterval(slideInterval)
    slideInterval = null
  }
}

// 滚动到兑换区域
const scrollToExchange = () => {
  if (exchangeSection.value) {
    exchangeSection.value.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}

// 格式化游玩时长（秒转换为可读格式）
const formatPlayTime = (seconds: number): string => {
  if (!seconds) return '0小时'

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  if (hours >= 24) {
    const days = Math.floor(hours / 24)
    const remainingHours = hours % 24
    return `${days}天${remainingHours}小时`
  } else if (hours > 0) {
    return `${hours}小时${minutes}分钟`
  } else {
    return `${minutes}分钟`
  }
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

// 获取排名样式类
const getRankingClass = (index: number): string => {
  switch (index) {
    case 0: return 'gold'
    case 1: return 'silver'
    case 2: return 'bronze'
    default: return ''
  }
}

// 获取奖牌
const getMedal = (index: number): string => {
  switch (index) {
    case 0: return '🥇'
    case 1: return '🥈'
    case 2: return '🥉'
    default: return ''
  }
}

// 加载用户数据
const loadUserData = async () => {
  // 检查用户是否准备好
  if (!isUserReady()) {
    console.warn('用户数据尚未准备好，跳过加载用户数据')
    return
  }

  isLoadingUserData.value = true
  try {
    // 加载用户余额
    const balancesResponse = await wishExchangeApi.getUserBalances()
    if (balancesResponse.success && balancesResponse.data) {
      userBalances.value = balancesResponse.data
    }

    // TODO: 加载用户游玩时长（需要后端API）
    // 这里暂时设置一个示例值
    userPlayTime.value = 3600 * 24 + 1800 // 24小时30分钟
  } catch (error) {
    console.error('加载用户数据失败:', error)
  } finally {
    isLoadingUserData.value = false
  }
}

// 检查用户是否已登录并有有效的用户数据
const isUserReady = (): boolean => {
  return authStore.isAuthenticated && authStore.user?.id != null
}

// 加载兑换商品
const loadExchangeItems = async () => {
  // 检查用户是否准备好
  if (!isUserReady()) {
    console.warn('用户数据尚未准备好，跳过加载兑换商品')
    return
  }

  isLoadingExchangeItems.value = true
  try {
    const response = await wishExchangeApi.getAvailableItems(authStore.user!.id)
    if (response.success && response.data) {
      exchangeItems.value = response.data.slice(0, 12) // 显示前12个商品
    }
  } catch (error) {
    console.error('加载兑换商品失败:', error)
  } finally {
    isLoadingExchangeItems.value = false
  }
}

// 加载排行榜数据
const loadRankings = async () => {
  isLoadingRankings.value = true
  try {
    const [killsResponse, shootsResponse, grenadesResponse, bombResponse] = await Promise.all([
      k4StatsApi.getKillsRanking(10),
      k4StatsApi.getShootsRanking(10),
      k4StatsApi.getGrenadesRanking(10),
      k4StatsApi.getBombPlantedRanking(10),
    ])

    if (killsResponse.success && killsResponse.data) {
      killsRanking.value = killsResponse.data.rankings.map(r => ({
        rank: r.rank,
        steamId: r.steamId,
        playerName: r.playerName,
        value: r.value
      }))
    }

    if (shootsResponse.success && shootsResponse.data) {
      shootsRanking.value = shootsResponse.data.rankings.map(r => ({
        rank: r.rank,
        steamId: r.steamId,
        playerName: r.playerName,
        value: r.value
      }))
    }

    if (grenadesResponse.success && grenadesResponse.data) {
      grenadesRanking.value = grenadesResponse.data.rankings.map(r => ({
        rank: r.rank,
        steamId: r.steamId,
        playerName: r.playerName,
        value: r.value
      }))
    }

    if (bombResponse.success && bombResponse.data) {
      bombPlantedRanking.value = bombResponse.data.rankings.map(r => ({
        rank: r.rank,
        steamId: r.steamId,
        playerName: r.playerName,
        value: r.value
      }))
    }

  } catch (error) {
    console.error('加载排行榜数据失败:', error)
  } finally {
    isLoadingRankings.value = false
  }
}

// 加载游玩时长排行榜
const loadPlayTimeRankings = async () => {
  isLoadingPlayTimeRankings.value = true
  try {
    const response = await k4TimesApi.getPlayTimeRanking(10)
    if (response.success && response.data) {
      playTimeRanking.value = response.data.rankings
    }
  } catch (error) {
    console.error('加载游玩时长排行榜失败:', error)
  } finally {
    isLoadingPlayTimeRankings.value = false
  }
}

// 处理兑换
const handleExchange = async (item: WishExchangeItem) => {
  if (!isUserReady() || isExchanging.value) return

  if (!item.canExchange) {
    alert('该商品暂时无法兑换')
    return
  }

  if ((userBalances.value?.wishPoints || 0) < item.wishPoints) {
    alert('祈愿值不足，无法兑换')
    return
  }

  if (!confirm(`确定要花费 ${item.wishPoints} 祈愿值兑换 ${item.name} 吗？`)) {
    return
  }

  isExchanging.value = true
  try {
    const response = await wishExchangeApi.exchangeItem(authStore.user!.id, item.id)
    if (response.success) {
      alert('兑换成功！')
      // 刷新用户余额
      await loadUserData()
      // 刷新兑换商品列表
      await loadExchangeItems()
    } else {
      alert(`兑换失败：${response.message}`)
    }
  } catch (error) {
    console.error('兑换失败:', error)
    alert('兑换失败，请稍后重试')
  } finally {
    isExchanging.value = false
  }
}

// 生命周期
onMounted(async () => {
  startAutoSlide()

  // 如果用户已登录，等待用户数据准备好
  if (authStore.isAuthenticated) {
    let retries = 0
    const maxRetries = 10
    while (!isUserReady() && retries < maxRetries) {
      await new Promise(resolve => setTimeout(resolve, 100))
      retries++
    }
  }

  // 并行加载所有数据
  await Promise.all([
    loadUserData(),
    loadExchangeItems(),
    loadRankings(),
    loadPlayTimeRankings()
  ])
})

onUnmounted(() => {
  stopAutoSlide()
})
</script>

<style scoped>
/* 基础样式 */
.activity-page {
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
}

/* 粒子效果 */
.particles {
  position: absolute;
  width: 100%;
  height: 100%;
  background:
    radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 40% 80%, rgba(120, 200, 255, 0.3) 0%, transparent 50%);
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

/* 标题效果 */
.title-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%);
  animation: pulse 3s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
}

/* 加载和认证样式 */
.loading-container, .auth-prompt {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.loading-card, .auth-card {
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6));
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
}

.loading-spinner {
  width: 3rem;
  height: 3rem;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.login-btn {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border: none;
  border-radius: 0.5rem;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
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
  background: linear-gradient(135deg, #ffffff, #fbbf24);
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
  margin-bottom: 0.2rem;
}

.stat-sublabel {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
}

.stat-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
  animation: rotate 8s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 奖品轮播样式 */
.prize-carousel-container {
  max-width: 900px;
  margin: 0 auto;
}

.prize-carousel {
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.carousel-slide {
  width: 100%;
  flex-shrink: 0;
  cursor: pointer;
}

.prize-card {
  position: relative;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(245, 101, 101, 0.1));
  backdrop-filter: blur(20px);
  border: 1px solid rgba(251, 191, 36, 0.3);
  border-radius: 1rem;
  transition: all 0.3s ease;
  overflow: hidden;
}

.prize-card:hover {
  transform: translateY(-4px);
  border-color: rgba(251, 191, 36, 0.5);
  box-shadow: 0 12px 40px rgba(251, 191, 36, 0.2);
}

.prize-image-container {
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.prize-image {
  width: 8rem;
  height: 8rem;
  object-fit: cover;
  border-radius: 0.5rem;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.image-glow {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 120%;
  height: 120%;
  background: radial-gradient(circle, rgba(251, 191, 36, 0.2) 0%, transparent 70%);
  border-radius: 50%;
}

.prize-info {
  text-align: center;
}

.prize-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
}

.prize-description {
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1rem;
  line-height: 1.5;
}

.prize-details {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.prize-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: #fbbf24;
}

.prize-rarity {
  padding: 0.25rem 0.75rem;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  border-radius: 9999px;
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
}

.prize-card-glow {
  position: absolute;
  top: -100%;
  left: -100%;
  width: 300%;
  height: 300%;
  background: conic-gradient(from 0deg, transparent, rgba(251, 191, 36, 0.1), transparent);
  animation: rotate 10s linear infinite;
}

.carousel-indicators {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.carousel-indicator {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
}

.carousel-indicator.active {
  background: #fbbf24;
  transform: scale(1.2);
}

.carousel-indicator:hover:not(.active) {
  background: rgba(255, 255, 255, 0.5);
}

/* 用户积分显示区域 */
.user-balances-section {
  max-width: 1000px;
  margin: 0 auto;
}

.balances-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.balance-card {
  position: relative;
  display: flex;
  align-items: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.15));
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  transition: all 0.3s ease;
  overflow: hidden;
}

.balance-card:hover {
  transform: translateY(-3px);
  border-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 10px 30px rgba(59, 130, 246, 0.2);
}

.balance-icon {
  font-size: 2rem;
  margin-right: 1rem;
  flex-shrink: 0;
}

.balance-info {
  flex: 1;
}

.balance-label {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 0.25rem;
  font-weight: 500;
}

.balance-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fbbf24;
  line-height: 1;
}

.balance-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
  line-height: 1;
}

.balance-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.balance-card:hover .balance-glow {
  opacity: 1;
}

/* 兑换功能快捷入口 */
.exchange-actions {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}

.exchange-action-btn {
  position: relative;
  display: flex;
  align-items: center;
  padding: 1.25rem 2rem;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.15));
  backdrop-filter: blur(20px);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 1rem;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  overflow: hidden;
  min-width: 280px;
}

.exchange-action-btn:hover {
  transform: translateY(-4px) scale(1.02);
  border-color: rgba(16, 185, 129, 0.5);
  box-shadow: 0 15px 40px rgba(16, 185, 129, 0.3);
}

.action-btn-icon {
  font-size: 2rem;
  margin-right: 1rem;
  flex-shrink: 0;
  animation: rotate 3s ease-in-out infinite;
}

@keyframes rotate {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(180deg); }
}

.action-btn-content {
  flex: 1;
  text-align: left;
}

.action-btn-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.25rem;
}

.action-btn-subtitle {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
}

.action-btn-arrow {
  font-size: 1.25rem;
  margin-left: 1rem;
  color: rgba(255, 255, 255, 0.7);
  transition: transform 0.3s ease;
}

.exchange-action-btn:hover .action-btn-arrow {
  transform: translateX(4px);
}

.action-btn-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.exchange-action-btn:hover .action-btn-glow {
  opacity: 1;
}

/* 兑换商品网格 */
.exchange-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.exchange-card {
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

.exchange-card:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 12px 40px rgba(59, 130, 246, 0.2);
}

.exchange-image-container {
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.exchange-image {
  width: 6rem;
  height: 6rem;
  object-fit: cover;
  border-radius: 0.5rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.exchange-info {
  margin-bottom: 1rem;
}

.exchange-name {
  font-size: 1.125rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
}

.exchange-description {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.exchange-price {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.price-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #fbbf24;
}

.price-unit {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
}

.exchange-rarity {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  border-radius: 9999px;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.exchange-btn {
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.exchange-btn.available {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
}

.exchange-btn.available:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
}

.exchange-btn.disabled {
  background: #6b7280;
  color: #9ca3af;
  cursor: not-allowed;
  opacity: 0.6;
}

.exchange-card-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
  animation: rotate 12s linear infinite;
}

/* 排行榜网格 */
.rankings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.ranking-section {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6));
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.ranking-section:hover {
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.ranking-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.ranking-icon {
  font-size: 1.5rem;
}

.ranking-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: white;
}

.ranking-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.ranking-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.ranking-item.gold {
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(245, 158, 11, 0.2));
  border: 1px solid rgba(251, 191, 36, 0.3);
}

.ranking-item.silver {
  background: linear-gradient(135deg, rgba(156, 163, 175, 0.2), rgba(107, 114, 128, 0.2));
  border: 1px solid rgba(156, 163, 175, 0.3);
}

.ranking-item.bronze {
  background: linear-gradient(135deg, rgba(245, 101, 101, 0.2), rgba(220, 38, 38, 0.2));
  border: 1px solid rgba(245, 101, 101, 0.3);
}

.rank-medal {
  font-size: 1.5rem;
}

.player-info {
  flex: 1;
}

.player-name {
  font-weight: 600;
  color: white;
  margin-bottom: 0.25rem;
}

.player-id {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
}

.player-score {
  text-align: right;
}

.score-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.25rem;
}

.score-label {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
}

/* 游玩时长排行榜 */
.playtime-list {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.playtime-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.75rem;
  transition: all 0.3s ease;
}

.playtime-item:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.3);
}

.playtime-item.top-three {
  border-color: rgba(251, 191, 36, 0.3);
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(245, 158, 11, 0.1));
}

.playtime-rank {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
}

.medal {
  font-size: 1.5rem;
}

.rank-number {
  font-size: 1.125rem;
  font-weight: 700;
  color: white;
}

.playtime-player {
  flex: 1;
}

.playtime-duration {
  text-align: right;
}

.duration-value {
  font-size: 1.125rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.25rem;
}

.duration-label {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
}

/* 感谢语 */
.thanks-section {
  margin-top: 3rem;
}

.thanks-card {
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(168, 85, 247, 0.1));
  backdrop-filter: blur(20px);
  border: 1px solid rgba(236, 72, 153, 0.3);
  border-radius: 1rem;
  max-width: 600px;
  margin: 0 auto;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .stats-grid,
  .exchange-grid,
  .rankings-grid {
    grid-template-columns: 1fr;
  }

  .balances-container {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .balance-card {
    padding: 1.25rem;
  }

  .balance-icon {
    font-size: 1.75rem;
    margin-right: 0.75rem;
  }

  .balance-value {
    font-size: 1.25rem;
  }

  .balance-name {
    font-size: 1.125rem;
  }

  .exchange-action-btn {
    padding: 1rem 1.5rem;
    min-width: auto;
    flex-direction: column;
    text-align: center;
  }

  .action-btn-icon {
    font-size: 1.75rem;
    margin-right: 0;
    margin-bottom: 0.5rem;
  }

  .action-btn-content {
    text-align: center;
    margin-bottom: 0.5rem;
  }

  .action-btn-title {
    font-size: 1rem;
  }

  .action-btn-subtitle {
    font-size: 0.8rem;
  }

  .action-btn-arrow {
    margin-left: 0;
    transform: rotate(90deg);
  }

  .section-title {
    font-size: 1.5rem;
  }

  .hero-title {
    font-size: 2.5rem !important;
  }

  .prize-card {
    padding: 1.5rem;
  }

  .prize-image {
    width: 6rem;
    height: 6rem;
  }
}
</style>
