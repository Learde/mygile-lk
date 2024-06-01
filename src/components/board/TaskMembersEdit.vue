<script setup>
defineProps({
    members: {
        type: Array,
        default: () => [],
    },
});

const membersList = defineModel();

const toggleMember = function (member) {
    if (membersList.value.includes(member.user._id)) {
        membersList.value = membersList.value.filter((id) => id !== member.user._id);
    } else {
        membersList.value.push(member.user._id);
    }
};
</script>

<template>
    <div class="member-editor">
        <div class="member-edit" v-for="member in members" :key="member.id">
            <div>
                <VaAvatar
                    style="margin-right: 0.5rem"
                    size="small"
                    :color="member.user.avatarColor"
                    :src="member.user.avatar"
                >
                    <template v-if="!member.user.avatar">
                        {{ member.user.initials }}
                    </template>
                </VaAvatar>
                {{ member.user.fullName }}
            </div>
            <VaButton
                preset="primary"
                @click="toggleMember(member)"
                :icon="membersList.includes(member.user._id) ? 'check' : 'add'"
                :color="membersList.includes(member.user._id) ? 'success' : 'primary'"
            />
        </div>
    </div>
</template>

<style scoped>
.member-editor {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.member-edit {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
