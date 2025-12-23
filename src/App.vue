<template>
  <header class="site-header">
    <div class="wrap">
      <div class="topbar">
        <div class="title">作品集</div>
        <div class="flex-fill"></div>
        <div class="control">
          <template v-if="$route.name==='home'">
            <select v-model="projectKey" class="select" title="项目筛选" @change="goProject">
              <option value="">全部项目</option>
              <option v-for="(proj, key) in projects" :key="key" :value="key">
                {{ proj.displayName || key }}
              </option>
            </select>
            <input v-model="keyword" class="input" placeholder="搜索图片（按中文名）" @keydown.enter="goSearch"/>
            <button class="btn" @click="goSearch">搜索</button>
          </template>
          <template v-else-if="$route.name==='project'">
            <input v-model="projKeyword" class="input" placeholder="在本项目内按中文名搜索" @keydown.enter="emitProjSearch"/>
            <button class="btn" @click="emitProjSearch">搜索</button>
          </template>
        </div>
      </div>
    </div>
  </header>

  <main class="wrap">
    <router-view />
  </main>

  <Viewer ref="viewerRef" />
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { PORTFOLIO } from './data/data';
import Viewer from './components/Viewer.vue';

const router = useRouter();
const route = useRoute();

const projects = PORTFOLIO.projects;
const projectKey = ref('');
const keyword = ref('');
const projKeyword = ref('');
const viewerRef = ref<InstanceType<typeof Viewer> | null>(null);

// 全局暴露查看器（给卡片用）
declare global {
  interface Window { __viewerOpen?: (src: string) => void }
}
window.__viewerOpen = (src: string) => viewerRef.value?.open(src);

function goProject() {
  if (projectKey.value) {
    router.push({ name: 'project', params: { key: projectKey.value } });
  } else {
    router.push({ name: 'home' });
  }
}
function goSearch() {
  const q = keyword.value.trim();
  if (q) router.push({ name: 'search', query: { q } });
  else router.push({ name: 'home' });
}

// 项目页内部过滤通过事件派发给 Project.vue
function emitProjSearch() {
  window.dispatchEvent(new CustomEvent('proj-search', { detail: projKeyword.value.trim() }));
}
</script>