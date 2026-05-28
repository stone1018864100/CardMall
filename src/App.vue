<script setup lang="ts">
import { onMounted } from 'vue'
import { useThemeStore } from '@/stores'

const themeStore = useThemeStore()

onMounted(() => {
  // Theme is initialized in the store
})
</script>

<template>
  <router-view />
</template>
