import {ref} from 'vue'
import {defineStore} from 'pinia'

import {URLs} from '@/lib/allauth'
import type {SessionResponse, UserLogin, UserSession} from '@/types/auth'
import {getCsrfToken} from '@/lib/cookie'
import useHttp from '@/lib/http.ts'

export const useAuthStore = defineStore('auth', () => {
  const http = useHttp()

  const user = ref<UserSession | null>(null)
  const isAuthenticated = ref(false)

  const isLoading = ref(false)

  async function initialize() {
    try {
      if (getCsrfToken() === null) {
        await http.GET(URLs.config)
      }

      const { ok, data, status } = await http.GET<SessionResponse>(URLs.session)
      if (!ok || !data) {
        throw new Error(`Session: ${status}`)
      }

      user.value = data.data.user
      isAuthenticated.value = data.meta.is_authenticated
    } catch {
      user.value = null
      isAuthenticated.value = false
    }
  }

  async function authenticate(userData: UserLogin) {
    isLoading.value = true
    const { data } = await http.POST<SessionResponse>(URLs.login, {
      username: userData.username,
      password: userData.password,
    })

    user.value = data.data.user
    isAuthenticated.value = data.meta.is_authenticated
    isLoading.value = false
  }

  async function logout() {
    await http.DELETE(URLs.session)
    user.value = null
    isAuthenticated.value = false
  }

  return { user, isAuthenticated, isLoading, authenticate, initialize, logout }
})
