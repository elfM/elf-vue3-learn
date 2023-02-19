# 深入组件

## 注册

1. 全局注册
   没有被使用的组件无法在生产打包时被自动移除

2. 局部注册
   使组件之间的依赖关系更加明确，并且对 tree-shaking 更加友好

## props

1. 为组件的 props 标注类型

- 运行时申明

```javascript
<script setup lang="ts">
const props = defineProps({
  foo: { type: String, required: true },
  bar: Number
})

props.foo // string
props.bar // number | undefined
</script>
```

- 基于类型的声明

```javascript
<script setup lang="ts">
const props = defineProps<{
  foo: string
  bar?: number
}>()
</script>
```

- 语法限制
  传给 defineProps() 的泛型参数必须是以下之一：
  1. 一个类型字面量 `defineProps<{ /*... */ }>()`。
  2. 同一个文件中的一个接口或对象类型字面量引用 `interface Props {/* ... */} defineProps<Props>() `。
  3. 传递给 defineProps 的泛型参数本身不能是一个导入的类型。

- 一个对象绑定多个 prop
```html
<script>
const post = {
  id: 1,
  title: 'My Journey with Vue'
}
</script>
<BlogPost v-bind="post" />
<!-- 等价于 -->
<BlogPost :id="post.id" :title="post.title" />
```

- 单项数据传递，子组件不应该修改 `props`

- `defineProps()` 宏中的参数不可以访问 `<script setup>` 中定义的其他变量，因为在编译时整个表达式都会被移到外部的函数中。

## 事件

- `emits` 触发事件，`v-on`监听事件

- 和原生 `DOM` 事件不一样，组件触发的事件没有冒泡机制。你只能监听直接子组件触发的事件。平级组件或是跨越多层嵌套的组件间通信，应使用一个外部的事件总线，或是使用一个全局状态管理方案。

- 声明触发事件
  1. `defineEmits` 宏不能在子函数中使用，只能在 `<script setup>` 的顶级作用域下使用。

```html
<script setup>
const emit = defineEmits(['inFocus', 'submit'])

function buttonClick() {
  emit('submit')
}
</script>

<script setup lang="ts">
// 运行时
const emit = defineEmits(['change', 'update'])

// 基于类型
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
</script>
```

- 如果一个原生事件的名字 (例如 `click`) 被定义在 `emits` 选项中，则监听器只会监听组件触发的 `click` 事件而不会再响应原生的 `click` 事件。

## v-model

- `v-model` 展开如下
```html
<CustomInput
  :modelValue="searchText"
  @update:modelValue="newValue => searchText = newValue"
/>
```

- 多个 `v-model` 绑定
```html
<UserName
  v-model:first-name="first"
  v-model:last-name="last"
/>

<script setup>
defineProps({
  firstName: String,
  lastName: String
})

defineEmits(['update:firstName', 'update:lastName'])
</script>

<template>
  <input
    type="text"
    :value="firstName"
    @input="$emit('update:firstName', $event.target.value)"
  />
  <input
    type="text"
    :value="lastName"
    @input="$emit('update:lastName', $event.target.value)"
  />
</template>
```

- `v-model` 修饰符 , `modelModifiers` 可以获取到事件修饰符的 key
```html
<script setup>
const props = defineProps({
  modelValue: String,
  modelModifiers: { default: () => ({}) }
})

const emit = defineEmits(['update:modelValue'])

function emitValue(e) {
  let value = e.target.value
  if (props.modelModifiers.capitalize) {
    value = value.charAt(0).toUpperCase() + value.slice(1)
  }
  emit('update:modelValue', value)
}
</script>

<template>
  <input type="text" :value="modelValue" @input="emitValue" />
</template>
```

- 对于又有参数又有修饰符的 `v-model` 绑定，生成的 `prop` 名将是 `arg + "Modifiers"`
```html
<MyComponent v-model:title.capitalize="myText">
```
```javascript
const props = defineProps(['title', 'titleModifiers'])
defineEmits(['update:title'])

console.log(props.titleModifiers) // { capitalize: true }
```

