<template>
  <section class="section">
    <div class="scene-header">
      <div class="scene-title">搜索：“{{ q }}” 的结果</div>
    </div>
    <div v-if="!results.length" class="empty">未找到匹配图片</div>
    <div v-else class="tiles-grid">
      <ImageCard
        v-for="item in results"
        :key="item.key + '_' + item.im.file"
        :src="assetUrl(item.key, item.im.file)"
        :title="item.im.title || item.im.file"
      />
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