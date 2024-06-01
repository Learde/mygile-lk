import { makeHttpRequest } from "../../makeHttpRequest.js";

export const addColumn = async function (title, boardId) {
    const response = await makeHttpRequest({
        url: `/boards/${boardId}/columns`,
        method: "post",
        data: {
            title,
        },
    });

    return response.data;
};
