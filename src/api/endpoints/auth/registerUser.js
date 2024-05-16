import { makeHttpRequest } from "../../makeHttpRequest.js";

export const registerUser = async function ({ email, password, confirmPassword }) {
    const response = await makeHttpRequest({
        url: "/auth/register",
        method: "post",
        data: {
            email,
            password,
            confirmPassword,
        },
    });

    return response.data;
};
