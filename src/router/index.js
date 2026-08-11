import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/',         component: () => import('../views/DashboardView.vue') },
    { path: '/products', component: () => import('../views/ProductsView.vue')  },
    { path: '/:any(.*)', redirect: '/' },
  ],
})
