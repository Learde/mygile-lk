<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { VaForm, VaInput, VaButton, VaIcon, VaInnerLoading, useForm } from "vuestic-ui";

import { validators } from "@/utils";
import { addCompany } from "@/api";

const { validate } = useForm("form");
const router = useRouter();

const isLoading = ref(false);
const formData = reactive({
    title: "",
});

const submit = async function () {
    if (!validate()) {
        return;
    }

    try {
        isLoading.value = true;

        await addCompany(formData);
        await router.push({ name: "company" });
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <VaInnerLoading :loading="isLoading">
        <div class="app-box">
            <VaButton preset="plain" class="back-btn" :to="{ name: 'company' }">
                <VaIcon name="arrow_back" />
                Назад
            </VaButton>
            <h2 class="va-h5 companies-heading">Создание компании</h2>
            <VaForm ref="form" class="companies-form" @submit.prevent="submit">
                <VaInput
                    class="companies-form-input"
                    label="Название"
                    v-model="formData.title"
                    :rules="[
                        validators.required,
                        (v) => v.length >= 2 || `Название должно быть не менее 2 символов`,
                    ]"
                />
                <VaButton class="companies-form-btn" @click="submit">Сохранить</VaButton>
            </VaForm>
        </div>
    </VaInnerLoading>
</template>

<style scroped>
.companies-heading {
    margin-bottom: 20px;
}

.companies-form,
.companies-form-input {
    max-width: 100%;
    width: 100%;
}

.companies-form-btn {
    margin-top: 20px;
}

.back-btn {
    margin-bottom: 10px;
}
</style>
