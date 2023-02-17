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
  传给 defineProps() 的泛型参数必须是以下之一： 1. 一个类型字面量 `defineProps<{ /*... */ }>()` 2. 同一个文件中的一个接口或对象类型字面量引用 `interface Props {/* ... */} defineProps<Props>() ` 3. 传递给 defineProps 的泛型参数本身不能是一个导入的类型
