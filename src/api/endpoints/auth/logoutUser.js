import { makeHttpRequest } from "../../makeHttpRequest.js";

export const logoutUser = async function () {
    const response = await makeHttpRequest({
        url: "/auth/logout",
        method: "post",
    });

    return response.data;
};
