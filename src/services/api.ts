// API配置
const API_BASE_URL = '/api/v1'

// 获取JWT Token
const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken')
}

// 通用fetch请求函数
const apiRequest = async <T>(url: string, options?: RequestInit): Promise<T> => {
  try {
    const token = getAuthToken()
    const headers: { [key: string]: string } = {
      'Content-Type': 'application/json',
    }
    
    // 合并用户传入的headers
    if (options?.headers) {
      Object.assign(headers, options.headers)
    }
    
    // 如果有token，添加到请求头
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('API请求错误:', error)
    throw error
  }
}

// 认证相关类型定义
export interface LoginRequest {
  username: string
  password: string
  email?: string
}

export interface RegisterRequest {
  username: string
  password: string
  confirmPassword: string
  email: string
  steamId64?: string
  qqId?: string
}

export interface AuthResponse {
  token: string
  user: {
    id: number
    username: string
    email: string
    createTime: string
    isActive: boolean
    qqId?: string
    steamId64?: string
    lastLoginAt?: string
  }
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data?: T
  code?: number
}

export interface RegisterResponse {
  userId: number
  username: string
  email: string
  createTime: string
  isActive: boolean
}

export interface UpdateProfileRequest {
  qqId?: string
  steamId64?: string
}

export interface UpdateProfileResponse {
  success: boolean
  message: string
  user: ValidateTokenResponse
}

export interface BindAccountRequest {
  accountId: string
}

export interface BindAccountResponse {
  success: boolean
  message: string
}

export interface UserProfileResponse {
  id: number
  username: string
  email: string
  createTime: string
  isActive: boolean
  qqId?: string
  steamId64?: string
  lastLoginAt?: string
}

export interface ValidateTokenResponse {
  id: number
  username: string
  email: string
  createTime: string
  isActive: boolean
  qqId?: string
  steamId64?: string
  lastLoginAt?: string
}

// 抽奖相关类型定义
export interface LotteryRequest {
  lotteryType?: string
}

export interface LotteryResponse {
  id: number
  userId: number
  username: string
  prizeName: string
  prizeType: string
  prizeValue: string
  lotteryTime: string
  remainingChances: number
}

export interface LotteryStatusResponse {
  hasSignedIn: boolean
  remainingChances: number
  todayLotteryCount: number
  dailyLimit: number
  canDrawLottery: boolean
}

export interface LotteryRecord {
  id: number
  userId: number
  username: string
  prizeName: string
  prizeType: string
  prizeValue: string
  lotteryTime: string
  createTime: string
}

// 认证API
export const authApi = {
  // 用户登录
  async login(loginData: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await apiRequest<ApiResponse<AuthResponse>>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(loginData),
      })
      
      if (response.success && response.data) {
        // 保存token到localStorage
        localStorage.setItem('authToken', response.data.token)
        return response.data
      } else {
        throw new Error(response.message || '登录失败')
      }
    } catch (error) {
      console.error('登录失败:', error)
      throw error
    }
  },

  // 用户注册
  async register(registerData: RegisterRequest): Promise<RegisterResponse> {
    try {
      const response = await apiRequest<ApiResponse<RegisterResponse>>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(registerData),
      })
      
      if (response.success && response.data) {
        return response.data
      } else {
        throw new Error(response.message || '注册失败')
      }
    } catch (error) {
      console.error('注册失败:', error)
      throw error
    }
  },

  // 验证Token
  async validateToken(): Promise<ValidateTokenResponse> {
    try {
      const response = await apiRequest<ApiResponse<ValidateTokenResponse>>('/auth/validate', {
        method: 'GET',
      })
      
      if (response.success && response.data) {
        return response.data
      } else {
        throw new Error(response.message || 'Token验证失败')
      }
    } catch (error) {
      console.error('Token验证失败:', error)
      // 如果token无效，清除本地存储
      localStorage.removeItem('authToken')
      throw error
    }
  },

  // 刷新Token
  async refreshToken(): Promise<AuthResponse> {
    try {
      const response = await apiRequest<ApiResponse<AuthResponse>>('/auth/refresh', {
        method: 'POST',
      })
      
      if (response.success && response.data) {
        // 更新token
        localStorage.setItem('authToken', response.data.token)
        return response.data
      } else {
        throw new Error(response.message || 'Token刷新失败')
      }
    } catch (error) {
      console.error('Token刷新失败:', error)
      // 刷新失败时清除本地存储
      localStorage.removeItem('authToken')
      throw error
    }
  },

  // 登出
  async logout(): Promise<void> {
    try {
      // 清除本地token
      localStorage.removeItem('authToken')
      // 可以调用后端logout接口（如果有的话）
    } catch (error) {
      console.error('登出失败:', error)
    }
  },

  // 更新用户资料
  async updateProfile(profileData: UpdateProfileRequest): Promise<UpdateProfileResponse> {
    try {
      const response = await apiRequest<ApiResponse<UpdateProfileResponse>>('/auth/profile', {
        method: 'PUT',
        body: JSON.stringify(profileData),
      })
      
      if (response.success && response.data) {
        return response.data
      } else {
        throw new Error(response.message || '更新资料失败')
      }
    } catch (error) {
      console.error('更新用户资料失败:', error)
      throw error
    }
  },

  // 获取用户个人信息
  async getUserProfile(): Promise<UserProfileResponse> {
    try {
      const response = await apiRequest<ApiResponse<UserProfileResponse>>('/user/profile', {
        method: 'GET',
      })
      
      if (response.success && response.data) {
        return response.data
      } else {
        throw new Error(response.message || '获取用户信息失败')
      }
    } catch (error) {
      console.error('获取用户信息失败:', error)
      throw error
    }
  }
}

