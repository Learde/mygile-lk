import { makeHttpRequest } from "../../makeHttpRequest.js";

export const getCompanyRoles = async function () {
    const response = await makeHttpRequest({
        url: "/company-roles",
        method: "get",
    });

    return response.data;
};
