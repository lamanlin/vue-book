import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
import Add from '../components/Add.vue'
import Home from '../components/Home.vue';
import Cart from '../components/Cart.vue';
import Detail from '../components/Detail.vue';
import List from '../components/List.vue';
export default new Router({
  routes: [{
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home,
      meta: {
        keepAlive: true,
        title: '首页'
      }
    },
    {
      path: '/cart',
      component: Cart,
       meta: {
         title: '购物车'
       }
    },
    {
      path: '/add',
      component: Add,
      meta: {
        title: '添加'
      }
    },
    // /detail/1  {bid:1} 路径参数 必须有但是可以随机
    {
      path: '/detail/:bid',
      component: Detail,
      name: 'detail'
    },
    {
      path: '/list',
      component: List
    },
    {
      path: '*',
      redirect: '/home'
    },
  ]
})
