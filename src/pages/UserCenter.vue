<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore, useFavoriteStore, useOrderStore } from '@/stores'
import { useToast } from '@/composables'

const router = useRouter()
const userStore = useUserStore()
const favoriteStore = useFavoriteStore()
const orderStore = useOrderStore()
const toast = useToast()

const isLoggedIn = computed(() => userStore.isLoggedIn)
const user = computed(() => userStore.user)
const favoriteCount = computed(() => favoriteStore.count)
const orderCount = computed(() => orderStore.orders.length)
const pendingOrderCount = computed(() => orderStore.pendingOrders.length)

const menuItems = [
  {
    icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>`,
    title: '我的订单',
    subtitle: '查看所有订单',
    badge: pendingOrderCount.value > 0 ? pendingOrderCount.value : null,
    action: () => router.push('/orders'),
  },
  {
    icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>`,
    title: '我的收藏',
    subtitle: `${favoriteCount} 件商品`,
    action: () => router.push('/favorites'),
  },
  {
    icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
    </svg>`,
    title: '我的优惠券',
    subtitle: '查看可用优惠券',
    action: () => toast.info('优惠券功能开发中'),
  },
  {
    icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>`,
    title: '消息通知',
    subtitle: '查看系统通知',
    action: () => toast.info('消息功能开发中'),
  },
  {
    icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>`,
    title: '账号安全',
    subtitle: '修改密码等设置',
    action: () => toast.info('安全设置功能开发中'),
  },
  {
    icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>`,
    title: '订单查询',
    subtitle: '无需登录查询订单',
    action: () => router.push('/order-lookup'),
  },
]

function goToLogin() {
  router.push('/login')
}

function logout() {
  userStore.logout()
  toast.success('已退出登录')
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-dark-900">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">个人中心</h1>

      <!-- Not Logged In -->
      <div v-if="!isLoggedIn" class="bg-white dark:bg-dark-800 rounded-xl p-8 text-center">
        <div class="w-20 h-20 bg-gray-100 dark:bg-dark-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">未登录</h2>
        <p class="text-gray-500 dark:text-gray-400 mb-6">登录后可查看更多信息</p>
        <button class="btn-primary px-8" @click="goToLogin">
          立即登录
        </button>
      </div>

      <!-- Logged In -->
      <div v-else>
        <!-- User Info -->
        <div class="bg-white dark:bg-dark-800 rounded-xl p-6 mb-6">
          <div class="flex items-center gap-4">
            <img
              :src="user?.avatar"
              :alt="user?.nickname"
              class="w-16 h-16 rounded-full"
            />
            <div class="flex-1">
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white">{{ user?.nickname }}</h2>
              <p class="text-gray-500 dark:text-gray-400">{{ user?.email }}</p>
            </div>
            <button class="btn-secondary text-sm" @click="logout">
              退出登录
            </button>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-dark-700">
            <div class="text-center">
              <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ orderCount }}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">全部订单</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ pendingOrderCount }}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">待支付</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ favoriteCount }}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">收藏商品</div>
            </div>
          </div>
        </div>

        <!-- Menu Items -->
        <div class="bg-white dark:bg-dark-800 rounded-xl overflow-hidden">
          <div
            v-for="(item, index) in menuItems"
            :key="index"
            class="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-dark-700 cursor-pointer transition-colors"
            :class="{ 'border-t border-gray-200 dark:border-dark-700': index > 0 }"
            @click="item.action"
          >
            <div class="text-gray-500 dark:text-gray-400" v-html="item.icon" />
            <div class="flex-1">
              <div class="font-medium text-gray-900 dark:text-white">{{ item.title }}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">{{ item.subtitle }}</div>
            </div>
            <div class="flex items-center gap-2">
              <span
                v-if="item.badge"
                class="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
              >
                {{ item.badge }}
              </span>
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
