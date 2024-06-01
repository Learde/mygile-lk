import { makeHttpRequest } from "../../makeHttpRequest.js";

export const getBoardMembers = async function (id) {
    const response = await makeHttpRequest({
        url: `/boards/${id}/members`,
        method: "get",
    });

    return response.data;
};
