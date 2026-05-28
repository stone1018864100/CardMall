import { ref } from 'vue'

export function useClipboard() {
  const copied = ref(false)
  const error = ref<Error | null>(null)

  async function copy(text: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(text)
      copied.value = true
      error.value = null
      
      // Reset copied state after 2 seconds
      setTimeout(() => {
        copied.value = false
      }, 2000)
      
      return true
    } catch (err) {
      // Fallback for older browsers
      try {
        const textArea = document.createElement('textarea')
        textArea.value = text
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        textArea.style.top = '-999999px'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        
        copied.value = true
        error.value = null
        
        setTimeout(() => {
          copied.value = false
        }, 2000)
        
        return true
      } catch (fallbackErr) {
        error.value = fallbackErr as Error
        copied.value = false
        return false
      }
    }
  }

  function reset() {
    copied.value = false
    error.value = null
  }

  return {
    copied,
    error,
    copy,
    reset,
  }
}
