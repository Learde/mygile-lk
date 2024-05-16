<script setup>
import { defineModel } from "vue";
import { VaNavbar, VaButton, VaSwitch, VaIcon } from "vuestic-ui";
import { useColorTheme } from "@/utils";

const isSidebarMinimized = defineModel("isSidebarMinimized", { type: Boolean, default: false });

const { setTheme, colorMode } = useColorTheme();
</script>

<template>
    <VaNavbar class="navbar">
        <template #left>
            <VaButton
                preset="secondary"
                :icon="isSidebarMinimized ? 'menu_open' : 'menu'"
                @click="isSidebarMinimized = !isSidebarMinimized"
            />
        </template>
        <template #right>
            <div class="navbar-right">
                <VaSwitch
                    :model-value="colorMode === 'dark'"
                    @update:model-value="setTheme($event ? 'dark' : 'light')"
                    color="#59189A"
                    off-color="#ffd300"
                    style="--va-switch-checker-background-color: #252723"
                    size="small"
                >
                    <template #innerLabel>
                        <div class="va-text-center">
                            <VaIcon :name="`${colorMode}_mode`" size="small" />
                        </div>
                    </template>
                </VaSwitch>
                <VaButton
                    preset="secondary"
                    icon="logout"
                    @click="$router.push({ name: 'login' })"
                />
            </div>
        </template>
    </VaNavbar>
</template>

<style scoped>
.navbar {
    height: 45px;
    padding: 0 12px;
}

.navbar-right {
    display: flex;
    align-items: center;
    gap: 10px;
}
</style>
