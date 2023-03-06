<script lang="ts" setup>
import { reactive, watch } from "vue";

/* 直接给 watch() 传入一个响应式对象，会隐式地创建一个深层侦听器 */
const obj = reactive({ count: 0 });
watch(obj, (newValue, oldValue) => {
  console.log(newValue, oldValue);
  //注意：`newValue` 此处和 `oldValue` 是相等的,因为他们是同一个对象。
});
obj.count++;

/* 返回响应式对象的 getter 函数，只有在返回不同的对象时，才会触发回调 */
const state = reactive({
  someObject: { a: 1, b: 2 },
});
watch(
  () => state.someObject,
  () => {
    console.log("不是深度监听");
    // 仅当 state.someObject 被替换时触发
  }
);
watch(
  () => state.someObject,
  () => {
    console.log("深度监听");
    // 当用于大型数据结构时，开销很大。因此请只在必要时才使用它，并且要留意性能。
  },
  {
    deep: true, // 深度监听
    flush: "post", // 侦听器回调中能访问被 Vue 更新之后的 DOM
  }
);
state.someObject.a = 3;
</script>

<script lang="ts">
console.log('我来了1')
</script>
<!-- <script lang="ts">
console.log('我来了')
</script> -->

<template>
  <div></div>
</template>
