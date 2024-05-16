<script setup>
import { ref, watchEffect } from "vue";
import { VaLayout, useBreakpoint } from "vuestic-ui";

import TheNavbar from "./navbar/TheNavbar.vue";
import TheSidebar from "./sidebar/TheSidebar.vue";

const breakpoints = useBreakpoint();

const isSidebarMinimized = ref(!breakpoints.mdUp);

watchEffect(() => {
    isSidebarMinimized.value = !breakpoints.smUp;
});
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
            <TheNavbar v-model:is-sidebar-minimized="isSidebarMinimized" />
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
