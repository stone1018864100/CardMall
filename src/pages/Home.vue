<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import BannerCarousel from '@/components/home/BannerCarousel.vue'
import CategoryGrid from '@/components/home/CategoryGrid.vue'
import FlashSale from '@/components/home/FlashSale.vue'
import NewsSection from '@/components/home/NewsSection.vue'
import ProductGrid from '@/components/common/ProductGrid.vue'
import { getHotProducts, getNewProducts } from '@/mock/products'

const router = useRouter()
const hotProducts = computed(() => getHotProducts().slice(0, 8))
const newProducts = computed(() => getNewProducts().slice(0, 4))
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 py-8 sm:py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Banner -->
          <div class="lg:col-span-2">
            <BannerCarousel />
          </div>
          
          <!-- Quick Stats -->
          <div class="hidden lg:flex flex-col gap-4">
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
              <div class="text-3xl font-bold mb-1">10,000+</div>
              <div class="text-white/80">累计服务用户</div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
              <div class="text-3xl font-bold mb-1">50,000+</div>
              <div class="text-white/80">成功交易订单</div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
              <div class="text-3xl font-bold mb-1">99.9%</div>
              <div class="text-white/80">自动发货成功率</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <!-- Categories -->
      <section>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">商品分类</h2>
        <CategoryGrid />
      </section>

      <!-- Flash Sale -->
      <section>
        <FlashSale />
      </section>

      <!-- Hot Products -->
      <section>
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">热销商品</h2>
          <router-link
            to="/products"
            class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm"
          >
            查看全部 →
          </router-link>
        </div>
        <ProductGrid :products="hotProducts" />
      </section>

      <!-- New Products -->
      <section v-if="newProducts.length > 0">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">新品上架</h2>
          <router-link
            to="/products"
            class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm"
          >
            查看全部 →
          </router-link>
        </div>
        <ProductGrid :products="newProducts" />
      </section>

      <!-- News -->
      <section>
        <NewsSection />
      </section>

      <!-- Trust Badges -->
      <section class="bg-gray-100 dark:bg-dark-800 rounded-xl p-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
              <span class="text-2xl">🔒</span>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-white">安全支付</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">SSL加密，资金安全</p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <span class="text-2xl">⚡</span>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-white">自动发货</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">支付即发货，秒级到账</p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
              <span class="text-2xl">✅</span>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-white">正品保障</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">官方渠道，正版授权</p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
              <span class="text-2xl">💬</span>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-white">售后无忧</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">7×24小时在线客服</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
