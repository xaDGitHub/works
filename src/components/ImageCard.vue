<template>
  <article class="tile" @click="openViewer">
    <div class="pic">
      <picture>
        <img
          :src="src"
          :srcset="src"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
          :alt="title"
          loading="lazy"
          decoding="async"
          fetchpriority="low"
        />
      </picture>
      <div class="caption">
        <div class="name">{{ title }}</div>
      </div>
    </div>
  </article>
</template>

<script lang="ts" setup>
const props = defineProps<{ src: string; title: string }>();
function openViewer() {
  window.__viewerOpen?.(props.src);
}
</script>