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
      const errorMessage = `HTTP error! status: ${response.status}`
      console.error('API请求失败:', errorMessage, 'URL:', url)
      throw new Error(errorMessage)
    }

    return await response.json()
  } catch (error) {
    console.error('API请求错误:', error, 'URL:', url)
    
    // 检查是否为网络连接错误 - 更全面的检测
    if (error instanceof TypeError && 
        (error.message.includes('Failed to fetch') || 
         error.message.includes('fetch') ||
         error.message.includes('NetworkError'))) {
      throw new Error('BACKEND_UNAVAILABLE')
    }
    
    // 检查是否为HTTP 500错误（通常表示后端不可用）
    if (error instanceof Error && error.message.includes('HTTP error! status: 500')) {
      throw new Error('BACKEND_UNAVAILABLE')
    }
    
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
  activityId?: number
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
  activityName?: string
}

export interface LotteryActivity {
  id: number
  name: string
  startTime: string
  endTime: string
  isActive: boolean
  description?: string
  dailyLimit?: number
  requireSignin?: boolean
}

export interface LotteryPrize {
  id: number
  name: string
  type: string
  value: string
  icon: string
  rarity: string
  probability: number
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
  async getLotteryStatus(activityId?: number): Promise<ApiResponse<LotteryStatusResponse>> {
    try {
      const url = activityId ? `/lottery/status?activityId=${activityId}` : '/lottery/status'
      return await apiRequest<ApiResponse<LotteryStatusResponse>>(url)
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

  // 获取当前活动
  async getCurrentActivity(): Promise<ApiResponse<LotteryActivity>> {
    try {
      return await apiRequest<ApiResponse<LotteryActivity>>('/lottery/current-activity')
    } catch (error) {
      console.error('获取当前活动失败:', error)
      throw error
    }
  },

  // 获取活动奖品
  async getActivityPrizes(activityId: number): Promise<ApiResponse<LotteryPrize[]>> {
    try {
      return await apiRequest<ApiResponse<LotteryPrize[]>>(`/lottery/activity/${activityId}/prizes`)
    } catch (error) {
      console.error('获取活动奖品失败:', error)
      throw error
    }
  },

  // 获取当前显示奖品（用于前端12格子显示）
  async getCurrentDisplayPrizes(): Promise<ApiResponse<LotteryPrize[]>> {
    try {
      return await apiRequest<ApiResponse<LotteryPrize[]>>('/lottery/display-prizes')
    } catch (error) {
      console.error('获取显示奖品失败:', error)
      throw error
    }
  },

  // 获取个人抽奖记录
  async getPersonalLotteryRecords(params: {
    activityId: number
    page: number
    size: number
  }): Promise<ApiResponse<{ records: LotteryRecord[], total: number }>> {
    try {
      const { activityId, page, size } = params
      return await apiRequest<ApiResponse<{ records: LotteryRecord[], total: number }>>(
        `/lottery/personal-records?activityId=${activityId}&page=${page}&size=${size}`
      )
    } catch (error) {
      console.error('获取个人抽奖记录失败:', error)
      throw error
    }
  },
}

// 兑换系统相关类型定义
export interface ExchangeGood {
  id: number
  name: string
  description: string
  price: number
  stock: number
  image: string
  category: string
  rarity: string
}

export interface ExchangeGoodRequest {
  goodId: number
  price: number
}

export interface ExchangeRecord {
  id: number
  goodName: string
  goodImage: string
  price: number
  status: 'completed' | 'pending' | 'failed'
  exchangeTime: string
}

export interface UserBalances {
  wishPoints: number
  credits: number
}

export interface CreditExchangeRequest {
  amount: number
  fromType: 'wish' | 'credits'
  toType: 'wish' | 'credits'
}

export interface CreditExchangeRecord {
  id: number
  username: string
  exchangeType: 'WISH_TO_CREDIT' | 'CREDIT_TO_WISH'
  amount: number
  beforeWishPoints: number
  afterWishPoints: number
  beforeCredits: number
  afterCredits: number
  createTime: string
  // 兼容前端显示
  fromType: 'wish' | 'credits'
  toType: 'wish' | 'credits'
  status: 'completed' | 'pending' | 'failed'
  exchangeTime: string
}

export interface ExchangeResult {
  success: boolean
  message: string
  goodId?: number
  price?: number
  remainingWishPoints?: number
  exchangeTime?: string
}

export interface CreditExchangeResult {
  success: boolean
  message: string
  exchangeType: 'wish-to-credits' | 'credits-to-wish'
  amount: number
  newWishPoints: number
  newCredits: number
  exchangeTime: string
}

// 兑换系统API
export const exchangeApi = {
  // 获取用户余额
  async getUserBalances(): Promise<ApiResponse<UserBalances>> {
    try {
      return await apiRequest<ApiResponse<UserBalances>>('/exchange/balances')
    } catch (error) {
      console.error('获取用户余额失败:', error)
      throw error
    }
  },

  // 获取兑换商品列表
  async getExchangeGoods(): Promise<ApiResponse<ExchangeGood[]>> {
    try {
      return await apiRequest<ApiResponse<ExchangeGood[]>>('/exchange/goods')
    } catch (error) {
      console.error('获取兑换商品失败:', error)
      throw error
    }
  },

  // 兑换商品
  async exchangeGood(request: ExchangeGoodRequest): Promise<ApiResponse<ExchangeResult>> {
    try {
      return await apiRequest<ApiResponse<ExchangeResult>>('/exchange/goods/exchange', {
        method: 'POST',
        body: JSON.stringify(request)
      })
    } catch (error) {
      console.error('兑换商品失败:', error)
      throw error
    }
  },

  // 获取兑换记录
  async getExchangeHistory(): Promise<ApiResponse<ExchangeRecord[]>> {
    try {
      return await apiRequest<ApiResponse<ExchangeRecord[]>>('/exchange/history')
    } catch (error) {
      console.error('获取兑换记录失败:', error)
      throw error
    }
  },

  // 祈愿值兑换Credits
  async exchangeWishToCredits(request: { amount: number }): Promise<ApiResponse<CreditExchangeResult>> {
    try {
      return await apiRequest<ApiResponse<CreditExchangeResult>>('/exchange/wish-to-credit', {
        method: 'POST',
        body: JSON.stringify(request)
      })
    } catch (error) {
      console.error('祈愿值兑换Credits失败:', error)
      throw error
    }
  },

  // Credits兑换为祈愿值
  async exchangeCreditsToWish(request: { amount: number }): Promise<ApiResponse<CreditExchangeResult>> {
    try {
      return await apiRequest<ApiResponse<CreditExchangeResult>>('/exchange/credit-to-wish', {
        method: 'POST',
        body: JSON.stringify(request)
      })
    } catch (error) {
      console.error('Credits兑换祈愿值失败:', error)
      throw error
    }
  },

  // 获取积分兑换记录
  async getCreditExchangeHistory(): Promise<ApiResponse<CreditExchangeRecord[]>> {
    try {
      return await apiRequest<ApiResponse<CreditExchangeRecord[]>>('/exchange/records')
    } catch (error) {
      console.error('获取积分兑换记录失败:', error)
      throw error
    }
  },
}

// K4统计数据相关类型定义
export interface K4CombatStats {
  totalKills: number
  totalAssists: number
  totalDeaths: number
  activePlayersCount: number
  avgKillsPerPlayer: number
  avgAssistsPerPlayer: number
  lastUpdateTime: string
}

export interface K4SpecialKillsStats {
  totalRevengeKills: number
  totalNoScopeKills: number
  totalWallBangKills: number
  totalFlashAssists: number
  lastUpdateTime: string
}

export interface K4RankingPlayer {
  playerId: number
  playerName: string
  steamId: string
  value: number
  rank: number
  lastPlayTime: string
}

export interface K4ChallengeData {
  combatStats: K4CombatStats | null
  specialKillsStats: K4SpecialKillsStats | null
  killsRanking: K4RankingPlayer[]
  assistsRanking: K4RankingPlayer[]
  revengeKillsRanking: K4RankingPlayer[]
  noScopeKillsRanking: K4RankingPlayer[]
}

// K4统计数据API
export const k4StatsApi = {
  // 获取战斗统计数据
  async getCombatStats(): Promise<ApiResponse<K4CombatStats>> {
    try {
      return await apiRequest<ApiResponse<K4CombatStats>>('/k4stats/statistics/combat')
    } catch (error) {
      console.error('获取战斗统计数据失败:', error)
      throw error
    }
  },

  // 获取特殊击杀统计数据
  async getSpecialKillsStats(): Promise<ApiResponse<K4SpecialKillsStats>> {
    try {
      return await apiRequest<ApiResponse<K4SpecialKillsStats>>('/k4stats/statistics/special-kills')
    } catch (error) {
      console.error('获取特殊击杀统计数据失败:', error)
      throw error
    }
  },

  // 获取击杀排名
  async getKillsRanking(limit: number = 50): Promise<ApiResponse<K4RankingPlayer[]>> {
    try {
      return await apiRequest<ApiResponse<K4RankingPlayer[]>>(`/k4stats/rankings/kills?limit=${limit}`)
    } catch (error) {
      console.error('获取击杀排名失败:', error)
      throw error
    }
  },

  // 获取助攻排名
  async getAssistsRanking(limit: number = 50): Promise<ApiResponse<K4RankingPlayer[]>> {
    try {
      return await apiRequest<ApiResponse<K4RankingPlayer[]>>(`/k4stats/rankings/assists?limit=${limit}`)
    } catch (error) {
      console.error('获取助攻排名失败:', error)
      throw error
    }
  },

  // 获取复仇击杀排名
  async getRevengeKillsRanking(limit: number = 50): Promise<ApiResponse<K4RankingPlayer[]>> {
    try {
      return await apiRequest<ApiResponse<K4RankingPlayer[]>>(`/k4stats/rankings/revenge-kills?limit=${limit}`)
    } catch (error) {
      console.error('获取复仇击杀排名失败:', error)
      throw error
    }
  },

  // 获取盲狙击杀排名（穿墙击杀）
  async getNoScopeKillsRanking(limit: number = 50): Promise<ApiResponse<K4RankingPlayer[]>> {
    try {
      return await apiRequest<ApiResponse<K4RankingPlayer[]>>(`/k4stats/rankings/noscope-kills?limit=${limit}`)
    } catch (error) {
      console.error('获取盲狙击杀排名失败:', error)
      throw error
    }
  },

  // 获取所有K4挑战数据（并行请求）
  async getAllChallengeData(): Promise<K4ChallengeData> {
    try {
      const [
        combatResponse,
        specialKillsResponse,
        killsResponse,
        assistsResponse,
        revengeResponse,
        noScopeResponse
      ] = await Promise.all([
        this.getCombatStats(),
        this.getSpecialKillsStats(),
        this.getKillsRanking(50),
        this.getAssistsRanking(50),
        this.getRevengeKillsRanking(50),
        this.getNoScopeKillsRanking(50)
      ])

      return {
        combatStats: combatResponse.success ? combatResponse.data || null : null,
        specialKillsStats: specialKillsResponse.success ? specialKillsResponse.data || null : null,
        killsRanking: killsResponse.success ? killsResponse.data || [] : [],
        assistsRanking: assistsResponse.success ? assistsResponse.data || [] : [],
        revengeKillsRanking: revengeResponse.success ? revengeResponse.data || [] : [],
        noScopeKillsRanking: noScopeResponse.success ? noScopeResponse.data || [] : []
      }
    } catch (error) {
      console.error('获取K4挑战数据失败:', error)
      throw error
    }
  }
}
