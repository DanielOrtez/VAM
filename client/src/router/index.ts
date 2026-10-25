import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('@/pages/Home.vue') },
  {
    path: '/account',
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/pages/auth/LoginPage.vue'),
        meta: { requiresGuest: true },
      },
      {
        path: 'signup',
        name: 'signup',
        component: () => import('@/pages/auth/RegisterPage.vue'),
        meta: { requiresGuest: true },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore()

  await authStore.initialize()

  const isAuthenticated = authStore.isAuthenticated
  const requiresGuest = to.matched.some((record) => record.meta.requiresGuest)
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (requiresAuth && !isAuthenticated) {
    return {
      name: 'login',
      query: { redirect: to.fullPath },
    }
  }

  if (requiresGuest && isAuthenticated) {
    return '/'
  }

  return
})

export default router
