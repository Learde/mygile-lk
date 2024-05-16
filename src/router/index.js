import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("../views/app/AppLayout.vue"),
            redirect: "/profile",
            children: [
                {
                    path: "profile",
                    name: "profile",
                    component: () => import("../views/app/profile/ProfilePage.vue"),
                },
            ],
        },
        {
            path: "/auth",
            name: "auth",
            component: () => import("../views/auth/AuthLayout.vue"),
            redirect: "/auth/login",
            children: [
                {
                    path: "login",
                    name: "login",
                    component: () => import("../views/auth/login/LoginPage.vue"),
                },
                {
                    path: "registration",
                    name: "registration",
                    component: () => import("../views/auth/registration/RegistrationPage.vue"),
                },
            ],
        },
    ],
});

export default router;
