import { makeHttpRequest } from "../../makeHttpRequest.js";

export const getCompanies = async function (search) {
    const response = await makeHttpRequest({
        url: "/companies",
        method: "get",
        params: {
            search,
        }
    });

    return response.data;
};
