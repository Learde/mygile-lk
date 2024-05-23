import { makeHttpRequest } from "../../makeHttpRequest.js";

export const addBoard = async function ({ title, type }, companyId) {
    const response = await makeHttpRequest({
        url: `/companies/${companyId}/boards`,
        method: "post",
        data: {
            title,
            type,
        },
    });

    return response.data;
};
