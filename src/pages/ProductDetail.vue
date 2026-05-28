<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore, useFavoriteStore } from '@/stores'
import { useToast } from '@/composables'
import { getProductById, getProductsByCategory } from '@/mock/products'
import { formatPrice, formatSales, getWholesalePrice } from '@/utils/format'
import ProductGrid from '@/components/common/ProductGrid.vue'
import WholesalePriceDisplay from '@/components/common/WholesalePriceDisplay.vue'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const favoriteStore = useFavoriteStore()
const toast = useToast()

const product = computed(() => getProductById(route.params.id as string))
const selectedSpec = ref('')
const quantity = ref(1)
const activeTab = ref<'details' | 'notes' | 'reviews'>('details')
const currentImageIndex = ref(0)

const isFavorite = computed(() => product.value ? favoriteStore.isFavorite(product.value.id) : false)

const relatedProducts = computed(() => {
  if (!product.value) return []
  return getProductsByCategory(product.value.category)
    .filter(p => p.id !== product.value?.id)
    .slice(0, 4)
})

const discountPercent = computed(() => {
  if (!product.value) return 0
  if (product.value.originalPrice <= product.value.price) return 0
  return Math.round((1 - product.value.price / product.value.originalPrice) * 100)
})

// Calculate current price based on quantity (wholesale or regular)
const currentUnitPrice = computed(() => {
  if (!product.value) return 0
  const basePrice = product.value.flashSalePrice || product.value.price
  return getWholesalePrice(product.value.wholesaleTiers, quantity.value, basePrice)
})

// Check if product has wholesale pricing
const hasWholesalePricing = computed(() => {
  return product.value?.wholesaleTiers && product.value.wholesaleTiers.length > 0
})

onMounted(() => {
  if (product.value?.specs[0]?.options[0]) {
    selectedSpec.value = product.value.specs[0].options[0]
  }
})

function selectImage(index: number) {
  currentImageIndex.value = index
}

function addToCart() {
  if (!product.value) return
  if (!selectedSpec.value) {
    toast.warning('请选择商品规格')
    return
  }
  cartStore.addItem(product.value, selectedSpec.value, quantity.value)
  toast.success('已添加到购物车')
}

function buyNow() {
  if (!product.value) return
  if (!selectedSpec.value) {
    toast.warning('请选择商品规格')
    return
  }
  cartStore.addItem(product.value, selectedSpec.value, quantity.value)
  router.push('/cart')
}

function toggleFavorite() {
  if (!product.value) return
  favoriteStore.toggleFavorite(product.value)
  toast.success(isFavorite.value ? '已取消收藏' : '已添加收藏')
}

function incrementQuantity() {
  if (product.value && quantity.value < product.value.stock) {
    quantity.value++
  }
}

