<script setup>
import { ref, onMounted, computed } from "vue";

import { useBoardsStore } from "@/stores";
import { BoardColumn, BoardColumnModal } from "@/components";

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
        <div class="board-header">
            <h2 class="va-h5">{{ board?.title }}</h2>
            <VaButton
                v-if="board?.userRole === 'ADMIN'"
                preset="primary"
                :to="{ name: 'board-edit', params: { id } }"
            >
                Настройки
            </VaButton>
            <VaButton preset="primary" class="back-btn" color="danger" :to="backBtnTo">
                Назад
            </VaButton>
        </div>
        <div class="app-box">
            <div class="sprints-header">
                <h3 class="va-h6">Спринты</h3>
                <VaButton
                    v-if="board?.userRole === 'ADMIN' || board?.userRole === 'MANAGER'"
                    preset="primary"
                    @click="addSprint"
                >
                    Добавить спринт
                </VaButton>
            </div>
        </div>
    </VaInnerLoading>
</template>

<style scoped>
.app-box {
    min-height: unset;
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

.sprints-header {
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    margin-bottom: 20px;
}

.sprints-header h3 {
    margin-right: auto;
}
</style>
