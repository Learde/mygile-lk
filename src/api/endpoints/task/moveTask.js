import { makeHttpRequest } from "../../makeHttpRequest.js";

export const moveTask = async function (position, taskId, columnId, boardId) {
    const response = await makeHttpRequest({
        url: `/boards/${boardId}/columns/${columnId}/tasks/${taskId}/move`,
        method: "put",
        data: {
            position,
        }
    });

    return response.data;
};
