<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { articles, getArticlesByCategory } from '@/mock/news'
import { formatDate } from '@/utils/format'
import type { ArticleCategory } from '@/types'

const router = useRouter()

const activeTab = ref<ArticleCategory | 'all'>('all')

const tabs = [
  { value: 'all', label: '全部' },
  { value: 'announcement', label: '平台公告' },
  { value: 'tutorial', label: '使用教程' },
  { value: 'news', label: '行业资讯' },
]

const filteredArticles = computed(() => getArticlesByCategory(activeTab.value))

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
  <div class="min-h-screen bg-gray-50 dark:bg-dark-900">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">新闻资讯</h1>

      <!-- Tabs -->
      <div class="bg-white dark:bg-dark-800 rounded-xl mb-6">
        <div class="flex overflow-x-auto">
          <button
            v-for="tab in tabs"
            :key="tab.value"
            class="px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors relative"
            :class="activeTab === tab.value
              ? 'text-primary-600 dark:text-primary-400'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'"
            @click="activeTab = tab.value as ArticleCategory | 'all'"
          >
            {{ tab.label }}
            <div v-if="activeTab === tab.value" class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />
          </button>
        </div>
      </div>

      <!-- Articles List -->
      <div class="space-y-4">
        <div
          v-for="article in filteredArticles"
          :key="article.id"
          class="bg-white dark:bg-dark-800 rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
          @click="goToArticle(article.id)"
        >
          <div class="flex flex-col sm:flex-row">
            <div class="sm:w-48 h-48 sm:h-auto flex-shrink-0">
              <img
                :src="article.image"
                :alt="article.title"
                class="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div class="flex-1 p-4 sm:p-6">
              <div class="flex items-center gap-2 mb-2">
                <span class="badge text-xs" :class="getCategoryColor(article.category)">
                  {{ article.categoryLabel }}
                </span>
                <span class="text-xs text-gray-500 dark:text-gray-400">
                  {{ formatDate(article.createdAt, 'YYYY-MM-DD') }}
                </span>
              </div>
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                {{ article.title }}
              </h2>
              <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                {{ article.excerpt }}
              </p>
              <div class="flex items-center gap-4 mt-4 text-xs text-gray-500 dark:text-gray-400">
                <span>{{ article.author }}</span>
                <span>{{ article.viewCount }} 次阅读</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
