<script setup lang="ts">
import { ref } from 'vue'
import { faqs } from '@/mock/news'

const expandedFaq = ref<string | null>(null)

function toggleFaq(id: string) {
  expandedFaq.value = expandedFaq.value === id ? null : id
}

// Group FAQs by category
const faqCategories = faqs.reduce((acc, faq) => {
  if (!acc[faq.category]) {
    acc[faq.category] = []
  }
  acc[faq.category].push(faq)
  return acc
}, {} as Record<string, typeof faqs>)

const contactMethods = [
  {
    icon: '📧',
    title: '邮箱联系',
    content: 'support@cardmall.com',
    description: '工作日内24小时回复',
  },
  {
    icon: '💬',
    title: 'QQ群',
    content: '123456789',
    description: '加入QQ群获取帮助',
  },
  {
    icon: '📱',
    title: 'Telegram',
    content: '@cardmall',
    description: '关注频道获取最新动态',
  },
]
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-dark-900">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="text-center mb-12">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">帮助中心</h1>
        <p class="text-gray-500 dark:text-gray-400">常见问题解答和联系方式</p>
      </div>

      <!-- Quick Links -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <router-link
          to="/order-lookup"
          class="bg-white dark:bg-dark-800 rounded-xl p-6 text-center hover:shadow-md transition-shadow"
        >
          <div class="text-3xl mb-3">🔍</div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-1">订单查询</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">无需登录即可查询订单</p>
        </router-link>
        <router-link
          to="/news"
          class="bg-white dark:bg-dark-800 rounded-xl p-6 text-center hover:shadow-md transition-shadow"
        >
          <div class="text-3xl mb-3">📖</div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-1">使用教程</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">详细的购买和使用指南</p>
        </router-link>
        <a
          href="mailto:support@cardmall.com"
          class="bg-white dark:bg-dark-800 rounded-xl p-6 text-center hover:shadow-md transition-shadow"
        >
          <div class="text-3xl mb-3">✉️</div>
          <h3 class="font-semibold text-gray-900 dark:text-white mb-1">发送邮件</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">发送邮件获取帮助</p>
        </a>
      </div>

      <!-- FAQ -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">常见问题</h2>
        
        <div v-for="(faqs, category) in faqCategories" :key="category" class="mb-8">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">{{ category }}</h3>
          <div class="space-y-2">
            <div
              v-for="faq in faqs"
              :key="faq.id"
              class="bg-white dark:bg-dark-800 rounded-xl overflow-hidden"
            >
              <button
                class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors"
                @click="toggleFaq(faq.id)"
              >
                <span class="font-medium text-gray-900 dark:text-white">{{ faq.question }}</span>
                <svg
                  class="w-5 h-5 text-gray-400 transition-transform"
                  :class="{ 'rotate-180': expandedFaq === faq.id }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <Transition
                enter-active-class="transition-all duration-200"
                enter-from-class="max-h-0 opacity-0"
                enter-to-class="max-h-[500px] opacity-100"
                leave-active-class="transition-all duration-200"
                leave-from-class="max-h-[500px] opacity-100"
                leave-to-class="max-h-0 opacity-0"
              >
                <div v-if="expandedFaq === faq.id" class="overflow-hidden">
                  <div class="px-6 pb-4 text-gray-600 dark:text-gray-400">
                    {{ faq.answer }}
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact -->
      <div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">联系我们</h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            v-for="contact in contactMethods"
            :key="contact.title"
            class="bg-white dark:bg-dark-800 rounded-xl p-6"
          >
            <div class="text-3xl mb-3">{{ contact.icon }}</div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-1">{{ contact.title }}</h3>
            <p class="text-primary-600 dark:text-primary-400 font-medium mb-1">{{ contact.content }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ contact.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
