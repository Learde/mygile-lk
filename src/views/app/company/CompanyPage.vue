<script setup>
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";

import { useCompaniesStore, useBoardsStore } from "@/stores";
import { CompanyUsersTable } from "@/components";

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
});

const router = useRouter();
const companiesStore = useCompaniesStore();
const boardsStore = useBoardsStore();

const company = ref(null);
const boards = ref([]);

const loadCompany = async function () {
    company.value = await companiesStore.getCompany(props.id);
};

const loadBoards = async function () {
    boards.value = await boardsStore.getBoards(props.id);
};

onMounted(() => {
    loadCompany();
    loadBoards();
});

const deleteCompany = async function () {
    await companiesStore.deleteCompany(props.id);
    router.push({ name: "company" });
};
</script>

<template>
    <VaInnerLoading :loading="companiesStore.isLoading">
        <div class="app-box mb">
            <VaButton class="back-btn" preset="plain" :to="{ name: 'company' }"> Назад </VaButton>
            <div class="company-header">
                <h2 class="va-h5 company-heading">{{ company?.title }}</h2>
                <VaButton
                    v-if="company?.userRole === 'ADMIN'"
                    preset="primary"
                    :to="{ name: 'company-edit', params: { id: company?._id } }"
                >
                    Редактировать
                </VaButton>
                <VaButton
                    v-if="company?.userRole === 'ADMIN'"
                    color="danger"
                    preset="primary"
                    @click="deleteCompany"
                >
                    Удалить
                </VaButton>
            </div>
        </div>

        <div class="app-box mb">
            <div class="company-header">
                <h2 class="va-h5 company-heading">Доски</h2>
                <VaButton
                    v-if="company?.userRole === 'ADMIN'"
                    preset="primary"
                    :to="{ name: 'board-add', params: { companyId: company?._id } }"
                >
                    Создать
                </VaButton>
            </div>
            <div class="company-boards-list">
                <VaCard
                    v-for="board in boards"
                    :key="board._id"
                    :to="{ name: 'board-view', params: { id: board._id } }"
                >
                    <VaCardTitle>{{ board.title }}</VaCardTitle>
                    <VaCardContent>
                        <VaBadge :text="board.type" color="info" />
                    </VaCardContent>
                </VaCard>
            </div>
        </div>

        <div class="app-box">
            <h2 class="va-h5 company-heading">Участники</h2>
            <CompanyUsersTable
                v-if="company"
                :members="company.members"
                :role="company.userRole"
                :company-id="company._id"
                @update-members="loadCompany"
            />
        </div>
    </VaInnerLoading>
</template>

<style scoped>
.back-btn {
    margin-bottom: 10px;
}

.app-box {
    min-height: unset !important;
}

.app-box.mb {
    margin-bottom: 10px;
}

.company-header {
    display: flex;
    gap: 10px;
    align-items: center;
}

.company-heading {
    margin-right: auto;
}

.company-boards-list {
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr 1fr 1fr;
}

@media (max-width: 768px) {
    .company-boards-list {
        grid-template-columns: 1fr 1fr;
    }
}

@media (max-width: 576px) {
    .company-boards-list {
        grid-template-columns: 1fr;
    }
}
</style>
