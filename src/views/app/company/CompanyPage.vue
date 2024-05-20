<script setup>
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";

import { useCompaniesStore } from "@/stores";
import { CompanyUsersTable } from "@/components";

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
});

const router = useRouter();
const companiesStore = useCompaniesStore();

const company = ref(null);

const loadCompany = async function () {
    company.value = await companiesStore.getCompany(props.id);
}

onMounted(() => {
    loadCompany();
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
                    :to="{ name: 'company-edit', params: { id: company?._id } }"
                >
                    Редактировать
                </VaButton>
                <VaButton
                    v-if="company?.userRole === 'ADMIN'"
                    color="danger"
                    @click="deleteCompany"
                >
                    Удалить
                </VaButton>
            </div>
        </div>

        <div class="app-box mb">
            <h2 class="va-h5 company-heading">Доски</h2>
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
</style>
