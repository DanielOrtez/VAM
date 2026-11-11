<script setup lang="ts">
import { reactive } from 'vue'
import { Button, InputText, Password } from 'openvue'
import { Form } from '@openvue/forms'
import { zodResolver } from '@openvue/forms/resolvers/zod'
import { z } from 'zod'

import AuthContainer from '@/components/auth/AuthContainer.vue'

const values = reactive({
  email: '',
  password: '',
  confirm_password: '',
})

const resolver = zodResolver(
  z.object({
    email: z.email('Enter a valid email address.'),
    password: z.string().min(1, 'Password is required.'),
    confirm_password: z.string().min(1, 'Confirm Password is required.'),
  })
    .refine((data) => data.password === data.confirm_password, {
      error: "Password don't match",
      path: ["confirm"],
    }),
)

async function signup({ valid }: { valid: boolean }) {
  if (!valid) return
  // TODO: Implement signup logic here
}
</script>

<template>
  <AuthContainer title="Create an account" description="Fill in the details below to create your account.">
    <Form class="flex flex-col gap-5 w-sm" :resolver @submit="signup" v-slot="$form" :initialValues="values"
      :validateOnSubmit="true" :validateOnValueUpdate="false" :validateOnBlur="true">
      <div class="flex flex-col gap-2">
        <label for="email">Email</label>
        <InputText type="text" name="email" id="email" placeholder="Email" />
      </div>
      <div class="flex flex-col gap-2">
        <label for="password">Password</label>
        <Password name="password" id="password" placeholder="Password" toggleMask fluid />
      </div>
      <div class="flex flex-col gap-2">
        <label for="confirm_password">Confirm Password</label>
        <Password name="confirm_password" id="confirm_password" placeholder="Confirm Password" :feedback="false"
          toggleMask fluid />
      </div>
      <Button type="submit" label="Register" />
    </Form>

    <span class="mt-4 text-sm text-muted-color">
      Already have an account?
      <RouterLink :to="{ name: 'login' }" class="underline text-primary">Log in</RouterLink>
    </span>
  </AuthContainer>
</template>
