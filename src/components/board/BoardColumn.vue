<script setup>
import { ref } from "vue";
import { useDragAndDrop } from "@formkit/drag-and-drop/vue";

import { moveTask } from "@/api";
import { mapUser } from "@/utils";

import TaskCreateModal from "./TaskCreateModal.vue";
import TaskModal from "./TaskModal.vue";
import TaskPriority from "./TaskPriority.vue";

const props = defineProps({
    boardId: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    tasks: {
        type: Array,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
});
const emit = defineEmits(["openEdit", "delete", "reload", "recalcColumn"]);

const pickedTaskId = ref(null);
const showCreateModal = ref(false);
const showTaskModal = ref(false);

const addTask = function () {
    showCreateModal.value = true;
};

const openTask = function (task) {
    pickedTaskId.value = task._id;
    showTaskModal.value = true;
    showCreateModal.value = false;
};

const handleTaskAdded = function (task) {
    emit("reload");
    openTask(task);
};

const [tasksList, tasksArray] = useDragAndDrop(props.tasks, {
    group: "columns",
    handleEnd: (event) => {
        const { targetData } = event;
        const task = targetData.node.data;
        const nodes = targetData.parent.data.enabledNodes;
        const tasks = nodes.map((node) => node.data);
        const newColumnId = targetData.parent.el.id;

        for (let i = 0; i < tasks.length; i++) {
            tasks[i].value.position = i + 1;
        }

        moveTask(task.value.position, task.value._id, newColumnId, props.boardId);
    },
});
</script>

<template>
    <div class="board-column">
        <div class="board-column-header">
            <div class="board-column-header-row">
                <h3 class="va-h6">
                    {{ title }}
                </h3>

                <VaButtonDropdown icon="settings" opened-icon="settings" plain color="secondary">
                    <div class="column-actions">
                        <VaButton
                            @click="$emit('openEdit')"
                            icon="edit"
                            color="primary"
                            size="small"
                            preset="secondary"
                            :disabled="role !== 'ADMIN' && role !== 'MANAGER'"
                        >
                            Редактировать
                        </VaButton>
                        <VaButton
                            @click="$emit('delete')"
                            icon="delete"
                            color="danger"
                            size="small"
                            preset="secondary"
                            :disabled="role !== 'ADMIN' && role !== 'MANAGER'"
                        >
                            Удалить
                        </VaButton>
                    </div>
                </VaButtonDropdown>

                <VaIcon name="drag_indicator" color="secondary" class="drag-handler" />
            </div>
            <VaButton @click="addTask" preset="plain" size="small" icon="add" class="add-task">
                Добавить задачу
            </VaButton>
        </div>
        <VaScrollContainer class="board-column-container" vertical>
            <div class="board-columns-tasks" ref="tasksList" :id="id">
                <VaCard
                    v-for="task in tasksArray"
                    :key="task._id"
                    class="task"
                    @click="openTask(task)"
                >
                    <VaCardTitle class="task-title">
                        {{ task.title }}
                        <VaBadge :text="`#${task.number}`" color="secondary" />
                    </VaCardTitle>
                    <VaCardContent>
                        <div style="display: flex;">
                            <TaskPriority
                                v-if="task.priority"
                                :value="task.priority.label"
                                :type="task.priority.value"
                                size="12px"
                                style="--va-chip-font-size: 12px"
                            />
                            <div style="display: flex; gap: 5px; margin-left: auto">
                                <VaAvatar
                                    v-for="member in task.membersUsers"
                                    :key="member.id"
                                    size="20px"
                                    :color="member.avatarColor"
                                    :src="member.avatar"
                                >
                                    <template v-if="!member.avatar">
                                        {{ mapUser(member).initials }}
                                    </template>
                                </VaAvatar>
                            </div>
                        </div>
                    </VaCardContent>
                </VaCard>
            </div>
        </VaScrollContainer>
        <TaskCreateModal
            v-model="showCreateModal"
            :board-id="boardId"
            :column-id="id"
            :column-title="title"
            @added="handleTaskAdded($event)"
        />
        <TaskModal
            v-model="showTaskModal"
            :task-id="pickedTaskId"
            :board-id="boardId"
            :column-id="id"
            :column-title="title"
            :role="role"
            @close="pickedTaskId = null"
        />
    </div>
</template>

<style scoped>
.board-column {
    --column-header-height: 50px;
    --column-header-margin: 10px;

    background-color: var(--va-background-element);
    min-height: calc(100vh - var(--app-navbar-height) - var(--app-main-padding) * 2 - 50px);
    max-height: calc(100vh - var(--app-navbar-height) - var(--app-main-padding) * 2 - 50px);
    padding: 10px 8px 0;
    border-radius: 5px;
    max-width: 300px;
    width: 300px;
}

.board-column-container {
    max-height: calc(
        100vh - var(--app-navbar-height) - var(--app-main-padding) * 2 - 50px -
            var(--column-header-height) - var(--column-header-margin) - 10px
    );
}

.board-column-header {
    margin-bottom: var(--column-header-margin);
    height: var(--column-header-height);
    display: flex;
    flex-direction: column;
}

.board-column-header h3 {
    margin: 0;
    padding: 0;
    font-size: 16px;
}

.board-columns-tasks {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-bottom: 10px;
    min-height: 100%;
}

:deep(.va-scroll-container__content) {
    min-height: 100%;
}

.task {
    cursor: pointer;
}

.add-task {
    margin-top: auto;
    align-self: flex-start;
}

.board-column-header-row {
    display: flex;
    align-items: center;
    gap: 8px;
}

.board-column-header-row h3 {
    margin-right: auto;
}

.drag-handler {
    cursor: grab;
}

.column-actions {
    display: flex;
    gap: 8px;
    flex-direction: column;
}

.task-title {
    display: flex;
    justify-content: space-between;
    gap: 10px;
}
</style>
