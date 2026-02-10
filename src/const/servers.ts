export interface ServerConfig {
  name: string
  address: string
}

export const serverConfigs: ServerConfig[] = [
  { name: 'CS2-娱乐对抗', address: '110.42.41.225:27015' },
]

export const serverAddresses = serverConfigs.map((config) => config.address ?? '')
