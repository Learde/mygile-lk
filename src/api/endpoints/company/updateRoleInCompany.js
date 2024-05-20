import { makeHttpRequest } from "../../makeHttpRequest.js";

export const updateRoleInCompany = async function ({ companyId, userId, role }) {
    const response = await makeHttpRequest({
        url: "/companies/update/user",
        method: "put",
        data: {
            companyId,
            userId,
            role
        },
    });

    return response.data;
};
