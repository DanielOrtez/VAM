<script lang="ts" setup>
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

const store = useAuthStore()
const router = useRouter()

async function logout() {
  await store.logout()
  router.replace('/')
}
</script>

<template>
  <header class="flex justify-center bg-zinc-900">
    <div class="flex justify-between items-center w-400 p-4">
      <RouterLink to="/">Header</RouterLink>
      <a @click="logout" v-if="store.isAuthenticated"> Logout </a>
    </div>
  </header>
</template>
