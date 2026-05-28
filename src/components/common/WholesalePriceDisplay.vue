<script setup lang="ts">
import { computed } from 'vue'
import type { WholesaleTier } from '@/types'
import { formatPrice } from '@/utils/format'

interface Props {
  tiers: WholesaleTier[]
  currentQuantity: number
  basePrice: number
}

const props = defineProps<Props>()

// Find the current tier based on quantity
const currentTier = computed(() => {
  for (const tier of props.tiers) {
    if (
      props.currentQuantity >= tier.minQuantity &&
      (tier.maxQuantity === null || props.currentQuantity <= tier.maxQuantity)
    ) {
      return tier
    }
  }
  return null
})

// Calculate savings
const savings = computed(() => {
  if (!currentTier.value) return 0
  return (props.basePrice - currentTier.value.price) * props.currentQuantity
})

// Calculate discount percentage
const discountPercent = computed(() => {
  if (!currentTier.value) return 0
  return Math.round((1 - currentTier.value.price / props.basePrice) * 100)
})

// Format quantity range
function formatRange(tier: WholesaleTier): string {
  if (tier.maxQuantity === null) {
    return `${tier.minQuantity}件及以上`
  }
  if (tier.minQuantity === tier.maxQuantity) {
    return `${tier.minQuantity}件`
  }
  return `${tier.minQuantity}-${tier.maxQuantity}件`
}

// Check if a tier is the current active tier
function isActiveTier(tier: WholesaleTier): boolean {
  return currentTier.value?.minQuantity === tier.minQuantity
}
</script>

<template>
  <div class="bg-gray-50 dark:bg-dark-800 rounded-xl p-4">
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">批发价格</h3>
      <span v-if="savings > 0" class="text-xs text-green-600 dark:text-green-400">
        可省 ¥{{ formatPrice(savings) }}
      </span>
    </div>
    
    <!-- Price tiers table -->
    <div class="space-y-2">
      <div
        v-for="tier in tiers"
        :key="tier.minQuantity"
        class="flex items-center justify-between py-2 px-3 rounded-lg transition-colors"
        :class="isActiveTier(tier)
          ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800'
          : 'bg-white dark:bg-dark-700'"
      >
        <span class="text-sm" :class="isActiveTier(tier) ? 'text-primary-700 dark:text-primary-300 font-medium' : 'text-gray-600 dark:text-gray-400'">
          {{ formatRange(tier) }}
        </span>
        <div class="flex items-center gap-2">
          <span class="text-sm font-semibold" :class="isActiveTier(tier) ? 'text-primary-600 dark:text-primary-400' : 'text-gray-900 dark:text-white'">
            ¥{{ formatPrice(tier.price) }}/件
          </span>
          <span
            v-if="tier.price < basePrice"
            class="text-xs px-1.5 py-0.5 rounded"
            :class="isActiveTier(tier)
              ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300'
              : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'"
          >
            -{{ Math.round((1 - tier.price / basePrice) * 100) }}%
          </span>
        </div>
      </div>
    </div>
    
    <!-- Current price highlight -->
    <div v-if="currentTier && currentQuantity > 0" class="mt-3 pt-3 border-t border-gray-200 dark:border-dark-600">
      <div class="flex items-center justify-between">
        <span class="text-sm text-gray-600 dark:text-gray-400">
          当前{{ currentQuantity }}件，单价
        </span>
        <div class="flex items-center gap-2">
          <span class="text-lg font-bold text-primary-600 dark:text-primary-400">
            ¥{{ formatPrice(currentTier.price) }}
          </span>
          <span v-if="currentTier.price < basePrice" class="text-sm text-gray-400 line-through">
            ¥{{ formatPrice(basePrice) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
