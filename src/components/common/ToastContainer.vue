<script setup lang="ts">
import { useToast } from '@/composables'

const { toasts, removeToast } = useToast()

function getIcon(type: string) {
  const icons: Record<string, string> = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  }
  return icons[type] || icons.info
}

function getClasses(type: string) {
  const classes: Record<string, string> = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
  }
  return classes[type] || classes.info
}
</script>

<template>
  <div class="fixed top-4 right-4 z-[9999] flex flex-col gap-2 max-w-sm">
    <TransitionGroup name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white animate-slide-down"
        :class="getClasses(toast.type)"
        @click="removeToast(toast.id)"
      >
        <span class="text-lg font-bold">{{ getIcon(toast.type) }}</span>
        <span class="flex-1 text-sm">{{ toast.message }}</span>
        <button class="opacity-70 hover:opacity-100 transition-opacity">✕</button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active {
  transition: all 0.3s ease;
}

.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.toast-move {
  transition: transform 0.3s ease;
}
</style>
