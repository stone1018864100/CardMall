<script setup lang="ts">
interface Props {
  icon?: string
  title: string
  description?: string
  actionText?: string
}

const props = withDefaults(defineProps<Props>(), {
  icon: '📦',
  description: '',
  actionText: '',
})

const emit = defineEmits<{
  action: []
}>()
</script>

<template>
  <div class="flex flex-col items-center justify-center py-16 px-4">
    <div class="text-6xl mb-4">{{ props.icon }}</div>
    <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">{{ props.title }}</h3>
    <p v-if="props.description" class="text-sm text-gray-500 dark:text-gray-400 text-center max-w-sm mb-6">
      {{ props.description }}
    </p>
    <button
      v-if="props.actionText"
      class="btn-primary"
      @click="emit('action')"
    >
      {{ props.actionText }}
    </button>
  </div>
</template>
