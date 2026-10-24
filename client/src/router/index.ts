import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: () => import("@/pages/Home.vue") },
    { path: "/login", component: () => import("@/pages/auth/LoginPage.vue") },
    { path: "/signup", component: () => import("@/pages/auth/RegisterPage.vue") },
  ],
});

export default router;
