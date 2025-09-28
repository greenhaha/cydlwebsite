import { defineStore } from 'pinia'

interface BalanceState {
  wishPoints: number | null
  internalCredits: number | null
  lastUpdated: number | null
}

export const useBalanceStore = defineStore('balanceStore', {
  state: (): BalanceState => ({
    wishPoints: null,
    internalCredits: null,
    lastUpdated: null
  }),
  getters: {
    hasData: (s) => s.wishPoints !== null && s.internalCredits !== null
  },
  actions: {
    setBalances(wishPoints: number, internalCredits: number) {
      this.wishPoints = wishPoints
      this.internalCredits = internalCredits
      this.lastUpdated = Date.now()
    },
    clear() {
      this.wishPoints = null
      this.internalCredits = null
      this.lastUpdated = null
    }
  }
})
