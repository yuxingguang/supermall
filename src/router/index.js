import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = ()=>import('../views/Home/Home');
const Cart = ()=>import('../views/Cart/Cart');
const Category = ()=>import('../views/Category/Category');
const Profile = ()=>import('../views/Profile/Profile');
const Detail = ()=>import('../views/Detail/Detail');

Vue.use(VueRouter);

const routes = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path: '/home',
    component:Home
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/profile',
    component:Profile
  },
  {
    path:'/detail/:iid',
    component:Detail
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router
