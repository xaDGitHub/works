<template>
  <section class="section">
    <SiteBreadcrumb />
    <div class="tiles-grid">
      <ImageCard
        v-for="im in sortedImages"
        :key="im.file"
        :src="assetUrl(projectKey, im.file)"
        :title="im.title || im.file"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { PORTFOLIO, sortImages, assetUrl } from '../data/data';
import SiteBreadcrumb from '../components/SiteBreadcrumb.vue';
import ImageCard from '../components/ImageCard.vue';

const route = useRoute();
const projectKey = route.params.key as string;

const project = PORTFOLIO.projects[projectKey];
const sortedImages = computed(() => sortImages(project?.images || []));

// 项目页内搜索：监听来自 App 的事件
window.addEventListener('proj-search', (e: Event) => {
  const kw = (e as CustomEvent<string>).detail.toLowerCase();
  const cards = document.querySelectorAll<HTMLElement>('.tile');
  const imgs = sortImages(project?.images || []);
  cards.forEach((card, i) => {
    const title = (imgs[i]?.title || '').toLowerCase();
    card.style.display = kw ? (title.includes(kw) ? '' : 'none') : '';
  });
});
</script>