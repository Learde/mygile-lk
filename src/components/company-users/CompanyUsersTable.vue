<script setup>
import { ref, computed } from "vue";
import { useToast } from "vuestic-ui";

import { useCompanyRolesStore, useCompaniesStore, useUserStore } from "@/stores";

const props = defineProps({
    members: {
        type: Array,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    companyId: {
        type: String,
        required: true,
    },
});
const emit = defineEmits(["updateMembers"]);

const toast = useToast();
const companyRolesStore = useCompanyRolesStore();
const companiesStore = useCompaniesStore();
const userStore = useUserStore();

companyRolesStore.fetchRoles();

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const mapMember = function (member) {
    const user = { ...member.user };
    user.fullName = `${member.user.name} ${member.user.surname}`;

    if (!user.fullName.trim()) {
        user.fullName = member.user.name || member.user.surname || member.user.email;
    }

    const [first, second] = user.fullName.split(" ").map((u) => u[0].toUpperCase());
    if (first && second) {
        user.initials = `${first}.${second}.`;
    } else {
        user.initials = capitalizeFirstLetter(user.fullName.slice(0, 2));
    }

    return { user, role: member.role };
};

const mappedMembers = computed(() => props.members.map(mapMember));

const columns = [
    { key: "user", label: "Пользователь" },
    { key: "role", label: "Роль" },
    { key: "actions", label: "Действия", width: 80 },
];

const email = ref("");
const addUser = async function () {
    try {
        await companiesStore.addToCompany(props.companyId, email.value);

        toast.init({ message: "Пользователь успешно добавлен", color: "success" });
        email.value = "";

        emit("updateMembers");
    } catch (e) {
        toast.init({ message: e?.response?.data?.message, color: "danger" });
    }
};

const isRowMe = function (index) {
    return mappedMembers.value[index].user._id === userStore.user._id;
};

const deleteItemById = async function (index) {
    const id = mappedMembers.value[index].user._id;
    await companiesStore.deleteFromCompany(props.companyId, id);

    emit("updateMembers");
}

const updateRole = async function (index, role) {
    const id = mappedMembers.value[index].user._id;
    await companiesStore.updateUserRoleInCompany(props.companyId, id, role.value);

    emit("updateMembers");
}
</script>

<template>
    <div>
        <div class="company-add" v-if="role === 'ADMIN'">
            <VaInput placeholder="Введите email пользователя" v-model="email" />
            <VaButton icon="add" @click="addUser" />
        </div>
        <VaDataTable class="table" :columns="columns" :items="mappedMembers">
            <template #cell(user)="{ rowKey }">
                <VaAvatar
                    style="margin-right: 0.5rem"
                    size="small"
                    :color="rowKey.user.avatarColor"
                    :src="rowKey.user.avatar"
                >
                    <template v-if="!rowKey.user.avatar">
                        {{ rowKey.user.initials }}
                    </template>
                </VaAvatar>
                {{ rowKey.user.fullName }}
            </template>

            <template #cell(role)="{ value, rowIndex }">
                <template v-if="role === 'ADMIN' && !isRowMe(rowIndex)">
                    <VaSelect
                        @update:model-value="updateRole(rowIndex, $event)"
                        :model-value="companyRolesStore.getRoleObject(value)"
                        :options="companyRolesStore.roles"
                        track-by="value"
                        text-by="title"
                    />
                </template>
                <template v-else>
                    {{ companyRolesStore.getRoleName(value) }}
                </template>
            </template>

            <template #cell(actions)="{ rowIndex }">
                <VaButton
                    v-if="role === 'ADMIN' && !isRowMe(rowIndex)"
                    icon="delete"
                    style="margin-left: auto"
                    color="danger"
                    @click="deleteItemById(rowIndex)"
                />
            </template>
        </VaDataTable>
    </div>
</template>

<style scoped>
.company-add {
    display: flex;
    gap: 10px;
    margin: 20px 0 10px;
}
</style>
