<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores'
import { useFavoriteStore } from '@/stores'
import { useToast } from '@/composables'
import { formatPrice, formatSales } from '@/utils/format'
import type { Product } from '@/types'

interface Props {
  product: Product
}

const props = defineProps<Props>()
const router = useRouter()
const cartStore = useCartStore()
const favoriteStore = useFavoriteStore()
const toast = useToast()

const isFavorite = computed(() => favoriteStore.isFavorite(props.product.id))

const discountPercent = computed(() => {
  if (props.product.originalPrice <= props.product.price) return 0
  return Math.round((1 - props.product.price / props.product.originalPrice) * 100)
})

function goToDetail() {
  router.push(`/products/${props.product.id}`)
}

function addToCart(event: Event) {
  event.stopPropagation()
  const spec = props.product.specs[0]?.options[0] || '默认'
  cartStore.addItem(props.product, spec, 1)
  toast.success('已添加到购物车')
}

function toggleFavorite(event: Event) {
  event.stopPropagation()
  favoriteStore.toggleFavorite(props.product)
  toast.success(isFavorite.value ? '已取消收藏' : '已添加收藏')
}

function buyNow(event: Event) {
  event.stopPropagation()
  const spec = props.product.specs[0]?.options[0] || '默认'
  cartStore.addItem(props.product, spec, 1)
  router.push('/cart')
}
</script>

<template>
  <div
    class="card-hover group cursor-pointer relative"
    @click="goToDetail"
  >
    <!-- Image -->
    <div class="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-dark-700">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
      
      <!-- Tags -->
      <div class="absolute top-2 left-2 flex flex-wrap gap-1">
        <span v-if="product.isHot" class="badge bg-red-500 text-white text-xs">热销</span>
        <span v-if="product.isNew" class="badge bg-green-500 text-white text-xs">新品</span>
        <span v-if="product.isFlashSale" class="badge bg-orange-500 text-white text-xs">限时</span>
      </div>
      
      <!-- Favorite button -->
      <button
        class="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110"
        :class="isFavorite ? 'text-red-500' : 'text-gray-400'"
        @click="toggleFavorite"
      >
        <svg class="w-5 h-5" :fill="isFavorite ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
      
      <!-- Discount badge -->
      <div v-if="discountPercent > 0" class="absolute bottom-2 right-2 badge bg-red-500 text-white">
        -{{ discountPercent }}%
      </div>
    </div>
    
    <!-- Content -->
    <div class="p-4">
      <!-- Name -->
      <h3 class="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
        {{ product.name }}
      </h3>
      
      <!-- Price -->
      <div class="flex items-baseline gap-2 mb-2">
        <span class="text-lg font-bold text-red-600 dark:text-red-400">
          ¥{{ formatPrice(product.flashSalePrice || product.price) }}
        </span>
        <span v-if="product.originalPrice > (product.flashSalePrice || product.price)" class="text-sm text-gray-400 line-through">
          ¥{{ formatPrice(product.originalPrice) }}
        </span>
      </div>
      
      <!-- Sales & Rating -->
      <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>已售 {{ formatSales(product.sales) }}</span>
        <span class="flex items-center gap-1">
          <svg class="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {{ product.rating }}
        </span>
      </div>
      
      <!-- Stock warning -->
      <div v-if="product.stock < 10" class="mt-2 text-xs text-orange-500">
        仅剩 {{ product.stock }} 件
      </div>
    </div>
    
    <!-- Quick actions (shown on hover) -->
    <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white dark:from-dark-800 via-white/80 dark:via-dark-800/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      <div class="flex gap-2">
        <button
          class="flex-1 btn-primary text-sm py-2"
          @click="buyNow"
        >
          立即购买
        </button>
        <button
          class="btn-secondary text-sm py-2 px-3"
          @click="addToCart"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
