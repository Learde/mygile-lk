import { createRouter, createWebHistory } from "vue-router";

import { useUserStore } from "../stores/useUserStore.js";

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
                {
                    path: "company",
                    name: "company",
                    component: () => import("../views/app/company/CompaniesPage.vue"),
                },
                {
                    path: "company/add",
                    name: "company-add",
                    component: () => import("../views/app/company/CompaniesFormPage.vue"),
                },
                {
                    path: "company/edit/:id",
                    name: "company-edit",
                    props: true,
                    component: () => import("../views/app/company/CompaniesFormPage.vue"),
                },
                {
                    path: "company/:id",
                    name: "company-view",
                    props: true,
                    component: () => import("../views/app/company/CompanyPage.vue"),
                },
                {
                    path: "company/:companyId/board/add",
                    name: "board-add",
                    props: true,
                    component: () => import("../views/app/board/BoardFormPage.vue"),
                },
                {
                    path: "board/:id",
                    name: "board-view",
                    props: true,
                    component: () => import("../views/app/board/BoardPage.vue"),
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

const authRoutes = ["login", "registration", "auth"];

router.beforeEach(async (to) => {
    const userStore = useUserStore();

    if (!userStore.isAuthenticated && !authRoutes.includes(to.name)) {
        return { name: "login" };
    }

    if (userStore.isAuthenticated && authRoutes.includes(to.name)) {
        return { name: "home" };
    }
});

export default router;
