//这是在index.js;
import {createRouter, createWebHistory} from 'vue-router'

const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail')

const routes = [
  //在此处配置路由;
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  }
]
//在router4中使用createRouter替代了new VueRouter;
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
  //在此处引入所有页面的路由配置数组routes;
})

export default router
//导出包含着所有路由配置的router对象,
//在main.js中注入后供全局使用;
