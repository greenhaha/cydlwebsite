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

// K4统计数据类型定义
export interface K4StatisticItem {
  name: string
  value: number
  percentage: number
}

export interface K4StatisticCategory {
  categoryName: string
  totalPlayers: number
  statistics: { [key: string]: number }  // 修改为对象格式
}

export interface K4AllStatistics {
  combat: K4StatisticCategory
  hitLocations: K4StatisticCategory
  rounds: K4StatisticCategory
  specialKills: K4StatisticCategory
  others: K4StatisticCategory
}

export interface K4PlayerRankingInfo {
  rank: number
  steamId: string
  playerName: string  // 修改为后端返回的字段名
  value: number
  isHighlighted?: boolean
}

export interface K4RankingResponse {
  category: string
  description: string
  totalPlayers: number
  rankings: K4PlayerRankingInfo[]
  timestamp: number
}

export interface K4CombinedRankingResponse {
  kills: K4RankingResponse
  firstBlood: K4RankingResponse
  assists: K4RankingResponse
  revengeKills: K4RankingResponse
  noscopeKills: K4RankingResponse
}

// 保留原有的简化类型以兼容
export interface K4CombatStats {
  totalKills: number
  totalDeaths: number
  totalAssists: number
  totalFirstBlood: number
  totalShoots: number
  totalHitsGiven: number
  totalHitsTaken: number
}

export interface K4SpecialKillsStats {
  totalNoscopeKills: number
  totalPenetratedKills: number
  totalThrusmokeKills: number
  totalFlashedKills: number
  totalDominatedKills: number
  totalRevengeKills: number
}

export interface K4RankingPlayer {
  rank: number
  steamId: string
  name: string
  value: number
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
  // 获取所有统计数据
  async getAllStatistics(): Promise<ApiResponse<K4AllStatistics>> {
    try {
      return await apiRequest<ApiResponse<K4AllStatistics>>('/k4stats/statistics/all')
    } catch (error) {
      console.error('获取所有统计数据失败:', error)
      throw error
    }
  },

  // 获取战斗统计数据
  async getCombatStats(): Promise<ApiResponse<K4CombatStats>> {
    try {
      return await apiRequest<ApiResponse<K4CombatStats>>('/k4stats/statistics/combat')
    } catch (error) {
      console.error('获取战斗统计数据失败:', error)
      throw error
    }
  },

  // 获取命中部位统计
  async getHitLocationStats(): Promise<ApiResponse<K4StatisticCategory>> {
    try {
      return await apiRequest<ApiResponse<K4StatisticCategory>>('/k4stats/statistics/hit-locations')
    } catch (error) {
      console.error('获取命中部位统计失败:', error)
      throw error
    }
  },

  // 获取回合/对局统计
  async getRoundStats(): Promise<ApiResponse<K4StatisticCategory>> {
    try {
      return await apiRequest<ApiResponse<K4StatisticCategory>>('/k4stats/statistics/rounds')
    } catch (error) {
      console.error('获取回合统计失败:', error)
      throw error
    }
  },

  // 获取特殊击杀统计
  async getSpecialKillsStats(): Promise<ApiResponse<K4SpecialKillsStats>> {
    try {
      return await apiRequest<ApiResponse<K4SpecialKillsStats>>('/k4stats/statistics/special-kills')
    } catch (error) {
      console.error('获取特殊击杀统计失败:', error)
      throw error
    }
  },

  // 获取其他统计
  async getOtherStats(): Promise<ApiResponse<K4StatisticCategory>> {
    try {
      return await apiRequest<ApiResponse<K4StatisticCategory>>('/k4stats/statistics/others')
    } catch (error) {
      console.error('获取其他统计失败:', error)
      throw error
    }
  },

  // 获取击杀次数排名
  async getKillsRanking(limit: number = 50): Promise<ApiResponse<K4RankingResponse>> {
    try {
      return await apiRequest<ApiResponse<K4RankingResponse>>(`/k4stats/rankings/kills?limit=${limit}`)
    } catch (error) {
      console.error('获取击杀次数排名失败:', error)
      throw error
    }
  },

  // 获取首杀次数排名
  async getFirstBloodRanking(limit: number = 50): Promise<ApiResponse<K4RankingResponse>> {
    try {
      return await apiRequest<ApiResponse<K4RankingResponse>>(`/k4stats/rankings/firstblood?limit=${limit}`)
    } catch (error) {
      console.error('获取首杀次数排名失败:', error)
      throw error
    }
  },

  // 获取助攻次数排名
  async getAssistsRanking(limit: number = 50): Promise<ApiResponse<K4RankingResponse>> {
    try {
      return await apiRequest<ApiResponse<K4RankingResponse>>(`/k4stats/rankings/assists?limit=${limit}`)
    } catch (error) {
      console.error('获取助攻次数排名失败:', error)
      throw error
    }
  },

