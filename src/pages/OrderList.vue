<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useOrderStore } from '@/stores'
import { formatDate, formatPrice, formatOrderStatus } from '@/utils/format'
import EmptyState from '@/components/common/EmptyState.vue'
import CardKeyDisplay from '@/components/common/CardKeyDisplay.vue'
import type { OrderStatus } from '@/types'

const router = useRouter()
const orderStore = useOrderStore()

const activeTab = ref<OrderStatus | 'all'>('all')
const expandedOrderId = ref<string | null>(null)

const tabs = [
  { value: 'all', label: '全部订单' },
  { value: 'pending', label: '待支付' },
  { value: 'completed', label: '已完成' },
  { value: 'cancelled', label: '已取消' },
]

const filteredOrders = computed(() => orderStore.getOrdersByStatus(activeTab.value))

function toggleExpand(orderId: string) {
  expandedOrderId.value = expandedOrderId.value === orderId ? null : orderId
}

function goToDetail(orderId: string) {
  router.push(`/orders/${orderId}`)
}

function getStatusColor(status: string) {
  const colors: Record<string, string> = {
    pending: 'badge-warning',
    paid: 'badge-primary',
    completed: 'badge-success',
    cancelled: 'badge-danger',
    refunding: 'badge-warning',
    refunded: 'badge-danger',
  }
  return colors[status] || 'badge-primary'
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-dark-900">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">我的订单</h1>

      <!-- Tabs -->
      <div class="bg-white dark:bg-dark-800 rounded-xl mb-6">
        <div class="flex overflow-x-auto">
          <button
            v-for="tab in tabs"
            :key="tab.value"
            class="px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors relative"
            :class="activeTab === tab.value
              ? 'text-primary-600 dark:text-primary-400'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'"
            @click="activeTab = tab.value as OrderStatus | 'all'"
          >
            {{ tab.label }}
            <div v-if="activeTab === tab.value" class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <EmptyState
        v-if="filteredOrders.length === 0"
        icon="📦"
        title="暂无订单"
        description="快去挑选心仪的商品吧"
        action-text="去购物"
        @action="router.push('/products')"
      />

      <!-- Orders List -->
      <div v-else class="space-y-4">
        <div
          v-for="order in filteredOrders"
          :key="order.id"
          class="bg-white dark:bg-dark-800 rounded-xl overflow-hidden"
        >
          <!-- Order Header -->
          <div
            class="p-4 sm:p-6 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors"
            @click="toggleExpand(order.id)"
          >
            <div class="flex items-center gap-4">
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-sm font-medium text-gray-900 dark:text-white">
                    {{ order.orderNo }}
                  </span>
                  <span class="badge" :class="getStatusColor(order.status)">
                    {{ formatOrderStatus(order.status).text }}
                  </span>
                </div>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ formatDate(order.createdAt) }}
                </p>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <span class="text-lg font-bold text-red-600">
                ¥{{ formatPrice(order.total) }}
              </span>
              <svg
                class="w-5 h-5 text-gray-400 transition-transform"
                :class="{ 'rotate-180': expandedOrderId === order.id }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <!-- Order Details (Expanded) -->
          <Transition
            enter-active-class="transition-all duration-200"
            enter-from-class="max-h-0 opacity-0"
            enter-to-class="max-h-[1000px] opacity-100"
            leave-active-class="transition-all duration-200"
            leave-from-class="max-h-[1000px] opacity-100"
            leave-to-class="max-h-0 opacity-0"
          >
            <div v-if="expandedOrderId === order.id" class="border-t border-gray-200 dark:border-dark-700 overflow-hidden">
              <!-- Items -->
              <div class="p-4 sm:p-6 space-y-3">
                <div
                  v-for="item in order.items"
                  :key="item.productId"
                  class="flex items-center gap-4"
                >
                  <img
                    :src="item.productImage"
                    :alt="item.productName"
                    class="w-12 h-12 rounded-lg object-cover"
                  />
                  <div class="flex-1 min-w-0">
                    <h4 class="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                      {{ item.productName }}
                    </h4>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      {{ item.spec }} × {{ item.quantity }}
                    </p>
                  </div>
                  <span class="text-sm font-medium text-gray-900 dark:text-white">
                    ¥{{ formatPrice(item.price * item.quantity) }}
                  </span>
                </div>
              </div>

              <!-- Card Keys -->
              <div v-if="order.cardKeys.length > 0" class="px-4 sm:px-6 pb-4 sm:pb-6">
                <CardKeyDisplay :card-keys="order.cardKeys" />
              </div>

              <!-- Actions -->
              <div class="px-4 sm:px-6 pb-4 sm:pb-6 flex flex-wrap gap-2">
                <button
                  class="btn-secondary text-sm"
                  @click="goToDetail(order.id)"
                >
                  查看详情
                </button>
                <button
                  v-if="order.status === 'pending'"
                  class="btn-primary text-sm"
                  @click="orderStore.payOrder(order.id)"
                >
                  立即支付
                </button>
                <button
                  v-if="order.status === 'pending'"
                  class="btn-danger text-sm"
                  @click="orderStore.cancelOrder(order.id)"
                >
                  取消订单
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>
