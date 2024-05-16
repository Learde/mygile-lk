import { makeHttpRequest } from "../../makeHttpRequest.js";

export const initWorkspace = async function () {
    const response = await makeHttpRequest({
        url: `/init`,
        method: "get",
    });

    return response.data;
};
