<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCartStore, useUserStore, useThemeStore } from '@/stores'
import { useToast } from '@/composables'

const router = useRouter()
const route = useRoute()
const cartStore = useCartStore()
const userStore = useUserStore()
const themeStore = useThemeStore()
const toast = useToast()

const searchQuery = ref('')
const showMobileMenu = ref(false)
const showUserMenu = ref(false)

const cartCount = computed(() => cartStore.itemCount)
const isLoggedIn = computed(() => userStore.isLoggedIn)
const user = computed(() => userStore.user)

const navLinks = [
  { name: '首页', path: '/' },
  { name: '商品中心', path: '/products' },
  { name: '新闻资讯', path: '/news' },
  { name: '帮助中心', path: '/help' },
]

function handleSearch() {
  if (searchQuery.value.trim()) {
    router.push({ path: '/products', query: { search: searchQuery.value.trim() } })
  }
}

function goToCart() {
  router.push('/cart')
}

function goToOrders() {
  router.push('/orders')
}

function goToLogin() {
  router.push('/login')
}

function goToUserCenter() {
  router.push('/user')
  showUserMenu.value = false
}

function logout() {
  userStore.logout()
  showUserMenu.value = false
  toast.success('已退出登录')
  router.push('/')
}

function toggleMobileMenu() {
  showMobileMenu.value = !showMobileMenu.value
}

function isActive(path: string): boolean {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>

<template>
  <header class="sticky top-0 z-40 bg-white/80 dark:bg-dark-900/80 backdrop-blur-md border-b border-gray-200 dark:border-dark-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-2">
          <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-lg">C</span>
          </div>
          <span class="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">CardMall</span>
        </router-link>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-8">
          <router-link
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="text-sm font-medium transition-colors"
            :class="isActive(link.path) 
              ? 'text-primary-600 dark:text-primary-400' 
              : 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'"
          >
            {{ link.name }}
          </router-link>
        </nav>

        <!-- Search Bar -->
        <div class="hidden sm:flex flex-1 max-w-md mx-8">
          <div class="relative w-full">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="搜索商品..."
              class="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-dark-600 bg-gray-50 dark:bg-dark-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              @keyup.enter="handleSearch"
            />
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <!-- Right Actions -->
        <div class="flex items-center gap-4">
          <!-- Theme Toggle -->
          <button
            class="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            @click="themeStore.toggle()"
          >
            <svg v-if="themeStore.isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>

          <!-- Cart -->
          <button
            class="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            @click="goToCart"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            <span
              v-if="cartCount > 0"
              class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
            >
              {{ cartCount > 99 ? '99+' : cartCount }}
            </span>
          </button>

          <!-- User Menu -->
          <div class="relative" @mouseleave="showUserMenu = false">
            <button
              v-if="isLoggedIn"
              class="flex items-center gap-2 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              @click="showUserMenu = !showUserMenu"
            >
              <img
                :src="user?.avatar"
                :alt="user?.nickname"
                class="w-6 h-6 rounded-full"
              />
              <span class="hidden lg:block text-sm">{{ user?.nickname }}</span>
            </button>
            <button
              v-else
              class="flex items-center gap-2 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              @click="goToLogin"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span class="hidden lg:block text-sm">登录</span>
            </button>

            <!-- Dropdown -->
            <Transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div
                v-if="showUserMenu && isLoggedIn"
                class="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-800 rounded-lg shadow-lg border border-gray-200 dark:border-dark-700 py-1"
              >
                <button
                  class="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
                  @click="goToUserCenter"
                >
                  个人中心
                </button>
                <button
                  class="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
                  @click="goToOrders"
                >
                  我的订单
                </button>
                <hr class="my-1 border-gray-200 dark:border-dark-700" />
                <button
                  class="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
                  @click="logout"
                >
                  退出登录
                </button>
              </div>
            </Transition>
          </div>

          <!-- Mobile menu button -->
          <button
            class="md:hidden p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            @click="toggleMobileMenu"
          >
            <svg v-if="showMobileMenu" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Search -->
      <div class="sm:hidden pb-3">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索商品..."
            class="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-dark-600 bg-gray-50 dark:bg-dark-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            @keyup.enter="handleSearch"
          />
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <Transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <nav v-if="showMobileMenu" class="md:hidden pb-4">
          <div class="flex flex-col gap-2">
            <router-link
              v-for="link in navLinks"
              :key="link.path"
              :to="link.path"
              class="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
              :class="isActive(link.path) 
                ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400' 
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-800'"
              @click="showMobileMenu = false"
            >
              {{ link.name }}
            </router-link>
          </div>
        </nav>
      </Transition>
    </div>
  </header>
</template>
