<script setup>
import { VaSidebar, VaSidebarItem, VaIcon, VaSidebarItemContent, VaSidebarItemTitle } from "vuestic-ui";

import TheSidebarProfile from "./TheSidebarProfile.vue";

defineProps({
    isSidebarMinimized: {
        type: Boolean,
        default: false,
    },
});

const menu = [
    { icon: "folder", title: "Проекты" },
    { icon: "push_pin", title: "Закрепленные" },
    { icon: "forum", title: "Диалоги" },
];
</script>

<template>
    <VaSidebar :minimized="isSidebarMinimized" width="200px" minimized-width="45px" class="sidebar">
        <TheSidebarProfile :is-minimized="isSidebarMinimized" />
        <VaSidebarItem v-for="{ icon, title } in menu" :key="icon">
            <VaSidebarItemContent class="sidebar-content">
                <VaIcon :name="icon" size="small" />
                <VaSidebarItemTitle class="sidebar-title">
                    {{ title }}
                </VaSidebarItemTitle>
            </VaSidebarItemContent>
        </VaSidebarItem>
    </VaSidebar>
</template>

<style scoped>
.sidebar-content {
    padding: 10px 12px;
    min-height: 42px;
}

.sidebar-title {
    font-size: 14px;
}
</style>
