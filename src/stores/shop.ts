import { defineStore } from 'pinia'
import { ref } from 'vue'

// 购物车项目接口
interface CartItem {
  id: number
  modelId: number
  name: string
  points: number
  imageUrl?: string
  quantity: number
}

export const useShopStore = defineStore('shop', () => {
  // 用户积分
  const userPoints = ref(1250)
  const lastPointsUpdate = ref<Date | null>(null)

  // 购物车 (未来功能)
  const cartItems = ref<CartItem[]>([])

  // 收藏夹
  const wishlistItems = ref<number[]>([])

  // 更新用户积分
  const updateUserPoints = (points: number) => {
    userPoints.value = points
    lastPointsUpdate.value = new Date()
  }

  // 扣除积分（购买时使用）
  const deductPoints = (amount: number) => {
    if (userPoints.value >= amount) {
      userPoints.value -= amount
      lastPointsUpdate.value = new Date()
      return true
    }
    return false
  }

  // 添加到收藏夹
  const addToWishlist = (modelId: number) => {
    if (!wishlistItems.value.includes(modelId)) {
      wishlistItems.value.push(modelId)
    }
  }

  // 从收藏夹移除
  const removeFromWishlist = (modelId: number) => {
    const index = wishlistItems.value.indexOf(modelId)
    if (index > -1) {
      wishlistItems.value.splice(index, 1)
    }
  }

  // 检查是否在收藏夹中
  const isInWishlist = (modelId: number) => {
    return wishlistItems.value.includes(modelId)
  }

  // 获取积分格式化文本
  const getFormattedPoints = () => {
    return userPoints.value.toLocaleString()
  }

  return {
    // 状态
    userPoints,
    lastPointsUpdate,
    cartItems,
    wishlistItems,
    
    // 方法
    updateUserPoints,
    deductPoints,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    getFormattedPoints,
  }
})
