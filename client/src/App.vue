<script lang="ts" setup>
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <div class="relative flex min-h-full flex-col overflow-hidden bg-ink-950">
    <AppHeader />
    <main class="relative flex flex-1 items-center justify-center px-4 py-10 sm:py-16">
      <RouterView />
    </main>
  </div>
</template>
