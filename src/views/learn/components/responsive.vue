<script lang="ts" setup>
import { reactive } from "vue";

// 状态都是默认深层响应式的。这意味着即使在更改深层次的对象或数组，你的改动也能被检测到。
const state = reactive({
  count: 0,
});

const raw = {};
const proxy = reactive(raw);

// 在同一个对象上调用 reactive() 会返回相同的代理
console.log(reactive(raw) === proxy); // true

// 在一个代理上调用 reactive() 会返回它自己
console.log(reactive(proxy) === proxy); // true

proxy.nested = 1;
console.log('proxy', proxy);
console.log(proxy.nested === raw); // false

function increment() {
  state.count++;
}
</script>

<template>
  <p>{{ state.count }}</p>
  <el-button @click="increment">+1</el-button>
  <div>{{ proxy.nested }}</div>
</template>
