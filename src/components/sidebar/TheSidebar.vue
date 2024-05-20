<script setup>
import {
    VaSidebar,
    VaSidebarItem,
    VaIcon,
    VaSidebarItemContent,
    VaSidebarItemTitle,
    useBreakpoint,
} from "vuestic-ui";

import TheSidebarProfile from "./TheSidebarProfile.vue";

defineProps({
    isSidebarMinimized: {
        type: Boolean,
        default: false,
    },
});

const breakpoint = useBreakpoint();

const menu = [
    { icon: "apartment", title: "Компании", to: { name: "company" } },
    { icon: "push_pin", title: "Закрепленные" },
    { icon: "forum", title: "Диалоги" },
];
</script>

<template>
    <VaSidebar
        :minimized="isSidebarMinimized && !breakpoint.smDown"
        :model-value="isSidebarMinimized || !breakpoint.smDown"
        width="200px"
        minimized-width="45px"
        class="sidebar"
    >
        <TheSidebarProfile :is-minimized="isSidebarMinimized && !breakpoint.smDown" />
        <VaSidebarItem
            v-for="{ icon, title, to } in menu"
            :key="icon"
            active-class="sidebar-item-active"
            class="sidebar-item"
            :to="to ? to : undefined"
        >
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

:deep(.sidebar-item-active) {
    border-color: var(--va-primary);
}

:deep(.sidebar-item) {
    border-right: 2px solid transparent;
}
</style>