  // 获取复仇击杀次数排名
  async getRevengeKillsRanking(limit: number = 50): Promise<ApiResponse<K4RankingResponse>> {
    try {
      return await apiRequest<ApiResponse<K4RankingResponse>>(`/k4stats/rankings/revenge-kills?limit=${limit}`)
    } catch (error) {
      console.error('获取复仇击杀次数排名失败:', error)
      throw error
    }
  },

  // 获取盲射击杀次数排名
  async getNoScopeKillsRanking(limit: number = 50): Promise<ApiResponse<K4RankingResponse>> {
    try {
      return await apiRequest<ApiResponse<K4RankingResponse>>(`/k4stats/rankings/noscope-kills?limit=${limit}`)
    } catch (error) {
      console.error('获取盲射击杀次数排名失败:', error)
      throw error
    }
  },

  // 获取穿墙击杀次数排名（使用后端的特殊击杀统计）
  async getWallbangKillsRanking(_limit: number = 50): Promise<ApiResponse<K4RankingResponse>> {
    console.log(_limit)
    try {
      // 由于后端没有单独的穿墙击杀排名，我们使用特殊击杀统计数据
      const response = await apiRequest<ApiResponse<K4StatisticCategory>>('/k4stats/statistics/special-kills')
      if (response.success && response.data) {
        // 构造一个模拟的排名响应
        return {
          success: true,
          message: '获取穿墙击杀排名成功',
          data: {
            category: 'wallbang-kills',
            description: '穿墙击杀次数排名',
            totalPlayers: response.data.totalPlayers,
            rankings: [],
            timestamp: Date.now()
          }
        }
      }
      throw new Error('无法获取穿墙击杀数据')
    } catch (error) {
      console.error('获取穿墙击杀次数排名失败:', error)
      throw error
    }
  },

  // 获取开火次数排名
  async getShootsRanking(limit: number = 50): Promise<ApiResponse<K4RankingResponse>> {
    try {
      return await apiRequest<ApiResponse<K4RankingResponse>>(`/k4stats/rankings/shoots?limit=${limit}`)
    } catch (error) {
      console.error('获取开火次数排名失败:', error)
      throw error
    }
  },

  // 获取道具投掷次数排名
  async getGrenadesRanking(limit: number = 50): Promise<ApiResponse<K4RankingResponse>> {
    try {
      return await apiRequest<ApiResponse<K4RankingResponse>>(`/k4stats/rankings/grenades?limit=${limit}`)
    } catch (error) {
      console.error('获取道具投掷次数排名失败:', error)
      throw error
    }
  },

  // 获取下包次数排名
  async getBombPlantedRanking(limit: number = 50): Promise<ApiResponse<K4RankingResponse>> {
    try {
      return await apiRequest<ApiResponse<K4RankingResponse>>(`/k4stats/rankings/bomb-planted?limit=${limit}`)
    } catch (error) {
      console.error('获取下包次数排名失败:', error)
      throw error
    }
  },

  // 获取综合排名数据
  async getCombinedRankings(limit: number = 50): Promise<ApiResponse<K4CombinedRankingResponse>> {
    try {
      return await apiRequest<ApiResponse<K4CombinedRankingResponse>>(`/k4stats/rankings/combined?limit=${limit}`)
    } catch (error) {
      console.error('获取综合排名数据失败:', error)
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
        this.getKillsRanking(10), // 只获取前10名
        this.getAssistsRanking(10),
        this.getRevengeKillsRanking(10),
        this.getNoScopeKillsRanking(10)
      ])

      // 转换K4PlayerRankingInfo到K4RankingPlayer格式
      const convertRankings = (response: ApiResponse<K4RankingResponse>): K4RankingPlayer[] => {
        if (response.success && response.data) {
          return response.data.rankings.map(player => ({
            rank: player.rank,
            steamId: player.steamId,
            name: player.playerName, // 修改字段映射
            value: player.value
          }))
        }
        return []
      }

      return {
        combatStats: combatResponse.success ? combatResponse.data || null : null,
        specialKillsStats: specialKillsResponse.success ? specialKillsResponse.data || null : null,
        killsRanking: convertRankings(killsResponse),
        assistsRanking: convertRankings(assistsResponse),
        revengeKillsRanking: convertRankings(revengeResponse),
        noScopeKillsRanking: convertRankings(noScopeResponse)
      }
    } catch (error) {
      console.error('获取K4挑战数据失败:', error)
      throw error
    }
  }
}

// 祈愿值兑换相关类型定义
export interface WishExchangeItem {
  id: number
  name: string
  category: string
  wishPoints: number
  description: string
  iconUrl: string
  rarity: string
  validFrom: string
  validUntil: string
  sortOrder: number
  canExchange: boolean
}

export interface UserWishExchange {
  id: number
  userId?: number
  itemId: number
  itemName: string
  itemCategory: string
  wishPointsUsed: number
  exchangeTime: string
  status: string
}

