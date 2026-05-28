<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg'
  text?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  text: '',
})

const sizeClasses: Record<string, string> = {
  sm: 'w-5 h-5',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-3">
    <div
      class="animate-spin rounded-full border-2 border-gray-300 border-t-primary-600"
      :class="sizeClasses[props.size]"
    />
    <p v-if="props.text" class="text-sm text-gray-500 dark:text-gray-400">{{ props.text }}</p>
  </div>
</template>
