<script setup>
const todoList = defineModel();

const addTask = function () {
    todoList.value.push({
        id: Date.now(),
        title: "",
        checked: false,
    });
};
</script>

<template>
    <div class="task-todo-editor">
        <div class="task-todo-editor-row" v-for="todo in todoList" :key="todo.id">
            <VaInput class="form-input" v-model="todo.title" />
            <VaButton
                preset="primary"
                icon="delete"
                color="danger"
                @click="todoList.splice(todoList.indexOf(todo), 1)"
            />
        </div>
        <VaButton preset="primary" icon="add" @click="addTask">Добавить задачу</VaButton>
    </div>
</template>

<style scoped>
.task-todo-editor-row {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
}

.form-input {
    width: 100%;
}
</style>
