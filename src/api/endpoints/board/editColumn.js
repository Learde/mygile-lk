import { makeHttpRequest } from "../../makeHttpRequest.js";

export const editColumn = async function (title, columnId, boardId) {
    const response = await makeHttpRequest({
        url: `/boards/${boardId}/columns/${columnId}`,
        method: "put",
        data: {
            title,
        },
    });

    return response.data;
};
