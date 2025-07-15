export interface LotteryPrize {
  id: number
  name: string
  value: number
  probability: number
  color: string
  icon: string
  type: 'points' | 'retry' | 'thanks'
}

export interface LotteryResult {
  prize: LotteryPrize
  angle: number
  isWin: boolean
}

export interface LotteryState {
  isSpinning: boolean
  canSpin: boolean
  remainingChances: number
  totalSpins: number
  prizes: LotteryPrize[]
}
