import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// mode: 'history',
// base: process.env.BASE_URL,

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/',
      component:resolve => require(['./components/common/Home.vue'],resolve),
      meta:{title:'自述文件'},
      children:[
        {
          path: '/dashboard',
          component: resolve => require(['./components/page/Dashboard.vue'], resolve),
          meta: { title: '系统首页' }
        },
        {
          path: '/table',
          // component: resolve => require(['./components/page/BaseTable.vue'], resolve),
          // meta: { title: '数据管理' },
          redirect:'/userlist'
        },
        {
          path: '/userlist',
          component: resolve => require(['./components/page/UserList.vue'], resolve),
          meta: { title: '会员列表' }
        },
        {
          path: '/shoplist',
          component: resolve => require(['./components/page/ShopList.vue'], resolve),
          meta: { title: '商家列表' }
        },
        {
          path: '/goodslist',
          component: resolve => require(['./components/page/GoodsList.vue'], resolve),
          meta: { title: '商品列表' }
        },
        {
          path: '/orderlist',
          component: resolve => require(['./components/page/OrderList.vue'], resolve),
          meta: { title: '订单用户列表' }
        },
        {
          path:'/addshop',
          component:resolve => require(['./components/page/AddShop.vue'],resolve),
          meta:{ title:'添加商铺' }
        },
        {
          path:'/addgoods',
          component:resolve => require(['./components/page/AddGoods.vue'],resolve),
          meta:{ title:'添加商品' }
        },
        {
          path:'/usercharts',
          component:resolve => require(['./components/page/UserCharts.vue'],resolve),
          meta:{ title:'用户分布' }
        },
        {
          path:'/permission',
          component:resolve => require(['./components/page/Permission.vue'],resolve),
          meta:{ title:'权限测试',permission:true }
        },
        {
          path:'/tabs',
          component:resolve => require(['./components/page/Tabs.vue'],resolve),
          meta:{ title:'消息列表' }
        },
        {
          path:'/404',
          component:resolve => require(['./components/page/404.vue'],resolve),
          meta:{ title:'404页面' }
        },
        {
          path:'/403',
          component:resolve => require(['./components/page/403.vue'],resolve),
          meta:{ title:'403页面' }
        },
      ]
    },
    {
      path:'/login',
      component:resolve => require(['./components/page/Login.vue'],resolve)
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
