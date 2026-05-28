import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CartItem, Product } from '@/types'
import { getWholesalePrice } from '@/utils/format'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  // Helper function to get the effective price for a cart item
  function getItemPrice(item: CartItem): number {
    const basePrice = item.product.flashSalePrice || item.product.price
    return getWholesalePrice(item.product.wholesaleTiers, item.quantity, basePrice)
  }

  // Computed
  const itemCount = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))
  
  const selectedItems = computed(() => items.value.filter(item => item.selected))
  
  const selectedCount = computed(() => selectedItems.value.reduce((sum, item) => sum + item.quantity, 0))
  
  // Calculate subtotal with wholesale pricing
  const subtotal = computed(() => 
    selectedItems.value.reduce((sum, item) => sum + getItemPrice(item) * item.quantity, 0)
  )
  
  // Calculate discount from original price
  const totalDiscount = computed(() => 
    selectedItems.value.reduce((sum, item) => sum + (item.product.originalPrice - getItemPrice(item)) * item.quantity, 0)
  )
  
  // Calculate wholesale savings (compared to base price)
  const wholesaleSavings = computed(() => 
    selectedItems.value.reduce((sum, item) => {
      const basePrice = item.product.flashSalePrice || item.product.price
      const wholesalePrice = getItemPrice(item)
      return sum + (basePrice - wholesalePrice) * item.quantity
    }, 0)
  )
  
  const total = computed(() => subtotal.value)

  // Actions
  function addItem(product: Product, spec: string, quantity: number = 1) {
    const existingItem = items.value.find(
      item => item.product.id === product.id && item.selectedSpec === spec
    )

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      items.value.push({
        id: `${product.id}-${spec}-${Date.now()}`,
        product,
        selectedSpec: spec,
        quantity,
        selected: true,
      })
    }
  }

  function removeItem(id: string) {
    const index = items.value.findIndex(item => item.id === id)
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }

  function removeSelected() {
    items.value = items.value.filter(item => !item.selected)
  }

  function updateQuantity(id: string, quantity: number) {
    const item = items.value.find(item => item.id === id)
    if (item) {
      item.quantity = Math.max(1, Math.min(quantity, item.product.stock))
    }
  }

  function toggleSelect(id: string) {
    const item = items.value.find(item => item.id === id)
    if (item) {
      item.selected = !item.selected
    }
  }

  function toggleSelectAll() {
    const allSelected = items.value.every(item => item.selected)
    items.value.forEach(item => {
      item.selected = !allSelected
    })
  }

  function clearCart() {
    items.value = []
  }

  function clearSelected() {
    items.value = items.value.filter(item => !item.selected)
  }

  return {
    items,
    itemCount,
    selectedItems,
    selectedCount,
    subtotal,
    totalDiscount,
    wholesaleSavings,
    total,
    getItemPrice,
    addItem,
    removeItem,
    removeSelected,
    updateQuantity,
    toggleSelect,
    toggleSelectAll,
    clearCart,
    clearSelected,
  }
}, {
  persist: true,
})
