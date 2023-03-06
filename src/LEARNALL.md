# 问题

1. vue 组件最多可以包含几个顶层`template`以及`<script>`?

- 每个 `\*.vue` 文件最多可以包含一个顶层 `<template>` 块。
- 每个 `*.vue` 文件最多可以包含一个 `<script>` 块。`<script>` 可以和 `<script setup>` 同时存在，这样 `<script>`就不是在该组件执行了，而且在根组件执行。

2. 说出两个本地开发的性能监测工具?

- app.config.performance 将会开启 Vue 特有的性能标记，标记在 Chrome 开发者工具的性能时间线上
- Vue 开发者扩展也提供了性能分析的功能

3. 说 5 个前端优化方式

- 包体积
- 代码分割
- 优化图片
- 延迟加载图片和视频
- 优化 JavaScript
- 优化资源交付
- 优化 CSS
- 优化第三方资源
- 优化网络字体

4.