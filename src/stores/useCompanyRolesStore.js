import { ref } from "vue";
import { defineStore } from "pinia";

import { getCompanyRoles } from "@/api";

export const useCompanyRolesStore = defineStore("company-roles", () => {
    const roles = ref([]);
    const isLoading = ref(false);

    const fetchRoles = async function () {
        try {
            if (roles.value.length > 0) {
                return;
            }

            isLoading.value = true;
            roles.value = await getCompanyRoles();
        } finally {
            isLoading.value = false;
        }
    };

    const getRoleName = function (key) {
        return roles.value.find(role => role.value === key)?.title;
    }

    const getRoleObject = function (key) {
        return roles.value.find(role => role.value === key);
    }

    return {
        roles,
        isLoading,

        fetchRoles,
        getRoleName,
        getRoleObject,
    };
});
