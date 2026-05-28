<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useOrderStore } from '@/stores'
import { formatDate, formatPrice, formatOrderStatus } from '@/utils/format'
import CardKeyDisplay from '@/components/common/CardKeyDisplay.vue'
import EmptyState from '@/components/common/EmptyState.vue'

const route = useRoute()
const router = useRouter()
const orderStore = useOrderStore()

const orderId = route.params.id as string
const order = computed(() => orderStore.getOrderById(orderId))

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

function goToOrders() {
  router.push('/orders')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-dark-900">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <router-link to="/" class="hover:text-primary-600 dark:hover:text-primary-400">首页</router-link>
        <span>/</span>
        <router-link to="/orders" class="hover:text-primary-600 dark:hover:text-primary-400">我的订单</router-link>
        <span>/</span>
        <span class="text-gray-900 dark:text-white">订单详情</span>
      </nav>

      <!-- Empty State -->
      <EmptyState
        v-if="!order"
        icon="❌"
        title="订单不存在"
        description="请检查订单ID是否正确"
        action-text="返回订单列表"
        @action="goToOrders"
      />

      <!-- Order Detail -->
      <div v-else>
        <div class="flex items-center justify-between mb-6">
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">订单详情</h1>
          <span class="badge text-sm" :class="getStatusColor(order.status)">
            {{ formatOrderStatus(order.status).text }}
          </span>
        </div>

        <!-- Order Info -->
        <div class="bg-white dark:bg-dark-800 rounded-xl p-6 mb-6">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">订单信息</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span class="text-sm text-gray-500 dark:text-gray-400">订单编号</span>
              <p class="font-medium text-gray-900 dark:text-white">{{ order.orderNo }}</p>
            </div>
            <div>
              <span class="text-sm text-gray-500 dark:text-gray-400">下单时间</span>
              <p class="font-medium text-gray-900 dark:text-white">{{ formatDate(order.createdAt) }}</p>
            </div>
            <div>
              <span class="text-sm text-gray-500 dark:text-gray-400">支付方式</span>
              <p class="font-medium text-gray-900 dark:text-white">{{ order.paymentMethod || '-' }}</p>
            </div>
            <div>
              <span class="text-sm text-gray-500 dark:text-gray-400">联系邮箱</span>
              <p class="font-medium text-gray-900 dark:text-white">{{ order.email }}</p>
            </div>
            <div v-if="order.paidAt">
              <span class="text-sm text-gray-500 dark:text-gray-400">支付时间</span>
              <p class="font-medium text-gray-900 dark:text-white">{{ formatDate(order.paidAt) }}</p>
            </div>
            <div v-if="order.completedAt">
              <span class="text-sm text-gray-500 dark:text-gray-400">完成时间</span>
              <p class="font-medium text-gray-900 dark:text-white">{{ formatDate(order.completedAt) }}</p>
            </div>
          </div>
        </div>

        <!-- Order Items -->
        <div class="bg-white dark:bg-dark-800 rounded-xl p-6 mb-6">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">商品信息</h2>
          <div class="space-y-4">
            <div
              v-for="item in order.items"
              :key="item.productId"
              class="flex items-center gap-4"
            >
              <img
                :src="item.productImage"
                :alt="item.productName"
                class="w-20 h-20 rounded-lg object-cover"
              />
              <div class="flex-1">
                <h3 class="font-medium text-gray-900 dark:text-white">{{ item.productName }}</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  规格：{{ item.spec }} | 数量：{{ item.quantity }}
                </p>
              </div>
              <span class="font-medium text-gray-900 dark:text-white">
                ¥{{ formatPrice(item.price * item.quantity) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Price Summary -->
        <div class="bg-white dark:bg-dark-800 rounded-xl p-6 mb-6">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">金额信息</h2>
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-500 dark:text-gray-400">商品小计</span>
              <span class="text-gray-900 dark:text-white">¥{{ formatPrice(order.subtotal) }}</span>
            </div>
            <div v-if="order.discount > 0" class="flex justify-between text-sm">
              <span class="text-gray-500 dark:text-gray-400">优惠金额</span>
              <span class="text-green-600">-¥{{ formatPrice(order.discount) }}</span>
            </div>
            <hr class="border-gray-200 dark:border-dark-700" />
            <div class="flex justify-between">
              <span class="font-medium text-gray-900 dark:text-white">实付金额</span>
              <span class="text-xl font-bold text-red-600">¥{{ formatPrice(order.total) }}</span>
            </div>
          </div>
        </div>

        <!-- Card Keys -->
        <div v-if="order.cardKeys.length > 0" class="bg-white dark:bg-dark-800 rounded-xl p-6 mb-6">
          <CardKeyDisplay :card-keys="order.cardKeys" />
        </div>

        <!-- Order Timeline -->
        <div class="bg-white dark:bg-dark-800 rounded-xl p-6 mb-6">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">订单状态</h2>
          <div class="relative">
            <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-dark-600" />
            <div class="space-y-6">
              <div class="flex items-start gap-4 relative">
                <div class="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center flex-shrink-0 relative z-10">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">创建订单</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ formatDate(order.createdAt) }}</p>
                </div>
              </div>
              <div v-if="order.paidAt" class="flex items-start gap-4 relative">
                <div class="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center flex-shrink-0 relative z-10">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">支付成功</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ formatDate(order.paidAt) }}</p>
                </div>
              </div>
              <div v-if="order.completedAt" class="flex items-start gap-4 relative">
                <div class="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0 relative z-10">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">订单完成</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ formatDate(order.completedAt) }}</p>
                </div>
              </div>
              <div v-if="order.cancelledAt" class="flex items-start gap-4 relative">
                <div class="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0 relative z-10">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">订单取消</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ formatDate(order.cancelledAt) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex flex-wrap gap-3">
          <button class="btn-secondary" @click="goToOrders">
            返回订单列表
          </button>
          <button
            v-if="order.status === 'pending'"
            class="btn-primary"
            @click="orderStore.payOrder(order.id)"
          >
            立即支付
          </button>
          <button
            v-if="order.status === 'pending'"
            class="btn-danger"
            @click="orderStore.cancelOrder(order.id)"
          >
            取消订单
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
