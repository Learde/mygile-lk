import { ref } from "vue";
import { defineStore } from "pinia";

import {
    getBoards as apiGetBoards,
    getBoard as apiGetBoard,
    editBoard as apiEditBoard,
    addColumn as apiAddColumn,
    editColumn as apiEditColumn,
    deleteColumn as apiDeleteColumn,
    moveColumn as apiMoveColumn,
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

    const editBoard = async function ({ title }, id) {
        return await apiEditBoard({ title }, id);
    };

    const addColumn = async function (title, boardId) {
        return await apiAddColumn(title, boardId);
    };

    const editColumn = async function (title, columnId, boardId) {
        return await apiEditColumn(title, columnId, boardId);
    };

    const deleteColumn = async function (columnId, boardId) {
        try {
            isLoading.value = true;
            return await apiDeleteColumn(columnId, boardId);
        } finally {
            isLoading.value = false;
        }
    };

    const moveColumn = async function (position, columnId, boardId) {
        return await apiMoveColumn(position, columnId, boardId);
    };

    return {
        isLoading,

        getBoards,
        getBoard,
        editBoard,

        addColumn,
        editColumn,
        deleteColumn,
        moveColumn,
    };
});
