import { makeHttpRequest } from "../../makeHttpRequest.js";

export const uploadPhoto = async function (formData) {
    const response = await makeHttpRequest({
        url: "/upload",
        method: "post",
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};
