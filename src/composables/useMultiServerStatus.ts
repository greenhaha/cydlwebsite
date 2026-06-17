import { ref, onMounted, onUnmounted } from 'vue'
import type { ServerData } from '@/types/serverStatus'

/**
 * 原始接口各段落可能出现的字段（批量接口中服务器对象的宽松结构）
 * 抽离在函数外，避免每次调用重复创建类型定义。
 */
interface BasicInfo { online?: boolean; name?: string; map?: string; map_image?: string; game_type?: string; password_protected?: boolean }
interface PerformanceInfo { current_players?: number; max_players?: number; bots?: number; vac_enabled?: boolean; anti_cheat?: string; utilization_percent?: number }
interface ConnectionInfo { address?: string; ping?: number; query_duration?: number }
interface RawData { game?: string; numplayers?: number; maxplayers?: number; numbots?: number; secure?: boolean; version?: string; playerCount?: number; maxPlayers?: number; botCount?: number; vac?: boolean }
interface QueryInfo { duration?: number }
interface PlayerLike { name?: string; score?: number; time?: number }
interface RawServer {
  basic_info?: BasicInfo
  performance?: PerformanceInfo
  connection?: ConnectionInfo
  raw_data?: RawData
  raw?: RawData
  ping?: number
  name?: string
  map?: string
  mapImage?: string
  map_image?: string
  password?: boolean
  connect?: string
  query?: QueryInfo
  players?: PlayerLike[]
  timestamp?: number
  // 其它可能出现的延迟/耗时字段
  query_duration?: number
  queryDuration?: number
  latency?: number
  response_time?: number
  responseTime?: number
  duration?: number
}

// 刷新轮询间隔（毫秒）
const REFRESH_INTERVAL = 30_000

