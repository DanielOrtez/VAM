<script setup lang="ts">
import { Button, Checkbox, InputText, Password } from 'openvue'
import AuthContainer from '@/components/auth/AuthContainer.vue'
</script>

<template>
    <AuthContainer title="Create an account" description="Fill in the details below to create your account.">
        <form class="flex flex-col gap-5 w-sm">
            <div class="flex flex-col gap-2">
                <label for="username">Username</label>
                <InputText type="text" id="username" placeholder="Username" />
            </div>
            <div class="flex flex-col gap-2">
                <label for="email">Email</label>
                <InputText type="text" id="email" placeholder="Email" />
            </div>
            <div class="flex flex-col gap-2">
                <label for="password">Password</label>
                <Password id="password" placeholder="Password" toggleMask fluid />
            </div>
            <div class="flex flex-col gap-2">
                <label for="confirm_password">Confirm Password</label>
                <Password id="confirm_password" placeholder="Confirm Password" :feedback="false" toggleMask fluid />
            </div>
            <div class="flex items-center gap-2">
                <Checkbox id="remember" />
                <label for="remember">Remember me</label>
            </div>
            <Button type="submit" label="Login" />
        </form>

        <span class="mt-4 text-sm text-muted-color">
            Already have an account?
            <RouterLink to="/login" class="underline text-primary">Log in</RouterLink>
        </span>
    </AuthContainer>
</template>