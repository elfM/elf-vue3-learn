## 计算属性知识点

1. Getter 不应有副作用
   计算属性的 getter 应只做计算而没有任何其他的副作用。比如异步请求，操作 dom 。

2. 避免直接修改计算属性值
   计算属性的返回值应该被视为只读的，并且永远不应该被更改——应该更新它所依赖的源状态以触发新的计算。

## 条件渲染

1. 当 `v-if` 和 `v-for` 一起使用时，`v-if` 的优先级更高。

## 条件渲染

1. `v-for` 中可以使用解构

```html
<li v-for="{ message } in items">{{ message }}</li>

<!-- 有 index 索引时 -->
<li v-for="({ message }, index) in items">{{ message }} {{ index }}</li>
```

2. 可以使用 `of` 代替 `in`。

```html
<div v-for="item of items"></div>
```

3. 遍历对象时

```html
<li v-for="(value, key, index) in myObject">
  {{ index }}. {{ key }}: {{ value }}
</li>
```

4. 通过 `key` 管理状态，但是只适用于列表渲染输出的结果不依赖子组件状态或者临时 DOM 状态 (例如表单输入值) 的情况。不要用对象作为 `key` 。

## 事件处理

1. 使用修饰符时需要注意调用顺序，因为相关代码是以相同的顺序生成的。因此使用 `@click.prevent.self` 会阻止**元素及其子元素的所有点击事件的默认行为，**而 `@click.self.prevent` 则只会阻止对元素本身的点击事件的默认行为。

2. 请勿同时使用 `.passive` 和 `.prevent`，因为 `.passive` 已经向浏览器表明了你不想阻止事件的默认行为。如果你这么做了，则 `.prevent` 会被忽略，并且浏览器会抛出警告。

3. `true-value` 和 `false-value` 是 Vue 特有的 attributes，仅支持和 `v-model` 配套使用。这里 `toggle` 属性的值会在选中时被设为 'yes'，取消选择时设为 'no'。你同样可以通过 `v-bind` 将其绑定为其他动态值。

```html
<input type="checkbox" v-model="toggle" true-value="yes" false-value="no" />
```

## 监听器

1. `watchEffect` 仅会在其同步执行期间，才追踪依赖。在使用异步回调时，只有在第一个 `await` 正常工作前访问到的属性才会被追踪。

2. watch vs watchEffect

- `watch` 只追踪明确侦听的数据源。它不会追踪任何在回调中访问到的东西。另外，仅在数据源确实改变时才会触发回调。`watch` 会避免在发生副作用时追踪依赖，因此，我们能更加精确地控制回调函数的触发时机。

- `watchEffect`，则会在副作用发生期间追踪依赖。它会在同步执行过程中，自动追踪所有能访问到的响应式属性。这更方便，而且代码往往更简洁，但有时其响应性依赖关系会不那么明确。

## 模板引用

1. `ref` 数组并不保证与源数组相同的顺序

2. 模板引用也可以被用在一个子组件上。这种情况下引用中获得的值是组件实例

- 如果一个子组件使用的是选项式 API 或没有使用 `<script setup>`，被引用的组件实例和该子组件的 this 完全一致。

- 使用了 `<script setup>` 的组件是默认私有的：一个父组件无法访问到一个使用了 `<script setup>` 的子组件中的任何东西，除非子组件在其中通过 `defineExpose` 宏显式暴露。

```javascript
<script setup>
import { ref, onMounted } from 'vue'
import Child from './Child.vue'

const child = ref(null)

onMounted(() => {
  // child.value 是 <Child /> 组件的实例
})
</script>

<template>
  <Child ref="child" />
</template>
```

## 组件基础

1. 单文件组件中推荐 `PascalCase ` 方式，HTML 中推荐 `kebab-case`。

2. 大小写区分
   HTML 标签和属性名称是不分大小写的，所以浏览器会把任何大写的字符解释为小写。这意味着当你使用 DOM 内的模板时，无论是`PascalCase` 形式的组件名称、`camelCase` 形式的 `prop` 名称还是 `v-on` 的事件名称，都需要转换为相应等价的 `kebab-case` (短横线连字符) 形式。

3. Vue 的模板解析器支持任意标签使用 `/>` 作为标签关闭的标志，DOM 模板中必须显示的写出关闭标签。

4. 自定义的组件 `<blog-post-row>` 将作为无效的内容被忽略，因而在最终呈现的输出中造成错误。我们可以使用特殊的 `is attribute` 作为一种解决方案：

当使用在原生 HTML 元素上时，`is` 的值必须加上前缀 `vue:` 才可以被解析为一个 Vue 组件。这一点是必要的，为了避免和原生的自定义内置元素相混淆。

```html
<table>
  <tr is="vue:blog-post-row"></tr>
</table>
```
