import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Restaurant from '../pages/Restaurant.vue'
import User from '../pages/User.vue'
import Login from '../pages/Login.vue'
import OtherUsers from '@/pages/OtherUsers.vue'
import Cookies from 'js-cookie'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { public: true, hideHeader: true },
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
    path: '/user/:id',
    name: 'OtherUsers',
    component: OtherUsers,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = Cookies.get('token')
  const isPublic = to.meta.public
  if (isPublic) {
    return next()
  }

  if (!token) {
    return next({ path: '/' })
  }

  next()
})

export { router }
