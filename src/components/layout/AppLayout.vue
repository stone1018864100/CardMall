<script setup lang="ts">
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'
import MobileTabBar from './MobileTabBar.vue'
import ToastContainer from '@/components/common/ToastContainer.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    
    <!-- Desktop: normal padding, Mobile: extra bottom padding for tab bar -->
    <main class="flex-1 pb-0 md:pb-0 max-md:pb-20">
      <router-view v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
    </main>
    
    <AppFooter />
    <MobileTabBar />
    <ToastContainer />
  </div>
</template>
