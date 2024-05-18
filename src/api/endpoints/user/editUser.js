import { makeHttpRequest } from "../../makeHttpRequest.js";

export const editUser = async function (id, user) {
    const response = await makeHttpRequest({
        url: `/users/${id}`,
        method: "put",
        data: user,
    });

    return response.data;
};
