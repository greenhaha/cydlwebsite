export interface ServerConfig {
  name: string
  address: string
}

export const serverConfigs: ServerConfig[] = [
  { name: 'CS2-娱乐对抗', address: 'hlymmg.cn:27015'},
  { name: 'L4D2-三方多特', address: 'mc.cu.mujica.cloud:40006'},
]

export const serverAddresses = serverConfigs.map((config) => config.address ?? '')
