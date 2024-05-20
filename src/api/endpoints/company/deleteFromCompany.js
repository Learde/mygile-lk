import { makeHttpRequest } from "../../makeHttpRequest.js";

export const deleteFromCompany = async function ({ companyId, userId }) {
    const response = await makeHttpRequest({
        url: "/companies/delete/user",
        method: "delete",
        params: {
            companyId,
            userId,
        },
    });

    return response.data;
};
