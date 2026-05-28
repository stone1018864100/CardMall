import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import type { WholesaleTier } from '@/types'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

/**
 * Format price with 2 decimal places
 */
export function formatPrice(price: number): string {
  return price.toFixed(2)
}

/**
 * Format price with currency symbol
 */
export function formatCurrency(price: number): string {
  return `¥${formatPrice(price)}`
}

/**
 * Format date string
 */
export function formatDate(date: string, format: string = 'YYYY-MM-DD HH:mm:ss'): string {
  return dayjs(date).format(format)
}

/**
 * Format relative time (e.g., "3 hours ago")
 */
export function formatRelativeTime(date: string): string {
  return dayjs(date).fromNow()
}

/**
 * Format number with commas
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('zh-CN')
}

/**
 * Format sales number (e.g., 1.2k, 3.5w)
 */
export function formatSales(num: number): string {
  if (num >= 10000) {
    return `${(num / 10000).toFixed(1)}w`
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`
  }
  return num.toString()
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

/**
 * Mask card key (e.g., "ABCD-EFGH" -> "****-****")
 */
export function maskCardKey(key: string): string {
  return key.replace(/[A-Z0-9]/g, '*')
}

/**
 * Generate random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

/**
 * Get wholesale price based on quantity
 */
export function getWholesalePrice(
  tiers: WholesaleTier[] | undefined,
  quantity: number,
  defaultPrice: number
): number {
  if (!tiers || tiers.length === 0) return defaultPrice
  
  for (const tier of tiers) {
    if (quantity >= tier.minQuantity && (tier.maxQuantity === null || quantity <= tier.maxQuantity)) {
      return tier.price
    }
  }
  
  return defaultPrice
}

/**
 * Calculate total price with wholesale pricing
 */
export function calculateWholesaleTotal(
  tiers: WholesaleTier[] | undefined,
  quantity: number,
  unitPrice: number
): { unitPrice: number; total: number; savings: number } {
  const wholesalePrice = getWholesalePrice(tiers, quantity, unitPrice)
  const total = wholesalePrice * quantity
  const savings = (unitPrice - wholesalePrice) * quantity
  
  return {
    unitPrice: wholesalePrice,
    total,
    savings,
  }
}

/**
 * Validate phone format (Chinese)
 */
export function isValidPhone(phone: string): boolean {
  const re = /^1[3-9]\d{9}$/
  return re.test(phone)
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

/**
 * Format order status
 */
export function formatOrderStatus(status: string): { text: string; color: string } {
  const statusMap: Record<string, { text: string; color: string }> = {
    pending: { text: '待支付', color: 'warning' },
    paid: { text: '已支付', color: 'primary' },
    completed: { text: '已完成', color: 'success' },
    cancelled: { text: '已取消', color: 'danger' },
    refunding: { text: '退款中', color: 'warning' },
    refunded: { text: '已退款', color: 'danger' },
  }
  return statusMap[status] || { text: '未知', color: 'gray' }
}
