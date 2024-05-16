<script setup>
import { computed } from "vue";
import { VaInnerLoading } from "vuestic-ui";

import { useColorTheme } from "@/utils";
import { useUserStore } from "@/stores";

const { applyTheme } = useColorTheme();
applyTheme();

const userStore = useUserStore();
userStore.init();

const isLoading = computed(() => userStore.isAuthenticated && !userStore.isAuthorized);
</script>

<template>
    <VaInnerLoading v-if="isLoading" :loading="isLoading" :size="45">
        <div style="height: 100vh"></div>
    </VaInnerLoading>
    <RouterView v-else />
</template>
