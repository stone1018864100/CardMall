<script setup lang="ts">
const currentYear = new Date().getFullYear()

const links = {
  products: [
    { name: '游戏点卡', path: '/products?category=game' },
    { name: '软件激活', path: '/products?category=software' },
    { name: '会员订阅', path: '/products?category=membership' },
    { name: '优惠券', path: '/products?category=coupon' },
  ],
  support: [
    { name: '帮助中心', path: '/help' },
    { name: '订单查询', path: '/order-lookup' },
    { name: '新闻资讯', path: '/news' },
    { name: '关于我们', path: '/about' },
  ],
  contact: [
    { name: '邮箱：support@cardmall.com', icon: '📧' },
    { name: 'QQ群：123456789', icon: '💬' },
    { name: 'Telegram：@cardmall', icon: '📱' },
  ],
}
</script>

<template>
  <footer class="bg-white dark:bg-dark-900 border-t border-gray-200 dark:border-dark-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Brand -->
        <div>
          <div class="flex items-center gap-2 mb-4">
            <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">C</span>
            </div>
            <span class="text-xl font-bold text-gray-900 dark:text-white">CardMall</span>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
            专业自助发卡平台，为您提供安全、快捷的数字商品购买体验。
          </p>
          <div class="flex items-center gap-2">
            <span class="badge-success text-xs">自动发货</span>
            <span class="badge-primary text-xs">安全支付</span>
          </div>
        </div>

        <!-- Products -->
        <div>
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">商品分类</h3>
          <ul class="space-y-2">
            <li v-for="link in links.products" :key="link.path">
              <router-link
                :to="link.path"
                class="text-sm text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
              >
                {{ link.name }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Support -->
        <div>
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">帮助支持</h3>
          <ul class="space-y-2">
            <li v-for="link in links.support" :key="link.path">
              <router-link
                :to="link.path"
                class="text-sm text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
              >
                {{ link.name }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">联系我们</h3>
          <ul class="space-y-2">
            <li v-for="link in links.contact" :key="link.name" class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span>{{ link.icon }}</span>
              <span>{{ link.name }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom -->
      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-dark-700">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <p class="text-sm text-gray-500 dark:text-gray-400">
            © {{ currentYear }} CardMall. All rights reserved.
          </p>
          <div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <a href="#" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">隐私政策</a>
            <span>·</span>
            <a href="#" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">服务条款</a>
            <span>·</span>
            <a href="#" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">ICP备案号</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
