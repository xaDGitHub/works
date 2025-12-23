import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Project from '../pages/Project.vue';
import Search from '../pages/Search.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/project/:key', name: 'project', component: Project, props: true },
    { path: '/search', name: 'search', component: Search }
  ],
  scrollBehavior() {
    return { top: 0 };
  }
});