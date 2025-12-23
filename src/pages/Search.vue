<!-- src/pages/Search.vue -->
<template>
  <section class="section">
    <!-- 新增：面包屑 -->
    <nav class="breadcrumb enhanced">
      <router-link to="/">主页</router-link>
      <span class="sep">/</span>
      <span class="current">搜索结果</span>
    </nav>

    <div class="scene-header">
      <div class="scene-title">搜索：“{{ q }}” 的结果</div>
    </div>

    <div v-if="!results.length" class="empty">
      未找到匹配图片
      <!-- 提供返回首页入口 -->
      <div style="margin-top:12px;">
        <router-link class="btn" to="/">返回首页</router-link>
      </div>
    </div>

    <div v-else class="tiles-grid">
      <article v-for="item in results" :key="item.key + '_' + item.im.file" class="tile">
        <div class="pic">
          <img :src="assetUrl(item.key, item.im.file)" :alt="item.im.title || item.im.file" loading="lazy"/>
          <div class="caption"><div class="name">{{ item.im.title || item.im.file }}</div></div>
        </div>
      </article>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { PORTFOLIO, assetUrl } from '../data/data';
import ImageCard from '../components/ImageCard.vue';

const route = useRoute();
const q = computed(() => (route.query.q as string || '').trim());

const results = computed(() => {
  const keyword = q.value.toLowerCase();
  if (!keyword) return [];
  const list: { key: string; im: { order?: number; file: string; title?: string } }[] = [];
  Object.keys(PORTFOLIO.projects).forEach(key => {
    (PORTFOLIO.projects[key].images || []).forEach(im => {
      const cn = (im.title || '').toLowerCase();
      if (cn.includes(keyword)) list.push({ key, im });
    });
  });
  list.sort((a, b) => {
    const pa = (PORTFOLIO.projects[a.key]?.order ?? 9999);
    const pb = (PORTFOLIO.projects[b.key]?.order ?? 9999);
    const ia = (a.im.order ?? 9999);
    const ib = (b.im.order ?? 9999);
    return (pa - pb) || (ia - ib);
  });
  return list;
});
</script>