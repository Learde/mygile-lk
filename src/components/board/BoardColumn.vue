<script setup>
defineProps({
    title: {
        type: String,
        required: true,
    },
    tasks: {
        type: Array,
        required: true,
    },
});
</script>

<template>
        <div class="board-column">
            <div class="board-column-header">
                <h3 class="va-h6">
                    {{ title }}
                </h3>
            <VaButton preset="plain" size="small" icon="add" class="add-task"> Добавить задачу </VaButton>
            </div>
    <VaScrollContainer class="board-column-container" vertical>
            <div class="board-columns-tasks">
            <VaCard class="task">
                <VaCardTitle>Задача #1</VaCardTitle>
            </VaCard>
            <VaCard class="task">
                <VaCardTitle>Задача #1</VaCardTitle>
            </VaCard>
            <VaCard class="task">
                <VaCardTitle>Задача #1</VaCardTitle>
            </VaCard>
            <VaCard class="task">
                <VaCardTitle>Задача #1</VaCardTitle>
            </VaCard>
            <VaCard class="task">
                <VaCardTitle>Задача #1</VaCardTitle>
            </VaCard>
            <VaCard class="task">
                <VaCardTitle>Задача #1</VaCardTitle>
            </VaCard>
            <VaCard class="task">
                <VaCardTitle>Задача #1</VaCardTitle>
            </VaCard>
            <VaCard class="task">
                <VaCardTitle>Задача #1</VaCardTitle>
            </VaCard>
            <VaCard class="task">
                <VaCardTitle>Задача #1</VaCardTitle>
            </VaCard>
            <VaCard class="task">
                <VaCardTitle>Задача #1</VaCardTitle>
            </VaCard>
            <VaCard class="task">
                <VaCardTitle>Задача #1</VaCardTitle>
            </VaCard>
            <VaCard class="task">
                <VaCardTitle>Задача #1</VaCardTitle>
            </VaCard>
            </div>
    </VaScrollContainer>
        </div>
</template>

<style scoped>
.board-column {
    --column-header-height: 50px;
    --column-header-margin: 10px;

    background-color: var(--va-background-element);
    min-height: calc(100vh - var(--app-navbar-height) - var(--app-main-padding) * 2 - 50px);
    max-height: calc(100vh - var(--app-navbar-height) - var(--app-main-padding) * 2 - 50px);
    padding: 10px 8px 0;
    border-radius: 5px;
    max-width: 300px;
    width: 300px;
}

.board-column-container {
    max-height: calc(100vh - var(--app-navbar-height) - var(--app-main-padding) * 2 - 50px - var(--column-header-height) - var(--column-header-margin) - 10px);
}

.board-column-header {
    margin-bottom: var(--column-header-margin);
    height: var(--column-header-height);
    display: flex;
    flex-direction: column;
}

.board-column-header h3 {
    margin: 0;
    padding: 0;
    font-size: 16px;
}

.board-columns-tasks {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-bottom: 10px;
}

.task {
    cursor: pointer;
}

.add-task {
    margin-top: auto;
    align-self: flex-start;
}
</style>
