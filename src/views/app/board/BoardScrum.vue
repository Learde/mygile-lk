<script setup>
import { ref, onMounted, computed } from "vue";

import { useBoardsStore } from "@/stores";
import { BoardColumn, BoardColumnModal, TaskPriority } from "@/components";
import { mapUser } from "@/utils";

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
});

const boardsStore = useBoardsStore();
const board = ref(null);

const loadBoard = async function () {
    board.value = await boardsStore.getBoard(props.id);
};

onMounted(() => {
    loadBoard();
});

const backBtnTo = computed(() => {
    if (board.value?.companyId) {
        return { name: "company-view", params: { id: board.value?.companyId } };
    } else {
        return { name: "company" };
    }
});

const tasks = ref([
    {
        _id: "665a3ee7863432465bcf0efc",
        title: "Реализовать функционал приложения",
        columnId: "665a18a59176d3040a9b5ff6",
        boardId: "665a18a59176d3040a9b5ff0",
        description: "",
        todoList: [],
        position: 1,
        members: ["66455d376eda6c366e591465"],
        media: [],
        authorId: "664565a5513dc3e7b89ac0d1",
        deadline: null,
        chatId: "665a3ee7863432465bcf0efa",
        number: 4,
        priority: null,
        createdAt: "2024-05-31T21:19:35.287Z",
        __v: 0,
        membersUsers: [
            {
                _id: "66455d376eda6c366e591465",
                email: "leardeleo@gmail.com",
                name: "",
                surname: "",
                avatar: "",
                avatarColor: "",
                isActivated: false,
                role: "USER",
                __v: 0,
            },
        ],
    },
    {
        _id: "665a3ed0863432465bcf0edb",
        title: "Написать текст вкр",
        columnId: "665a18a59176d3040a9b5ff6",
        boardId: "665a18a59176d3040a9b5ff0",
        description: "",
        todoList: [],
        position: 2,
        members: ["664565a5513dc3e7b89ac0d1"],
        media: [],
        authorId: "664565a5513dc3e7b89ac0d1",
        deadline: null,
        chatId: "665a3ed0863432465bcf0ed9",
        number: 3,
        priority: {
            label: "Высокий",
            value: "high",
        },
        createdAt: "2024-05-31T21:19:12.994Z",
        __v: 0,
        membersUsers: [
            {
                _id: "664565a5513dc3e7b89ac0d1",
                email: "learde@gmail.com",
                name: "Иван",
                surname: "Баранов",
                avatar: "http://194.87.74.157/1717355480470.jpg",
                avatarColor: "#fb5607",
                isActivated: false,
                role: "USER",
                __v: 0,
            },
        ],
    },
    {
        _id: "665a3e9a863432465bcf0e99",
        title: "Сделать презентацию",
        columnId: "665a18a59176d3040a9b5ff6",
        boardId: "665a18a59176d3040a9b5ff0",
        description:
            "Для защиты и предзащиты ВКР требуется сделать презентацию, максимум на 16 слайдов",
        todoList: [
            {
                id: 1717262560344,
                title: "Титульный слайд",
                checked: true,
            },
            {
                id: 1717262698674,
                title: "Задачи вкр",
                checked: false,
            },
            {
                id: 1717262704611,
                title: "Основная часть",
                checked: false,
            },
            {
                id: 1717262707950,
                title: "Заключение",
                checked: false,
            },
        ],
        position: 3,
        members: ["664565a5513dc3e7b89ac0d1", "664563ee1960796e531ed3fc"],
        media: [],
        authorId: "664565a5513dc3e7b89ac0d1",
        deadline: "2024-06-03T06:00:00.000Z",
        chatId: "665a3e9a863432465bcf0e97",
        number: 1,
        priority: {
            label: "Срочный",
            value: "critical",
        },
        createdAt: "2024-05-31T21:18:18.139Z",
        __v: 0,
        membersUsers: [
            {
                _id: "664565a5513dc3e7b89ac0d1",
                email: "learde@gmail.com",
                name: "Иван",
                surname: "Баранов",
                avatar: "http://194.87.74.157/1717355480470.jpg",
                avatarColor: "#fb5607",
                isActivated: false,
                role: "USER",
                __v: 0,
            },
            {
                _id: "664563ee1960796e531ed3fc",
                email: "test@gmail.com",
                name: "",
                surname: "",
                avatar: "",
                avatarColor: "#ff00ff",
                isActivated: false,
                role: "USER",
                __v: 0,
            },
        ],
    },
    {
        _id: "665a3eb5863432465bcf0eba",
        title: "Исправить баги в приложении",
        columnId: "665a18a59176d3040a9b5ff6",
        boardId: "665a18a59176d3040a9b5ff0",
        description: "",
        todoList: [],
        position: 4,
        members: ["664565a5513dc3e7b89ac0d1"],
        media: [],
        authorId: "664565a5513dc3e7b89ac0d1",
        deadline: null,
        chatId: "665a3eb5863432465bcf0eb8",
        number: 2,
        priority: {
            label: "Средний",
            value: "medium",
        },
        createdAt: "2024-05-31T21:18:45.165Z",
        __v: 0,
        membersUsers: [
            {
                _id: "664565a5513dc3e7b89ac0d1",
                email: "learde@gmail.com",
                name: "Иван",
                surname: "Баранов",
                avatar: "http://194.87.74.157/1717355480470.jpg",
                avatarColor: "#fb5607",
                isActivated: false,
                role: "USER",
                __v: 0,
            },
        ],
    },
]);
</script>

