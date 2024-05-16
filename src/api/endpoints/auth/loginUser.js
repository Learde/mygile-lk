import { makeHttpRequest } from "../../makeHttpRequest.js";

export const loginUser = async function ({ email, password }) {
    const response = await makeHttpRequest({
        url: "/auth/login",
        method: "post",
        data: {
            email,
            password,
        },
    });

    return response.data;
};
