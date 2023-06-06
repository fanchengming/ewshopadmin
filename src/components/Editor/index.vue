<template>
    <div>
        <QuillEditor ref="editor" theme="snow" @update:content="updateContent" />
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue" 
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const editor = ref()
const emit = defineEmits(['backContent'])

const updateContent = (e) => {
    emit('backContent', editor.value.getHTML());
    // module.value.details = editor.value.getHTML()
}
</script>

<style lang="scss" scoped>

</style>