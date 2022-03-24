import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import pinia, { useUserStore } from '../store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "Register" */ '../views/Register.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "Dashboard" */ '../views/Dashboard.vue'),
    beforeEnter:(to, from) => {
      const userStore = useUserStore(pinia);
      if (!userStore.isLoggedIn && to.name !== 'Login') {
        return { name: 'Login' }
      }
    },
  },
  {
    path: '/:pathMatch(.*)*', 
    name: 'NotFound', 
    component: () => import(/* webpackChunkName: "NotFound" */ '../views/NotFound.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
