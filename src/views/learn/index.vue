<script lang="ts" setup>
import { reactive, ref } from "vue";
import Responsive from "./components/responsive.vue";
import Watchers from "./components/watchers.vue";
import AsyncComponent from "./components/asyncComponent.vue";
import Composable from "./components/composable.vue";

interface Type {
  value: string;
  label: string;
}

const activeName = ref("one");
const list = reactive<Type[]>([
  { value: "one", label: "响应式" },
  { value: "two", label: "Watchers" },
  { value: "three", label: "异步组件" },
  { value: "four", label: "组合式函数" },
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

  <Responsive v-if="activeName === 'one'" />
  <Watchers v-if="activeName === 'two'" />
  <AsyncComponent v-if="activeName === 'three'" />
  <Composable v-if="activeName === 'four'" />
</template>
