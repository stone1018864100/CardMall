<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const banners = [
  {
    id: 1,
    title: '新用户专享优惠',
    subtitle: '注册即送5元优惠券',
    image: 'https://picsum.photos/seed/banner1/1200/400',
    link: '/products',
    color: 'from-blue-600 to-purple-600',
  },
  {
    id: 2,
    title: 'Steam充值卡特惠',
    subtitle: '限时折扣，最高立减20%',
    image: 'https://picsum.photos/seed/banner2/1200/400',
    link: '/products?category=game',
    color: 'from-green-600 to-teal-600',
  },
  {
    id: 3,
    title: '会员订阅季',
    subtitle: 'Netflix、Spotify等热门会员低价购',
    image: 'https://picsum.photos/seed/banner3/1200/400',
    link: '/products?category=membership',
    color: 'from-orange-600 to-red-600',
  },
]

const currentIndex = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

function next() {
  currentIndex.value = (currentIndex.value + 1) % banners.length
}

function prev() {
  currentIndex.value = (currentIndex.value - 1 + banners.length) % banners.length
}

function goTo(index: number) {
  currentIndex.value = index
}

function startAutoplay() {
  timer = setInterval(next, 5000)
}

function stopAutoplay() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<template>
  <div
    class="relative overflow-hidden rounded-xl"
    @mouseenter="stopAutoplay"
    @mouseleave="startAutoplay"
  >
    <!-- Slides -->
    <div class="relative h-48 sm:h-64 md:h-80">
      <Transition
        v-for="(banner, index) in banners"
        :key="banner.id"
        enter-active-class="transition-opacity duration-500"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-500"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-show="index === currentIndex"
          class="absolute inset-0"
        >
          <div :class="['absolute inset-0 bg-gradient-to-r', banner.color]" />
          <img
            :src="banner.image"
            :alt="banner.title"
            class="w-full h-full object-cover opacity-30"
          />
          <div class="absolute inset-0 flex items-center justify-center text-center px-8">
            <div>
              <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                {{ banner.title }}
              </h2>
              <p class="text-sm sm:text-base text-white/90 mb-4">
                {{ banner.subtitle }}
              </p>
              <router-link
                :to="banner.link"
                class="inline-block px-6 py-2 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors"
              >
                立即查看
              </router-link>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Navigation buttons -->
    <button
      class="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
      @click="prev"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <button
      class="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
      @click="next"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <!-- Dots -->
    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
      <button
        v-for="(_, index) in banners"
        :key="index"
        class="w-2 h-2 rounded-full transition-all"
        :class="index === currentIndex ? 'bg-white w-6' : 'bg-white/50'"
        @click="goTo(index)"
      />
    </div>
  </div>
</template>
