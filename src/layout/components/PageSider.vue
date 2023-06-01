<template>
    <div class="pt-4">
    <div class="m-0">
      <img class="m-auto" src="~@/assets/images/logo.png"  alt="logo"/>
    </div>
    <n-menu :options="menuOptions" :value="defaultKey" inverted @update:value="handleUpdateValue" />

    <!--    <n-menu-->
<!--        :inverted="true"-->
<!--        :collapsed-width="64"-->
<!--        :collapsed-icon-size="22"-->
<!--        :options="menuOptions"-->
<!--        @update:value="selectMenu"-->
<!--        :value="routeKey"-->
<!--    />-->
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>

</style>