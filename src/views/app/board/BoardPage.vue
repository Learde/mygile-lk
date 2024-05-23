<script setup>
import { ref, onMounted, computed } from "vue";

import { useBoardsStore } from "@/stores";
import { BoardColumn } from "@/components";

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
});

const boardsStore = useBoardsStore();

const board = ref(null);

const loadBoard = async function () {
    board.value = await boardsStore.getBoard(props.id);
};

onMounted(() => {
    loadBoard();
});

const backBtnTo = computed(() => {
    if (board.value?.companyId) {
        return { name: "company-view", params: { id: board.value?.companyId } };
    } else {
        return { name: "company" };
    }
});
</script>

<template>
    <VaInnerLoading :loading="boardsStore.isLoading">
        <div class="board-page">
            <div class="board-header">
                <h2 class="va-h5">{{ board?.title }}</h2>
                <VaButton preset="primary">Добавить колонку</VaButton>
                <VaButton preset="primary" class="back-btn" color="danger" :to="backBtnTo"> Назад </VaButton>
            </div>
            <VaScrollContainer
                horizontal
                class="board-columns-container"
            >
                <div class="board-columns">
                    <BoardColumn title="В процессе" />
                    <BoardColumn title="Выполнено" />
                    <BoardColumn title="В процессе" />
                    <BoardColumn title="Выполнено" />
                    <BoardColumn title="В процессе" />
                    <BoardColumn title="Выполнено" />
                </div>
            </VaScrollContainer>
        </div>
    </VaInnerLoading>
</template>

<style scoped>
.board-page {
    min-height: calc(100vh - var(--app-navbar-height) - var(--app-main-padding) * 2);
    max-height: calc(100vh - var(--app-navbar-height) - var(--app-main-padding) * 2);
}

.board-header {
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    margin-bottom: 6px;
    /* padding: 0 10px; */
    min-height: 44px;
}

.board-header h2 {
    margin-right: auto;
}

.board-columns {
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.board-columns > * {
    flex-shrink: 0;
}

.board-columns-container {
    max-width: calc(100vw - 200px - var(--app-main-padding) * 2);
    scrollbar-width: none !important;
}
</style>
