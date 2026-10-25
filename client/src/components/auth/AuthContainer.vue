<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
}>()
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex flex-col items-center gap-1">
      <h1 class="text-xl font-medium">{{ title }}</h1>
      <p class="text-center text-sm text-muted-color">{{ description }}</p>
    </div>

    <div class="flex flex-col w-full items-center justify-center">
      <slot />
    </div>
  </div>
</template>
