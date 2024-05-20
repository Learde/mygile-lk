import { makeHttpRequest } from "../../makeHttpRequest.js";

export const editCompany = async function (id, { title }) {
    const response = await makeHttpRequest({
        url: `/companies/${id}`,
        method: "put",
        data: {
            title,
        },
    });

    return response.data;
};
