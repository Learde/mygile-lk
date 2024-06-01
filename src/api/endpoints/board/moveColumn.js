import { makeHttpRequest } from "../../makeHttpRequest.js";

export const moveColumn = async function (position, columnId, boardId) {
    const response = await makeHttpRequest({
        url: `/boards/${boardId}/columns/${columnId}/move`,
        method: "put",
        data: {
            position,
        }
    });

    return response.data;
};
