<!-- src/components/ProjectCard.vue -->
<template>
  <article class="card">
    <h2>
      <span>{{ project.displayName || projectKey }}</span>
      <span class="tag">{{ projectKey }}</span>
    </h2>
    <div class="thumb" @click="goProject">
      <img
        v-if="firstSrc"
        :src="firstSrc"
        :alt="project.displayName || projectKey"
        loading="lazy"
        decoding="async"
        fetchpriority="low"
      />
    </div>
    <div class="actions">
      <div class="description">{{ project.description }}</div>
      <button class="btn" @click="goProject">进入项目</button>
    </div>
  </article>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import type { ProjectItem, ImageItem } from '../data/data';
import { sortImages, imageSrc } from '../data/data';

const props = defineProps<{ projectKey: string; project: ProjectItem }>();
const router = useRouter();

// 取第一张图片（按 order 排序后取第一个）
const firstImage = computed<ImageItem | null>(() => {
  const sorted = sortImages(props.project.images || []);
  return sorted.length ? sorted[0] : null;
});

// 优先使用预览图；没有预览图则自动回退到原图
const firstSrc = computed(() => {
  return firstImage.value ? imageSrc(props.projectKey, firstImage.value, 'preview') : '';
});

function goProject() {
  router.push({ name: 'project', params: { key: props.projectKey } });
}
</script>