## attribute

- 如果一个子组件的根元素已经有了 `class` 或 `style` `attribute`，它会和从父组件上继承的值合并。也适用于 `v-on`。也会进行深层组件继承。
1. 透传的 `attribute` 不会包含组件上声明过的 `props` 或是针对 `emits` 声明事件的 `v-on` 侦听函数，换句话说，声明过的 `props` 和侦听函数被组件“消费”了。
2. 透传的 `attribute` 若符合声明，也可以作为 `props` 传入更下一级组件 。

- 禁用组件自动继承 `attribute`，设置 `inheritAttrs: false`

- 透传进来的 `attribute` 可以在模板的表达式中直接用 `$attrs` 访问到。这个 `$attrs` 对象包含了除组件所声明的 `props` 和 `emits` 之外的所有其他 `attribute`，例如 `class`，`style`，`v-on` 监听器等等。

- `v-bind="$attrs"` 可以将要继承的 `attribute` 指定到具体的元素上。

- 和单根节点组件有所不同，有着多个根节点的组件没有自动 `attribute` 透传行为，需要使用 `v-bind="$attrs"` 指定。

- 在 `<script setup>` 中可以使用 `useAttrs`，访问所有的 `attribute`, `<template>` 使用 `$attrs` 访问。

## 插槽

- 具名插槽
1. <slot> 元素可以有一个特殊的 `attribute name`，用来给各个插槽分配唯一的 ID，以确定每一处要渲染的内容。
2. 没有提供 `name` 的 `<slot>` 出口会隐式地命名为 `default` 。
3. `v-slot` 简写 `#`。
```html
<BaseLayout>
  <template v-slot:header>
    <!-- header 插槽的内容放这里 -->
  </template>
</BaseLayout>
```
4. 动态具名插槽
```html
<base-layout>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>

  <!-- 缩写为 -->
  <template #[dynamicSlotName]>
    ...
  </template>
</base-layout>
```

- 作用域插槽
```html
<!-- <MyComponent> 的模板 -->
<div>
  <slot :text="greetingMessage" :count="1"></slot>
</div>
```
```html
<MyComponent v-slot="slotProps">
  {{ slotProps.text }} {{ slotProps.count }}
</MyComponent>
```
```html
<MyComponent>
  <template #header="headerProps">
    {{ headerProps }}
  </template>

  <template #default="defaultProps">
    {{ defaultProps }}
  </template>

  <template #footer="footerProps">
    {{ footerProps }}
  </template>
</MyComponent>
```

## 依赖注入
## provide

要为组件后代提供数据，需要使用到 `provide()` 函数：
```html
<script setup>
import { provide } from 'vue'

provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
</script>
```

可以在整个应用层面提供


```javascript
import { createApp } from 'vue'

const app = createApp({})

app.provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
```

## inject

要注入上层组件提供的数据，需使用 `inject()` 函数
```html
<script setup>
import { inject } from 'vue'

const message = inject('message')
</script>
```
如果提供的值是一个 `ref`，注入进来的会是该 `ref` 对象，而不会自动解包为其内部的值。这使得注入方组件能够通过 `ref` 对象保持了和供给方的响应性链接。

当提供 / 注入响应式的数据时，建议尽可能将任何对响应式状态的变更都保持在供给方组件中。这样可以确保所提供状态的声明和变更操作都内聚在同一个组件内，使其更容易维护。

```html
<!-- 在供给方组件内 -->
<script setup>
import { provide, ref } from 'vue'

const location = ref('North Pole')

function updateLocation() {
  location.value = 'South Pole'
}

provide('location', {
  location,
  updateLocation
})
</script>
```

## 异步组件

- 用法
```javascript
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    // ...从服务器获取组件
    resolve(/* 获取到的组件 */)
  })
})
// ... 像使用其他一般组件一样使用 `AsyncComp`
```


