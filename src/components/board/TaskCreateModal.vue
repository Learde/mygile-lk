<script setup>
import { ref, reactive } from "vue";
import { useForm } from "vuestic-ui";

import { validators } from "@/utils";
import { addTask } from "@/api";

const props = defineProps({
    boardId: {
        type: String,
        required: true,
    },
    columnId: {
        type: String,
        required: true,
    },
    columnTitle: {
        type: String,
        required: true,
    },
});
const emit = defineEmits(["added"]);

const { validate } = useForm("form");

const showModal = defineModel();

const isLoading = ref(false);
const formData = reactive({
    title: "",
});

const save = async function () {
    if (!validate()) {
        return;
    }

    try {
        isLoading.value = true;

        const task = await addTask(formData.title, props.columnId, props.boardId);
        emit("added", task);
    } finally {
        isLoading.value = false;
    }
};
</script>

<template setup>
    <VaModal v-model="showModal" hide-default-actions>
        <div>
            <VaInnerLoading :loading="isLoading">
                <h2 class="va-h5 form-heading">Создание задачи ({{ columnTitle }})</h2>
                <VaForm ref="form" class="task-form">
                    <VaInput
                        class="form-input"
                        v-model="formData.title"
                        label="Название"
                        :rules="[
                            validators.required,
                            (v) => v.length >= 2 || `Название должно быть не менее 2 символов`,
                        ]"
                    />
                    <div class="form-actions">
                        <VaButton preset="primary" @click="save"> Сохранить </VaButton>
                        <VaButton preset="primary" color="danger" @click="showModal = false">
                            Отмена
                        </VaButton>
                    </div>
                </VaForm>
            </VaInnerLoading>
        </div>
    </VaModal>
</template>

<style scoped>
.form-heading {
    margin-bottom: 20px;
}

.form-input {
    width: 100%;
}

.form-actions {
    display: flex;
    justify-content: space-between;
    gap: 10px;
}

.task-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
</style>
