import { createRouter, createWebHashHistory } from 'vue-router'

/* Layout */
import Layout from '@/layout'

// import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: ()=> import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard'}
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '@/views/login/index.vue')
  },
  {
    path: '/reg',
    name: 'reg',
    component: () => import(/* webpackChunkName: "about" */ '@/views/login/reg.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
