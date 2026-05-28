import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product } from '@/types'

export const useFavoriteStore = defineStore('favorite', () => {
  const favorites = ref<Product[]>([])

  // Computed
  const count = computed(() => favorites.value.length)

  // Actions
  function addFavorite(product: Product) {
    if (!isFavorite(product.id)) {
      favorites.value.push(product)
    }
  }

  function removeFavorite(productId: string) {
    const index = favorites.value.findIndex(p => p.id === productId)
    if (index > -1) {
      favorites.value.splice(index, 1)
    }
  }

  function toggleFavorite(product: Product) {
    if (isFavorite(product.id)) {
      removeFavorite(product.id)
    } else {
      addFavorite(product)
    }
  }

  function isFavorite(productId: string): boolean {
    return favorites.value.some(p => p.id === productId)
  }

  function clearFavorites() {
    favorites.value = []
  }

  return {
    favorites,
    count,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearFavorites,
  }
}, {
  persist: true,
})
