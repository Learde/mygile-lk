<script setup>
import { useColorTheme } from "@/utils";
import { useUserStore } from "@/stores";

const { applyTheme } = useColorTheme();
applyTheme();

const userStore = useUserStore();
userStore.init();
</script>

<template>
    <RouterView />
</template>
