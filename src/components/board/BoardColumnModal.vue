<script setup>
import { reactive, ref, watchEffect } from "vue";
import { useForm } from "vuestic-ui";

import { validators } from "@/utils";
import { useBoardsStore } from "@/stores";

const props = defineProps({
    column: {
        type: Object,
        required: false,
        default: null,
    },
    boardId: {
        type: String,
        required: true,
    },
});
const emit = defineEmits("added", "editted");

const { validate } = useForm("form");
const boardsStore = useBoardsStore();

const showModal = defineModel();

const formData = reactive({
    title: "",
});
const isLoading = ref(false);

const save = async function () {
    if (!validate()) {
        return;
    }

    try {
        isLoading.value = true;

        if (props.column) {
            const column = await boardsStore.editColumn(
                formData.title,
                props.column._id,
                props.boardId,
            );
            emit("editted", column);
        } else {
            const column = await boardsStore.addColumn(formData.title, props.boardId);
            emit("added", column);
        }
        showModal.value = false;
    } catch (error) {
        console.error(error);
    } finally {
        isLoading.value = false;
    }
};

watchEffect(() => {
    if (showModal.value && props.column) {
        formData.title = props.column.title;
    } else {
        formData.title = "";
    }
});
</script>

<template>
    <VaModal v-model="showModal" hide-default-actions>
        <VaInnerLoading :loading="isLoading">
            <div>
                <h2 class="va-h5 form-heading">
                    <template v-if="column"> Редактирование колонки </template>
                    <template v-else> Создание колонки </template>
                </h2>
                <VaForm ref="form">
                    <VaInput
                        v-model="formData.title"
                        label="Название"
                        :rules="[
                            validators.required,
                            (v) => v.length >= 2 || `Название должно быть не менее 2 символов`,
                        ]"
                        class="form-input"
                    />
                    <div class="actions">
                        <VaButton @click="save" preset="primary"> Сохранить </VaButton>
                        <VaButton @click="showModal = false" preset="primary" color="danger">
                            Отмена
                        </VaButton>
                    </div>
                </VaForm>
            </div>
        </VaInnerLoading>
    </VaModal>
</template>

<style scoped>
.form-heading {
    margin-bottom: 20px;
}

.form-input {
    width: 100%;
}

.actions {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin-top: 20px;
}
</style>
