<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '@/stores'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

const cartCount = computed(() => cartStore.itemCount)

const tabs = [
  {
    name: '首页',
    path: '/',
    icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>`,
    activeIcon: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>`,
  },
  {
    name: '商品',
    path: '/products',
    icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>`,
    activeIcon: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>`,
  },
  {
    name: '购物车',
    path: '/cart',
    icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
    </svg>`,
    activeIcon: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
    </svg>`,
    badge: computed(() => cartCount.value > 0 ? cartCount.value : null),
  },
  {
    name: '我的',
    path: '/user',
    icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>`,
    activeIcon: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>`,
  },
]

function isActive(path: string): boolean {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

function navigateTo(path: string) {
  router.push(path)
}
</script>

<template>
  <!-- Only visible on mobile (hidden on md and above) -->
  <div class="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-dark-900 border-t border-gray-200 dark:border-dark-700 md:hidden safe-area-bottom">
    <nav class="flex items-center justify-around h-14">
      <button
        v-for="tab in tabs"
        :key="tab.path"
        class="flex flex-col items-center justify-center gap-0.5 px-3 py-2 text-xs transition-colors relative"
        :class="isActive(tab.path) 
          ? 'text-primary-600 dark:text-primary-400' 
          : 'text-gray-500 dark:text-gray-400'"
        @click="navigateTo(tab.path)"
      >
        <div class="relative" v-html="isActive(tab.path) ? tab.activeIcon : tab.icon" />
        <span>{{ tab.name }}</span>
        
        <!-- Badge -->
        <span
          v-if="tab.badge?.value"
          class="absolute -top-1 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
        >
          {{ tab.badge.value > 99 ? '99+' : tab.badge.value }}
        </span>
      </button>
    </nav>
  </div>
</template>

<style scoped>
/* Safe area for phones with notch */
@supports (padding-bottom: env(safe-area-inset-bottom)) {
  .safe-area-bottom {
    padding-bottom: env(safe-area-inset-bottom, 0px);
  }
}
</style>