export interface ExchangeRequest {
  itemId: number
}

export interface UserBalances {
  wishPoints: number
  credits: number
}

// 祈愿值兑换API
export const wishExchangeApi = {
  // 获取用户余额信息
  async getUserBalances(): Promise<ApiResponse<UserBalances>> {
    try {
      return await apiRequest<ApiResponse<UserBalances>>('/exchange/balances')
    } catch (error) {
      console.error('获取用户余额失败:', error)
      throw error
    }
  },

  // 获取可兑换物品列表
  async getAvailableItems(userId: number): Promise<ApiResponse<WishExchangeItem[]>> {
    try {
      return await apiRequest<ApiResponse<WishExchangeItem[]>>(`/wish-exchange/items?userId=${userId}`)
    } catch (error) {
      console.error('获取可兑换物品列表失败:', error)
      throw error
    }
  },

  // 根据分类获取可兑换物品
  async getAvailableItemsByCategory(category: string, userId: number): Promise<ApiResponse<WishExchangeItem[]>> {
    try {
      return await apiRequest<ApiResponse<WishExchangeItem[]>>(`/wish-exchange/items/category/${category}?userId=${userId}`)
    } catch (error) {
      console.error('根据分类获取物品失败:', error)
      throw error
    }
  },

  // 获取所有物品分类
  async getAllCategories(): Promise<ApiResponse<string[]>> {
    try {
      return await apiRequest<ApiResponse<string[]>>('/wish-exchange/categories')
    } catch (error) {
      console.error('获取分类列表失败:', error)
      throw error
    }
  },

  // 兑换物品
  async exchangeItem(userId: number, itemId: number): Promise<ApiResponse<UserWishExchange>> {
    try {
      return await apiRequest<ApiResponse<UserWishExchange>>(`/wish-exchange/exchange?userId=${userId}`, {
        method: 'POST',
        body: JSON.stringify({ itemId })
      })
    } catch (error) {
      console.error('兑换物品失败:', error)
      throw error
    }
  },

  // 获取用户兑换记录
  async getUserExchangeHistory(userId: number): Promise<ApiResponse<UserWishExchange[]>> {
    try {
      return await apiRequest<ApiResponse<UserWishExchange[]>>(`/wish-exchange/history?userId=${userId}`)
    } catch (error) {
      console.error('获取兑换记录失败:', error)
      throw error
    }
  },

  // 祈愿值兑换Credits
  async wishToCredit(amount: number): Promise<ApiResponse<CreditExchangeResult>> {
    try {
      return await apiRequest<ApiResponse<CreditExchangeResult>>('/exchange/wish-to-credit', {
        method: 'POST',
        body: JSON.stringify({ amount })
      })
    } catch (error) {
      console.error('祈愿值兑换Credits失败:', error)
      throw error
    }
  },

  // Credits兑换祈愿值
  async creditToWish(amount: number): Promise<ApiResponse<CreditExchangeResult>> {
    try {
      return await apiRequest<ApiResponse<CreditExchangeResult>>('/exchange/credit-to-wish', {
        method: 'POST',
        body: JSON.stringify({ amount })
      })
    } catch (error) {
      console.error('Credits兑换祈愿值失败:', error)
      throw error
    }
  },

  // 获取兑换记录
  async getExchangeRecords(): Promise<ApiResponse<CreditExchangeRecord[]>> {
    try {
      return await apiRequest<ApiResponse<CreditExchangeRecord[]>>('/exchange/records')
    } catch (error) {
      console.error('获取兑换记录失败:', error)
      throw error
    }
  }
}

// K4Times相关类型定义
export interface K4TimesPlayerRankingInfo {
  rank: number
  steamId: string
  playerName: string
  value: number
}

export interface K4TimesRankingResponse {
  category: string
  description: string
  totalPlayers: number
  rankings: K4TimesPlayerRankingInfo[]
  timestamp: number
}

export interface K4PlayerTimeInfo {
  steamId: string
  playerName: string
  totalTime: number
  ctTime: number
  tTime: number
  specTime: number
  aliveTime: number
  deadTime: number
}

// K4Times统计数据API
export const k4TimesApi = {
  // 获取游玩时长排名
  async getPlayTimeRanking(limit: number = 50): Promise<ApiResponse<K4TimesRankingResponse>> {
    try {
      return await apiRequest<ApiResponse<K4TimesRankingResponse>>(`/k4times/rankings/playtime?limit=${limit}`)
    } catch (error) {
      console.error('获取游玩时长排名失败:', error)
      throw error
    }
  },

  // 获取玩家游玩时长
  async getPlayerPlayTime(steamId: string): Promise<ApiResponse<K4PlayerTimeInfo>> {
    try {
      return await apiRequest<ApiResponse<K4PlayerTimeInfo>>(`/k4times/player/${steamId}`)
    } catch (error) {
      console.error('获取玩家游玩时长失败:', error)
      throw error
    }
  }
}
