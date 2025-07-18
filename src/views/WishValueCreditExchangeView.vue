<template>
  <div class="wish-credit-exchange-page">
    <!-- 专属背景 -->
    <div class="fixed inset-0 w-full h-full">
      <div class="absolute inset-0 bg-cover bg-center bg-no-repeat" 
           style="background-image: url('https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/bg1.webp')">
      </div>
    </div>
    <div class="pointer-events-none fixed inset-0 z-0"></div>

    <!-- 主内容区域 -->
    <div class="exchange-content inset-0 h-full top-[0px] z-10 flex flex-col items-center justify-start pt-[80px] pb-8">
      <!-- 顶部导航 -->
      <div class="fixed top-0 left-0 right-0 z-99 bg-black/60 backdrop-blur-md border-b border-white/20">
        <div class="w-full mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div class="flex items-center justify-between">
            <RouterLink 
              to="/"
              class="inline-flex items-center px-4 py-2 text-white/90 hover:text-white transition-colors duration-350 rounded-lg hover:bg-white/20 bg-black/30"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              返回主页
            </RouterLink>
            
            <!-- 用户信息显示区域 -->
            <div v-if="authStore.isAuthenticated" class="flex items-center space-x-3">
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
              祈愿值兑换中心
            </h1>
            
            <h2 class="text-[16px] md:text-[20px] lg:text-[24px] font-medium text-white/95 !mb-4 tracking-wide text-center drop-shadow-lg text-shadow">
              祈愿值 ⇄ Credits积分 双向兑换
            </h2>
            
            <div class="flex items-center justify-center !mb-[32px]">
              <div class="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent w-32"></div>
              <div class="!mx-3 w-1.5 h-1.5 bg-white/60 rounded-full"></div>
              <div class="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent w-32"></div>
            </div>
          </div>
        </div>
        
        <div class="backdrop-blur-lg bg-black/50 rounded-lg !p-4 border border-white/30 shadow-2xl">
          <p class="text-[14px] md:text-[16px] text-white leading-relaxed  mx-auto text-center drop-shadow-lg text-shadow !mb-2">
            1:1比例兑换，祈愿值与Credits积分互相转换
          </p>
          <p class="text-white/90 text-xs text-center text-shadow">
            💱 实时汇率1:1，无手续费 💱
          </p>
        </div>
      </div>

      <!-- 余额显示区域 -->
      <div class="balance-display w-full max-w-[800px] px-4 !mb-8 z-35">
        <div class="backdrop-blur-lg bg-black/50 rounded-xl p-6 border border-white/30 shadow-2xl">
          <h3 class="text-white text-xl font-bold !mb-6 text-center">账户余额</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- 祈愿值余额 -->
            <div class="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-6 border border-purple-400/30">
              <div class="flex items-center justify-center !mb-4">
                <img src="https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/qiyun.png" class="w-12 h-12" alt="祈愿值">
              </div>
              <h4 class="text-white font-bold text-lg text-center !mb-2">祈愿值</h4>
              <div class="text-center">
                <span class="text-yellow-300 font-black text-3xl">{{ userWishPoints }}</span>
              </div>
              <p class="text-purple-200 text-sm text-center !mt-2">在抽奖系统中获得</p>
            </div>

            <!-- Credits积分余额 -->
            <div class="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg p-6 border border-blue-400/30">
              <div class="flex items-center justify-center !mb-4">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                  </svg>
                </div>
              </div>
              <h4 class="text-white font-bold text-lg text-center !mb-2">Credits积分</h4>
              <div class="text-center">
                <span class="text-cyan-300 font-black text-3xl">{{ userCredits }}</span>
              </div>
              <p class="text-blue-200 text-sm text-center !mt-2">游戏内消费积分</p>
            </div>
          </div>

          <!-- 刷新按钮 -->
          <div class="text-center !mt-6">
            <button
              @click="refreshBalances"
              :disabled="isRefreshing"
              class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              <svg 
                class="w-4 h-4 mr-2" 
                :class="{ 'animate-spin': isRefreshing }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              {{ isRefreshing ? '刷新中...' : '刷新余额' }}
            </button>
          </div>
        </div>
      </div>

      <!-- 兑换操作区域 -->
      <div class="exchange-operations w-full max-w-[800px] px-4 !mb-8 z-35">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 祈愿值 → Credits -->
          <div class="backdrop-blur-lg bg-black/50 rounded-xl p-6 border border-white/30 shadow-2xl">
            <div class="text-center !mb-6">
              <h3 class="text-white text-xl font-bold !mb-2">祈愿值 → Credits</h3>
              <p class="text-gray-300 text-sm">将祈愿值兑换为Credits积分</p>
            </div>

            <div class="space-y-4">
              <div>
                <label class="block text-white text-sm font-medium !mb-2">兑换数量</label>
                <input
                  v-model.number="wishToCreditsAmount"
                  type="number"
                  min="1"
                  :max="userWishPoints"
                  placeholder="输入要兑换的祈愿值数量"
                  class="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                >
              </div>

              <div class="bg-gray-700/30 rounded-lg p-3">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-400">兑换比例:</span>
                  <span class="text-white">1:1</span>
                </div>
                <div class="flex justify-between text-sm !mt-1">
                  <span class="text-gray-400">您将获得:</span>
                  <span class="text-cyan-300 font-bold">{{ wishToCreditsAmount || 0 }} Credits</span>
                </div>
              </div>

              <button
                @click="exchangeWishToCredits"
                :disabled="!canExchangeWishToCredits || isExchanging"
                class="w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                {{ isExchanging ? '兑换中...' : '兑换为Credits' }}
              </button>

              <p v-if="!canExchangeWishToCredits" class="text-red-400 text-sm text-center">
                {{ getWishToCreditsErrorMessage }}
              </p>
            </div>
          </div>

          <!-- Credits → 祈愿值 -->
          <div class="backdrop-blur-lg bg-black/50 rounded-xl p-6 border border-white/30 shadow-2xl">
            <div class="text-center !mb-6">
              <h3 class="text-white text-xl font-bold !mb-2">Credits → 祈愿值</h3>
              <p class="text-gray-300 text-sm">将Credits积分兑换为祈愿值</p>
            </div>

            <div class="space-y-4">
              <div>
                <label class="block text-white text-sm font-medium !mb-2">兑换数量</label>
                <input
                  v-model.number="creditsToWishAmount"
                  type="number"
                  min="1"
                  :max="userCredits"
                  placeholder="输入要兑换的Credits数量"
                  class="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
              </div>

              <div class="bg-gray-700/30 rounded-lg p-3">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-400">兑换比例:</span>
                  <span class="text-white">1:1</span>
                </div>
                <div class="flex justify-between text-sm !mt-1">
                  <span class="text-gray-400">您将获得:</span>
                  <span class="text-yellow-300 font-bold">{{ creditsToWishAmount || 0 }} 祈愿值</span>
                </div>
              </div>

              <button
                @click="exchangeCreditsToWish"
                :disabled="!canExchangeCreditsToWish || isExchanging"
                class="w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
              >
                {{ isExchanging ? '兑换中...' : '兑换为祈愿值' }}
              </button>

              <p v-if="!canExchangeCreditsToWish" class="text-red-400 text-sm text-center">
                {{ getCreditsToWishErrorMessage }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 兑换记录 -->
      <div class="exchange-history w-full max-w-[1000px] px-4 !mb-8 z-35">
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
              class="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg"
            >
              <div class="flex items-center space-x-4">
                <!-- 兑换方向图标 -->
                <div class="flex items-center space-x-2">
                  <img 
                    v-if="record.fromType === 'wish'"
                    src="https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/qiyun.png" 
                    class="w-8 h-8" 
                    alt="祈愿值"
                  >
                  <div 
                    v-else
                    class="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center"
                  >
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                    </svg>
                  </div>
                  
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                  </svg>
                  
                  <img 
                    v-if="record.exchangeType === 'CREDIT_TO_WISH' || record.toType === 'wish'"
                    src="https://greenhaha.oss-cn-beijing.aliyuncs.com/frontend/assets/image/qiyun.png" 
                    class="w-8 h-8" 
                    alt="祈愿值"
                  >
                  <div 
                    v-else
                    class="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center"
                  >
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                    </svg>
                  </div>
                </div>
                
                <div>
                  <h4 class="text-white font-medium">{{ getExchangeTypeText(record) }}</h4>
                  <p class="text-gray-400 text-sm">{{ formatDateTime(record.createTime || record.exchangeTime) }}</p>
                </div>
              </div>
              
              <div class="text-right">
                <div class="text-white font-bold">{{ record.amount }}</div>
                <span 
                  class="text-xs px-2 py-1 rounded"
                  :class="getStatusClass(record.status)"
                >
                  {{ getStatusText(record.status) }}
                </span>
              </div>
            </div>
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
import { exchangeApi, type CreditExchangeRecord } from '@/services/api'

// 路由和认证store
const router = useRouter()
const authStore = useAuthStore()

// 响应式数据
const userWishPoints = ref(0)
const userCredits = ref(0)
const wishToCreditsAmount = ref<number | undefined>(undefined)
const creditsToWishAmount = ref<number | undefined>(undefined)
const isRefreshing = ref(false)
const isLoadingHistory = ref(false)
const isExchanging = ref(false)

// 兑换记录
const exchangeHistory = ref<CreditExchangeRecord[]>([])

// 计算属性
const canExchangeWishToCredits = computed(() => {
  return wishToCreditsAmount.value && 
         wishToCreditsAmount.value > 0 && 
         wishToCreditsAmount.value <= userWishPoints.value
})

const canExchangeCreditsToWish = computed(() => {
  return creditsToWishAmount.value && 
         creditsToWishAmount.value > 0 && 
         creditsToWishAmount.value <= userCredits.value
})

const getWishToCreditsErrorMessage = computed(() => {
  if (!wishToCreditsAmount.value || wishToCreditsAmount.value <= 0) {
    return '请输入有效的兑换数量'
  }
  if (wishToCreditsAmount.value > userWishPoints.value) {
    return '祈愿值余额不足'
  }
  return ''
})

const getCreditsToWishErrorMessage = computed(() => {
  if (!creditsToWishAmount.value || creditsToWishAmount.value <= 0) {
    return '请输入有效的兑换数量'
  }
  if (creditsToWishAmount.value > userCredits.value) {
    return 'Credits余额不足'
  }
  return ''
})

// 刷新余额
const refreshBalances = async () => {
  isRefreshing.value = true
  
  try {
    // 调用后端API获取用户余额
    const response = await exchangeApi.getUserBalances()
    
    if (response.success && response.data) {
      userWishPoints.value = response.data.wishPoints
      userCredits.value = response.data.credits
    } else {
      throw new Error(response.message || '获取余额失败')
    }
    
  } catch (error) {
    console.error('刷新余额失败:', error)
    alert('刷新余额失败，请稍后重试')
  } finally {
    isRefreshing.value = false
  }
}

// 祈愿值兑换为Credits
const exchangeWishToCredits = async () => {
  if (!canExchangeWishToCredits.value || isExchanging.value) return
  
  const amount = wishToCreditsAmount.value!
  
  if (!confirm(`确认将 ${amount} 祈愿值兑换为 ${amount} Credits吗？`)) {
    return
  }
  
  isExchanging.value = true
  
  try {
    // 调用后端API进行兑换
    const response = await exchangeApi.exchangeWishToCredits({ amount })
    
    if (response.success) {
      // 刷新余额
      await refreshBalances()
      
      // 重新加载兑换记录
      await loadExchangeHistory()
      
      // 清空输入
      wishToCreditsAmount.value = undefined
      
      alert('兑换成功！')
    } else {
      throw new Error(response.message || '兑换失败')
    }
    
  } catch (error) {
    console.error('兑换失败:', error)
    alert('兑换失败，请稍后重试')
  } finally {
    isExchanging.value = false
  }
}

// Credits兑换为祈愿值
const exchangeCreditsToWish = async () => {
  if (!canExchangeCreditsToWish.value || isExchanging.value) return
  
  const amount = creditsToWishAmount.value!
  
  if (!confirm(`确认将 ${amount} Credits兑换为 ${amount} 祈愿值吗？`)) {
    return
  }
  
  isExchanging.value = true
  
  try {
    // 调用后端API进行兑换
    const response = await exchangeApi.exchangeCreditsToWish({ amount })
    
    if (response.success) {
      // 刷新余额
      await refreshBalances()
      
      // 重新加载兑换记录
      await loadExchangeHistory()
      
      // 清空输入
      creditsToWishAmount.value = undefined
      
      alert('兑换成功！')
    } else {
      throw new Error(response.message || '兑换失败')
    }
    
  } catch (error) {
    console.error('兑换失败:', error)
    alert('兑换失败，请稍后重试')
  } finally {
    isExchanging.value = false
  }
}

// 加载兑换记录
const loadExchangeHistory = async () => {
  isLoadingHistory.value = true
  
  try {
    // 调用后端API获取兑换记录
    const response = await exchangeApi.getCreditExchangeHistory()
    
    if (response.success && response.data) {
      exchangeHistory.value = response.data
    } else {
      throw new Error(response.message || '获取兑换记录失败')
    }
    
  } catch (error) {
    console.error('加载兑换记录失败:', error)
  } finally {
    isLoadingHistory.value = false
  }
}

// 获取兑换类型文本
const getExchangeTypeText = (record: CreditExchangeRecord) => {
  if (record.exchangeType === 'WISH_TO_CREDIT') {
    return '祈愿值 → Credits'
  } else if (record.exchangeType === 'CREDIT_TO_WISH') {
    return 'Credits → 祈愿值'
  }
  // 兼容旧格式
  if (record.fromType === 'wish' && record.toType === 'credits') {
    return '祈愿值 → Credits'
  } else if (record.fromType === 'credits' && record.toType === 'wish') {
    return 'Credits → 祈愿值'
  }
  return '未知兑换'
}

// 获取状态样式
const getStatusClass = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-500/20 text-green-300'
    case 'pending':
      return 'bg-yellow-500/20 text-yellow-300'
    case 'failed':
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
  
  // 加载数据
  await refreshBalances()
  await loadExchangeHistory()
})
</script>

<style scoped>
.text-shadow {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.text-shadow-lg {
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
}

/* 隐藏数字输入框的上下箭头 */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>
