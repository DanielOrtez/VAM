<script setup lang="ts">
import { Button, Checkbox, InputText, Password } from 'openvue'
import AuthContainer from '@/components/auth/AuthContainer.vue'
</script>

<template>
    <AuthContainer title="Log in to your account" description="Enter your credentials to access your account.">
        <form class="flex flex-col gap-5 w-sm">
            <div class="flex flex-col gap-2">
                <label for="username">Username</label>
                <InputText type="text" id="username" placeholder="Username" />
            </div>
            <div class="flex flex-col gap-2">
                <div class="flex items-end justify-between">
                    <label for="password">Password</label>
                    <a href="#" class="text-sm underline text-primary">Forgot your password?</a>
                </div>
                <Password id="password" placeholder="Password" :feedback="false" toggleMask fluid />
            </div>
            <div class="flex items-center gap-2">
                <Checkbox id="remember" />
                <label for="remember">Remember me</label>
            </div>
            <Button type="submit" label="Login" />
        </form>

        <span class="mt-4 text-sm text-muted-color">
            Don't have an account?
            <RouterLink to="/signup" class="underline text-primary">Sign up</RouterLink>
        </span>
    </AuthContainer>
</template>