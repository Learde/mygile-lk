import { makeHttpRequest } from "../../makeHttpRequest.js";

export const editBoard = async function ({ title }, id) {
    const response = await makeHttpRequest({
        url: `/boards/${id}`,
        method: "put",
        data: {
            title,
        },
    });

    return response.data;
};
