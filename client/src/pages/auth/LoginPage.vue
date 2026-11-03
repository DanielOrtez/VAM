<script setup lang="ts">
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Button, Checkbox, InputText, Password, Toast, useToast } from 'openvue'
import { Form } from '@openvue/forms'
import { zodResolver } from '@openvue/forms/resolvers/zod'
import { z } from 'zod'

import AuthContainer from '@/components/auth/AuthContainer.vue'
import FormError from '@/components/FormError.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'

import { useAuthStore } from '@/stores/auth'
import { getSafeRedirectPath } from '@/utils/router.ts'

const store = useAuthStore()
const router = useRouter()
const route = useRoute()
const toast = useToast()

const values = reactive({
  email: '',
  password: '',
  remember: false,
})

const resolver = zodResolver(
  z.object({
    email: z.email('Enter a valid email address.'),
    password: z.string().min(1, 'Password is required.'),
  }),
)

async function handleLogin({ valid }: { valid: boolean }) {
  if (!valid) return

  try {
    await store.authenticate(values)
    router.push(getSafeRedirectPath(route.query.redirect))
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error authenticating',
      detail: 'Please try again.',
      life: 2000,
    })
  }
}
</script>

<template>
  <AuthContainer
    title="Log in to your account"
    description="Enter your credentials to access your account."
  >
    <Form
      class="flex flex-col gap-5 w-sm"
      :resolver
      @submit="handleLogin"
      v-slot="$form"
      :initialValues="values"
      :validateOnSubmit="true"
      :validateOnValueUpdate="false"
      :validateOnBlur="true"
    >
      <div class="flex flex-col gap-2">
        <label for="email">Email</label>
        <InputText
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          v-model="values.email"
          :invalid="!!store.errors?.length"
        />
        <ErrorMessage v-if="$form.email?.invalid" :message="$form.email.error.message" />
        <FormError :errors="store.errors" param="email" />
      </div>
      <div class="flex flex-col gap-2">
        <div class="flex items-end justify-between">
          <label for="password">Password</label>
          <a href="#" class="text-sm underline text-primary">Forgot your password?</a>
        </div>
        <Password
          name="password"
          id="password"
          placeholder="Password"
          :feedback="false"
          toggleMask
          fluid
          v-model="values.password"
          :invalid="!!store.errors?.length"
        />
        <ErrorMessage v-if="$form.password?.invalid" :message="$form.password.error.message" />
        <FormError :errors="store.errors" param="password" />
      </div>
      <div class="flex items-center gap-2">
        <Checkbox id="remember" v-model="values.remember" binary />
        <label for="remember">Remember me</label>
      </div>
      <Button type="submit" label="Login" :loading="store.isLoading" />
    </Form>

    <span class="mt-4 text-sm text-muted-color">
      Don't have an account?
      <RouterLink :to="{ name: 'signup' }" class="underline text-primary">Sign up</RouterLink>
    </span>
  </AuthContainer>

  <Toast position="bottom-right" />
</template>
