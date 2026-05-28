<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores'
import { useToast } from '@/composables'
import { formatPrice } from '@/utils/format'
import EmptyState from '@/components/common/EmptyState.vue'

const router = useRouter()
const cartStore = useCartStore()
const toast = useToast()

const hasSelectedItems = computed(() => cartStore.selectedItems.length > 0)
const allSelected = computed(() => cartStore.items.length > 0 && cartStore.items.every(item => item.selected))

function goToProducts() {
  router.push('/products')
}

function goToCheckout() {
  if (!hasSelectedItems.value) {
    toast.warning('请选择要结算的商品')
    return
  }
  router.push('/checkout')
}

function removeItem(id: string) {
  cartStore.removeItem(id)
  toast.success('已从购物车移除')
}

function removeSelected() {
  cartStore.removeSelected()
  toast.success('已删除选中商品')
}

function updateQuantity(id: string, quantity: number) {
  cartStore.updateQuantity(id, quantity)
}

function toggleSelect(id: string) {
  cartStore.toggleSelect(id)
}

function toggleSelectAll() {
  cartStore.toggleSelectAll()
}

function goToDetail(id: string) {
  router.push(`/products/${id}`)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-dark-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">购物车</h1>

      <!-- Empty State -->
      <EmptyState
        v-if="cartStore.items.length === 0"
        icon="🛒"
        title="购物车是空的"
        description="快去挑选心仪的商品吧"
        action-text="去逛逛"
        @action="goToProducts"
      />

      <!-- Cart Content -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2 space-y-4">
          <!-- Select All & Actions -->
          <div class="bg-white dark:bg-dark-800 rounded-xl p-4 flex items-center justify-between">
            <label class="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                :checked="allSelected"
                class="w-5 h-5 rounded border-gray-300 dark:border-dark-600 text-primary-600 focus:ring-primary-500"
                @change="toggleSelectAll"
              />
              <span class="text-sm text-gray-700 dark:text-gray-300">全选</span>
            </label>
            <button
              v-if="hasSelectedItems"
              class="text-sm text-red-600 hover:text-red-700 dark:text-red-400"
              @click="removeSelected"
            >
              删除选中
            </button>
          </div>

          <!-- Items List -->
          <div class="space-y-4">
            <div
              v-for="item in cartStore.items"
              :key="item.id"
              class="bg-white dark:bg-dark-800 rounded-xl p-4 flex gap-4"
            >
              <!-- Checkbox -->
              <input
                type="checkbox"
                :checked="item.selected"
                class="w-5 h-5 rounded border-gray-300 dark:border-dark-600 text-primary-600 focus:ring-primary-500 mt-4"
                @change="toggleSelect(item.id)"
              />

              <!-- Image -->
              <div
                class="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer"
                @click="goToDetail(item.product.id)"
              >
                <img
                  :src="item.product.image"
                  :alt="item.product.name"
                  class="w-full h-full object-cover"
                />
              </div>

              <!-- Info -->
              <div class="flex-1 min-w-0">
                <h3
                  class="text-sm sm:text-base font-medium text-gray-900 dark:text-white line-clamp-2 cursor-pointer hover:text-primary-600 dark:hover:text-primary-400"
                  @click="goToDetail(item.product.id)"
                >
                  {{ item.product.name }}
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  规格：{{ item.selectedSpec }}
                </p>
                <div class="flex items-center justify-between mt-4">
                  <div>
                    <span class="text-lg font-bold text-red-600">
                      ¥{{ formatPrice(cartStore.getItemPrice(item)) }}
                    </span>
                    <span v-if="cartStore.getItemPrice(item) < (item.product.flashSalePrice || item.product.price)" class="text-xs text-green-600 ml-1">
                      批发价
                    </span>
                  </div>

                  <!-- Quantity -->
                  <div class="flex items-center gap-2">
                    <button
                      class="w-8 h-8 rounded border border-gray-300 dark:border-dark-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
                      :disabled="item.quantity <= 1"
                      @click="updateQuantity(item.id, item.quantity - 1)"
                    >
                      -
                    </button>
                    <span class="w-10 text-center text-sm">{{ item.quantity }}</span>
                    <button
                      class="w-8 h-8 rounded border border-gray-300 dark:border-dark-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
                      :disabled="item.quantity >= item.product.stock"
                      @click="updateQuantity(item.id, item.quantity + 1)"
                    >
                      +
                    </button>
                  </div>

                  <!-- Remove -->
                  <button
                    class="text-gray-400 hover:text-red-500 transition-colors"
                    @click="removeItem(item.id)"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white dark:bg-dark-800 rounded-xl p-6 sticky top-24">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">订单摘要</h3>
            
            <div class="space-y-3 mb-6">
              <div class="flex justify-between text-sm">
                <span class="text-gray-500 dark:text-gray-400">商品数量</span>
                <span class="text-gray-900 dark:text-white">{{ cartStore.selectedCount }} 件</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-500 dark:text-gray-400">商品小计</span>
                <span class="text-gray-900 dark:text-white">¥{{ formatPrice(cartStore.subtotal) }}</span>
              </div>
              <div v-if="cartStore.totalDiscount > 0" class="flex justify-between text-sm">
                <span class="text-gray-500 dark:text-gray-400">优惠金额</span>
                <span class="text-green-600">-¥{{ formatPrice(cartStore.totalDiscount) }}</span>
              </div>
              <div v-if="cartStore.wholesaleSavings > 0" class="flex justify-between text-sm">
                <span class="text-gray-500 dark:text-gray-400">批发优惠</span>
                <span class="text-green-600">-¥{{ formatPrice(cartStore.wholesaleSavings) }}</span>
              </div>
              <hr class="border-gray-200 dark:border-dark-700" />
              <div class="flex justify-between">
                <span class="font-medium text-gray-900 dark:text-white">应付总额</span>
                <span class="text-2xl font-bold text-red-600">¥{{ formatPrice(cartStore.total) }}</span>
              </div>
            </div>

            <button
              class="w-full btn-primary py-3 text-lg"
              :disabled="!hasSelectedItems"
              @click="goToCheckout"
            >
              去结算 ({{ cartStore.selectedCount }})
            </button>

            <button
              class="w-full btn-secondary py-3 mt-3"
              @click="goToProducts"
            >
              继续购物
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
