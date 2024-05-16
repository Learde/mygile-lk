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
    confirmPassword: "",
});
const error = ref(null);

const submit = async function () {
    error.value = null;

    if (!validate()) {
        return;
    }

    try {
        isLoading.value = true;

        await userStore.register(formData);

        toast.init({ message: "Вы успешно зарегистрировались", color: "success" });
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
                <h1 class="va-h3 registration-title">Регистрация</h1>
                <p class="registration-login">
                    Уже есть аккаунт?
                    <RouterLink :to="{ name: 'login' }" class="registration-login-link">
                        Войти
                    </RouterLink>
                </p>
                <VaInput
                    v-model="formData.email"
                    :rules="[validators.required, validators.email]"
                    class="registration-email"
                    label="Email"
                    type="email"
                />
                <VaValue :default-value="false">
                    <VaInput
                        v-model="formData.password"
                        :rules="[
                            validators.required,
                            (v) => v.length >= 6 || `Пароль должен быть не менее 6 символов`,
                        ]"
                        class="registration-password"
                        label="Пароль"
                        type="password"
                        autocomplete="new-password"
                    />
                </VaValue>
                <VaValue :default-value="false">
                    <VaInput
                        v-model="formData.confirmPassword"
                        :rules="[
                            validators.required,
                            (v) => v === formData.password || `Пароли не совпадают`,
                        ]"
                        class="registration-password"
                        label="Повторите пароль"
                        type="password"
                        autocomplete="new-password"
                    />
                </VaValue>

                <div class="registration-submit">
                    <VaButton @click="submit"> Зарегистрироваться </VaButton>
                </div>

                <div class="registration-error" v-if="error">
                    {{ error.message ?? "Что-то пошло не так" }}
                </div>
            </VaForm>
        </main>
    </VaInnerLoading>
</template>

<style scoped>
.registration-title,
.registration-email,
.registration-login,
.registration-password {
    margin-bottom: 20px;
}

.registration-password,
.registration-email {
    width: 100%;
}

.registration-submit button {
    width: 100%;
}

.registration-login-link {
    color: var(--va-primary) !important;
    font-weight: 500;
}

.registration-error {
    color: var(--va-danger);
    font-size: 14px;
    margin-top: 10px;
}
</style>
