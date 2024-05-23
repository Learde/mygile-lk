import { ref } from "vue";
import { defineStore } from "pinia";

import {
    getBoards as apiGetBoards,
    getBoard as apiGetBoard,
} from "@/api";

export const useBoardsStore = defineStore("boards", () => {
    const isLoading = ref(false);

    const getBoards = async function (companyId) {
        try {
            isLoading.value = true;
            return await apiGetBoards(companyId);
        } finally {
            isLoading.value = false;
        }
    };

    const getBoard = async function (boardId) {
        try {
            isLoading.value = true;
            return await apiGetBoard(boardId);
        } finally {
            isLoading.value = false;
        }
    };

    return {
        isLoading,

        getBoards,
        getBoard,
    };
});
