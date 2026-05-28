<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
import { useToast } from '@/composables'
import { isValidEmail } from '@/utils/format'

const router = useRouter()
const userStore = useUserStore()
const toast = useToast()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const isLoading = ref(false)
const emailError = ref('')
const passwordError = ref('')

function validateEmail() {
  if (!email.value) {
    emailError.value = '请输入邮箱地址'
    return false
  }
  if (!isValidEmail(email.value)) {
    emailError.value = '请输入有效的邮箱地址'
    return false
  }
  emailError.value = ''
  return true
}

function validatePassword() {
  if (!password.value) {
    passwordError.value = '请输入密码'
    return false
  }
  if (password.value.length < 6) {
    passwordError.value = '密码长度不能少于6位'
    return false
  }
  passwordError.value = ''
  return true
}

async function handleLogin() {
  if (!validateEmail() || !validatePassword()) return

  isLoading.value = true

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))

  const success = userStore.login(email.value, password.value)
  
  isLoading.value = false

  if (success) {
    toast.success('登录成功')
    router.push('/')
  } else {
    toast.error('登录失败，请检查邮箱和密码')
  }
}

function goToRegister() {
  router.push('/register')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-dark-900 flex items-center justify-center py-12 px-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <div class="flex items-center justify-center gap-2 mb-4">
          <div class="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-xl">C</span>
          </div>
          <span class="text-2xl font-bold text-gray-900 dark:text-white">CardMall</span>
        </div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">欢迎回来</h1>
        <p class="text-gray-500 dark:text-gray-400">登录您的CardMall账号</p>
      </div>

      <div class="bg-white dark:bg-dark-800 rounded-xl p-6 sm:p-8">
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              邮箱地址
            </label>
            <input
              v-model="email"
              type="email"
              placeholder="请输入邮箱地址"
              class="input"
              :class="{ 'border-red-500': emailError }"
              @blur="validateEmail"
            />
            <p v-if="emailError" class="mt-1 text-sm text-red-500">{{ emailError }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              密码
            </label>
            <input
              v-model="password"
              type="password"
              placeholder="请输入密码"
              class="input"
              :class="{ 'border-red-500': passwordError }"
              @blur="validatePassword"
            />
            <p v-if="passwordError" class="mt-1 text-sm text-red-500">{{ passwordError }}</p>
          </div>

          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                v-model="rememberMe"
                type="checkbox"
                class="w-4 h-4 rounded border-gray-300 dark:border-dark-600 text-primary-600 focus:ring-primary-500"
              />
              <span class="text-sm text-gray-600 dark:text-gray-400">记住我</span>
            </label>
            <a href="#" class="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400">
              忘记密码？
            </a>
          </div>

          <button
            type="submit"
            class="w-full btn-primary py-3 text-lg"
            :disabled="isLoading"
          >
            <span v-if="isLoading" class="flex items-center justify-center gap-2">
              <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              登录中...
            </span>
            <span v-else>登录</span>
          </button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-sm text-gray-500 dark:text-gray-400">
            还没有账号？
            <button
              class="text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium"
              @click="goToRegister"
            >
              立即注册
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
