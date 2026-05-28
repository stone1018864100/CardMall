import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false)

  // Initialize from system preference
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('theme')
    if (saved) {
      isDark.value = saved === 'dark'
    } else {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
  }

  // Watch for changes and update DOM
  watch(isDark, (value) => {
    if (typeof document !== 'undefined') {
      if (value) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      localStorage.setItem('theme', value ? 'dark' : 'light')
    }
  }, { immediate: true })

  function toggle() {
    isDark.value = !isDark.value
  }

  function setDark(value: boolean) {
    isDark.value = value
  }

  return {
    isDark,
    toggle,
    setDark,
  }
})
