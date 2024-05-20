import { ref } from "vue";
import { defineStore } from "pinia";

import {
    getCompanies,
    getCompany as apiGetCompany,
    deleteCompany as apiDeleteCompany,
    editCompany as apiEditCompany,
    addToCompany as apiAddToCompany,
    deleteFromCompany as apiDeleteFromCompany,
    updateRoleInCompany as apiUpdateRoleInCompany
} from "@/api";

export const useCompaniesStore = defineStore("companies", () => {
    const companies = ref([]);
    const isLoading = ref(false);

    const fetchCompanies = async function (search) {
        try {
            isLoading.value = true;
            companies.value = await getCompanies(search);
        } finally {
            isLoading.value = false;
        }
    };

    const getCompany = async function (id) {
        try {
            isLoading.value = true;
            return await apiGetCompany(id);
        } finally {
            isLoading.value = false;
        }
    };

    const deleteCompany = async function (id) {
        try {
            isLoading.value = true;
            return await apiDeleteCompany(id);
        } finally {
            isLoading.value = false;
        }
    };

    const editCompany = async function (id, { title }) {
        try {
            isLoading.value = true;
            return await apiEditCompany(id, { title });
        } finally {
            isLoading.value = false;
        }
    };

    const addToCompany = async function (companyId, email) {
        try {
            isLoading.value = true;
            return await apiAddToCompany({ companyId, email });
        } finally {
            isLoading.value = false;
        }
    };

    const deleteFromCompany = async function (companyId, userId) {
        try {
            isLoading.value = true;
            return await apiDeleteFromCompany({ companyId, userId });
        } finally {
            isLoading.value = false;
        }
    };
    
    const updateUserRoleInCompany = async function (companyId, userId, role) {
        try {
            isLoading.value = true;
            return await apiUpdateRoleInCompany({ companyId, userId, role });
        } finally {
            isLoading.value = false;
        }
    };

    return {
        companies,
        isLoading,

        fetchCompanies,
        getCompany,
        deleteCompany,
        editCompany,
        addToCompany,
        deleteFromCompany,
        updateUserRoleInCompany,
    };
});
