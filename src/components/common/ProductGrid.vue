<script setup lang="ts">
import type { Product } from '@/types'
import ProductCard from './ProductCard.vue'
import EmptyState from './EmptyState.vue'

interface Props {
  products: Product[]
  loading?: boolean
  emptyText?: string
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  emptyText: '暂无商品',
})
</script>

<template>
  <div>
    <!-- Loading skeleton -->
    <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="i in 8" :key="i" class="card animate-pulse">
        <div class="aspect-[4/3] bg-gray-200 dark:bg-dark-700" />
        <div class="p-4 space-y-3">
          <div class="h-4 bg-gray-200 dark:bg-dark-700 rounded w-3/4" />
          <div class="h-4 bg-gray-200 dark:bg-dark-700 rounded w-1/2" />
          <div class="h-6 bg-gray-200 dark:bg-dark-700 rounded w-1/3" />
        </div>
      </div>
    </div>
    
    <!-- Products grid -->
    <div v-else-if="products.length > 0" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
    
    <!-- Empty state -->
    <EmptyState
      v-else
      icon="🔍"
      :title="emptyText"
      description="尝试更换筛选条件或搜索其他关键词"
    />
  </div>
</template>
