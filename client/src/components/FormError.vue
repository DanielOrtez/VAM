<!-- It renders form errors on server-side validation errors -->
<script lang="ts" setup>
import { computed } from 'vue'
import ErrorMessage from './ErrorMessage.vue'
import type { ErrorResponse } from '@/types/api'

const props = defineProps<{
  errors: ErrorResponse[] | undefined
  param: string
}>()

const error = computed(() => {
  return props.errors?.find((err) => err.param === props.param)
})
</script>

<template>
  <ErrorMessage v-if="error" :message="error.message" />
</template>
