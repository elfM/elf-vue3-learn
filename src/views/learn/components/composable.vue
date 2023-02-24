<script lang="ts" setup>
import { ref } from "vue";
import useFetch from "../use/fetch";

const { data, error } = useFetch("s?wd=消费大数据展露暖意与新意");

console.log(data);
console.log(error);

const vFoucs = {
  mounted: (el: any) => {
    el.focus();
  },
};

const items = ref([1, 2, 3, 4, 5, 6]);

function add() {
  items.value.splice(1, 0, 10);
}
</script>

<template>
  <div>eee</div>
  <input v-foucs />

  <el-button @click="add">添加一项</el-button>

  <TransitionGroup name="list" tag="ul">
    <li v-for="item in items" :key="item">
      {{ item }}
    </li>
  </TransitionGroup>
</template>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
