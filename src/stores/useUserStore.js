import { ref } from "vue";
import { defineStore } from "pinia";

import { registerUser, loginUser, initWorkspace } from "@/api";

export const useUserStore = defineStore("user", () => {
    const user = ref(null);
    const isAuthenticated = ref(false);
    const isAuthorized = ref(false);

    const setUser = function (u) {
        user.value = u;
        user.value.fullName = `${u.name} ${u.surname}`;
        
        if (!user.value.fullName.trim()) {
            user.value.fullName = u.name || u.surname || u.email;
        }

        const [first, second] = user.value.fullName.split(" ").map(u => u[0].toUpperCase());
        if (first && second) {
            user.value.initials = `${first}.${second}.`;
        } else {
            user.value.initials = first || second;
        }
    };

    const init = async function () {
        if (!localStorage.getItem("token")) {
            return;
        }

        try {
            isAuthenticated.value = true;
            isAuthorized.value = false;

            const workspace = await initWorkspace();
            setUser(workspace.user);

            isAuthorized.value = true;
        } catch (e) {
            isAuthenticated.value = false;
            isAuthorized.value = false;
            localStorage.removeItem("token");
            location.reload();
        }
    };

    const register = async function (formData) {
        const response = await registerUser(formData);
        console.log(response);

        user.value = response.user;
        localStorage.setItem("token", response.accessToken);

        await init();
    };

    const login = async function (formData) {
        const response = await loginUser(formData);

        user.value = response.user;
        localStorage.setItem("token", response.accessToken);

        await init();
    };

    return {
        user,
        isAuthenticated,
        isAuthorized,

        register,
        login,
        init,
    };
});
