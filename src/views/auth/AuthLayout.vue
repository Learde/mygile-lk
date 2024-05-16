<script setup>
import { VaLayout } from "vuestic-ui";
</script>

<template>
    <VaLayout class="auth-layout">
        <template #content>
            <RouterView />
        </template>
    </VaLayout>
</template>

<style scoped>
.auth-layout {
    height: 100vh;
    background-color: var(--va-background-primary);
    display: flex;
    align-items: center;
    justify-content: center;
}

:deep(main) {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 350px;
    margin: 0 auto;
    background-color: var(--va-background-secondary);
    padding: 25px;
    border: 1px solid var(--va-background-border);
    border-radius: 0.25rem;
}
</style>
