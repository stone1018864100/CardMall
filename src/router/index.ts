import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/components/layout/AppLayout.vue'),
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/pages/Home.vue'),
          meta: { title: '首页' },
        },
        {
          path: 'products',
          name: 'Products',
          component: () => import('@/pages/Products.vue'),
          meta: { title: '商品中心' },
        },
        {
          path: 'products/:id',
          name: 'ProductDetail',
          component: () => import('@/pages/ProductDetail.vue'),
          meta: { title: '商品详情' },
        },
        {
          path: 'cart',
          name: 'Cart',
          component: () => import('@/pages/Cart.vue'),
          meta: { title: '购物车' },
        },
        {
          path: 'checkout',
          name: 'Checkout',
          component: () => import('@/pages/Checkout.vue'),
          meta: { title: '确认订单' },
        },
        {
          path: 'orders',
          name: 'OrderList',
          component: () => import('@/pages/OrderList.vue'),
          meta: { title: '我的订单' },
        },
        {
          path: 'orders/success/:id',
          name: 'OrderSuccess',
          component: () => import('@/pages/OrderSuccess.vue'),
          meta: { title: '支付成功' },
        },
        {
          path: 'orders/:id',
          name: 'OrderDetail',
          component: () => import('@/pages/OrderDetail.vue'),
          meta: { title: '订单详情' },
        },
        {
          path: 'order-lookup',
          name: 'OrderLookup',
          component: () => import('@/pages/OrderLookup.vue'),
          meta: { title: '订单查询' },
        },
        {
          path: 'news',
          name: 'News',
          component: () => import('@/pages/News.vue'),
          meta: { title: '新闻资讯' },
        },
        {
          path: 'news/:id',
          name: 'NewsDetail',
          component: () => import('@/pages/NewsDetail.vue'),
          meta: { title: '文章详情' },
        },
        {
          path: 'help',
          name: 'Help',
          component: () => import('@/pages/Help.vue'),
          meta: { title: '帮助中心' },
        },
        {
          path: 'user',
          name: 'UserCenter',
          component: () => import('@/pages/UserCenter.vue'),
          meta: { title: '个人中心' },
        },
      ],
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/pages/Login.vue'),
      meta: { title: '登录' },
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/pages/Register.vue'),
      meta: { title: '注册' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/pages/Home.vue'),
      meta: { title: '页面不存在' },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

// Update document title
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title || 'CardMall'} - 自助发卡商城`
  next()
})

export default router
