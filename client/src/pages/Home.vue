<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth'

const store = useAuthStore()
</script>

<template>
  <div v-if="!store.isAuthenticated">
    <RouterLink :to="{ name: 'login' }">Login</RouterLink>
    <span class="mx-2"></span>
    <RouterLink :to="{ name: 'signup' }">Register</RouterLink>
  </div>
  <div v-else>
    <span>Welcome, {{ store.user.username }}!</span>
  </div>
</template>
