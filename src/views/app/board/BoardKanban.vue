<script setup>
import { ref, onMounted, computed } from "vue";
import { animations } from "@formkit/drag-and-drop";
import { useDragAndDrop } from "@formkit/drag-and-drop/vue";

import { useBoardsStore } from "@/stores";
import { BoardColumn, BoardColumnModal } from "@/components";

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
});

const boardsStore = useBoardsStore();

const handleColumnDragged = function (event) {
    const { targetData } = event;
    const column = targetData.node.data;
    const nodes = targetData.parent.data.enabledNodes;
    const columns = nodes.map((node) => node.data);

    const index = columns.findIndex((c) => c.value._id === column.value._id);

    const currentPosition = column.value.position;
    const prevPosition = index === 0 ? 0 : columns[index - 1].value.position;

    const newPosition = currentPosition > prevPosition ? prevPosition + 1 : prevPosition;

    if (currentPosition === newPosition) {
        return;
    }

    if (currentPosition < newPosition) {
        for (let i = 0; i < columns.length; i++) {
            if (
                columns[i].value.position > currentPosition &&
                columns[i].value.position <= newPosition
            ) {
                columns[i].value.position--;
            }
        }
    } else {
        for (let i = 0; i < columns.length; i++) {
            if (
                columns[i].value.position >= newPosition &&
                columns[i].value.position < currentPosition
            ) {
                columns[i].value.position++;
            }
        }
    }

    column.value.position = newPosition;

    boardsStore.moveColumn(newPosition, column.value._id, props.id);
};

const board = ref(null);
const [columnsList, columns] = useDragAndDrop([], {
    dragHandle: ".drag-handler",
    plugins: [animations()],
    handleEnd: handleColumnDragged,
});
const showColumnModal = ref(false);
const columnToEdit = ref(null);

const loadBoard = async function () {
    board.value = await boardsStore.getBoard(props.id);
    columns.value = board.value.columns;
};

const deleteColumn = async function (column) {
    await boardsStore.deleteColumn(column._id, board.value._id);
    loadBoard();
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

const addColumn = async function () {
    columnToEdit.value = null;
    showColumnModal.value = true;
};

const editColumn = async function (column) {
    columnToEdit.value = column;
    showColumnModal.value = true;
};

const handleColumnAdded = async function (column) {
    columns.value.push(column);
};

const handleColumnEditted = async function (column) {
    const index = board.value.columns.findIndex((c) => c._id === column._id);
    board.value.columns[index] = column;
    const ind = columns.value.findIndex((c) => c._id === column._id);
    columns.value[ind] = column;
};

const recalcColumn = async function (columnId) {
    const column = board.value.columns.find((c) => c._id === columnId);

    for (let i = 0; i < column.tasks.length; i++) {
        column.tasks[i].position = i + 1;
    }

    console.log(columns.value);
};
</script>

<template>
    <VaInnerLoading :loading="boardsStore.isLoading">
        <div class="board-page">
            <div class="board-header">
                <h2 class="va-h5">{{ board?.title }}</h2>
                <VaButton
                    v-if="board?.userRole === 'ADMIN'"
                    preset="primary"
                    :to="{ name: 'board-edit', params: { id } }"
                >
                    Настройки
                </VaButton>
                <VaButton
                    v-if="board?.userRole === 'ADMIN' || board?.userRole === 'MANAGER'"
                    preset="primary"
                    @click="addColumn"
                >
                    Добавить колонку
                </VaButton>
                <VaButton preset="primary" class="back-btn" color="danger" :to="backBtnTo">
                    Назад
                </VaButton>
            </div>
            <VaScrollContainer horizontal class="board-columns-container">
                <div class="board-columns" ref="columnsList">
                    <BoardColumn
                        v-for="column in columns"
                        :key="column._id"
                        :board-id="board._id"
                        :id="column._id"
                        :title="column.title"
                        :role="board?.userRole"
                        :tasks="column.tasks"
                        @open-edit="editColumn(column)"
                        @delete="deleteColumn(column)"
                        @reload="loadBoard"
                        @recalc-column="recalcColumn"
                    />
                </div>
            </VaScrollContainer>
        </div>
    </VaInnerLoading>
    <BoardColumnModal
        v-model="showColumnModal"
        :board-id="id"
        @added="handleColumnAdded"
        @editted="handleColumnEditted"
        :column="columnToEdit"
    />
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
