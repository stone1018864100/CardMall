<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { products, categories } from '@/mock/products'
import ProductGrid from '@/components/common/ProductGrid.vue'

const route = useRoute()
const router = useRouter()

const selectedCategory = ref((route.query.category as string) || 'all')
const searchQuery = ref((route.query.search as string) || '')
const sortBy = ref('default')
const showFilters = ref(false)

// Watch for query changes
watch(() => route.query, (query) => {
  if (query.category) selectedCategory.value = query.category as string
  if (query.search) searchQuery.value = query.search as string
})

const sortOptions = [
  { value: 'default', label: '综合排序' },
  { value: 'sales', label: '销量优先' },
  { value: 'price-asc', label: '价格从低到高' },
  { value: 'price-desc', label: '价格从高到低' },
  { value: 'newest', label: '最新上架' },
]

const filteredProducts = computed(() => {
  let result = [...products]

  // Category filter
  if (selectedCategory.value !== 'all') {
    result = result.filter(p => p.category === selectedCategory.value)
  }

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.tags.some(t => t.toLowerCase().includes(query)) ||
      p.categoryLabel.toLowerCase().includes(query)
    )
  }

  // Sort
  switch (sortBy.value) {
    case 'sales':
      result.sort((a, b) => b.sales - a.sales)
      break
    case 'price-asc':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      result.sort((a, b) => b.price - a.price)
      break
    case 'newest':
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
      break
  }

  return result
})

function setCategory(category: string) {
  selectedCategory.value = category
  router.push({ query: { ...route.query, category: category === 'all' ? undefined : category } })
}

function handleSearch() {
  router.push({ query: { ...route.query, search: searchQuery.value || undefined } })
}

function clearFilters() {
  selectedCategory.value = 'all'
  searchQuery.value = ''
  sortBy.value = 'default'
  router.push('/products')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-dark-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">商品中心</h1>
        <p class="text-gray-500 dark:text-gray-400">精选各类数字商品，自动发货，安全快捷</p>
      </div>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar (Desktop) -->
        <aside class="hidden lg:block w-64 flex-shrink-0">
          <div class="sticky top-24 space-y-6">
            <!-- Categories -->
            <div class="bg-white dark:bg-dark-800 rounded-xl p-4">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-4">商品分类</h3>
              <div class="space-y-1">
                <button
                  class="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors"
                  :class="selectedCategory === 'all'
                    ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-700'"
                  @click="setCategory('all')"
                >
                  全部商品
                </button>
                <button
                  v-for="cat in categories"
                  :key="cat.id"
                  class="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between"
                  :class="selectedCategory === cat.id
                    ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-700'"
                  @click="setCategory(cat.id)"
                >
                  <span class="flex items-center gap-2">
                    <span>{{ cat.icon }}</span>
                    <span>{{ cat.name }}</span>
                  </span>
                  <span class="text-xs text-gray-500 dark:text-gray-400">{{ cat.count }}</span>
                </button>
              </div>
            </div>

            <!-- Quick Links -->
            <div class="bg-white dark:bg-dark-800 rounded-xl p-4">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-4">快速筛选</h3>
              <div class="space-y-1">
                <button
                  class="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-700 transition-colors"
                  @click="router.push('/products?filter=hot')"
                >
                  🔥 热销商品
                </button>
                <button
                  class="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-700 transition-colors"
                  @click="router.push('/products?filter=new')"
                >
                  ✨ 新品上架
                </button>
                <button
                  class="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-700 transition-colors"
                  @click="router.push('/products?filter=sale')"
                >
                  💰 限时特惠
                </button>
              </div>
            </div>
          </div>
        </aside>

        <!-- Main Content -->
        <div class="flex-1">
          <!-- Filters & Sort -->
          <div class="bg-white dark:bg-dark-800 rounded-xl p-4 mb-6">
            <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <!-- Mobile category filter -->
              <div class="flex lg:hidden items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
                <button
                  class="px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors"
                  :class="selectedCategory === 'all'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 dark:bg-dark-700 dark:text-gray-300'"
                  @click="setCategory('all')"
                >
                  全部
                </button>
                <button
                  v-for="cat in categories"
                  :key="cat.id"
                  class="px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors flex items-center gap-1"
                  :class="selectedCategory === cat.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 dark:bg-dark-700 dark:text-gray-300'"
                  @click="setCategory(cat.id)"
                >
                  <span>{{ cat.icon }}</span>
                  <span>{{ cat.name }}</span>
                </button>
              </div>

              <!-- Search -->
              <div class="relative flex-1 w-full sm:w-auto">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="搜索商品..."
                  class="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-dark-600 bg-gray-50 dark:bg-dark-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  @keyup.enter="handleSearch"
                />
                <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <!-- Sort -->
              <select
                v-model="sortBy"
                class="px-4 py-2 rounded-lg border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option v-for="option in sortOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>

              <!-- Clear filters -->
              <button
                v-if="selectedCategory !== 'all' || searchQuery || sortBy !== 'default'"
                class="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
                @click="clearFilters"
              >
                清除筛选
              </button>
            </div>

            <!-- Results count -->
            <div class="mt-3 text-sm text-gray-500 dark:text-gray-400">
              共找到 <span class="font-medium text-gray-900 dark:text-white">{{ filteredProducts.length }}</span> 件商品
            </div>
          </div>

          <!-- Products Grid -->
          <ProductGrid
            :products="filteredProducts"
            empty-text="没有找到符合条件的商品"
          />
        </div>
      </div>
    </div>
  </div>
</template>
