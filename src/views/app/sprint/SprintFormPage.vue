<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useForm } from "vuestic-ui";

import { validators } from "@/utils";
import { addBoard } from "@/api";
import { useBoardsStore } from "@/stores";

const props = defineProps({
    id: {
        type: String,
        required: false,
    },
    boardId: {
        type: String,
        required: true,
    }
});

const router = useRouter();
const { validate } = useForm("form");
const boardsStore = useBoardsStore();

const isLoading = ref(false);
const formData = reactive({
    title: "",
    dateStart: "",
    dateEnd: "",
    tasks: [],
});

const save = async function () {
    if (!validate()) {
        return;
    }

    try {
        isLoading.value = true;

        if (props.id) {
            await boardsStore.editBoard(formData, props.id);
            await router.push({ name: "board-view", params: { id: props.id } });
        } else {
            await addBoard(formData, props.companyId);
            await router.push({ name: "company-view", params: { id: props.companyId } });
        }
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <VaInnerLoading :loading="isLoading">
        <div class="app-box">
            <VaButton
                class="back-btn"
                preset="plain"
                :to="{ name: 'company-view', params: { id: companyId } }"
            >
                Назад
            </VaButton>
            <h2 class="va-h5">
                <template v-if="id">
                    Редактирование доски
                </template>
                <template v-else>
                    Создание доски
                </template>
            </h2>
            <VaForm ref="form" class="form">
                <VaInput
                    label="Название"
                    v-model="formData.title"
                    :rules="[
                        validators.required,
                        (v) => v.length >= 2 || `Название должно быть не менее 2 символов`,
                    ]"
                />
                <div>
                    <label class="va-input-label options-label">Тип</label>
                    <VaOptionList
                        v-model="formData.type"
                        type="radio"
                        :options="[
                            { title: 'Kanban', value: 'kanban' },
                            { title: 'Scrum', value: 'scrum' },
                            { title: 'Произвольная', value: 'custom' },
                        ]"
                        text-by="title"
                        :value-by="(option) => option.value"
                        :rules="[validators.required]"
                        :disabled="Boolean(id)"
                    />
                </div>
            </VaForm>
            <VaButton @click="save" preset="primary"> Сохранить </VaButton>
        </div>
    </VaInnerLoading>
</template>

<style scoped>
.back-btn {
    margin-bottom: 10px;
}

.options-label {
    color: var(--va-primary);
}

.form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 20px 0;
}
</style>
