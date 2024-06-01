<script setup>
defineProps({
    value: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <VaChip square icon="timer" size="small" color="info">
        {{ new Date(value).toLocaleString() }}
    </VaChip>
</template>
