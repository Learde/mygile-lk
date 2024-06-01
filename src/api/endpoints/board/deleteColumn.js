import { makeHttpRequest } from "../../makeHttpRequest.js";

export const deleteColumn = async function (columnId, boardId) {
    const response = await makeHttpRequest({
        url: `/boards/${boardId}/columns/${columnId}`,
        method: "delete",
    });

    return response.data;
};
