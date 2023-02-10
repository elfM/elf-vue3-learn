<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<!-- 当根组件没有设置 template 选项时，Vue 将自动使用容器的 innerHTML 作为模板。 -->
<template>
  <div>
    <RouterView />
  </div>
</template>

<style scoped>
</style>
