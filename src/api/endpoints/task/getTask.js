import { makeHttpRequest } from "../../makeHttpRequest.js";

export const getTask = async function (taskId, columnId, boardId) {
    const response = await makeHttpRequest({
        url: `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        method: "get",
    });

    return response.data;
};
