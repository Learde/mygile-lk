export const sleep = function (ms = 0) {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

/** Validation */
export const validators = {
    email(v) {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(v) || "Неправильный адрес электронной почты";
    },
    required(v) {
        return Boolean(v) || "Поле обязательно для заполнения";
    },
};

export * from "./composables";
