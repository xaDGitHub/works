<template>
  <article class="tile" @click="openViewer">
    <div class="pic">
      <img
        :src="src"
        :alt="title"
        loading="lazy"
        decoding="async"
        fetchpriority="low"
      />
      <div class="caption">
        <div class="name">{{ title }}</div>
      </div>
    </div>
  </article>
</template>

<script lang="ts" setup>
const props = defineProps<{
  src?: string;
  title: string;
  fullSrc: string;
}>();

function openViewer() {
  const target = props.fullSrc || props.src;
  window.__viewerOpen?.(target);
}
</script>