<template>
  <header class="site-header">
    <div class="wrap">
      <div class="topbar">
        <div class="title">温泽灿作品集</div>
        <div class="flex-fill"></div>
        <div class="control">
          <!-- 始终显示的全局控件 -->
          <select
            v-model="projectKey"
            class="select"
            title="项目筛选"
            @change="goProject"
          >
            <option value="">全部项目</option>
            <option
              v-for="(proj, key) in projects"
              :key="key"
              :value="key"
            >
              {{ proj.displayName || key }}
            </option>
          </select>

          <input
            v-model="keyword"
            class="input"
            placeholder="搜索图片（按中文名）"
            @keydown.enter="goSearch"
          />
          <button class="btn" @click="goSearch">搜索</button>
          <template v-if="$route.name !='home'">
            <button class="btn" @click="goHome" title="返回首页">返回首页</button>
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
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { PORTFOLIO } from './data/data';
import Viewer from './components/Viewer.vue';

const router = useRouter();
const route = useRoute();

const projects = PORTFOLIO.projects;

// 下拉框值与当前页面同步
const projectKey = ref<string>('');
const keyword = ref<string>('');
const viewerRef = ref<InstanceType<typeof Viewer> | null>(null);

// 全局暴露查看器（给卡片用）
declare global {
  interface Window { __viewerOpen?: (src: string) => void }
}
window.__viewerOpen = (src: string) => viewerRef.value?.open(src);

// 路由变更时同步下拉框的值：项目页为当前 key，其它页为空
function syncProjectKeyFromRoute() {
  if (route.name === 'project' && typeof route.params.key === 'string') {
    projectKey.value = route.params.key;
  } else {
    projectKey.value = '';
  }
}

onMounted(syncProjectKeyFromRoute);
watch(
  () => ({ name: route.name, key: route.params.key }),
  () => syncProjectKeyFromRoute(),
  { immediate: true }
);

// 交互：选择项目或全部项目
function goProject() {
  const key = projectKey.value.trim();
  if (key) {
    router.push({ name: 'project', params: { key } });
  } else {
    router.push({ name: 'home' });
  }
}

// 全局搜索
function goSearch() {
  const q = keyword.value.trim();
  if (q) router.push({ name: 'search', query: { q } });
  else router.push({ name: 'home' });
}

// 返回首页
function goHome() {
  router.push({ name: 'home' });
}
</script>