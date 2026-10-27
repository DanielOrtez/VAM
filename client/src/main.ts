import {createApp} from 'vue'
import {createPinia} from 'pinia'
import OpenVue from 'openvue/config'
import Aura from '@openvue/themes/aura'

import App from './App.vue'
import router, {setupRouterGuards} from './router'
import {useAuthStore} from '@/stores/auth.ts'

const app = createApp(App)

app.use(createPinia())
const authStore = useAuthStore()
await authStore.initialize()

setupRouterGuards(router, authStore)
app.use(router)
app.use(OpenVue, {
  theme: {
    preset: Aura,
  },
})

app.mount('#app')
