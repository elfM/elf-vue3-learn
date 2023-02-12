<script lang="ts" setup>
import { reactive, ref } from "vue";

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

/*
当一个 ref 被嵌套在一个响应式对象中，作为属性被访问或更改时，它会自动解包，
因此会表现得和一般的属性一样

跟响应式对象不同，当 ref 作为响应式数组或像 Map 这种原生集合类型的元素被访问时，不会进行解包。
*/
const count = ref(0);
const obj = reactive({
  count,
});

console.log(obj.count); // 0

obj.count = 1;
console.log(count.value); // 1

function increment() {
  state.count++;
}
</script>

<template>
  <p>{{ state.count }}</p>
  <el-button @click="increment">+1</el-button>
  <div>{{ proxy.nested }}</div>
</template>
