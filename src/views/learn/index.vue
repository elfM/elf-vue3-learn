<script lang="ts" setup>
import { reactive, ref } from "vue";
import responsive from './components/responsive.vue'

interface Type {
  value: string;
  label: string;
}

const activeName = ref("one");
const list = reactive<Type[]>([
  { value: "one", label: "响应式" },
  { value: "two", label: "22" },
]);
</script>

<template>
  <el-tabs v-model="activeName">
    <el-tab-pane
      v-for="item in list"
      :key="item.value"
      :label="item.label"
      :name="item.value"
    ></el-tab-pane>
  </el-tabs>

  <responsive v-if="activeName === 'one'" />
</template>
