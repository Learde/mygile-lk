import { makeHttpRequest } from "../../makeHttpRequest.js";

export const addToCompany = async function ({ companyId, email }) {
    const response = await makeHttpRequest({
        url: "/companies/add/user",
        method: "post",
        data: {
            companyId,
            email,
        },
    });

    return response.data;
};
