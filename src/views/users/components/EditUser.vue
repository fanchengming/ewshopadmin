<template>
    <n-modal
        v-model:show="$props.showModal"
        @update:show="$emit('checkShowModal',false)"
        :mask-closable="true"
     >
    <n-card
      style="width: 600px"
      title="编辑用户"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #header-extra>
        <span @click="$emit('checkShowModal',false)">X</span>
      </template>
      <n-form v-if="showForm" ref="formRef" :model="model" :rules="rules">
    <n-form-item path="name" label="姓名">
      <n-input v-model:value="model.name" placeholder="请输入姓名" />
    </n-form-item>
    <n-form-item path="email" label="邮箱">
      <n-input
        v-model:value="model.email"
        type="email"
        placeholder="请输入邮箱"
      />
    </n-form-item>
    <n-row :gutter="[0, 24]">
      <n-col :span="24">
        <div style="display: flex; justify-content: flex-end">
          <n-button
            round
            type="primary"
            @click="userSubmit"
          >
            提交
          </n-button>
        </div>
      </n-col>
    </n-row>
  </n-form>
  <n-skeleton v-else text :repeat="2" />
    </n-card>
  </n-modal>
</template>

<script lang="ts" setup>
import { defineComponent, ref, onMounted } from 'vue'
import { addUser,getUserInfo,updateUser } from '@/api/users'
const props = defineProps({
    showModal: {
        type: Boolean,
        default: false
    },
    user_id:{
      type:Number,
      default:''
    }
})
const model = ref({
      name: null,
      email: null,
})
const showForm = ref(false)
const emit = defineEmits(['checkShowModal'])
onMounted(()=>{
  if(props.user_id) {
    getUserInfo(props.user_id).then(res=>{
      // console.log(res)
      model.value.name = res.data.name;
      model.value.email = res.data.email;
      showForm.value = true;
    })
  }
})


const rules: FormRules = {
    name: [
        {
        required: true,
        message: '请输入姓名'
        }
    ],
    email: [
    {
        required: true,
        message: '请输入邮箱'
    }
    ],
}
const formRef = ref()
const userSubmit = (e)=>{
    e.preventDefault()
    formRef.value.validate(errors => {
        if (errors) {
            console.log(errors)
        }else {
          updateUser(props.user_id,model.value).then(res=> {
            window.$message.success('修改成功')
            emit('checkShowModal', false); 
            emit('reloadTable')
          })
        }
    })
}
</script>

<style lang="scss" scoped>

</style>