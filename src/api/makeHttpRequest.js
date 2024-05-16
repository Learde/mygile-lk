import { httpInstance } from "./config";

export const makeHttpRequest = ({
    url = "/",
    method = "get",
    params = {},
    data = {},
    headers = {},
    responseType = "json",
}) => {
    return httpInstance.request({
        url,
        method,
        headers,
        params,
        data,
        responseType,
    });
};
