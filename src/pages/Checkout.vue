<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore, useOrderStore, useUserStore } from '@/stores'
import { useToast } from '@/composables'
import { formatPrice, isValidEmail, isValidPhone } from '@/utils/format'
import { paymentMethods } from '@/mock/payment'
import EmptyState from '@/components/common/EmptyState.vue'

const router = useRouter()
const cartStore = useCartStore()
const orderStore = useOrderStore()
const userStore = useUserStore()
const toast = useToast()

const email = ref(userStore.user?.email || '')
const phone = ref(userStore.user?.phone || '')
const selectedPayment = ref('alipay')
const couponCode = ref('')
const couponDiscount = ref(0)
const note = ref('')
const isProcessing = ref(false)
const emailError = ref('')
const phoneError = ref('')

const selectedItems = computed(() => cartStore.selectedItems)
const subtotal = computed(() => cartStore.subtotal)
const total = computed(() => subtotal.value - couponDiscount.value)

const hasSelectedItems = computed(() => selectedItems.value.length > 0)

function validateEmail() {
  if (!email.value) {
    emailError.value = '请输入邮箱地址'
    return false
  }
  if (!isValidEmail(email.value)) {
    emailError.value = '请输入有效的邮箱地址'
    return false
  }
  emailError.value = ''
  return true
}

function validatePhone() {
  if (phone.value && !isValidPhone(phone.value)) {
    phoneError.value = '请输入有效的手机号'
    return false
  }
  phoneError.value = ''
  return true
}

function applyCoupon() {
  if (!couponCode.value) {
    toast.warning('请输入优惠券码')
    return
  }
  
  const result = userStore.applyCoupon(couponCode.value, subtotal.value)
  if (result.success) {
    couponDiscount.value = result.discount
    toast.success(result.message)
  } else {
    toast.error(result.message)
  }
}

async function submitOrder() {
  if (!validateEmail() || !validatePhone()) return
  
  if (!hasSelectedItems.value) {
    toast.warning('没有可结算的商品')
    return
  }

  isProcessing.value = true

  // Simulate processing
  await new Promise(resolve => setTimeout(resolve, 2000))

  // Create order items
  const orderItems = selectedItems.value.map(item => ({
    productId: item.product.id,
    productName: item.product.name,
    productImage: item.product.image,
    spec: item.selectedSpec,
    price: item.product.price,
    quantity: item.quantity,
  }))

  // Create order
  const order = orderStore.createOrder(
    orderItems,
    email.value,
    phone.value || undefined,
    paymentMethods.find(p => p.id === selectedPayment.value)?.name || '',
    subtotal.value,
    couponDiscount.value,
    note.value || undefined
  )

  // Mark as paid (mock)
  orderStore.payOrder(order.id)

  // Use coupon if applied
  if (couponCode.value) {
    userStore.useCoupon(couponCode.value)
  }

  // Clear cart items
  cartStore.clearSelected()

  isProcessing.value = false

  // Redirect to success page
  router.push(`/orders/success/${order.id}`)
}

