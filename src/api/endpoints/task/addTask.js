import { makeHttpRequest } from "../../makeHttpRequest.js";

export const addTask = async function (title, companyId, boardId) {
    const response = await makeHttpRequest({
        url: `/boards/${boardId}/columns/${companyId}/tasks`,
        method: "post",
        data: {
            title,
        },
    });

    return response.data;
};
