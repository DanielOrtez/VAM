import {useAuthStore} from '@/stores/auth'
import {createRouter, createWebHistory, type Router} from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/pages/Home.vue'),
    meta: { auth: true },
  },
  {
    path: '/account',
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/pages/auth/LoginPage.vue'),
        meta: { auth: false },
      },
      {
        path: 'signup',
        name: 'signup',
        component: () => import('@/pages/auth/RegisterPage.vue'),
        meta: { auth: false },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router

export function setupRouterGuards(router: Router, store: ReturnType<typeof useAuthStore>) {
  router.beforeEach((to) => {
    const isAuthenticated = store.isAuthenticated
    const requiresAuth = to.matched.some((record) => record.meta.auth)

    if (requiresAuth && !isAuthenticated) {
      return {
        name: 'login',
        query: { redirect: to.fullPath },
      }
    } else if (!requiresAuth && isAuthenticated) return '/'

    return
  })
}