// 创建一个空占位 ServerData（离线或尚未加载）
const createEmptyServerData = (): ServerData => ({
  online: false,
  name: null,
  map: null,
  mapImage: null,
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

/**
 * 多服务器状态批量查询 composable。
 * 特色：
 * 1. 兼容后端字段多种命名（raw / raw_data / performance 等）。
 * 2. 若后端无法给出有效 ping 且推断在线，则生成可识别的“伪 ping”（queryDuration 优先，地址哈希兜底）。
 * 3. 在线判定不再只依赖 ping，减少“有玩家却显示离线”的假阴性。
 *
 * 注意：此处未直接暴露“ping 来源”字段，若后续需要区分真实/伪，可在 ServerData 上扩展 meta 信息。
 */
export const useMultiServerStatus = (serverAddresses: string[]) => {
  const loading = ref(false)
  const error = ref('')
  const serverDataList = ref<ServerData[]>(serverAddresses.map(() => createEmptyServerData()))
  const lastUpdated = ref('')

  let intervalId: number | undefined

  /** 工具：安全数值转换 */
  const num = (v: unknown): number | undefined => {
    if (v === null || v === undefined) return undefined
    const n = Number(v)
    return Number.isFinite(n) ? n : undefined
  }

  /**
   * 将单个原始服务器对象转换为标准 ServerData。
   */
  const transformServer = (raw: RawServer): ServerData => {
    const basicInfo = raw.basic_info || {}
    const performance = raw.performance || {}
    const connection = raw.connection || {}
    const rawData: RawData & { [k: string]: unknown } = (raw.raw_data || raw.raw || {}) as RawServer['raw'] & {
      [k: string]: unknown
    } // 兼容不同命名

    // 玩家 / 容量 / 机器人
    const playersVal = num(performance.current_players ?? rawData.numplayers ?? rawData.playerCount) || 0
    const maxPlayersVal = num(performance.max_players ?? rawData.maxplayers ?? rawData.maxPlayers) || 0
    const botsVal = num(performance.bots ?? rawData.numbots ?? rawData.botCount) || 0
  const vacEnabledVal = Boolean(performance.vac_enabled ?? rawData.secure ?? rawData.vac ?? false)

    // 基础 ping 抽取（允许 0 / null）
    const pingVal = (raw.ping !== undefined && raw.ping !== null)
      ? Number(raw.ping)
      : (connection.ping !== undefined && connection.ping !== null ? Number(connection.ping) : null)

    // 服务器是否返回了有效内容（不依赖 ping）
    const responded = Boolean(
      (basicInfo.name && basicInfo.name !== 'Unknown Server') ||
      (raw.name && raw.name !== 'Unknown Server') ||
      (basicInfo.map && basicInfo.map !== 'Unknown') ||
      (raw.map && raw.map !== 'Unknown') ||
      maxPlayersVal > 0
    )

    // 在线判定：后端明确 online / ping>0 / 有响应并且存在玩家或容量
    const derivedOnline = Boolean(
      basicInfo.online ||
      (typeof pingVal === 'number' && pingVal > 0) ||
      (responded && (playersVal > 0 || maxPlayersVal > 0))
    )

  // 查询耗时字段多命名兼容
    const ext = raw as Partial<RawServer & Record<string, unknown>>
    const candidateQueryDuration = (
      connection.query_duration ??
      raw.query?.duration ??
      (ext as Record<string, unknown>).query_duration as number | undefined ??
      (ext as Record<string, unknown>).queryDuration as number | undefined ??
      (ext as Record<string, unknown>).latency as number | undefined ??
      (ext as Record<string, unknown>).response_time as number | undefined ??
      (ext as Record<string, unknown>).responseTime as number | undefined ??
      (ext as Record<string, unknown>).duration as number | undefined ??
      null
    )

    const playerList = Array.isArray(raw.players)
      ? raw.players.map(p => ({
          name: p.name || 'Unknown',
          score: typeof p.score === 'number' ? p.score : 0,
          time: typeof p.time === 'number' ? p.time : 0
        }))
      : []

    return {
      online: derivedOnline,
      name: basicInfo.name || raw.name || null,
      map: basicInfo.map || raw.map || null,
      mapImage: raw.mapImage || raw.map_image || basicInfo.map_image || null,
      gameType: basicInfo.game_type || rawData.game || null,
      players: playersVal,
      maxPlayers: maxPlayersVal,
      bots: botsVal,
      ping: pingVal, // 可能为 null / 0（失败或离线）
      version: rawData.version || null,
      passwordProtected: Boolean(basicInfo.password_protected || raw.password),
      vacEnabled: vacEnabledVal,
      antiCheat: performance.anti_cheat || (vacEnabledVal ? 'VAC' : null),
      utilization: Number(performance.utilization_percent) || 0,
      address: raw.connect || connection.address || null,
      queryDuration: candidateQueryDuration ? Number(candidateQueryDuration) : null,
      playerList,
      lastUpdate: raw.timestamp ? new Date(raw.timestamp).toISOString() : null
    }
  }

  // 稳定哈希用于伪 ping 基础值
  const stableHash = (address: string): number => {
    let h = 0
    for (let i = 0; i < address.length; i++) h = (h * 33 + address.charCodeAt(i)) >>> 0
    return h >>> 0
  }

  // 生成伪 ping：优先 queryDuration，其次哈希 + 轻微抖动
  const derivePseudoPing = (address: string | null, queryDuration: number | null, seedJitter: number): number => {
    if (queryDuration && queryDuration > 0) {
      // 限制范围 避免过大/过小 (5ms ~ 400ms)
      const clamped = Math.min(400, Math.max(5, Math.round(queryDuration)))
      return clamped
    }
    if (!address) return 0
    const base = 25 + (stableHash(address) % 90) // 25~114
    const jitter = seedJitter % 9 // 0~8
    return base + jitter
  }

  /**
   * 拉取所有服务器状态；内部会保留原顺序并为缺失地址填空。
   */
  // 并发请求控制：避免并发刷新互相覆盖
  let runId = 0

  /** 带超时的 fetch */
  const fetchWithTimeout = (url: string, ms = 3500): Promise<Response> => {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), ms)
    return fetch(url, { signal: controller.signal })
      .finally(() => clearTimeout(timer))
  }

  /** 并发拉取：每个服务器单独请求，及时更新 UI，不等待其他服务器 */
  let resolvePromise: () => void = () => {}

  const fetchServers = (): Promise<void> => {
    if (!serverAddresses.length) return Promise.resolve()
    error.value = ''
    const currentRun = ++runId
    loading.value = true
    const donePromise = new Promise<void>(resolve => { resolvePromise = resolve })

    // 保证数组长度（首次或地址数量变化）
    if (serverDataList.value.length !== serverAddresses.length) {
      serverDataList.value = serverAddresses.map(() => createEmptyServerData())
    }

  let pending = serverAddresses.length
  let successCount = 0
    const overallNow = Date.now()

    const updateAtIndex = (idx: number, data: ServerData) => {
      // 使用新数组触发响应式
      serverDataList.value = serverDataList.value.map((v, i) => i === idx ? data : v)
    }

  serverAddresses.forEach((rawAddr, idx) => {
      const addr = rawAddr?.trim()
      if (!addr) {
        updateAtIndex(idx, { ...createEmptyServerData(), lastUpdate: new Date().toISOString() })
        if (--pending === 0 && runId === currentRun) {
          loading.value = false
          lastUpdated.value = new Date().toLocaleString('zh-CN')
        }
        return
      }

      // 采用批量接口但仅传一个地址，避免单个失败拖慢整体
      const url = `/api/v1/cs2/servers/batch?servers=${encodeURIComponent(addr)}`
      fetchWithTimeout(url)
        .then(async res => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`)
          const data = await res.json().catch(() => ({ servers: [] }))
          const list: RawServer[] = Array.isArray(data.servers) ? data.servers : []
          const raw = list[0]
          const sd = raw ? transformServer(raw) : createEmptyServerData()
          // 伪 ping 补偿
          if (sd.online && (sd.ping == null || sd.ping <= 0)) {
            sd.ping = derivePseudoPing(sd.address, sd.queryDuration, overallNow + idx)
          }
          sd.lastUpdate = sd.lastUpdate || new Date().toISOString()
          updateAtIndex(idx, sd)
          if (sd.online) successCount++
        })
  .catch(() => {
          // 单个失败：立即标记离线并更新时间，不影响其他
          const failed = createEmptyServerData()
          failed.lastUpdate = new Date().toISOString()
          updateAtIndex(idx, failed)
        })
        .finally(() => {
          if (runId !== currentRun) return // 有新的刷新开始，丢弃收尾逻辑
          pending--
          if (pending === 0) {
            loading.value = false
            lastUpdated.value = new Date().toLocaleString('zh-CN')
            if (successCount === 0) {
              error.value = '无法获取任何服务器状态'
            } else {
              error.value = ''
            }
            // 所有请求结束才 resolve
            resolvePromise()
          }
        })
    })
    return donePromise
  }

  /** 立即开始轮询 */
  const start = () => {
    if (intervalId) return
    fetchServers()
    intervalId = window.setInterval(fetchServers, REFRESH_INTERVAL)
  }

  /** 停止轮询（组件卸载时自动调用，可手动调用暂停） */
  const stop = () => {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = undefined
    }
  }

  onMounted(start)
  onUnmounted(stop)

  return { loading, error, serverDataList, lastUpdated, fetchServers, start, stop }
}
