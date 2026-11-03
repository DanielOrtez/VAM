<script setup lang="ts">
import { Message } from 'openvue'

defineProps<{
    message: string
}>()
</script>

<template>
    <Message severity="error" size="small" variant="simple">{{ message }}</Message>
</template>