<script setup>
import { computed } from "vue";

const props = defineProps({
    value: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        default: "small",
    },
});

const color = computed(() => {
    switch (props.type) {
        case "low":
            return "secondary";
        case "medium":
            return "success";
        case "high":
            return "warning";
        case "critical":
            return "danger";
        default:
            return "info";
    }
});
</script>

<template>
    <VaChip square :color="color" class="task-priority" icon="priority_high" :size="size">
        {{ value }}
    </VaChip>
</template>
