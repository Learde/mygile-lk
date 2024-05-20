<script setup>
import { ref } from "vue";
import { debounce } from "lodash";

import { useCompaniesStore } from "@/stores";

const companiesStore = useCompaniesStore();

companiesStore.fetchCompanies();

const searchField = ref("");

const debounceFetchCompanies = debounce(() => {
    companiesStore.fetchCompanies(searchField.value);
}, 400);
</script>

<template>
    <div class="app-box">
        <h2 class="va-h5 companies-heading">Компании</h2>
        <div class="companies-header">
            <VaButton :to="{ name: 'company-add' }">Создать</VaButton>
            <VaInput v-model="searchField" placeholder="Поиск" @input="debounceFetchCompanies">
                <template #prependInner>
                    <VaIcon name="search" color="secondary" />
                </template>
            </VaInput>
        </div>
        <VaInnerLoading :loading="companiesStore.isLoading">
            <div class="companies-list">
                <VaCard
                    v-for="company in companiesStore.companies"
                    :key="company._id"
                    :to="{ name: 'company-view', params: { id: company._id } }"
                >
                    <VaCardTitle class="companies-card-title">{{ company.title }}</VaCardTitle>
                    <VaCardContent class="companies-card-content">
                        <span>Участников: {{ company.membersCount }}</span>
                        <span>Досок: 0</span>
                    </VaCardContent>
                </VaCard>
            </div>
        </VaInnerLoading>
    </div>
</template>

<style scoped>
.companies-heading {
    margin-bottom: 20px;
}

.companies-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.companies-card-title {
    font-size: 14px;
}

.companies-card-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.companies-list {
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr 1fr 1fr;
}

@media (max-width: 768px) {
    .companies-list {
        grid-template-columns: 1fr 1fr;
    }
}

@media (max-width: 576px) {
    .companies-list {
        grid-template-columns: 1fr;
    }
}
</style>
