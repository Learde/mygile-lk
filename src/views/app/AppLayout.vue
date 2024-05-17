<script setup>
import { useLocalStorage } from "@vueuse/core";
import { VaLayout, useBreakpoint } from "vuestic-ui";

import { TheNavbar, TheSidebar } from "@/components";

const breakpoints = useBreakpoint();

const isSidebarMinimized = useLocalStorage("isSidebarMinimized", breakpoints.smDown);

const toggleSidebar = function () {
    isSidebarMinimized.value = !isSidebarMinimized.value;
};
</script>

<template>
    <VaLayout
        :top="{ fixed: true, order: 2 }"
        :left="{
            fixed: true,
            absolute: breakpoints.smDown,
            order: 1,
            overlay: breakpoints.smDown && isSidebarMinimized,
        }"
        @left-overlay-click="isSidebarMinimized = false"
    >
        <template #top>
            <TheNavbar :is-sidebar-minimized="isSidebarMinimized" @toggle-sidebar="toggleSidebar" />
        </template>

        <template #left>
            <TheSidebar :is-sidebar-minimized="isSidebarMinimized" />
        </template>

        <template #content>
            <main>
                <article>
                    <RouterView />
                </article>
            </main>
        </template>
    </VaLayout>
</template>

<style scoped>
main {
    padding: var(--app-main-padding);
}

article {
    padding: 20px;
    border-radius: 5px;
    background-color: var(--va-background-element);
    min-height: calc(100vh - var(--app-navbar-height) - var(--app-main-padding) * 2);
}
</style>
