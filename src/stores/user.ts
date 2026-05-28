import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, Coupon } from '@/types'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const isLoggedIn = computed(() => !!user.value)
  const coupons = ref<Coupon[]>([
    {
      id: 'c1',
      code: 'NEWUSER5',
      type: 'fixed',
      value: 5,
      minAmount: 0,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      usedCount: 0,
      totalCount: 1,
      status: 'active',
    },
    {
      id: 'c2',
      code: 'SAVE10',
      type: 'fixed',
      value: 10,
      minAmount: 50,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      usedCount: 0,
      totalCount: 1,
      status: 'active',
    },
    {
      id: 'c3',
      code: 'PERCENT15',
      type: 'percent',
      value: 15,
      minAmount: 100,
      maxDiscount: 50,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      usedCount: 0,
      totalCount: 1,
      status: 'active',
    },
  ])

  // Computed
  const activeCoupons = computed(() => coupons.value.filter(c => c.status === 'active'))
  const usedCoupons = computed(() => coupons.value.filter(c => c.status === 'used'))
  const expiredCoupons = computed(() => coupons.value.filter(c => c.status === 'expired'))

  // Actions
  function login(email: string, _password: string): boolean {
    // Mock login - always succeed
    user.value = {
      id: 'user-001',
      email,
      nickname: email.split('@')[0],
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      createdAt: new Date().toISOString(),
    }
    return true
  }

  function register(email: string, _password: string): boolean {
    // Mock register - always succeed
    user.value = {
      id: `user-${Date.now()}`,
      email,
      nickname: email.split('@')[0],
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      createdAt: new Date().toISOString(),
    }
    return true
  }

  function logout() {
    user.value = null
  }

  function updateProfile(profile: Partial<User>) {
    if (user.value) {
      user.value = { ...user.value, ...profile }
    }
  }

  function applyCoupon(code: string, amount: number): { success: boolean; discount: number; message: string } {
    const coupon = coupons.value.find(c => c.code === code && c.status === 'active')
    
    if (!coupon) {
      return { success: false, discount: 0, message: '优惠券无效或已使用' }
    }

    if (amount < coupon.minAmount) {
      return { success: false, discount: 0, message: `订单金额需满${coupon.minAmount}元` }
    }

    let discount = 0
    if (coupon.type === 'fixed') {
      discount = coupon.value
    } else {
      discount = Math.min(amount * coupon.value / 100, coupon.maxDiscount || Infinity)
    }

    return { success: true, discount, message: `优惠${discount}元` }
  }

  function useCoupon(code: string) {
    const coupon = coupons.value.find(c => c.code === code)
    if (coupon) {
      coupon.usedCount++
      if (coupon.usedCount >= coupon.totalCount) {
        coupon.status = 'used'
      }
    }
  }

  return {
    user,
    isLoggedIn,
    coupons,
    activeCoupons,
    usedCoupons,
    expiredCoupons,
    login,
    register,
    logout,
    updateProfile,
    applyCoupon,
    useCoupon,
  }
}, {
  persist: true,
})
