<script setup lang="ts">
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Button, Checkbox, InputText, Password, Message } from 'openvue'

import AuthContainer from '@/components/auth/AuthContainer.vue'

import { useAuthStore } from '@/stores/auth'
import { getSafeRedirectPath } from "@/utils/router.ts"

const store = useAuthStore()
const router = useRouter()
const route = useRoute()

const values = reactive({
  email: '',
  password: '',
})

async function handleLogin() {
  try {
    await store.authenticate(values)
    router.push(getSafeRedirectPath(route.query.redirect))
  } catch (error) {
    alert('Invalid credentials. Please try again.')
  }
}
</script>

<template>
  <AuthContainer title="Log in to your account" description="Enter your credentials to access your account.">
    <form class="flex flex-col gap-5 w-sm" @submit.prevent="handleLogin">
      <div class="flex flex-col gap-2">
        <label for="email">Email</label>
        <InputText type="text" id="email" placeholder="Email" v-model="values.email"
          :invalid="!!store.errors?.length" />
        <Message v-if="store.errors?.length" severity="error" size="small" variant="simple">
          {{ store.errors[0]?.message }}
        </Message>
      </div>
      <div class="flex flex-col gap-2">
        <div class="flex items-end justify-between">
          <label for="password">Password</label>
          <a href="#" class="text-sm underline text-primary">Forgot your password?</a>
        </div>
        <Password id="password" placeholder="Password" :feedback="false" toggleMask fluid v-model="values.password"
          :invalid="!!store.errors?.length" />
      </div>
      <div class="flex items-center gap-2">
        <Checkbox id="remember" />
        <label for="remember">Remember me</label>
      </div>
      <Button type="submit" label="Login" :loading="store.isLoading" />
    </form>

    <span class="mt-4 text-sm text-muted-color">
      Don't have an account?
      <RouterLink :to="{ name: 'signup' }" class="underline text-primary">Sign up</RouterLink>
    </span>
  </AuthContainer>
</template>
