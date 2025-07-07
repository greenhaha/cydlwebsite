// API配置
const API_BASE_URL = '/api/v1'

// 通用fetch请求函数
const apiRequest = async <T>(url: string, options?: RequestInit): Promise<T> => {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
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