function goToCart() {
  router.push('/cart')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-dark-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">确认订单</h1>

      <!-- Empty State -->
      <EmptyState
        v-if="!hasSelectedItems"
        icon="📋"
        title="没有可结算的商品"
        description="请返回购物车选择商品"
        action-text="返回购物车"
        @action="goToCart"
      />

      <!-- Checkout Content -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left: Order Info -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Contact Info -->
          <div class="bg-white dark:bg-dark-800 rounded-xl p-6">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">联系信息</h2>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  邮箱地址 <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="email"
                  type="email"
                  placeholder="用于接收卡密信息"
                  class="input"
                  :class="{ 'border-red-500': emailError }"
                  @blur="validateEmail"
                />
                <p v-if="emailError" class="mt-1 text-sm text-red-500">{{ emailError }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  手机号码 <span class="text-gray-400">(选填)</span>
                </label>
                <input
                  v-model="phone"
                  type="tel"
                  placeholder="用于接收短信通知"
                  class="input"
                  :class="{ 'border-red-500': phoneError }"
                  @blur="validatePhone"
                />
                <p v-if="phoneError" class="mt-1 text-sm text-red-500">{{ phoneError }}</p>
              </div>
            </div>
          </div>

          <!-- Payment Method -->
          <div class="bg-white dark:bg-dark-800 rounded-xl p-6">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">支付方式</h2>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                v-for="method in paymentMethods"
                :key="method.id"
                class="flex items-center gap-3 p-4 rounded-lg border-2 transition-colors"
                :class="selectedPayment === method.id
                  ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-200 dark:border-dark-700 hover:border-gray-300 dark:hover:border-dark-600'"
                @click="selectedPayment = method.id"
              >
                <span class="text-2xl">{{ method.icon }}</span>
                <div class="text-left">
                  <div class="font-medium text-gray-900 dark:text-white">{{ method.name }}</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">{{ method.description }}</div>
                </div>
              </button>
            </div>
          </div>

          <!-- Order Items -->
          <div class="bg-white dark:bg-dark-800 rounded-xl p-6">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">订单商品</h2>
            <div class="space-y-4">
              <div
                v-for="item in selectedItems"
                :key="item.id"
                class="flex items-center gap-4"
              >
                <img
                  :src="item.product.image"
                  :alt="item.product.name"
                  class="w-16 h-16 rounded-lg object-cover"
                />
                <div class="flex-1 min-w-0">
                  <h3 class="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                    {{ item.product.name }}
                  </h3>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    {{ item.selectedSpec }} × {{ item.quantity }}
                  </p>
                </div>
                <span class="font-medium text-gray-900 dark:text-white">
                  ¥{{ formatPrice(item.product.price * item.quantity) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Coupon -->
          <div class="bg-white dark:bg-dark-800 rounded-xl p-6">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">优惠券</h2>
            <div class="flex gap-2">
              <input
                v-model="couponCode"
                type="text"
                placeholder="请输入优惠券码"
                class="input flex-1"
              />
              <button
                class="btn-secondary px-6"
                @click="applyCoupon"
              >
                使用
              </button>
            </div>
            <div class="mt-3 text-sm text-gray-500 dark:text-gray-400">
              可用优惠券：NEWUSER5(新用户5元)、SAVE10(满50减10)
            </div>
          </div>

          <!-- Note -->
          <div class="bg-white dark:bg-dark-800 rounded-xl p-6">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">订单备注</h2>
            <textarea
              v-model="note"
              placeholder="如有特殊要求，请在此备注（选填）"
              rows="3"
              class="input"
            />
          </div>
        </div>

        <!-- Right: Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white dark:bg-dark-800 rounded-xl p-6 sticky top-24">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">订单摘要</h3>
            
            <div class="space-y-3 mb-6">
              <div class="flex justify-between text-sm">
                <span class="text-gray-500 dark:text-gray-400">商品小计</span>
                <span class="text-gray-900 dark:text-white">¥{{ formatPrice(subtotal) }}</span>
              </div>
              <div v-if="couponDiscount > 0" class="flex justify-between text-sm">
                <span class="text-gray-500 dark:text-gray-400">优惠券</span>
                <span class="text-green-600">-¥{{ formatPrice(couponDiscount) }}</span>
              </div>
              <hr class="border-gray-200 dark:border-dark-700" />
              <div class="flex justify-between">
                <span class="font-medium text-gray-900 dark:text-white">应付总额</span>
                <span class="text-2xl font-bold text-red-600">¥{{ formatPrice(total) }}</span>
              </div>
            </div>

            <button
              class="w-full btn-primary py-3 text-lg"
              :disabled="isProcessing"
              @click="submitOrder"
            >
              <span v-if="isProcessing" class="flex items-center justify-center gap-2">
                <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                处理中...
              </span>
              <span v-else>立即支付</span>
            </button>

            <!-- Security badges -->
            <div class="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
              <span class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                SSL加密
              </span>
              <span class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                安全支付
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
