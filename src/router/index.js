import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Restaurant from '../pages/Restaurant.vue'
import User from '../pages/User.vue'
import Login from '../pages/Login.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { hideHeader: true },
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/restaurant/:id',
    name: 'Restaurant',
    component: Restaurant,
  },
  {
    path: '/user',
    name: 'User',
    component: User,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
