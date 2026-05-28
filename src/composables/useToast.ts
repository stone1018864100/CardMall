import { ref } from 'vue'
import type { Toast, ToastType } from '@/types'

const toasts = ref<Toast[]>([])
let toastId = 0

export function useToast() {
  function addToast(type: ToastType, message: string, duration: number = 3000) {
    const id = `toast-${++toastId}`
    const toast: Toast = { id, type, message, duration }
    toasts.value.push(toast)

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }

    return id
  }

  function removeToast(id: string) {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  function success(message: string, duration?: number) {
    return addToast('success', message, duration)
  }

  function error(message: string, duration?: number) {
    return addToast('error', message, duration)
  }

  function warning(message: string, duration?: number) {
    return addToast('warning', message, duration)
  }

  function info(message: string, duration?: number) {
    return addToast('info', message, duration)
  }

  function clear() {
    toasts.value = []
  }

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
    clear,
  }
}
