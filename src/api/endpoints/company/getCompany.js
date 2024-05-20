import { makeHttpRequest } from "../../makeHttpRequest.js";

export const getCompany = async function (id) {
    const response = await makeHttpRequest({
        url: `/companies/${id}`,
        method: "get",
    });

    return response.data;
};