// 账户绑定API
export const bindingApi = {
  // 绑定QQ账户
  async bindQQAccount(accountId: string): Promise<BindAccountResponse> {
    try {
      const response = await apiRequest<ApiResponse<BindAccountResponse>>('/account-binding/bind-qq', {
        method: 'POST',
        body: JSON.stringify({ accountId }),
      })
      
      if (response.success && response.data) {
        return response.data
      } else {
        throw new Error(response.message || '绑定QQ账户失败')
      }
    } catch (error) {
      console.error('绑定QQ账户失败:', error)
      throw error
    }
  },

  // 绑定Steam账户
  async bindSteamAccount(accountId: string): Promise<BindAccountResponse> {
    try {
      const response = await apiRequest<ApiResponse<BindAccountResponse>>('/account-binding/bind-steam', {
        method: 'POST',
        body: JSON.stringify({ accountId }),
      })
      
      if (response.success && response.data) {
        return response.data
      } else {
        throw new Error(response.message || '绑定Steam账户失败')
      }
    } catch (error) {
      console.error('绑定Steam账户失败:', error)
      throw error
    }
  },

  // 解绑QQ账户
  async unbindQQAccount(): Promise<BindAccountResponse> {
    try {
      const response = await apiRequest<ApiResponse<BindAccountResponse>>('/account-binding/unbind-qq', {
        method: 'POST',
      })
      
      if (response.success && response.data) {
        return response.data
      } else {
        throw new Error(response.message || '解绑QQ账户失败')
      }
    } catch (error) {
      console.error('解绑QQ账户失败:', error)
      throw error
    }
  },

  // 解绑Steam账户
  async unbindSteamAccount(): Promise<BindAccountResponse> {
    try {
      const response = await apiRequest<ApiResponse<BindAccountResponse>>('/account-binding/unbind-steam', {
        method: 'POST',
      })
      
      if (response.success && response.data) {
        return response.data
      } else {
        throw new Error(response.message || '解绑Steam账户失败')
      }
    } catch (error) {
      console.error('解绑Steam账户失败:', error)
      throw error
    }
  }
}

// 贡献者相关类型定义
export interface Supporter {
  name: string
  supportDescription: string
}

export interface ContributeResponse {
  donors: Supporter[]
  techSupporters: Supporter[]
}

// 贡献者API
export const contributeApi = {
  // 获取所有贡献者数据
  async getContributors(): Promise<ContributeResponse> {
    try {
      return await apiRequest<ContributeResponse>('/contribute')
    } catch (error) {
      console.error('获取贡献者数据失败:', error)
      throw error
    }
  },
}

// 抽奖API
export const lotteryApi = {
  // 执行抽奖
  async drawLottery(request: LotteryRequest = {}): Promise<ApiResponse<LotteryResponse>> {
    try {
      return await apiRequest<ApiResponse<LotteryResponse>>('/lottery/draw', {
        method: 'POST',
        body: JSON.stringify(request),
      })
    } catch (error) {
      console.error('抽奖失败:', error)
      throw error
    }
  },

  // 获取抽奖状态
  async getLotteryStatus(): Promise<ApiResponse<LotteryStatusResponse>> {
    try {
      return await apiRequest<ApiResponse<LotteryStatusResponse>>('/lottery/status')
    } catch (error) {
      console.error('获取抽奖状态失败:', error)
      throw error
    }
  },

  // 获取抽奖历史
  async getLotteryHistory(): Promise<ApiResponse<LotteryRecord[]>> {
    try {
      return await apiRequest<ApiResponse<LotteryRecord[]>>('/lottery/history')
    } catch (error) {
      console.error('获取抽奖历史失败:', error)
      throw error
    }
  },

  // 获取今日抽奖记录
  async getTodayLotteryRecords(): Promise<ApiResponse<LotteryRecord[]>> {
    try {
      return await apiRequest<ApiResponse<LotteryRecord[]>>('/lottery/today')
    } catch (error) {
      console.error('获取今日抽奖记录失败:', error)
      throw error
    }
  },
}
