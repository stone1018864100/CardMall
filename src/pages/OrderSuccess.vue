<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useOrderStore } from '@/stores'
import { formatDate, formatPrice } from '@/utils/format'
import CardKeyDisplay from '@/components/common/CardKeyDisplay.vue'
import EmptyState from '@/components/common/EmptyState.vue'

const route = useRoute()
const router = useRouter()
const orderStore = useOrderStore()

const orderId = route.params.id as string
const order = computed(() => orderStore.getOrderById(orderId))

function goToOrders() {
  router.push('/orders')
}

function goToProducts() {
  router.push('/products')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-dark-900">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Empty State -->
      <EmptyState
        v-if="!order"
        icon="❌"
        title="订单不存在"
        description="请检查订单ID是否正确"
        action-text="查看我的订单"
        @action="goToOrders"
      />

      <!-- Success Content -->
      <div v-else>
        <!-- Success Header -->
        <div class="text-center mb-8">
          <div class="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-in">
            <svg class="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            支付成功！
          </h1>
          <p class="text-gray-500 dark:text-gray-400">
            您的订单已成功支付，卡密信息如下
          </p>
        </div>

        <!-- Order Info -->
        <div class="bg-white dark:bg-dark-800 rounded-xl p-6 mb-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">订单信息</h2>
            <span class="badge-success">已完成</span>
          </div>
          
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span class="text-gray-500 dark:text-gray-400">订单编号</span>
              <p class="font-medium text-gray-900 dark:text-white">{{ order.orderNo }}</p>
            </div>
            <div>
              <span class="text-gray-500 dark:text-gray-400">下单时间</span>
              <p class="font-medium text-gray-900 dark:text-white">{{ formatDate(order.createdAt) }}</p>
            </div>
            <div>
              <span class="text-gray-500 dark:text-gray-400">支付方式</span>
              <p class="font-medium text-gray-900 dark:text-white">{{ order.paymentMethod }}</p>
            </div>
            <div>
              <span class="text-gray-500 dark:text-gray-400">支付金额</span>
              <p class="font-medium text-red-600">¥{{ formatPrice(order.total) }}</p>
            </div>
          </div>
        </div>

        <!-- Order Items -->
        <div class="bg-white dark:bg-dark-800 rounded-xl p-6 mb-6">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">商品信息</h2>
          <div class="space-y-3">
            <div
              v-for="item in order.items"
              :key="item.productId"
              class="flex items-center gap-4"
            >
              <img
                :src="item.productImage"
                :alt="item.productName"
                class="w-16 h-16 rounded-lg object-cover"
              />
              <div class="flex-1">
                <h3 class="text-sm font-medium text-gray-900 dark:text-white">{{ item.productName }}</h3>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ item.spec }} × {{ item.quantity }}</p>
              </div>
              <span class="font-medium text-gray-900 dark:text-white">
                ¥{{ formatPrice(item.price * item.quantity) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Card Keys -->
        <div class="bg-white dark:bg-dark-800 rounded-xl p-6 mb-6">
          <CardKeyDisplay :card-keys="order.cardKeys" />
        </div>

        <!-- Email Notice -->
        <div class="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-6">
          <div class="flex items-start gap-3">
            <svg class="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <div>
              <p class="text-sm text-blue-800 dark:text-blue-300">
                卡密信息已发送至您的邮箱：<strong>{{ order.email }}</strong>
              </p>
              <p class="text-xs text-blue-600 dark:text-blue-400 mt-1">
                请查收邮件，如未收到请检查垃圾邮件箱
              </p>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row gap-3">
          <button
            class="flex-1 btn-primary py-3"
            @click="goToOrders"
          >
            查看我的订单
          </button>
          <button
            class="flex-1 btn-secondary py-3"
            @click="goToProducts"
          >
            继续购物
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
