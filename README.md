# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

## 季度汇报页面

- 汇报源文件：[public/2026-q3/index.html](./public/2026-q3/index.html)。
- 发布地址：<https://xadgithub.github.io/works/2026-q3/>。
- 该页面通过静态目录提供，不使用 Vue 的 hash 路由；直接打开或刷新均不依赖 SPA 路由回退。访问不带结尾斜杠的 `/works/2026-q3` 时，GitHub Pages 会跳转到目录地址。
- Vite 构建时会将页面复制到 `dist/2026-q3/index.html`，保持汇报页自身的样式与章节锚点独立。

## 发布到 GitHub Pages

```sh
npm run deploy
```

`predeploy` 会先自动构建，再将 `dist` 发布到 `gh-pages` 分支。GitHub Pages 的发布来源需保持为该分支的根目录；推送源码分支本身不会触发此发布命令。
