import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Restaurant from '../pages/Restaurant.vue'
import User from '../pages/User.vue'
import Main from '../pages/Main.vue'

const routes = [
  {
    path: '/Home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/Main',
    name: 'Main',
    component: Main,
  },
  {
    path: '/restaurant',
    name: 'Restaurant',
    component: Restaurant,
  },
  {
    path: '/user',
    name: 'User',
    component: User,
  },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
