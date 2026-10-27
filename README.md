# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

## 季度汇报页面

- 汇报源文件：[public/2026-q3/index.html](./public/2026-q3/index.html)。
- 发布地址：<https://xadgithub.github.io/works/2026-q3/>。
- 该页面通过静态目录提供，不使用 Vue 的 hash 路由；直接打开或刷新均不依赖 SPA 路由回退。访问不带结尾斜杠的 `/works/2026-q3` 时，GitHub Pages 会跳转到目录地址。
- Vite 构建时会将页面复制到 `dist/2026-q3/index.html`，保持汇报页自身的样式与章节锚点独立。
- 演示稿共 9 屏，讲解提示合计 5 分钟；表单案例图片保存在 [public/2026-q3/images](./public/2026-q3/images/)，随页面一并发布，支持切换截图与打开大图。
- 左侧画廊统一提供 PC 前台、PC 预览、PC 配置、01 需求、02 方案、04 审查六种截图，支持切换和点击查看原图；右侧保留业务需求和完整五步流程，步骤 01、02、04 的“查看截图”入口可切换画廊并将焦点移至对应按钮。移动端会滚动到画廊。“人的作用”页中的人工确认流程纵向居中排列，箭头依次连接需求确认、方案确认与 AI 实现。
- 案例屏恢复步骤间距，并按窗口高度限制画廊高度，不通过隐藏滚动条裁切内容。移动端仍允许屏内滚动。
- 案例简述“接到需求 → Spec 确认 → 设计开发 → 审查验证 → 发布回写”的体系使用流程，区分人工沟通、取舍与发布确认和 AI 辅助执行；发布按项目流程，不宣称全自动上线。三张截图均为 PC 端，支持打开大图；截图不用于季度数据统计，测试记录也不代表全部真店验收完成。本地开发时使用 `/2026-q3/index.html`，避免 Vite 开发服务器将目录地址回退到作品集首页。

## 发布到 GitHub Pages

```sh
npm run deploy
```

`predeploy` 会先自动构建，再将 `dist` 发布到 `gh-pages` 分支。GitHub Pages 的发布来源需保持为该分支的根目录；推送源码分支本身不会触发此发布命令。
