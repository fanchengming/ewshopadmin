<template>
    <n-modal
        v-model:show="$props.showModal"
        @update:show="$emit('checkShowModal',false)"
        :mask-closable="true"
     >
    <n-card
      style="width: 600px"
      title="添加商品"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #header-extra>
        <span @click="$emit('checkShowModal',false)">X</span>
      </template>
      <n-form ref="formRef" :model="model" :rules="rules">
          <Editor @backContent="backContent"></Editor>
        <n-row :gutter="[0, 24]" class="mt-4">
          <n-col :span="24">
            <div style="display: flex; justify-content: flex-end;margin-top:10px">
              <n-button
                round
                type="primary"
                @click="userSubmit"
              >
                添加
              </n-button>
            </div>
          </n-col>
        </n-row>
      </n-form>
    </n-card>
  </n-modal>
</template>

<script lang="ts" setup>
import { defineComponent, ref } from 'vue'
import { addUser } from '@/api/users'
import Editor from '@/components/Editor/index.vue'
const props = defineProps({
    showModal: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['checkShowModal'])

const model = ref({
      details: null,
})
const rules = {
    details: [
        {
        required: true,
        message: '请输入详情'
        }
    ]
}
const formRef = ref()
const userSubmit = (e)=>{
    // e.preventDefault()
    console.log(model.value)
}
const backContent = (htmlstring)=>{
  model.value.details = htmlstring
}
</script>

<style lang="scss" scoped>

</style>