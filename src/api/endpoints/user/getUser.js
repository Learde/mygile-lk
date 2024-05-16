import { makeHttpRequest } from "../../makeHttpRequest.js";

export const getUser = async function (id) {
    const response = await makeHttpRequest({
        url: `/users/${id}`,
        method: "get",
    });

    return response.data;
};
