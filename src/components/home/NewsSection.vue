<script setup lang="ts">
import { useRouter } from 'vue-router'
import { articles } from '@/mock/news'
import { formatRelativeTime } from '@/utils/format'

const router = useRouter()
const recentArticles = articles.slice(0, 4)

function goToArticle(id: string) {
  router.push(`/news/${id}`)
}

function getCategoryColor(category: string) {
  const colors: Record<string, string> = {
    announcement: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    tutorial: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    news: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  }
  return colors[category] || colors.news
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">新闻资讯</h2>
      <router-link
        to="/news"
        class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm"
      >
        查看全部 →
      </router-link>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="article in recentArticles"
        :key="article.id"
        class="card-hover cursor-pointer flex gap-4 p-4"
        @click="goToArticle(article.id)"
      >
        <div class="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-lg overflow-hidden">
          <img
            :src="article.image"
            :alt="article.title"
            class="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-2">
            <span
              class="badge text-xs"
              :class="getCategoryColor(article.category)"
            >
              {{ article.categoryLabel }}
            </span>
            <span class="text-xs text-gray-500 dark:text-gray-400">
              {{ formatRelativeTime(article.createdAt) }}
            </span>
          </div>
          <h3 class="text-sm sm:text-base font-medium text-gray-900 dark:text-white line-clamp-2 mb-2">
            {{ article.title }}
          </h3>
          <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-clamp-2 hidden sm:block">
            {{ article.excerpt }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
