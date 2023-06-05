import { createRouter, createWebHistory } from 'vue-router'

const Login = () => import('@/views/login/index.vue')
const Home = () => import('@/views/Home.vue')
import dashboard from './modules/dashboard'
const modules = import.meta.globEager('./modules/**/*.ts');
const routeModuleList: RouteRecordRaw[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod)?[...mod] : [mod];
  routeModuleList.push(...modList);
})

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

const baseRoutes = [...routes,...routeModuleList]

const router = createRouter({
  history: createWebHistory(),
  routes:baseRoutes
})

router.beforeEach((to,from,next) => {
  console.log(to.meta.title);
  document.title = (to?.meta?.title) || document.title;
  if(to.name !== 'login'){
    // 判断是否登录
    if(!localStorage.getItem('token')){
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }else{
      next()
    }
  }else {
    next();
  }
})

export {routeModuleList}
export default router