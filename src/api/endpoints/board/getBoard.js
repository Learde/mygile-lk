import { makeHttpRequest } from "../../makeHttpRequest.js";

export const getBoard = async function (id) {
    const response = await makeHttpRequest({
        url: `/boards/${id}`,
        method: "get",
    });

    return response.data;
};
