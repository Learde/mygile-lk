<script setup>
import { ref } from "vue";

import { useBoardsStore } from "@/stores";

import BoardKanban from "./BoardKanban.vue";
import BoardScrum from "./BoardScrum.vue";

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
});

const boardsStore = useBoardsStore();

const boardType = ref(null);
const isLoading = ref(false);

const loadBoard = async function () {
    isLoading.value = true;
    boardType.value = (await boardsStore.getBoard(props.id))?.type;
    isLoading.value = false;
};

loadBoard();
</script>

<template>
    <VaInnerLoading :loading="isLoading">
        <BoardKanban v-if="boardType === 'kanban' || boardType === 'custom'" :id="id" />
        <BoardScrum v-else-if="boardType === 'scrum'" :id="id" />
    </VaInnerLoading>
</template>
