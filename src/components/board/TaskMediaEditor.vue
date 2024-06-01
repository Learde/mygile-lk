<script setup>
const media = defineModel();
</script>

<template>
    <VaFileUpload
        v-model="media"
        dropzone
        drop-zone-text="Перетащите файлы сюда"
        undo-button-text="Отменить"
        upload-button-text="Загрузить"
    />
</template>
