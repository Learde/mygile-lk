import { makeHttpRequest } from "../../makeHttpRequest.js";

export const addCompany = async function ({ title }) {
    const response = await makeHttpRequest({
        url: "/companies",
        method: "post",
        data: {
            title,
        },
    });

    return response.data;
};
