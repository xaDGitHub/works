<template>
  <article class="tile" @click="openViewer">
    <div class="pic">
      <img :src="src" :alt="title" loading="lazy" />
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