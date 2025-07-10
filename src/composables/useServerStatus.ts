import { ref, onMounted, onUnmounted } from 'vue'
import { useMessage } from 'naive-ui'
import type { ServerData } from '@/types/serverStatus'

export const useServerStatus = () => {
  const message = useMessage()
  const loading = ref(false)
  const error = ref('')
  const serverData = ref<ServerData>({
    online: false,
    name: null,
    map: null,
    gameType: null,
    players: 0,
    maxPlayers: 0,
    bots: 0,
    ping: null,
    version: null,
    passwordProtected: false,
    vacEnabled: false,
    antiCheat: null,
    utilization: 0,
    address: null,
    queryDuration: null,
    playerList: [],
    lastUpdate: null
  })
  const lastUpdated = ref('')

  // 定时器ID，用于清理
  let intervalId: number | undefined

  const fetchServerStatus = async () => {
    loading.value = true
    error.value = ''

    try {
      const response = await fetch('/api/v1/cs2/server/details')

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()

      // 检查API返回的数据是否有效
      if (!data || typeof data !== 'object') {
        throw new Error('API返回的数据格式无效')
      }

      // 根据新的API数据结构更新服务器数据
      const basicInfo = data.basic_info || {}
      const performance = data.performance || {}
      const connection = data.connection || {}
      const rawData = data.raw_data || {}

      serverData.value = {
        online: Boolean(basicInfo.online),
        name: basicInfo.name || null,
        map: basicInfo.map || null,
        gameType: basicInfo.game_type || rawData.game || null,
        players: Number(performance.current_players || rawData.numplayers) || 0,
        maxPlayers: Number(performance.max_players || rawData.maxplayers) || 0,
        bots: Number(performance.bots || rawData.numbots) || 0,
        ping: connection.ping ? Number(connection.ping) : null,
        version: rawData.version || null,
        passwordProtected: Boolean(basicInfo.password_protected),
        vacEnabled: Boolean(performance.vac_enabled || rawData.secure),
        antiCheat: performance.anti_cheat || null,
        utilization: Number(performance.utilization_percent) || 0,
        address: connection.address || null,
        queryDuration: connection.query_duration ? Number(connection.query_duration) : null,
        playerList: Array.isArray(data.players) ? data.players : [],
        lastUpdate: data.timestamp ? new Date(data.timestamp).toISOString() : null
      }

      if (serverData.value.online) {
        message.success('服务器状态已更新')
      } else {
        message.warning('服务器当前离线')
      }
    } catch (err) {
      console.warn('API请求失败:', err)
      error.value = err instanceof Error ? err.message : '获取服务器状态失败'

      // 设置离线状态
      serverData.value = {
        online: false,
        name: null,
        map: null,
        gameType: null,
        players: 0,
        maxPlayers: 0,
        bots: 0,
        ping: null,
        version: null,
        passwordProtected: false,
        vacEnabled: false,
        antiCheat: null,
        utilization: 0,
        address: null,
        queryDuration: null,
        playerList: [],
        lastUpdate: null
      }

      message.error('无法连接到服务器')
    } finally {
      loading.value = false
      lastUpdated.value = new Date().toLocaleString('zh-CN')
    }
  }

  onMounted(() => {
    fetchServerStatus()

    // 每30秒自动刷新一次
    intervalId = window.setInterval(() => {
      fetchServerStatus()
    }, 30000)
  })

  onUnmounted(() => {
    // 清理定时器，防止内存泄漏
    if (intervalId) {
      clearInterval(intervalId)
    }
  })

  return {
    loading,
    error,
    serverData,
    lastUpdated,
    fetchServerStatus
  }
}
