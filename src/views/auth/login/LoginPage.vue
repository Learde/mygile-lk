<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { VaForm, VaInput, VaValue, VaInnerLoading, useForm, useToast } from "vuestic-ui";

import { validators } from "@/utils";
import { useUserStore } from "@/stores";

const { validate } = useForm("form");
const router = useRouter();
const toast = useToast();
const userStore = useUserStore();

const isLoading = ref(false);
const formData = reactive({
    email: "",
    password: "",
});
const error = ref(null);

const submit = async function () {
    error.value = null;

    if (!validate()) {
        return;
    }

    try {
        isLoading.value = true;

        await userStore.login(formData);

        toast.init({ message: "Вы успешно авторизовались", color: "success" });
        router.push({ name: "home" });
    } catch (e) {
        error.value = e?.response?.data;
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <VaInnerLoading :loading="isLoading">
        <main>
            <VaForm ref="form" @submit.prevent="submit">
                <h1 class="va-h3 login-title">Вход</h1>
                <p class="login-registration">
                    Нет аккаунта?
                    <RouterLink :to="{ name: 'registration' }" class="login-registration-link">
                        Зарегистрироваться
                    </RouterLink>
                </p>
                <VaInput
                    v-model="formData.email"
                    :rules="[validators.required, validators.email]"
                    class="login-email"
                    label="Email"
                    type="email"
                />
                <VaValue :default-value="false">
                    <VaInput
                        v-model="formData.password"
                        :rules="[validators.required]"
                        class="login-password"
                        label="Пароль"
                        type="password"
                    />
                </VaValue>

                <div class="login-forgot-password">
                    <RouterLink class="login-forgot-password-link" :to="{ name: 'login' }">
                        Забыли пароль?
                    </RouterLink>
                </div>

                <div class="login-submit">
                    <VaButton @click="submit"> Войти </VaButton>
                </div>

                <div class="login-error" v-if="error">
                    {{ error.message ?? "Что-то пошло не так" }}
                </div>
            </VaForm>
        </main>
    </VaInnerLoading>
</template>

<style scoped>
.login-title,
.login-forgot-password,
.login-email,
.login-registration {
    margin-bottom: 20px;
}

.login-password {
    margin-bottom: 10px;
}

.login-password,
.login-email {
    width: 100%;
}

.login-submit button {
    width: 100%;
}

.login-forgot-password {
    font-size: 14px;
}

.login-forgot-password-link,
.login-registration-link {
    color: var(--va-primary) !important;
    font-weight: 500;
}

.login-error {
    color: var(--va-danger);
    font-size: 14px;
    margin-top: 10px;
}
</style>
