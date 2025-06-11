import { createRouter, createWebHistory } from 'vue-router'
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
      path: '/shop',
      name: 'shop',
      component: () => import('../views/ShopView.vue'),
      redirect: '/shop/models', // 添加重定向到默认子路由
      children: [
        {
          path: 'models', // 移除空路径，使用明确的路径
          name: 'shop-models',
          component: () => import('../views/shop/ShopModelsView.vue'),
        },
        {
          path: 'preview/:id',
          name: 'shop-preview',
          component: () => import('../views/shop/ShopPreviewView.vue'),
        },
        {
          path: 'purchase/:id',
          name: 'shop-purchase',
          component: () => import('../views/shop/ShopPurchaseView.vue'),
        },
        {
          path: 'history',
          name: 'shop-history',
          component: () => import('../views/shop/ShopHistoryView.vue'),
        },
      ],
    },
  ],
})

export default router
