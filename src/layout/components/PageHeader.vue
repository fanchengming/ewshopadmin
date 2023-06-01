<template>
  <div class="w-full h-14 flex items-center  overflow-hidden justify-end px-8 shadow shadow-md shadow-sky-500"   style="border-bottom: 1px solid #ccc">
    <!-- 头像 -->
    <n-dropdown :options="options" @select="select">
      <div class="flex items-center">
        <n-avatar
            round
            size="small"
            :src="userStore.getAvatar"
        />
        <span class="pl-2">
                        {{userStore.getUserName}}
                      </span>
      </div>
    </n-dropdown>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>

</style>