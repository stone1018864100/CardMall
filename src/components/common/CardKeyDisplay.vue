<script setup lang="ts">
import { ref } from 'vue'
import { useClipboard } from '@/composables'
import { useToast } from '@/composables'
import { maskCardKey } from '@/utils/format'

interface Props {
  cardKeys: string[]
  showMasked?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showMasked: true,
})

const toast = useToast()
const { copy, copied } = useClipboard()
const revealedKeys = ref<Set<number>>(new Set())

function toggleReveal(index: number) {
  if (revealedKeys.value.has(index)) {
    revealedKeys.value.delete(index)
  } else {
    revealedKeys.value.add(index)
  }
}

function isRevealed(index: number): boolean {
  return revealedKeys.value.has(index)
}

async function copyKey(key: string) {
  const success = await copy(key)
  if (success) {
    toast.success('已复制到剪贴板')
  } else {
    toast.error('复制失败，请手动复制')
  }
}

async function copyAll() {
  const success = await copy(props.cardKeys.join('\n'))
  if (success) {
    toast.success('已复制全部卡密')
  } else {
    toast.error('复制失败，请手动复制')
  }
}
</script>

<template>
  <div class="space-y-3">
    <div class="flex items-center justify-between">
      <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">卡密信息</h4>
      <button
        v-if="cardKeys.length > 1"
        class="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
        @click="copyAll"
      >
        复制全部
      </button>
    </div>
    
    <div class="space-y-2">
      <div
        v-for="(key, index) in cardKeys"
        :key="index"
        class="flex items-center gap-2 p-3 bg-gray-50 dark:bg-dark-700 rounded-lg"
      >
        <code class="flex-1 text-sm font-mono text-gray-900 dark:text-white break-all">
          {{ showMasked && !isRevealed(index) ? maskCardKey(key) : key }}
        </code>
        
        <div class="flex items-center gap-1">
          <button
            class="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            :title="isRevealed(index) ? '隐藏' : '显示'"
            @click="toggleReveal(index)"
          >
            <svg v-if="isRevealed(index)" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
          
          <button
            class="p-1.5 text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
            :class="{ 'text-green-500': copied }"
            title="复制"
            @click="copyKey(key)"
          >
            <svg v-if="copied" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <p class="text-xs text-gray-500 dark:text-gray-400">
      请妥善保管卡密信息，泄露可能导致损失
    </p>
  </div>
</template>