function decrementQuantity() {
  if (quantity.value > 1) {
    quantity.value--
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-dark-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <router-link to="/" class="hover:text-primary-600 dark:hover:text-primary-400">首页</router-link>
        <span>/</span>
        <router-link to="/products" class="hover:text-primary-600 dark:hover:text-primary-400">商品中心</router-link>
        <span>/</span>
        <span class="text-gray-900 dark:text-white">{{ product?.name }}</span>
      </nav>

      <div v-if="product" class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <!-- Images -->
        <div class="space-y-4">
          <!-- Main Image -->
          <div class="aspect-[4/3] rounded-xl overflow-hidden bg-white dark:bg-dark-800">
            <img
              :src="product.images[currentImageIndex] || product.image"
              :alt="product.name"
              class="w-full h-full object-contain"
            />
          </div>
          
          <!-- Thumbnails -->
          <div class="flex gap-2 overflow-x-auto pb-2">
            <button
              v-for="(image, index) in product.images"
              :key="index"
              class="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors"
              :class="currentImageIndex === index
                ? 'border-primary-600'
                : 'border-transparent hover:border-gray-300 dark:hover:border-dark-600'"
              @click="selectImage(index)"
            >
              <img :src="image" :alt="`${product.name} ${index + 1}`" class="w-full h-full object-cover" />
            </button>
          </div>
        </div>

        <!-- Info -->
        <div class="space-y-6">
          <!-- Title & Tags -->
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span v-if="product.isHot" class="badge bg-red-500 text-white">热销</span>
              <span v-if="product.isNew" class="badge bg-green-500 text-white">新品</span>
              <span v-if="product.isFlashSale" class="badge bg-orange-500 text-white">限时特惠</span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {{ product.name }}
            </h1>
          </div>

          <!-- Price -->
          <div class="bg-gray-50 dark:bg-dark-800 rounded-xl p-4">
            <div class="flex items-baseline gap-3">
              <span class="text-3xl font-bold text-red-600">
                ¥{{ formatPrice(currentUnitPrice) }}
              </span>
              <span v-if="product.originalPrice > currentUnitPrice" class="text-lg text-gray-400 line-through">
                ¥{{ formatPrice(product.originalPrice) }}
              </span>
              <span v-if="discountPercent > 0" class="badge bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                省 {{ discountPercent }}%
              </span>
            </div>
            <div class="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
              <span>已售 {{ formatSales(product.sales) }}</span>
              <span class="flex items-center gap-1">
                <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {{ product.rating }} ({{ product.ratingCount }}条评价)
              </span>
            </div>
          </div>

          <!-- Wholesale Price -->
          <WholesalePriceDisplay
            v-if="hasWholesalePricing && product.wholesaleTiers"
            :tiers="product.wholesaleTiers"
            :current-quantity="quantity"
            :base-price="product.flashSalePrice || product.price"
          />

          <!-- Specs -->
          <div v-if="product.specs.length > 0" class="space-y-4">
            <div v-for="spec in product.specs" :key="spec.name">
              <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{{ spec.name }}</h3>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="option in spec.options"
                  :key="option"
                  class="px-4 py-2 rounded-lg border text-sm transition-colors"
                  :class="selectedSpec === option
                    ? 'border-primary-600 bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                    : 'border-gray-300 dark:border-dark-600 text-gray-700 dark:text-gray-300 hover:border-primary-400'"
                  @click="selectedSpec = option"
                >
                  {{ option }}
                </button>
              </div>
            </div>
          </div>

          <!-- Quantity -->
          <div>
            <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">数量</h3>
            <div class="flex items-center gap-2">
              <button
                class="w-10 h-10 rounded-lg border border-gray-300 dark:border-dark-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors disabled:opacity-50"
                :disabled="quantity <= 1"
                @click="decrementQuantity"
              >
                -
              </button>
              <input
                v-model.number="quantity"
                type="number"
                min="1"
                :max="product.stock"
                class="w-20 h-10 text-center border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                class="w-10 h-10 rounded-lg border border-gray-300 dark:border-dark-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors disabled:opacity-50"
                :disabled="quantity >= product.stock"
                @click="incrementQuantity"
              >
                +
              </button>
              <span class="text-sm text-gray-500 dark:text-gray-400">库存 {{ product.stock }} 件</span>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex flex-col sm:flex-row gap-3">
            <button
              class="flex-1 btn-primary py-3 text-lg"
              @click="buyNow"
            >
              立即购买
            </button>
            <button
              class="flex-1 btn-secondary py-3 text-lg"
              @click="addToCart"
            >
              加入购物车
            </button>
            <button
              class="btn-ghost py-3 px-4"
              :class="isFavorite ? 'text-red-500' : 'text-gray-500'"
              @click="toggleFavorite"
            >
              <svg class="w-6 h-6" :fill="isFavorite ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          <!-- Trust badges -->
          <div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span class="flex items-center gap-1">
              <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              自动发货
            </span>
            <span class="flex items-center gap-1">
              <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              正品保障
            </span>
            <span class="flex items-center gap-1">
              <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              售后无忧
            </span>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div v-if="product" class="bg-white dark:bg-dark-800 rounded-xl mb-12">
        <div class="border-b border-gray-200 dark:border-dark-700">
          <div class="flex">
            <button
              class="px-6 py-4 text-sm font-medium transition-colors relative"
              :class="activeTab === 'details'
                ? 'text-primary-600 dark:text-primary-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'"
              @click="activeTab = 'details'"
            >
              商品详情
              <div v-if="activeTab === 'details'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />
            </button>
            <button
              class="px-6 py-4 text-sm font-medium transition-colors relative"
              :class="activeTab === 'notes'
                ? 'text-primary-600 dark:text-primary-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'"
              @click="activeTab = 'notes'"
            >
              购买须知
              <div v-if="activeTab === 'notes'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />
            </button>
            <button
              class="px-6 py-4 text-sm font-medium transition-colors relative"
              :class="activeTab === 'reviews'
                ? 'text-primary-600 dark:text-primary-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'"
              @click="activeTab = 'reviews'"
            >
              用户评价 ({{ product.reviews.length }})
              <div v-if="activeTab === 'reviews'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />
            </button>
          </div>
        </div>
        
        <div class="p-6">
          <!-- Details -->
          <div v-if="activeTab === 'details'" class="prose prose-gray dark:prose-invert max-w-none" v-html="product.description" />
          
          <!-- Notes -->
          <div v-if="activeTab === 'notes'" class="whitespace-pre-line text-gray-700 dark:text-gray-300">
            {{ product.purchaseNotes }}
          </div>
          
          <!-- Reviews -->
          <div v-if="activeTab === 'reviews'" class="space-y-4">
            <div v-if="product.reviews.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
              暂无评价
            </div>
            <div v-for="review in product.reviews" :key="review.id" class="flex gap-4 p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
              <img :src="review.userAvatar" :alt="review.userName" class="w-10 h-10 rounded-full" />
              <div class="flex-1">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-medium text-gray-900 dark:text-white">{{ review.userName }}</span>
                  <span class="text-sm text-gray-500 dark:text-gray-400">{{ review.createdAt }}</span>
                </div>
                <div class="flex items-center gap-1 mb-2">
                  <svg v-for="i in 5" :key="i" class="w-4 h-4" :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <p class="text-gray-700 dark:text-gray-300">{{ review.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Products -->
      <div v-if="relatedProducts.length > 0">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">相关商品</h2>
        <ProductGrid :products="relatedProducts" />
      </div>

      <!-- Mobile sticky bar -->
      <div v-if="product" class="fixed bottom-0 left-0 right-0 bg-white dark:bg-dark-900 border-t border-gray-200 dark:border-dark-700 p-4 lg:hidden z-40">
        <div class="flex items-center gap-4">
          <div class="flex-1">
            <span class="text-2xl font-bold text-red-600">¥{{ formatPrice(currentUnitPrice) }}</span>
            <span v-if="hasWholesalePricing && currentUnitPrice < (product.flashSalePrice || product.price)" class="text-sm text-green-600 ml-2">
              批发价
            </span>
          </div>
          <button class="btn-primary px-8" @click="buyNow">立即购买</button>
        </div>
      </div>
    </div>
  </div>
</template>
