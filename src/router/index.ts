import { createRouter, createWebHistory } from 'vue-router'

const Login = () => import('@/views/login/index.vue')
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect:'/login',
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }

  ]
})

export default router
