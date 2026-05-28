<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getArticleById } from '@/mock/news'
import { formatDate } from '@/utils/format'
import EmptyState from '@/components/common/EmptyState.vue'

const route = useRoute()
const router = useRouter()

const articleId = route.params.id as string
const article = computed(() => getArticleById(articleId))

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
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <router-link to="/" class="hover:text-primary-600 dark:hover:text-primary-400">首页</router-link>
        <span>/</span>
        <router-link to="/news" class="hover:text-primary-600 dark:hover:text-primary-400">新闻资讯</router-link>
        <span>/</span>
        <span class="text-gray-900 dark:text-white">{{ article?.title }}</span>
      </nav>

      <!-- Empty State -->
      <EmptyState
        v-if="!article"
        icon="📄"
        title="文章不存在"
        description="请检查文章ID是否正确"
        action-text="返回新闻列表"
        @action="router.push('/news')"
      />

      <!-- Article Content -->
      <article v-else class="bg-white dark:bg-dark-800 rounded-xl overflow-hidden">
        <!-- Hero Image -->
        <div class="aspect-video">
          <img
            :src="article.image"
            :alt="article.title"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Content -->
        <div class="p-6 sm:p-8">
          <!-- Meta -->
          <div class="flex items-center gap-3 mb-4">
            <span class="badge" :class="getCategoryColor(article.category)">
              {{ article.categoryLabel }}
            </span>
            <span class="text-sm text-gray-500 dark:text-gray-400">
              {{ formatDate(article.createdAt) }}
            </span>
            <span class="text-sm text-gray-500 dark:text-gray-400">
              {{ article.viewCount }} 次阅读
            </span>
          </div>

          <!-- Title -->
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {{ article.title }}
          </h1>

          <!-- Author -->
          <div class="flex items-center gap-3 mb-8 pb-6 border-b border-gray-200 dark:border-dark-700">
            <div class="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
              <span class="text-primary-600 dark:text-primary-400 font-medium">
                {{ article.author.charAt(0) }}
              </span>
            </div>
            <div>
              <p class="font-medium text-gray-900 dark:text-white">{{ article.author }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">发布于 {{ formatDate(article.createdAt) }}</p>
            </div>
          </div>

          <!-- Article Body -->
          <div class="prose prose-gray dark:prose-invert max-w-none" v-html="article.content" />
        </div>
      </article>

      <!-- Back Button -->
      <div class="mt-6">
        <button class="btn-secondary" @click="router.push('/news')">
          ← 返回新闻列表
        </button>
      </div>
    </div>
  </div>
</template>
