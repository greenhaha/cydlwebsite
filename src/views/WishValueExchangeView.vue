<template>
  <div class="wish-exchange-page">
    <!-- 专属背景 -->
    <div class="fixed inset-0 w-full h-full">
      <div class="absolute inset-0 bg-cover bg-center bg-no-repeat"
           style="background-image: url('https://oss.kigermap.com/frontend/assets/image/bg1.webp')">
      </div>
    </div>
    <div class="pointer-events-none fixed inset-0 z-0"></div>

    <!-- 主内容区域 -->
    <div class="exchange-content inset-0 h-full top-[0px] z-10 flex flex-col items-center justify-start pt-[80px] pb-8">
      <!-- 顶部导航 -->
      <div class="fixed top-0 left-0 right-0 z-99 bg-black/60 backdrop-blur-md border-b border-white/20">
        <div class="w-full !mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div class="flex items-center justify-between">
            <RouterLink
              to="/"
              class="inline-flex items-center px-4 py-2 text-white/90 hover:text-white transition-colors duration-350 rounded-lg hover:bg-white/20 bg-black/30"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              返回活动中心
            </RouterLink>

            <!-- 用户信息显示区域 -->
            <div v-if="authStore.isAuthenticated" class="flex items-center space-x-3">
              <!-- 祈愿值显示 -->
              <div class="flex items-center h-[50px] !mr-4 space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-400/50">
                <img src="https://oss.kigermap.com/frontend/assets/image/qiyun.png" class="w-6 h-6" alt="祈愿值">
                <span class="text-yellow-300 font-bold">{{ userWishPoints }}</span>
                <span class="text-white/80 text-sm">祈愿值</span>
              </div>

              <!-- 个人资料按钮 -->
              <RouterLink
                to="/profile"
                class="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-lg border border-white/20 hover:bg-white/20 transition-colors duration-200"
              >
                <div class="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <div class="text-white">
                  <span class="text-sm font-medium">{{ authStore.user?.username || '用户' }}</span>
                </div>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>

      <!-- 页面标题 -->
      <div class="page-header w-full max-w-[1280px] px-4 !mb-8 z-35 text-center">
        <div class="relative !mb-8">
          <div class="relative z-10">
            <div class="flex items-center justify-center !mb-6">
              <div class="h-px bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent w-24"></div>
              <div class="mx-3 w-2 h-2 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50"></div>
              <div class="h-px bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent w-24"></div>
            </div>

            <h1 class="text-[36px] md:text-[48px] lg:text-[56px] font-black text-white !mb-3 tracking-tight leading-none drop-shadow-2xl text-shadow-lg">
              祈愿值兑换商店
            </h1>

            <h2 class="text-[16px] md:text-[20px] lg:text-[24px] font-medium text-white/95 !mb-4 tracking-wide text-center drop-shadow-lg text-shadow">
              使用祈愿值兑换精美礼品
            </h2>

            <div class="flex items-center justify-center !mb-[32px]">
              <div class="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent w-32"></div>
              <div class="!mx-3 w-1.5 h-1.5 bg-white/60 rounded-full"></div>
              <div class="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent w-32"></div>
            </div>
          </div>
        </div>

        <div class="backdrop-blur-lg bg-black/50 rounded-lg !p-4 border border-white/30 shadow-2xl">
          <p class="text-[14px] md:text-[16px] text-white leading-relaxed max-w-lg !mx-auto text-center drop-shadow-lg text-shadow !mb-2">
            使用您累积的祈愿值兑换各种精美礼品！
          </p>
          <p class="text-white/90 text-xs text-center text-shadow">
            🎁 更多精彩礼品，持续更新中 🎁
          </p>
        </div>
      </div>

      <!-- 兑换商品展示区域 -->
      <div class="exchange-goods w-full max-w-[1200px] px-4 !mb-8 z-35">
        <!-- 分类选择 -->
        <div class="category-selector !mb-6">
          <div class="flex justify-center space-x-4 flex-wrap">
            <button
              v-for="category in categories"
              :key="category.id"
              @click="selectedCategory = category.id"
              class="px-6 py-3 rounded-lg font-medium transition-all duration-300 border !mr-2"
              :class="selectedCategory === category.id
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-purple-400/50 shadow-lg'
                : 'bg-black/30 text-white/80 border-white/20 hover:bg-black/50 hover:text-white'"
            >
              {{ category.name }}
            </button>
          </div>
        </div>

        <!-- 商品列表 -->
        <div v-if="isLoadingGoods" class="flex items-center justify-center py-12">
          <div class="flex items-center space-x-3">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
            <span class="text-white">正在加载兑换商品...</span>
          </div>
        </div>

        <div v-else-if="filteredGoods.length === 0" class="text-center py-12">
          <div class="w-24 h-24 bg-gray-700/50 rounded-full flex items-center justify-center !mx-auto !mb-4">
            <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
            </svg>
          </div>
          <h3 class="text-white text-xl font-bold !mb-2">暂无商品</h3>
          <p class="text-gray-400">该分类下暂时没有可兑换的商品</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            v-for="good in filteredGoods"
            :key="good.id"
            class="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl overflow-hidden border border-gray-600/30 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
          >
            <!-- 商品图片 -->
            <div class="relative h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20">
              <img
                :src="good.iconUrl"
                :alt="good.name"
                class="w-full h-full object-cover"
                @error="handleImageError"
              >
              <!-- 稀有度标签 -->
              <div
                class="absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold"
                :class="getRarityClass(good.rarity)"
              >
                {{ good.rarity }}
              </div>
            </div>

            <!-- 商品信息 -->
            <div class="p-4">
              <h3 class="text-white font-bold text-lg !mb-2 line-clamp-2">{{ good.name }}</h3>
              <p class="text-gray-300 text-sm !mb-3 line-clamp-2">{{ good.description }}</p>

              <!-- 价格 -->
              <div class="flex items-center justify-between !mb-4">
                <div class="flex items-center space-x-2">
                  <img src="https://oss.kigermap.com/frontend/assets/image/qiyun.png" class="w-5 h-5" alt="祈愿值">
                  <span class="text-yellow-300 font-bold text-lg">{{ good.wishPoints }}</span>
                </div>
                <span class="text-gray-400 text-sm" v-if="!good.canExchange">已兑换</span>
              </div>

              <!-- 兑换按钮 -->
              <button
                @click="exchangeGood(good)"
                :disabled="!canExchange(good)"
                class="w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                :class="canExchange(good)
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                  : 'bg-gray-600 text-gray-400'"
              >
                {{ getExchangeButtonText(good) }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 兑换记录 -->
      <div class="exchange-history w-full max-w-[1200px] px-4 !mb-8 z-35">
        <div class="backdrop-blur-lg bg-black/50 rounded-xl p-6 border border-white/30 shadow-2xl">
          <div class="flex items-center justify-between !mb-4">
            <h3 class="text-white text-xl font-bold">兑换记录</h3>
            <button
              @click="loadExchangeHistory"
              class="text-purple-300 hover:text-purple-200 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
            </button>
          </div>

          <div v-if="isLoadingHistory" class="flex items-center justify-center py-8">
            <div class="flex items-center space-x-3">
              <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
              <span class="text-white">正在加载兑换记录...</span>
            </div>
          </div>

          <div v-else-if="exchangeHistory.length === 0" class="text-center py-8">
            <p class="text-gray-400">暂无兑换记录</p>
          </div>

          <div v-else class="space-y-3 max-h-96 overflow-y-auto">
            <div
              v-for="record in exchangeHistory"
              :key="record.id"
              class="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg"
            >
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 rounded bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                  <span class="text-white font-bold">{{ (record.itemName || '未知物品').charAt(0) }}</span>
                </div>
                <div>
                  <h4 class="text-white font-medium">{{ record.itemName || '未知物品' }}</h4>
                  <p class="text-gray-400 text-sm">{{ formatDateTime(record.exchangeTime) }}</p>
                </div>
              </div>
              <div class="text-right">
                <div class="flex items-center space-x-1">
                  <img src="https://oss.kigermap.com/frontend/assets/image/qiyun.png" class="w-4 h-4" alt="祈愿值">
                  <span class="text-yellow-300 font-bold">-{{ record.wishPointsUsed || 0 }}</span>
                </div>
                <span
                  class="text-xs px-2 py-1 rounded"
                  :class="getStatusClass(record.status || 'unknown')"
                >
                  {{ getStatusText(record.status || 'unknown') }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 兑换确认弹窗 -->
    <div v-if="showExchangeConfirm" class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 max-w-md w-full !mx-4 border border-white/20 shadow-2xl">
        <div class="text-center ">
          <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center !mx-auto !mb-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>

          <h3 class="text-white text-xl font-bold !mb-2">确认兑换</h3>
          <p class="text-gray-300 !mb-4">您确定要兑换以下商品吗？</p>

          <div v-if="selectedGood" class="bg-gray-700/30 rounded-lg p-4 !mb-6">
            <div class="flex items-center space-x-3">
              <img :src="selectedGood.iconUrl" class="w-16 h-16 rounded object-cover" :alt="selectedGood.name">
              <div class="text-left !ml-4">
                <h4 class="text-white font-medium">{{ selectedGood.name }}</h4>
                <div class="flex items-center space-x-2 mt-1">
                  <img src="https://oss.kigermap.com/frontend/assets/image/qiyun.png" class="w-4 h-4" alt="祈愿值">
                  <span class="text-yellow-300 font-bold">{{ selectedGood.wishPoints }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="flex space-x-3">
            <button
              @click="cancelExchange"
              class="flex-1 py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors !mr-2"
            >
              取消
            </button>
            <button
              @click="confirmExchange"
              :disabled="isExchanging"
              class="flex-1 py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {{ isExchanging ? '兑换中...' : '确认兑换' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { wishExchangeApi, type WishExchangeItem, type UserWishExchange } from '@/services/api'

// 路由和认证store
const router = useRouter()
const authStore = useAuthStore()

// 响应式数据
const userWishPoints = ref(0)
const userCredits = ref(0)
const selectedCategory = ref('all')
const isLoadingGoods = ref(false)
const isLoadingHistory = ref(false)
const isLoadingBalances = ref(false)
const isExchanging = ref(false)
const showExchangeConfirm = ref(false)
const selectedGood = ref<WishExchangeItem | null>(null)

// 商品分类
const categories = ref([
  { id: 'all', name: '全部' },
  { id: '人物模型', name: '模型皮肤' },
  { id: '武器皮肤', name: '武器皮肤' },
  { id: '称号', name: '称号头衔' },
  { id: '其他', name: '其他物品' }
])

// 兑换商品列表
const exchangeGoods = ref<WishExchangeItem[]>([])

// 兑换记录
const exchangeHistory = ref<UserWishExchange[]>([])

// 过滤商品
const filteredGoods = computed(() => {
  if (selectedCategory.value === 'all') {
    return exchangeGoods.value
  }
  return exchangeGoods.value.filter(good => good.category === selectedCategory.value)
})

// 检查是否可以兑换
const canExchange = (good: WishExchangeItem) => {
  return userWishPoints.value >= good.wishPoints && good.canExchange
}

// 获取兑换按钮文本
const getExchangeButtonText = (good: WishExchangeItem) => {
  if (!good.canExchange) return '已兑换'
  if (userWishPoints.value < good.wishPoints) return '祈愿值不足'
  return '立即兑换'
}

// 获取稀有度样式
const getRarityClass = (rarity: string) => {
  switch (rarity) {
    case '传说级':
    case 'legendary':
      return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
    case '史诗级':
    case 'epic':
      return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
    case '稀有级':
    case 'rare':
      return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
    case '普通级':
    case 'common':
      return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
    default:
      return 'bg-gradient-to-r from-gray-500 to-slate-500 text-white'
  }
}

// 获取状态样式
const getStatusClass = (status: string) => {
  switch (status) {
    case 'completed':
    case '已完成':
      return 'bg-green-500/20 text-green-300'
    case 'pending':
    case '处理中':
      return 'bg-yellow-500/20 text-yellow-300'
    case 'failed':
    case '失败':
      return 'bg-red-500/20 text-red-300'
    default:
      return 'bg-gray-500/20 text-gray-300'
  }
}

// 获取状态文本
const getStatusText = (status: string) => {
  switch (status) {
    case 'completed':
      return '已完成'
    case 'pending':
      return '处理中'
    case 'failed':
      return '失败'
    default:
      return '未知'
  }
}

// 获取用户ID
const getUserId = (): number => {
  if (!authStore.user?.id) {
    throw new Error('用户未登录')
  }
  return authStore.user.id
}

// 检查用户是否已登录并有有效的用户数据
const isUserReady = (): boolean => {
  return authStore.isAuthenticated && authStore.user?.id != null
}

// 加载用户余额
const loadUserBalances = async () => {
  if (isLoadingBalances.value) return

  isLoadingBalances.value = true
  try {
    const response = await wishExchangeApi.getUserBalances()
    console.log(response)
    if (response.success && response.data) {
      userWishPoints.value = response.data.wishPoints || 0
      userCredits.value = response.data.credits || 0
    }
  } catch (error) {
    console.error('加载用户余额失败:', error)
    // 如果API调用失败，可以从authStore获取基本信息
    userWishPoints.value = 0
  } finally {
    isLoadingBalances.value = false
  }
}

// 加载兑换商品
const loadExchangeGoods = async () => {
  if (isLoadingGoods.value) return

  // 检查用户是否准备好
  if (!isUserReady()) {
    console.warn('用户数据尚未准备好，跳过加载兑换商品')
    return
  }

  isLoadingGoods.value = true
  try {
    const userId = getUserId()
    const response = await wishExchangeApi.getAvailableItems(userId)
    if (response.success && response.data) {
      exchangeGoods.value = response.data
    }
  } catch (error) {
    console.error('加载兑换商品失败:', error)
    exchangeGoods.value = []
  } finally {
    isLoadingGoods.value = false
  }
}

// 加载商品分类
const loadCategories = async () => {
  try {
    const response = await wishExchangeApi.getAllCategories()
    if (response.success && response.data) {
      // 更新分类列表
      const serverCategories = response.data.map(category => ({
        id: category,
        name: getCategoryDisplayName(category)
      }))
      categories.value = [
        { id: 'all', name: '全部' },
        ...serverCategories
      ]
    }
  } catch (error) {
    console.error('加载分类列表失败:', error)
  }
}

// 获取分类显示名称
const getCategoryDisplayName = (category: string): string => {
  const categoryMap: Record<string, string> = {
    '人物模型': '模型皮肤',
    '武器皮肤': '武器皮肤',
    '称号': '称号头衔',
    '其他': '其他物品'
  }
  return categoryMap[category] || category
}

// 兑换商品
const exchangeGood = (good: WishExchangeItem) => {
  if (!canExchange(good)) return
  selectedGood.value = good
  showExchangeConfirm.value = true
}

// 取消兑换
const cancelExchange = () => {
  showExchangeConfirm.value = false
  selectedGood.value = null
}

// 确认兑换
const confirmExchange = async () => {
  if (!selectedGood.value) return

  isExchanging.value = true

  try {
    const userId = getUserId()
    const response = await wishExchangeApi.exchangeItem(userId, selectedGood.value.id)

    if (response.success && response.data) {
      // 扣除祈愿值
      userWishPoints.value -= selectedGood.value.wishPoints

      // 更新商品状态
      const goodIndex = exchangeGoods.value.findIndex(g => g.id === selectedGood.value!.id)
      if (goodIndex !== -1) {
        exchangeGoods.value[goodIndex].canExchange = false
      }

      // 添加兑换记录到历史记录
      exchangeHistory.value.unshift(response.data)

      alert('兑换成功！')
    } else {
      throw new Error(response.message || '兑换失败')
    }

  } catch (error) {
    console.error('兑换失败:', error)
    const errorMessage = error instanceof Error ? error.message : '兑换失败，请稍后重试'
    alert(errorMessage)
  } finally {
    isExchanging.value = false
    showExchangeConfirm.value = false
    selectedGood.value = null
  }
}

// 加载兑换记录
const loadExchangeHistory = async () => {
  if (isLoadingHistory.value) return

  // 检查用户是否准备好
  if (!isUserReady()) {
    console.warn('用户数据尚未准备好，跳过加载兑换记录')
    return
  }

  isLoadingHistory.value = true
  try {
    const userId = getUserId()
    const response = await wishExchangeApi.getUserExchangeHistory(userId)
    if (response.success && response.data) {
      exchangeHistory.value = response.data
    } else {
      exchangeHistory.value = []
    }
  } catch (error) {
    console.error('加载兑换记录失败:', error)
    // 只显示祈愿值兑换物品的记录，不显示其他类型的兑换记录
    exchangeHistory.value = []
  } finally {
    isLoadingHistory.value = false
  }
}

// 处理图片错误
const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = 'https://oss.kigermap.com/frontend/assets/image/image-gallery.png'
}

// 格式化日期时间
const formatDateTime = (dateString: string) => {
  if (!dateString) return '未知'

  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return '未知'
  }
}

// 组件挂载时初始化数据
onMounted(async () => {
  // 检查认证状态
  if (!authStore.isAuthenticated) {
    router.push('/login')
    return
  }

  // 等待用户数据准备好
  let retries = 0
  const maxRetries = 10
  while (!isUserReady() && retries < maxRetries) {
    await new Promise(resolve => setTimeout(resolve, 100))
    retries++
  }

  // if (!isUserReady()) {
  //   console.error('用户数据加载超时')
  //   router.push('/login')
  //   return
  // }

  // 并行加载数据
  await Promise.all([
    loadUserBalances(),
    loadCategories(),
    loadExchangeGoods(),
    loadExchangeHistory()
  ])
})
</script>

<style scoped>
.text-shadow {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.text-shadow-lg {
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
