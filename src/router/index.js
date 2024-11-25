import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import EntryView from '../views/EntryView.vue';
import ExitView from '../views/ExitView.vue';
import ParkingConfigurationView from '../views/ParkingConfigurationView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  { path: '/entry', name: 'Entry', component: EntryView },
  { path: '/exit', name: 'Exit', component: ExitView },
  { path: '/configuration', name: 'Configuration', component: ParkingConfigurationView },
  
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
