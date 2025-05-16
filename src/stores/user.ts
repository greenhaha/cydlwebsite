import { defineStore } from 'pinia'

interface LoginForm {
  username: string
  password: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    userInfo: null as {
      username: string
      nickname: string
      avatar: string
      qq: string
      points: number
    } | null
  }),

  actions: {
    async login(form: LoginForm) {
      try {
        // TODO: 实现实际的登录API调用
        // 这里模拟登录成功
        this.isLoggedIn = true
        this.userInfo = {
          username: form.username,
          nickname: form.username,
          avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=' + form.username,
          qq: '123456789',
          points: 100,
        }
        return { success: true }
      } catch (error) {
        return { success: false, error }
      }
    },

    async register() {
      try {
        // TODO: 实现实际的注册API调用
        // 这里模拟注册成功
        return { success: true }
      } catch (error) {
        return { success: false, error }
      }
    },

    logout() {
      try {
        this.isLoggedIn = false
        this.userInfo = null
        return { success: true }
      } catch (error) {
        return { success: false, error }
      }
    }
  }
}) 