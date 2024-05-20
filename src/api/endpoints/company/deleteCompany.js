import { makeHttpRequest } from "../../makeHttpRequest.js";

export const deleteCompany = async function (id) {
    const response = await makeHttpRequest({
        url: `/companies/${id}`,
        method: "delete",
    });

    return response.data;
};
