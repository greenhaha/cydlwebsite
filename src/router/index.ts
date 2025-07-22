import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/models',
      name: 'models',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ModelsView.vue'),
    },
    {
      path: '/registration',
      name: 'registration',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/RegistrationView.vue'),
      meta: { requiresAuth: true }, // 需要登录
    },
    {
      path: '/faq',
      name: 'faq',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/FaqView.vue'),
    },
    {
      path: '/gifts',
      name: 'gift',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/GiftView.vue'),
      meta: { requiresAuth: true }, // 需要登录
    },
    {
      path: '/contribute',
      name: 'contribute',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ContributeView.vue'),
    },
    {
      path: '/anniversary-preheating',
      name: 'anniversary-preheating',
      // route level code-splitting
      // this generates a separate chunk for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AnniversaryPreheatingView.vue'),
      // 无需登录访问 - 公开页面
    },
    {
      path: '/anniversary',
      name: 'anniversary',
      // route level code-splitting
      // this generates a separate chunk for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AnniversaryView.vue'),
      // 无需登录访问 - 公开页面
    },
    {
      path: '/server-status',
      name: 'server-status',
      // route level code-splitting
      // this generates a separate chunk for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ServerStatusView.vue'),
    },
    {
      path: '/lottery',
      name: 'lottery',
      // route level code-splitting
      // this generates a separate chunk for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LotteryView.vue'),
      // meta: { requiresAuth: true }, // 需要登录
    },
    {
      path: '/lottery-test',
      name: 'lottery-test',
      // route level code-splitting
      // this generates a separate chunk for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LotteryTestView.vue'),
    },
    {
      path: '/challenge',
      name: 'challenge',
      // route level code-splitting
      // this generates a separate chunk for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ChallengeView.vue'),
      // 无需登录访问 - 公开页面
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView.vue'),
      meta: { requiresGuest: true }, // 游客页面（已登录用户不应访问）
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/RegisterView.vue'),
      meta: { requiresGuest: true }, // 游客页面（已登录用户不应访问）
    },
    {
      path: '/profile',
      name: 'profile',
      // route level code-splitting
      // this generates a separate chunk for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ProfileView.vue'),
      meta: { requiresAuth: true }, // 需要登录
    },
    {
      path: '/wish-exchange',
      name: 'wish-exchange',
      // route level code-splitting
      // this generates a separate chunk for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/WishValueExchangeView.vue'),
      meta: { requiresAuth: true }, // 需要登录
    },
    {
      path: '/wish-credit-exchange',
      name: 'wish-credit-exchange',
      // route level code-splitting
      // this generates a separate chunk for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/WishValueCreditExchangeView.vue'),
      meta: { requiresAuth: true }, // 需要登录
    },
  ],
})

// 全局路由守卫
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // 如果还没有初始化认证状态，先初始化
  if (!authStore.user && authStore.token) {
    await authStore.initialize()
  }

  // 检查是否需要登录
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!authStore.isAuthenticated) {
      next({
        path: '/login',
        query: { redirect: to.fullPath } // 保存原来要访问的路径
      })
      return
    }
  }

  // 检查是否为游客页面（已登录用户不应访问）
  if (to.matched.some(record => record.meta.requiresGuest)) {
    if (authStore.isAuthenticated) {
      next('/')
      return
    }
  }

  next()
})

export default router
