<script setup lang="ts">
import { ref, computed } from 'vue'
import { useOrderStore } from '@/stores'
import { formatDate, formatPrice, formatOrderStatus } from '@/utils/format'
import { isValidEmail } from '@/utils/format'
import CardKeyDisplay from '@/components/common/CardKeyDisplay.vue'

const orderStore = useOrderStore()

const searchType = ref<'orderNo' | 'email'>('orderNo')
const searchValue = ref('')
const searchResult = ref<any[]>([])
const hasSearched = ref(false)

function search() {
  hasSearched.value = true
  
  if (searchType.value === 'orderNo') {
    const order = orderStore.getOrderByNo(searchValue.value)
    searchResult.value = order ? [order] : []
  } else {
    if (!isValidEmail(searchValue.value)) {
      searchResult.value = []
      return
    }
    searchResult.value = orderStore.getOrdersByEmail(searchValue.value)
  }
}

function getStatusColor(status: string) {
  const colors: Record<string, string> = {
    pending: 'badge-warning',
    paid: 'badge-primary',
    completed: 'badge-success',
    cancelled: 'badge-danger',
  }
  return colors[status] || 'badge-primary'
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-dark-900">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">订单查询</h1>
        <p class="text-gray-500 dark:text-gray-400">无需登录，使用订单号或邮箱即可查询</p>
      </div>

      <!-- Search Form -->
      <div class="bg-white dark:bg-dark-800 rounded-xl p-6 mb-8">
        <div class="flex flex-col sm:flex-row gap-4 mb-4">
          <div class="flex gap-2">
            <button
              class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              :class="searchType === 'orderNo'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 dark:bg-dark-700 dark:text-gray-300'"
              @click="searchType = 'orderNo'"
            >
              订单号查询
            </button>
            <button
              class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              :class="searchType === 'email'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 dark:bg-dark-700 dark:text-gray-300'"
              @click="searchType = 'email'"
            >
              邮箱查询
            </button>
          </div>
          <div class="flex-1 flex gap-2">
            <input
              v-model="searchValue"
              :type="searchType === 'email' ? 'email' : 'text'"
              :placeholder="searchType === 'orderNo' ? '请输入订单号' : '请输入邮箱地址'"
              class="input flex-1"
              @keyup.enter="search"
            />
            <button class="btn-primary px-6" @click="search">
              查询
            </button>
          </div>
        </div>
      </div>

      <!-- Results -->
      <div v-if="hasSearched">
        <div v-if="searchResult.length === 0" class="text-center py-12">
          <div class="text-6xl mb-4">🔍</div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">未找到订单</h3>
          <p class="text-gray-500 dark:text-gray-400">
            请检查{{ searchType === 'orderNo' ? '订单号' : '邮箱地址' }}是否正确
          </p>
        </div>

        <div v-else class="space-y-4">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
            找到 {{ searchResult.length }} 个订单
          </h2>
          
          <div
            v-for="order in searchResult"
            :key="order.id"
            class="bg-white dark:bg-dark-800 rounded-xl p-6"
          >
            <div class="flex items-center justify-between mb-4">
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <span class="font-medium text-gray-900 dark:text-white">{{ order.orderNo }}</span>
                  <span class="badge" :class="getStatusColor(order.status)">
                    {{ formatOrderStatus(order.status).text }}
                  </span>
                </div>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ formatDate(order.createdAt) }}
                </p>
              </div>
              <span class="text-xl font-bold text-red-600">¥{{ formatPrice(order.total) }}</span>
            </div>

            <!-- Items -->
            <div class="space-y-2 mb-4">
              <div
                v-for="item in order.items"
                :key="item.productId"
                class="flex items-center gap-3"
              >
                <img
                  :src="item.productImage"
                  :alt="item.productName"
                  class="w-10 h-10 rounded object-cover"
                />
                <div class="flex-1 min-w-0">
                  <p class="text-sm text-gray-900 dark:text-white line-clamp-1">{{ item.productName }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ item.spec }} × {{ item.quantity }}</p>
                </div>
              </div>
            </div>

            <!-- Card Keys -->
            <div v-if="order.cardKeys.length > 0">
              <CardKeyDisplay :card-keys="order.cardKeys" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
