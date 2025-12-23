<!-- src/components/ProjectCard.vue -->
<template>
  <article class="card">
    <h2>
      <span>{{ project.displayName || projectKey }}</span>
      <span class="tag">{{ projectKey }}</span>
    </h2>
    <div class="thumb">
      <img v-if="firstSrc" :src="firstSrc" :alt="project.displayName || projectKey" loading="lazy" />
    </div>
    <div class="actions">
      <button class="btn" @click="goProject">进入项目</button>
    </div>
  </article>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import type { ProjectItem } from '../data/data';
import { sortImages, assetUrl } from '../data/data';

const props = defineProps<{ projectKey: string; project: ProjectItem }>();
const router = useRouter();

const firstSrc = computed(() => {
  const sorted = sortImages(props.project.images);
  return sorted[0] ? assetUrl(props.projectKey, sorted[0].file) : '';
});

function goProject() {
  router.push({ name: 'project', params: { key: props.projectKey } });
}
</script>