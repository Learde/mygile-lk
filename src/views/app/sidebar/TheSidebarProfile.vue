<script setup>
import { storeToRefs } from "pinia";
import { VaAvatar, VaSidebarItem, VaSidebarItemContent, VaSidebarItemTitle } from "vuestic-ui";

import { useUserStore } from "@/stores";

defineProps({
    isMinimized: {
        type: Boolean,
        default: false,
    },
});

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
</script>

<template>
    <VaSidebarItem class="sidebar-profile-item">
        <VaSidebarItemContent class="sidebar-profile" :class="{ minimized: isMinimized }">
            <VaAvatar size="small" :color="user.avatarColor">{{ user.initials }}</VaAvatar>
            <VaSidebarItemTitle class="sidebar-title"> {{ user.fullName }} </VaSidebarItemTitle>
        </VaSidebarItemContent>
    </VaSidebarItem>
</template>

<style scoped>
.sidebar-profile {
    padding: 10px 12px;
    min-height: 42px;
    transition: padding 0.5s;
    overflow-x: hidden;
    border-bottom: 1px solid var(--va-background-secondary);
}

.sidebar-profile.minimized {
    padding: 10px 2.5px;
}

.sidebar-title {
    font-size: 14px;
}
</style>
