<script setup>
import { ref } from "vue";
import { VaInput, VaForm, VaButton, VaInnerLoading } from "vuestic-ui";
import { storeToRefs } from "pinia";

import { useUserStore } from "@/stores";
import { editUser, uploadPhoto } from "@/api";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const localUser = ref({ ...user.value });

const avatarFile = ref([]);
const isLoading = ref(false);

const save = async function () {
    try {
        isLoading.value = true;

        const newUser = await editUser(localUser.value._id, localUser.value);

        userStore.setUser(newUser);
    } catch {
        console.log("error");
    } finally {
        isLoading.value = false;
    }
};

const loadAvatar = async function () {
    try {
        isLoading.value = true;
        const formData = new FormData();
        formData.append("file", avatarFile.value);
        const photoUrl = await uploadPhoto(formData);
        const newUser = {
            ...user.value,
            avatar: `${import.meta.env.VITE_APP_SERVER_URL}/${photoUrl}`,
        };

        await editUser(user.value._id, newUser);

        localUser.value.avatar = newUser.avatar;
        user.value.avatar = newUser.avatar;
    } catch {
        console.log("error");
    } finally {
        isLoading.value = false;
    }
};

const removeAvatar = async function () {
    try {
        isLoading.value = true;
        const newUser = { ...user.value, avatar: null };

        await editUser(user.value._id, newUser);

        localUser.value.avatar = newUser.avatar;
        user.value.avatar = newUser.avatar;
    } catch {
        console.log("error");
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <VaInnerLoading :loading="isLoading">
        <div class="app-box">
            <VaForm class="profile-form">
                <h2 class="va-h5">Редактирование профиля</h2>
                <div class="profile-avatar">
                    <VaAvatar :color="user.avatarColor" :src="user.avatar" size="large">
                        <template v-if="!user.avatar">
                            {{ user.initials }}
                        </template>
                    </VaAvatar>
                    <div class="profile-avatar-actions">
                        <VaFileUpload
                            v-model="avatarFile"
                            hide-file-list
                            type="single"
                            file-types="image/*"
                            @file-added="loadAvatar"
                        >
                            <VaButton preset="plain">Загрузить</VaButton>
                        </VaFileUpload>
                        <VaButton @click="removeAvatar" preset="plain">Удалить</VaButton>
                    </div>
                </div>
                <VaInput v-model="localUser.name" label="Имя" />
                <VaInput v-model="localUser.surname" label="Фамилия" />
                <VaInput v-model="localUser.email" label="Email" disabled />
                <VaButton @click="save" class="profile-form-btn" preset="primary"
                    >Сохранить</VaButton
                >
            </VaForm>
        </div>
    </VaInnerLoading>
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

.profile-avatar {
    display: flex;
    gap: 20px;
}

.profile-avatar-actions {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 10px;
}
</style>
