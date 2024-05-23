import { makeHttpRequest } from "../../makeHttpRequest.js";

export const getBoards = async function (companyId) {
    const response = await makeHttpRequest({
        url: `/companies/${companyId}/boards`,
        method: "get",
    });

    return response.data;
};
