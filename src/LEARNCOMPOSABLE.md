# 逻辑复用

## 组合式函数

1. mixins 缺点
   - 不清晰的数据来源
   - 命名空间冲突
   - 隐式的跨 mixin 交流

## 自定义指令

1. 指令钩子

```javascript
const myDirective = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode, prevVnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode, prevVnode) {},
};
```

2. 简化形式，函数写法，自动在 `mounted` `updated`，上调用

```javascript
app.directive("color", (el, binding) => {
  // 这会在 `mounted` 和 `updated` 时都调用
  el.style.color = binding.value;
});
```

3. 当在组件上使用自定义指令时，它会始终应用于组件的根节点，和透传 `attributes` 类似。当应用到一个多根组件时，指令将会被忽略且抛出一个警告。和 `attribute` 不同，指令不能通过 `v-bind="$attrs"` 来传递给一个不同的元素。不推荐在组件上使用自定义指令。

## transition

1. 触发条件

   - `v-if`触发
   - `v-show`触发
   - 由特殊元素 `<component>` 切换的动态组件

2. `<Transition>` 仅支持单个元素或组件作为其插槽内容。如果内容是一个组件，这个组件必须仅有一个根元素。

3. CSS 过渡 class 有六个

   - `v-enter-from`：进入动画的起始状态。在元素插入之前添加，在元素插入完成后的下一帧移除。
   - `v-enter-active`：进入动画的生效状态。应用于整个进入动画阶段。在元素被插入之前添加，在过渡或动画完成之后移除。这个 class 可以被用来定义进入动画的持续时间、延迟与速度曲线类型。
   - `v-enter-to`：进入动画的结束状态。在元素插入完成后的下一帧被添加 (也就是 `v-enter-from` 被移除的同时)，在过渡或动画完成之后移除。
   - `v-leave-from`：离开动画的起始状态。在离开过渡效果被触发时立即添加，在一帧后被移除。
   - `v-leave-active`：离开动画的生效状态。应用于整个离开动画阶段。在离开过渡效果被触发时立即添加，在过渡或动画完成之后移除。这个 class 可以被用来定义离开动画的持续时间、延迟与速度曲线类型。
   - `v-leave-to`：离开动画的结束状态。在一个离开动画被触发后的下一帧被添加 (也就是 `v-leave-from` 被移除的同时)，在过渡或动画完成之后移除。

4. 原生 CSS 动画和 CSS transition 的应用方式基本上是相同的，只有一点不同，那就是 `*-enter-from` 不是在元素插入后立即移除，而是在一个 `animationend` 事件触发时被移除。

5. `:css="false"` ，这显式地向 Vue 表明可以跳过对 CSS 过渡的自动探测。这种情况下对于 `@enter` 和 `@leave` 钩子来说，回调函数 `done` 就是必须的。否则，钩子将被同步调用，过渡将立即完成。

6. 初次渲染时过渡，添加 `appear`

7. 想要先执行离开动画，然后在其完成之后再执行元素的进入动画添加 `mode="out-in"`。
