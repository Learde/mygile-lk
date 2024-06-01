import { makeHttpRequest } from "../../makeHttpRequest.js";

export const editTask = async function (taskData, taskId, columnId, boardId) {
    const response = await makeHttpRequest({
        url: `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        method: "put",
        data: {
            ...taskData,
        },
    });

    return response.data;
};
