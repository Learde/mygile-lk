import axios from "axios";

let baseUrl = window.baseUrl ?? import.meta.env.VITE_APP_API;

const httpInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        "X-Requested-With": "XMLHttpRequest",
    },
    withCredentials: true,
});

httpInstance.defaults.trailingSlash = true;

httpInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
});

httpInstance.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status == 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true;

            try {
                const response = await axios.get(`${baseUrl}/refresh`, { withCredentials: true });
                localStorage.setItem("token", response.data.accessToken);

                return httpInstance.request(originalRequest);
            } catch (e) {
                localStorage.removeItem("token");
                console.error("Refresh token failed");

                location.reload();
            }
        }

        throw error;
    },
);

const setHeaders = (headers) => {
    httpInstance.defaults.headers = headers;
};

const addHeaders = (headers) => {
    httpInstance.defaults.headers = {
        ...httpInstance.defaults.headers,
        ...headers,
    };
};

const setBaseUrl = (url) => {
    httpInstance.defaults.baseURL = url;
    baseUrl = url;
};

export {
    httpInstance,
    setHeaders,
    addHeaders,
    setBaseUrl,
};
