## 计算属性知识点
1. Getter 不应有副作用
计算属性的 getter 应只做计算而没有任何其他的副作用。比如异步请求，操作 dom 。

2. 避免直接修改计算属性值
计算属性的返回值应该被视为只读的，并且永远不应该被更改——应该更新它所依赖的源状态以触发新的计算。

## 条件渲染
1. 当 `v-if` 和 `v-for` 一起使用时，`v-if` 的优先级更高。

## 条件渲染
1. `v-for` 中可以使用解构

```
<li v-for="{ message } in items">
  {{ message }}
</li>

<!-- 有 index 索引时 -->
<li v-for="({ message }, index) in items">
  {{ message }} {{ index }}
</li>
```

2. 可以使用 `of` 代替 `in`。

```
<div v-for="item of items"></div>
```

3. 遍历对象时

```
<li v-for="(value, key, index) in myObject">
  {{ index }}. {{ key }}: {{ value }}
</li>
```

4. 通过 `key` 管理状态，但是只适用于列表渲染输出的结果不依赖子组件状态或者临时 DOM 状态 (例如表单输入值) 的情况。不要用对象作为 `key` 。

## 事件处理

1. 使用修饰符时需要注意调用顺序，因为相关代码是以相同的顺序生成的。因此使用 `@click.prevent.self` 会阻止**元素及其子元素的所有点击事件的默认行为，**而 `@click.self.prevent` 则只会阻止对元素本身的点击事件的默认行为。

2. 请勿同时使用 `.passive` 和 `.prevent`，因为 `.passive` 已经向浏览器表明了你不想阻止事件的默认行为。如果你这么做了，则 `.prevent` 会被忽略，并且浏览器会抛出警告。

3. `true-value` 和 `false-value` 是 Vue 特有的 attributes，仅支持和 `v-model` 配套使用。这里 `toggle` 属性的值会在选中时被设为 'yes'，取消选择时设为 'no'。你同样可以通过 `v-bind` 将其绑定为其他动态值。

```
<input
  type="checkbox"
  v-model="toggle"
  true-value="yes"
  false-value="no"
/>
```

