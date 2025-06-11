// 商城相关API接口
// TODO: 替换为实际的后端API地址
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

// 通用请求方法
const request = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response.json()
}

// 用户积分相关API
export const userPointsApi = {
  // 获取用户积分
  getUserPoints: () => request('/user/points'),
  
  // 刷新用户积分
  refreshUserPoints: () => request('/user/points/refresh', { method: 'POST' }),
}

// 商城模型相关API
export const shopApi = {
  // 获取商城模型列表
  getShopModels: (params?: {
    page?: number
    pageSize?: number
    search?: string
    tag?: string
    faction?: string
    priceRange?: string
    sortBy?: string
  }) => {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, value.toString())
        }
      })
    }
    return request(`/shop/models?${queryParams.toString()}`)
  },

  // 获取模型详情
  getModelDetails: (id: number | string) => request(`/shop/models/${id}`),

  // 获取相关推荐模型
  getRelatedModels: (id: number | string) => request(`/shop/models/${id}/related`),

  // 购买模型
  purchaseModel: (data: {
    modelId: number
    paymentMethod: string
    points: number
  }) => request('/shop/purchase', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // 下载模型
  downloadModel: (modelId: number | string) => request(`/shop/models/${modelId}/download`, {
    method: 'POST',
  }),

  // 添加到收藏夹
  addToWishlist: (modelId: number | string) => request('/shop/wishlist', {
    method: 'POST',
    body: JSON.stringify({ modelId }),
  }),

  // 评价模型
  rateModel: (data: {
    modelId: number
    rating: number
    comment?: string
  }) => request('/shop/rating', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
}

// 购买历史相关API
export const purchaseHistoryApi = {
  // 获取购买历史
  getPurchaseHistory: (params?: {
    page?: number
    pageSize?: number
    search?: string
    status?: string
    startDate?: string
    endDate?: string
    sortBy?: string
  }) => {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, value.toString())
        }
      })
    }
    return request(`/user/purchase-history?${queryParams.toString()}`)
  },

  // 获取购买统计信息
  getPurchaseStats: () => request('/user/purchase-history/stats'),
}

// 类型定义
export interface ModelItem {
  id: number
  name: string
  description?: string
  imageUrl?: string
  points: number
  faction: string
  tags?: string[]
  category?: string
  downloadCount?: number
  rating?: number
  polygons?: number
  textureSize?: string
  format?: string
  fileSize?: string
}

export interface PurchaseHistoryItem {
  id: number
  orderId: string
  model: ModelItem
  points: number
  purchaseDate: string
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  downloadCount: number
  rated: boolean
  rating?: number
  comment?: string
}

export interface UserPoints {
  points: number
  lastUpdated: string
}

export interface PurchaseStats {
  totalPurchases: number
  totalSpent: number
  totalDownloads: number
  daysSinceFirstPurchase: number
}
