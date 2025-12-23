<template>
  <nav class="breadcrumb enhanced">
    <router-link to="/">主页</router-link>
    <span class="sep">/</span>
    <span class="current">{{ currentName }}</span>
  </nav>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { PORTFOLIO } from '../data/data';

const route = useRoute();
const currentName = computed(() => {
  const key = route.params.key as string | undefined;
  if (!key) return '项目';
  return PORTFOLIO.projects[key]?.displayName || key;
});
</script>