<template>
    <n-upload
        :custom-request="customRequest"
      >
        <n-button v-if="!imgurl">上传文件</n-button>
        <n-image
            v-else
            width="100"
            :src="imgurl"
            :preview-disabled="true"
        />
      </n-upload>
</template>

<script lang="ts" setup>
import { ref } from "vue" 
import { uploadToken } from "../../api/base"
import axios from "axios";
const emit = defineEmits(['backKey'])
const imgurl = ref(null)
const customRequest = ({file,action,header,onFinish,onError})=> {
  // console.log(file,action,header,onFinish,onError)
  uploadToken().then(res=>{
    // 图片上传的逻辑
    // 组装上传的参数
    const formData = new FormData()
    // 随机生成图片名称 根据 file.name 来获取文件后缀名
    let fileName = `${Date.now()}${Math.floor(Math.random()*1000)}.${file.name.split('.').pop()}`;
    formData.append('key', fileName)
    formData.append('OSSAccessKeyId', res.data.accessid)
    formData.append('policy', res.data.policy)
    formData.append('Signature', res.data.signature)
    formData.append('file', file.file)
    // 发送请求
    axios.post(res.data.host, formData,{
      headers: {
        'Content-Type':'multipart/form-data'
      }
    }).then(()=>{
        emit('backKey',fileName)
    //   model.value.img = fileName;
        imgurl.value = `${res.data.host}/${fileName}`;
      onFinish(fileName)
    }).catch(err=>{
    //   onError(err)
    })
  })
}
</script>

<style lang="scss" scoped>

</style>