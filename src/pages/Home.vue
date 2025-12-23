<template>
  <section class="section">
    <div class="home-grid">
      <ProjectCard
        v-for="([k,p]) in sortedProjects"
        :key="k"
        :projectKey="k"
        :project="p"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { PORTFOLIO, sortProjects } from '../data/data';
import ProjectCard from '../components/ProjectCard.vue';

const sortedProjects = computed(() => sortProjects(Object.entries(PORTFOLIO.projects)));
</script>