export interface ServerConfig {
  name: string
  address: string
}

export const serverConfigs: ServerConfig[] = [
  { name: 'CS2-娱乐对抗', address: 'hlymmg.cn' },
]

export const serverAddresses = serverConfigs.map((config) => config.address ?? '')
