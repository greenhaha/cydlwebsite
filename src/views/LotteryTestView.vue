<template>
  <div class="lottery-test-page p-8">
    <h1 class="text-3xl font-bold mb-6">抽奖API测试页面</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- 当前活动信息 -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4">当前活动信息</h2>
        <button @click="loadCurrentActivity" class="bg-blue-500 text-white px-4 py-2 rounded mb-4">
          加载当前活动
        </button>
        <div v-if="currentActivity" class="space-y-2">
          <p><strong>活动名称:</strong> {{ currentActivity.name }}</p>
          <p><strong>活动描述:</strong> {{ currentActivity.description }}</p>
          <p><strong>每日限制:</strong> {{ currentActivity.dailyLimit }}</p>
          <p><strong>是否需要签到:</strong> {{ currentActivity.requireSignin ? '是' : '否' }}</p>
          <p><strong>是否活跃:</strong> {{ currentActivity.isActive ? '是' : '否' }}</p>
        </div>
      </div>

      <!-- 显示奖品 -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4">显示奖品 (12格子)</h2>
        <button @click="loadDisplayPrizes" class="bg-green-500 text-white px-4 py-2 rounded mb-4">
          加载显示奖品
        </button>
        <div v-if="displayPrizes.length > 0" class="grid grid-cols-3 gap-2">
          <div v-for="(prize, index) in displayPrizes" :key="index" 
               class="border p-2 rounded text-center text-sm">
            <img :src="prize.icon" :alt="prize.name" class="w-8 h-8 mx-auto mb-1">
            <p class="font-medium">{{ prize.name }}</p>
            <p class="text-gray-600">{{ prize.value }}</p>
            <p class="text-xs text-gray-500">{{ prize.probability }}%</p>
          </div>
        </div>
      </div>

      <!-- 实际奖品 -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4">实际奖品 (抽奖池)</h2>
        <button @click="loadActualPrizes" class="bg-purple-500 text-white px-4 py-2 rounded mb-4">
          加载实际奖品
        </button>
        <div v-if="actualPrizes.length > 0" class="space-y-2">
          <div v-for="(prize, index) in actualPrizes" :key="index" 
               class="border p-2 rounded flex items-center space-x-3">
            <img :src="prize.icon" :alt="prize.name" class="w-6 h-6">
            <div class="flex-1">
              <p class="font-medium">{{ prize.name }}</p>
              <p class="text-sm text-gray-600">{{ prize.value }}</p>
            </div>
            <p class="text-sm text-gray-500">{{ prize.probability }}%</p>
          </div>
        </div>
      </div>

      <!-- 抽奖测试 -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4">抽奖测试</h2>
        <div class="space-y-3">
          <button @click="testSignIn" class="bg-blue-500 text-white px-4 py-2 rounded mr-2">
            模拟签到
          </button>
          <button @click="testLottery" class="bg-red-500 text-white px-4 py-2 rounded"
                  :disabled="isDrawing">
            {{ isDrawing ? '抽奖中...' : '开始抽奖' }}
          </button>
          <button @click="loadLotteryStatus" class="bg-orange-500 text-white px-4 py-2 rounded ml-2">
            查询抽奖状态
          </button>
        </div>
        
        <!-- 抽奖状态信息 -->
        <div v-if="lotteryStatus" class="bg-blue-100 p-4 rounded mt-4">
          <h3 class="font-semibold mb-2">抽奖状态:</h3>
          <p><strong>是否可抽奖:</strong> {{ lotteryStatus.canDraw ? '是' : '否' }}</p>
          <p><strong>剩余次数:</strong> {{ lotteryStatus.remainingChances }}</p>
          <p><strong>今日已抽次数:</strong> {{ lotteryStatus.todayLotteryCount }}</p>
          <p><strong>每日限制:</strong> {{ lotteryStatus.dailyLimit }}</p>
          <p><strong>是否已签到:</strong> {{ lotteryStatus.hasSignedIn ? '是' : '否' }}</p>
          <p><strong>状态信息:</strong> {{ lotteryStatus.message }}</p>
        </div>
        
        <div v-if="lotteryResult" class="bg-yellow-100 p-4 rounded mt-4">
          <h3 class="font-semibold mb-2">抽奖结果:</h3>
          <p><strong>奖品:</strong> {{ lotteryResult.prizeName }}</p>
          <p><strong>类型:</strong> {{ lotteryResult.prizeType }}</p>
          <p><strong>价值:</strong> {{ lotteryResult.prizeValue }}</p>
          <p><strong>剩余次数:</strong> {{ lotteryResult.remainingChances }}</p>
        </div>
      </div>
    </div>

    <!-- 日志区域 -->
    <div class="mt-8 bg-gray-100 p-4 rounded-lg">
      <h2 class="text-lg font-semibold mb-2">请求日志</h2>
      <div class="space-y-2 max-h-60 overflow-y-auto">
        <div v-for="(log, index) in logs" :key="index" 
             class="text-sm p-2 bg-white rounded"
             :class="log.type === 'error' ? 'border-red-300' : 'border-green-300'">
          <span class="font-medium">{{ log.timestamp }}</span> - 
          <span :class="log.type === 'error' ? 'text-red-600' : 'text-green-600'">
            {{ log.message }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { lotteryApi, type LotteryActivity, type LotteryPrize } from '@/services/api'

const currentActivity = ref<LotteryActivity | null>(null)
const displayPrizes = ref<LotteryPrize[]>([])
const actualPrizes = ref<LotteryPrize[]>([])
const lotteryResult = ref<{
  prizeName: string
  prizeType: string
  prizeValue: string
  remainingChances: number
} | null>(null)
const lotteryStatus = ref<{
  canDraw: boolean
  remainingChances: number
  todayLotteryCount: number
  dailyLimit: number
  hasSignedIn: boolean
  message: string
} | null>(null)
const isDrawing = ref(false)
const logs = ref<Array<{ timestamp: string; message: string; type: 'success' | 'error' }>>([])

const addLog = (message: string, type: 'success' | 'error' = 'success') => {
  logs.value.unshift({
    timestamp: new Date().toLocaleTimeString(),
    message,
    type
  })
}

const loadCurrentActivity = async () => {
  try {
    const response = await lotteryApi.getCurrentActivity()
    if (response.success) {
      currentActivity.value = response.data!
      addLog(`加载当前活动成功: ${response.data!.name}`)
    } else {
      addLog(`加载当前活动失败: ${response.message}`, 'error')
    }
  } catch (error) {
    addLog(`加载当前活动异常: ${error}`, 'error')
  }
}

const loadDisplayPrizes = async () => {
  try {
    const response = await lotteryApi.getCurrentDisplayPrizes()
    if (response.success) {
      displayPrizes.value = response.data!
      addLog(`加载显示奖品成功: ${response.data!.length}个奖品`)
    } else {
      addLog(`加载显示奖品失败: ${response.message}`, 'error')
    }
  } catch (error) {
    addLog(`加载显示奖品异常: ${error}`, 'error')
  }
}

const loadActualPrizes = async () => {
  try {
    if (!currentActivity.value) {
      addLog('请先加载当前活动', 'error')
      return
    }
    
    const response = await lotteryApi.getActivityPrizes(currentActivity.value.id)
    if (response.success) {
      actualPrizes.value = response.data!
      addLog(`加载实际奖品成功: ${response.data!.length}个奖品`)
    } else {
      addLog(`加载实际奖品失败: ${response.message}`, 'error')
    }
  } catch (error) {
    addLog(`加载实际奖品异常: ${error}`, 'error')
  }
}

const testSignIn = async () => {
  // 这里应该调用签到API，但为了测试，我们可以直接在数据库中手动添加签到记录
  // 或者调用相应的签到接口
  addLog('模拟签到功能 - 请在数据库中手动添加签到记录或实现签到API')
}

const loadLotteryStatus = async () => {
  try {
    // 这里需要实现获取抽奖状态的API调用
    // 暂时模拟一个状态
    lotteryStatus.value = {
      canDraw: true,
      remainingChances: 3,
      todayLotteryCount: 0,
      dailyLimit: 3,
      hasSignedIn: true,
      message: '已签到，可以抽奖'
    }
    addLog('抽奖状态查询成功')
  } catch (error) {
    addLog(`查询抽奖状态异常: ${error}`, 'error')
  }
}

const testLottery = async () => {
  if (!currentActivity.value) {
    addLog('请先加载当前活动', 'error')
    return
  }

  try {
    isDrawing.value = true
    const response = await lotteryApi.drawLottery({
      lotteryType: 'normal',
      activityId: currentActivity.value.id
    })
    
    if (response.success && response.data) {
      lotteryResult.value = response.data
      addLog(`抽奖成功: 获得 ${response.data.prizeName}`)
      
      // 抽奖完成后自动查询最新状态
      await loadLotteryStatus()
    } else {
      addLog(`抽奖失败: ${response.message}`, 'error')
    }
  } catch (error) {
    addLog(`抽奖异常: ${error}`, 'error')
  } finally {
    isDrawing.value = false
  }
}

onMounted(() => {
  addLog('抽奖测试页面加载完成')
  loadCurrentActivity()
  loadLotteryStatus()
})
</script>

<style scoped>
.lottery-test-page {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
