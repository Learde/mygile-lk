<script setup>
import { VaInput, VaForm, VaButton } from "vuestic-ui";
import { storeToRefs } from "pinia";

import { useUserStore } from "@/stores";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
</script>

<template>
    <VaForm class="profile-form">
        <h2 class="va-h5">Редактирование профиля</h2>
        <VaInput v-model="user.name" label="Имя" />
        <VaInput v-model="user.surname" label="Фамилия" />
        <VaInput v-model="user.email" label="Email" disabled />
        <VaButton class="profile-form-btn">Сохранить</VaButton>
    </VaForm>
</template>

<style scoped>
.profile-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.profile-form-btn {
    align-self: flex-start;
}
</style>
