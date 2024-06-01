<script setup>
const modelValue = defineModel();

const priorities = [
    { label: "Низкий", value: "low" },
    { label: "Средний", value: "medium" },
    { label: "Высокий", value: "high" },
    { label: "Срочный", value: "critical" },
];
</script>

<template>
    <VaSelect
        v-model="modelValue"
        :options="priorities"
        text-by="label"
        track-by="value"
        style="width: 100%; margin-bottom: 20px"
    label="Приоритет"
    />
</template>
