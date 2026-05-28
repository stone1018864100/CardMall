<script setup lang="ts">
import { watch } from 'vue'

interface Props {
  show: boolean
  title?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl'
  closable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  maxWidth: 'md',
  closable: true,
})

const emit = defineEmits<{
  close: []
}>()

const maxWidthClasses: Record<string, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
}

watch(() => props.show, (value) => {
  if (value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

function close() {
  if (props.closable) {
    emit('close')
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/50 backdrop-blur-sm"
          @click="close"
        />
        
        <!-- Modal -->
        <div
          class="relative w-full bg-white dark:bg-dark-800 rounded-xl shadow-xl animate-scale-in"
          :class="maxWidthClasses[maxWidth]"
        >
          <!-- Header -->
          <div v-if="title || closable" class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-dark-700">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ title }}</h3>
            <button
              v-if="closable"
              class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
              @click="close"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <!-- Content -->
          <div class="px-6 py-4">
            <slot />
          </div>
          
          <!-- Footer -->
          <div v-if="$slots.footer" class="px-6 py-4 border-t border-gray-200 dark:border-dark-700">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active {
  transition: all 0.3s ease;
}

.modal-leave-active {
  transition: all 0.2s ease;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .relative {
  transform: scale(0.95);
  opacity: 0;
}

.modal-leave-to .relative {
  transform: scale(0.95);
  opacity: 0;
}
</style>
