<script setup lang="ts">
import { computed } from 'vue'
import { getFlashSaleProducts } from '@/mock/products'
import { useCountdown } from '@/composables'
import { formatPrice } from '@/utils/format'
import { useRouter } from 'vue-router'

const router = useRouter()
const flashProducts = getFlashSaleProducts()

// Use a fixed end time for demo (7 days from now)
const endTime = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
const { days, hours, minutes, seconds } = useCountdown(endTime)

function goToProduct(id: string) {
  router.push(`/products/${id}`)
}
</script>

<template>
  <div v-if="flashProducts.length > 0" class="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-6">
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-4">
        <h2 class="text-2xl font-bold text-white">限时特惠</h2>
        <div class="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
          <span class="text-white font-mono text-lg">{{ String(hours).padStart(2, '0') }}</span>
          <span class="text-white">:</span>
          <span class="text-white font-mono text-lg">{{ String(minutes).padStart(2, '0') }}</span>
          <span class="text-white">:</span>
          <span class="text-white font-mono text-lg">{{ String(seconds).padStart(2, '0') }}</span>
        </div>
      </div>
      <router-link
        to="/products"
        class="text-white/80 hover:text-white transition-colors text-sm"
      >
        查看全部 →
      </router-link>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        v-for="product in flashProducts"
        :key="product.id"
        class="bg-white dark:bg-dark-800 rounded-lg overflow-hidden cursor-pointer group hover:shadow-lg transition-shadow"
        @click="goToProduct(product.id)"
      >
        <div class="aspect-[4/3] overflow-hidden">
          <img
            :src="product.image"
            :alt="product.name"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <div class="p-3">
          <h3 class="text-sm font-medium text-gray-900 dark:text-white line-clamp-1 mb-2">
            {{ product.name }}
          </h3>
          <div class="flex items-baseline gap-2">
            <span class="text-lg font-bold text-red-600">
              ¥{{ formatPrice(product.flashSalePrice || product.price) }}
            </span>
            <span class="text-sm text-gray-400 line-through">
              ¥{{ formatPrice(product.originalPrice) }}
            </span>
          </div>
          <div class="mt-2 h-2 bg-gray-200 dark:bg-dark-600 rounded-full overflow-hidden">
            <div
              class="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
              :style="{ width: `${Math.min((product.sales / (product.stock + product.sales)) * 100, 95)}%` }"
            />
          </div>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            已抢 {{ Math.min((product.sales / (product.stock + product.sales)) * 100, 95).toFixed(0) }}%
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
