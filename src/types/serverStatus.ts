export interface Player {
  name: string
  score: number
  time: number
}

export interface ServerData {
  online: boolean
  name: string | null
  map: string | null
  gameType: string | null
  players: number
  maxPlayers: number
  bots: number
  ping: number | null
  version: string | null
  passwordProtected: boolean
  vacEnabled: boolean
  antiCheat: string | null
  utilization: number
  address: string | null
  queryDuration: number | null
  playerList: Player[]
  lastUpdate: string | null
}