<template>
    <VaInnerLoading :loading="boardsStore.isLoading">
        <div class="board-header">
            <h2 class="va-h5">{{ board?.title }}</h2>
            <VaButton
                v-if="board?.userRole === 'ADMIN'"
                preset="primary"
                :to="{ name: 'board-edit', params: { id } }"
            >
                Настройки
            </VaButton>
            <VaButton preset="primary" class="back-btn" color="danger" :to="backBtnTo">
                Назад
            </VaButton>
        </div>
        <div class="app-box">
            <div class="sprints-header">
                <h3 class="va-h6">Спринты</h3>
                <VaButton
                    v-if="board?.userRole === 'ADMIN' || board?.userRole === 'MANAGER'"
                    preset="primary"
                    @click="addSprint"
                >
                    Добавить спринт
                </VaButton>
            </div>
            <div class="sprints-list">
                <VaCard>
                    <VaCardTitle style="font-size: 12px">Спринт #5</VaCardTitle>
                    <VaCardContent>
                        <VaChip square color="info" size="medium" icon="calendar_month">
                            01.06.2024 - 07.06.2024
                        </VaChip>
                    </VaCardContent>
                </VaCard>
                <VaCard>
                    <VaCardTitle style="font-size: 12px">Спринт #4</VaCardTitle>
                    <VaCardContent>
                        <VaChip square color="info" size="medium" icon="calendar_month">
                            24.05.2024 - 31.05.2024
                        </VaChip>
                    </VaCardContent>
                </VaCard>
                <VaCard>
                    <VaCardTitle style="font-size: 12px">Спринт #3</VaCardTitle>
                    <VaCardContent>
                        <VaChip square color="info" size="medium" icon="calendar_month">
                            16.05.2024 - 23.05.2024
                        </VaChip>
                    </VaCardContent>
                </VaCard>
                <VaCard>
                    <VaCardTitle style="font-size: 12px">Спринт #2</VaCardTitle>
                    <VaCardContent>
                        <VaChip square color="info" size="medium" icon="calendar_month">
                            08.05.2024 - 15.05.2024
                        </VaChip>
                    </VaCardContent>
                </VaCard>
                <VaCard>
                    <VaCardTitle style="font-size: 12px">Спринт #1</VaCardTitle>
                    <VaCardContent>
                        <VaChip square color="info" size="medium" icon="calendar_month">
                            01.05.2024 - 07.05.2024
                        </VaChip>
                    </VaCardContent>
                </VaCard>
            </div>
        </div>
        <div class="app-box" style="margin-top: 10px">
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px">
                <h3 class="va-h6">Хранилище задач</h3>
                <VaButton preset="primary">Добавить задачу</VaButton>
            </div>
            <div class="sprints-list">
                <VaCard v-for="task in tasks" :key="task._id" class="task" @click="openTask(task)">
                    <VaCardTitle class="task-title">
                        {{ task.title }}
                        <VaBadge :text="`#${task.number}`" color="secondary" />
                    </VaCardTitle>
                    <VaCardContent>
                        <div style="display: flex">
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
        </div>
    </VaInnerLoading>
</template>

<style scoped>
.app-box {
    min-height: unset;
}

.board-header {
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    margin-bottom: 6px;
    /* padding: 0 10px; */
    min-height: 44px;
}

.board-header h2 {
    margin-right: auto;
}

.sprints-header {
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    margin-bottom: 20px;
}

.sprints-header h3 {
    margin-right: auto;
}

.sprints-list {
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr 1fr 1fr;
}

@media (max-width: 768px) {
    .sprints-list {
        grid-template-columns: 1fr 1fr;
    }
}

@media (max-width: 576px) {
    .sprints-list {
        grid-template-columns: 1fr;
    }
}

.task-title {
    display: flex;
    justify-content: space-between;
    gap: 10px;
}
</style>
