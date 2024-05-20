import { ref } from "vue";
import { defineStore } from "pinia";
import { useRouter, useRoute } from "vue-router";
import { useToast } from "vuestic-ui";

import { registerUser, loginUser, logoutUser, initWorkspace } from "@/api";

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const useUserStore = defineStore("user", () => {
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();
    
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
            user.value.initials = capitalizeFirstLetter(user.value.fullName.slice(0, 2));
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

            if (["login", "registration"].includes(route.name)) {
                await router.push({ name: "home" });
            }

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

        toast.init({ message: "Вы успешно зарегистрировались", color: "success" });
    };

    const login = async function (formData) {
        const response = await loginUser(formData);

        user.value = response.user;
        localStorage.setItem("token", response.accessToken);

        await init();

        toast.init({ message: "Вы успешно авторизовались", color: "success" });
    };

    const logout = async function () {
        await logoutUser();

        localStorage.removeItem("token");
        isAuthenticated.value = false;
        isAuthorized.value = false;
        user.value = null;
    }

    return {
        user,
        isAuthenticated,
        isAuthorized,

        register,
        login,
        logout,
        init,
        setUser,
    };
});
