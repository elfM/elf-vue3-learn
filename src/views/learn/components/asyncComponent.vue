<script lang="ts" setup>
import { defineAsyncComponent, ref } from "vue";
import watcher from "./watchers.vue";

const Test = defineAsyncComponent(() => {
  return new Promise((resolve) => {
    resolve(watcher);
  });
});
</script>

<template>
  <Test />
</template>
