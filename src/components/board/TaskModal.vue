<script setup>
import { ref, computed } from "vue";

import { getTask, getBoardMembers, editTask } from "@/api";
import { mapUser, mapMember } from "@/utils";
import { useUserStore } from "@/stores";

import TaskTodoEditor from "./TaskTodoEditor.vue";
import TaskMembersEditor from "./TaskMembersEdit.vue";
import TaskMediaEditor from "./TaskMediaEditor.vue";
import TaskPriorityEdit from "./TaskPriorityEdit.vue";
import TaskPriority from "./TaskPriority.vue";
import TaskDeadline from "./TaskDeadline.vue";

const props = defineProps({
    taskId: {
        type: [String, null],
        required: true,
    },
    columnId: {
        type: [String, null],
        required: true,
    },
    boardId: {
        type: [String, null],
        required: true,
    },
    columnTitle: {
        type: [String, null],
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
});
const emit = defineEmits(["close"]);

const userStore = useUserStore();

const showModal = defineModel();

const isLoading = ref(false);
const task = ref({});
const members = ref([]);

const loadTask = async function () {
    try {
        task.value = {};
        isLoading.value = true;
        task.value = await getTask(props.taskId, props.columnId, props.boardId);
        task.value.author = mapUser(task.value.author);

        members.value = await getBoardMembers(props.boardId);
        if (members.value) {
            members.value = members.value.map((member) => mapMember(member));
        }
    } finally {
        isLoading.value = false;
    }
};

const canEdit = computed(() => {
    if (!task.value._id) {
        return false;
    }

    const hasRole = props.role === "ADMIN" || props.role === "MANAGER";
    const isAuthor = task.value.author._id === userStore.user._id;
    const isMember = task.value.membersUsers?.some((member) => member._id === userStore.user._id);

    return hasRole || isAuthor || isMember;
});
const isEditting = ref(false);

const save = async function () {
    try {
        isLoading.value = true;

        await editTask(task.value, props.taskId, props.columnId, props.boardId);

        isEditting.value = false;
    } finally {
        isLoading.value = false;
    }
};

const handleClose = function () {
    emit("close");
    task.value = {};
    isEditting.value = false;
};

const memberUsers = computed(() => {
    if (!task.value?.members?.length || !members.value?.length) return [];

    const users = task.value.members.map((memberId) => {
        return mapUser(members.value.find((member) => member.user._id === memberId).user);
    });

    return users;
});

const updateCheckboxes = async function () {
    try {
        await editTask(task.value, props.taskId, props.columnId, props.boardId);
    } catch (e) {
        console.log(e);
    }
};
</script>

<template>
    <VaModal
        v-model="showModal"
        hide-default-actions
        size="large"
        close-button
        @before-close="handleClose"
        @before-open="loadTask"
    >
        <VaInnerLoading :loading="isLoading">
            <div class="task-content">
                <div class="task-header">
                    <div class="task-header-row">
                        <h3 v-if="!isEditting" class="va-h5">{{ task.title }}</h3>
                        <VaInput v-else v-model="task.title" />
                        <div class="task-header-actions">
                            <VaButton
                                preset="primary"
                                icon="edit"
                                v-if="canEdit && !isEditting"
                                @click="isEditting = true"
                            />
                            <VaButton
                                preset="primary"
                                icon="save"
                                v-if="canEdit && isEditting"
                                @click="save"
                            />
                            <VaButton
                                preset="primary"
                                icon="delete"
                                color="danger"
                                v-if="canEdit"
                            />
                        </div>
                    </div>
                    <VaBadge color="primary" class="task-status" :text="columnTitle" />
                </div>
                <VaDivider class="task-divider" />

                <template v-if="task.description || isEditting">
                    <div class="task-description">
                        <h4 class="va-h6">Описание задачи</h4>
                        <div class="task-description-text" v-if="!isEditting">
                            {{ task.description }}
                        </div>
                        <VaTextarea v-else class="form-input" v-model="task.description" />
                    </div>
                    <VaDivider class="task-divider" />
                </template>

                <template v-if="task.todoList?.length || isEditting">
                    <div class="task-todo">
                        <h4 class="va-h6">Список задач</h4>
                        <div class="task-todo-list" v-if="!isEditting">
                            <VaCheckbox
                                v-for="(todo, index) in task.todoList"
                                :key="index"
                                :label="todo.title"
                                v-model="todo.checked"
                                @update:model-value="updateCheckboxes"
                            />
                        </div>
                        <TaskTodoEditor v-else v-model="task.todoList" />
                    </div>
                    <VaDivider class="task-divider" />
                </template>

                <template v-if="task.members?.length || isEditting">
                    <div class="task-members">
                        <h4 class="va-h6">Участники</h4>
                        <div v-if="!isEditting" class="task-members-list">
                            <div v-for="member in memberUsers" :key="member._id">
                                <VaAvatar
                                    style="margin-right: 0.5rem"
                                    size="small"
                                    :color="member.avatarColor"
                                    :src="member.avatar"
                                >
                                    <template v-if="!member.avatar">
                                        {{ member.initials }}
                                    </template>
                                </VaAvatar>
                                {{ member.fullName }}
                            </div>
                        </div>
                        <TaskMembersEditor v-else v-model="task.members" :members="members" />
                    </div>
                    <VaDivider class="task-divider" />
                </template>

                <div class="task-other">
                    <h4 class="va-h6">Другое</h4>
                    <div v-if="!isEditting" class="task-other-content">
                        <div v-if="task.priority">
                            Приоритет:
                            <TaskPriority
                                :value="task.priority.label"
                                :type="task.priority.value"
                            />
                        </div>
                        <div v-if="task.deadline">
                            Дедлайн: <TaskDeadline :value="task.deadline" />
                        </div>
                        <div v-if="task.createdAt">
                            Дата создания: {{ new Date(task.createdAt).toLocaleString() }}
                        </div>
                        <div v-if="task.author">
                            Автор:
                            <VaAvatar
                                :size="25"
                                :color="task.author.avatarColor"
                                :src="task.author.avatar"
                            >
                                <template v-if="!task.author.avatar">
                                    {{ task.author.initials }}
                                </template>
                            </VaAvatar>
                            {{ task.author.fullName }}
                        </div>
                    </div>
                    <div v-else class="task-other-edit">
                        <TaskPriorityEdit class="task-priority-edit" v-model="task.priority" />
                        <div class="deadline">
                            <VaDateInput label="Дедлайн" v-model="task.deadline" />
                            <VaTimeInput label=" " v-model="task.deadline" v-if="task.deadline" />
                        </div>
                    </div>
                </div>
                <VaDivider class="task-divider" />

                <template v-if="true || isEditting">
                    <div class="task-media">
                        <h4 class="va-h6">Медиа</h4>
                        <div v-if="!isEditting" class="task-media-content">
                            <div style="display: flex; flex-direction: column; gap: 5px">
                                <div
                                    style="
                                        width: 100%;
                                        height: 80px;
                                        background-image: url(&quot;https://cf2.ppt-online.org/files2/slide/s/sDq29pjUC8ITBoNEhZRiLfFXOdGMu4VSHa0zvc/slide-0.jpg&quot;);
                                        background-size: contain;
                                        background-position: center;
                                        background-repeat: no-repeat;
                                    "
                                ></div>
                                <div style="text-align: center">Слайд_1717355824039.jpg</div>
                            </div>

                            <div style="display: flex; flex-direction: column; gap: 5px">
                                <div
                                    style="
                                        width: 100%;
                                        height: 80px;
                                        background-image: url(&quot;https://logo-base.com/logo/word_logo_icon.png&quot;);
                                        background-size: contain;
                                        background-position: center;
                                        background-repeat: no-repeat;
                                    "
                                ></div>
                                <div style="text-align: center">Требования_1717355824234.docx</div>
                            </div>
                        </div>
                        <TaskMediaEditor v-else v-model="task.media" />
                    </div>
                    <VaDivider class="task-divider" v-if="!isEditting" />
                </template>

                <div class="task-chat" v-if="!isEditting">
                    <h4 class="va-h6">Чат</h4>
                    <div style="display: flex; gap: 10px; align-items: flex-start">
                        <VaTextarea class="task-chat-input" placeholder="Введите сообщение..." style="margin-top: 0;" />
                        <VaButton preset="primary" icon="send" size="large" />
                    </div>
                    <div class="task-chat-content"></div>
                </div>
            </div>
        </VaInnerLoading>
    </VaModal>
</template>

<style scoped>
.task-content {
    padding-top: 10px;
}

.task-divider {
    margin: 15px 0;
}

.task-header-row {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
    align-items: center;
}

.task-description-text,
.task-todo-list,
.task-members-list,
.task-other-content {
    margin-top: 5px;
    background-color: var(--va-background-element);
    padding: 15px;
    border-radius: 5px;
}

.task-members-list {
    display: grid;
    gap: 10px;
    grid-template-columns: 1fr 1fr 1fr;
}

@media (max-width: 768px) {
    .task-members-list {
        grid-template-columns: 1fr 1fr;
    }
}

@media (max-width: 576px) {
    .task-members-list {
        grid-template-columns: 1fr;
    }
}

.task-todo-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.task-status {
    margin-top: 5px;
    --va-badge-font-size: 12px;
}

.task-other-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.task-header-actions {
    display: flex;
    gap: 10px;
}

.task-chat-input {
    width: 100%;
    margin-top: 5px;
    margin-bottom: 5px;
}

.form-input {
    width: 100%;
}

.deadline {
    display: flex;
    gap: 10px;
}

.task-other-edit {
    margin-top: 10px;
    display: block;
}

.task-media-content {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 10px;
}
</style>
