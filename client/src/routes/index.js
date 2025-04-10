import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';

const routes = [
  // {
  //   path: '/login',
  //   component: () => import('@/pages/login.vue'),
  // },
  // {
  //   path: '/',
  //   redirect: '/home',
  //   children: [
  //     {
  //       path: '/home',
  //       name: 'home',
  //       component: () => import('@/pages/home/readToday/index.vue'),
  //       meta: {
  //         keepAlive: true,
  //       },
  //     },
  //     {
  //       path: '/library',
  //       name: 'library',
  //       component: () => import('@/pages/home/readLibrary/index.vue'),
  //       meta: {
  //         keepAlive: true,
  //       },
  //     },
  //     {
  //       path: '/new-words',
  //       name: 'new-words',
  //       component: () => import('@/pages/home/wordsNew/index.vue'),
  //       meta: {
  //         keepAlive: true,
  //       },
  //     },
  //   ],
  // },
  {
    name: 'home',
    path: '/home',
    component: () => import('@/pages/index.vue'),
  },
  {
    name: 'test',
    path: '/test',
    component: () => import('@/pages/test.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
