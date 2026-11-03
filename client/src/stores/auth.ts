import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { URLs } from '@/lib/allauth'
import type { SessionResponse, UserLogin } from '@/types/auth'
import { getCsrfToken } from '@/lib/cookie'
import { http, setOnAuthChangeHandler } from '@/lib/http.ts'

export const useAuthStore = defineStore('auth', () => {
  const session = ref<SessionResponse | null>(null)

  const user = computed(() => session.value?.data?.user)
  const isAuthenticated = computed(() => session.value?.meta?.is_authenticated)
  const isLoading = ref(false)

  const errors = computed(() => session.value?.errors)

  async function initialize(): Promise<void> {
    setOnAuthChangeHandler((value) => (session.value = value))

    try {
      if (!getCsrfToken()) {
        await http.GET(URLs.config)
      }

      const { ok, data, status } = await http.GET<SessionResponse>(URLs.session)
      if (!ok || !data) {
        throw new Error(`Session: ${status}`)
      }

      session.value = data
    } catch {
      session.value = null
    }
  }

  async function authenticate(userData: UserLogin) {
    isLoading.value = true
    const { status, data } = await http.POST<SessionResponse>(URLs.login, {
      email: userData.email,
      password: userData.password,
    })

    session.value = data
    isLoading.value = false

    if (status !== 200) {
      throw new Error(`Authentication failed: ${status}`)
    }
  }

  async function logout() {
    await http.DELETE(URLs.session)
    session.value = null
  }

  return { user, errors, isAuthenticated, isLoading, authenticate, initialize, logout }
})
