<script setup lang="ts">
import { useRouter } from 'vue-router'
import { categories } from '@/mock/products'

const router = useRouter()

function goToCategory(categoryId: string) {
  router.push({ path: '/products', query: { category: categoryId } })
}
</script>

<template>
  <div class="grid grid-cols-4 gap-4">
    <button
      v-for="category in categories"
      :key="category.id"
      class="flex flex-col items-center gap-2 p-4 rounded-xl bg-white dark:bg-dark-800 hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors group"
      @click="goToCategory(category.id)"
    >
      <span class="text-3xl group-hover:scale-110 transition-transform">
        {{ category.icon }}
      </span>
      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
        {{ category.name }}
      </span>
      <span class="text-xs text-gray-500 dark:text-gray-400">
        {{ category.count }}款商品
      </span>
    </button>
  </div>
</template>
