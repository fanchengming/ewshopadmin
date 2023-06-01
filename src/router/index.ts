import { createRouter, createWebHistory } from 'vue-router'

const Login = () => import('@/views/login/index.vue')
const Home = () => import('@/views/Home.vue')
import dashboard from './modules/dashboard'

const routes = [
  {
    path: '/',
    redirect:'/login',
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
            title: '登录'
          }
  } 
]

const baseRoutes = [...routes,...dashboard]
console.log(baseRoutes)

const router = createRouter({
  history: createWebHistory(),
  routes:baseRoutes
})

export default router

router.beforeEach((to,from,next) => {
  console.log(to,from);
  console.log(to.meta.title);
  document.title = (to?.meta?.title) || document.title;
  if(to.name !== 'login'){
    // 判断是否登录
    if(localStorage.getItem('token')){
      next()
    }else{
      next('/login')
    }
  }else {
    next();
  }
})
