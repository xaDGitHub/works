import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Project from '../pages/Project.vue';
import Search from '../pages/Search.vue';

export default createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL), // 本地= '/', 生产='/works/'
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/project/:key', name: 'project', component: Project, props: true },
    { path: '/search', name: 'search', component: Search },
  ],
  scrollBehavior: () => ({ top: 0 }),
});