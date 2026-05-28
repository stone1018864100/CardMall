// Product types
export interface ProductSpec {
  name: string
  options: string[]
}

export interface WholesaleTier {
  minQuantity: number
  maxQuantity: number | null // null means no upper limit
  price: number
}

export interface Review {
  id: string
  userId: string
  userName: string
  userAvatar: string
  rating: number
  content: string
  createdAt: string
  images?: string[]
}

export interface Product {
  id: string
  name: string
  category: string
  categoryLabel: string
  price: number
  originalPrice: number
  image: string
  images: string[]
  sales: number
  stock: number
  rating: number
  ratingCount: number
  specs: ProductSpec[]
  description: string
  purchaseNotes: string
  reviews: Review[]
  tags: string[]
  isNew?: boolean
  isHot?: boolean
  isFlashSale?: boolean
  flashSaleEndTime?: string
  flashSalePrice?: number
  wholesaleTiers?: WholesaleTier[]
}

// Cart types
export interface CartItem {
  id: string
  product: Product
  selectedSpec: string
  quantity: number
  selected: boolean
}

// Order types
export type OrderStatus = 'pending' | 'paid' | 'completed' | 'cancelled' | 'refunding' | 'refunded'

export interface OrderItem {
  productId: string
  productName: string
  productImage: string
  spec: string
  price: number
  quantity: number
}

export interface Order {
  id: string
  orderNo: string
  status: OrderStatus
  items: OrderItem[]
  subtotal: number
  discount: number
  total: number
  paymentMethod: string
  email: string
  phone?: string
  note?: string
  createdAt: string
  paidAt?: string
  completedAt?: string
  cancelledAt?: string
  cardKeys: string[]
}

// User types
export interface User {
  id: string
  email: string
  nickname: string
  avatar: string
  phone?: string
  createdAt: string
}

// News types
export type ArticleCategory = 'announcement' | 'tutorial' | 'news'

export interface Article {
  id: string
  title: string
  category: ArticleCategory
  categoryLabel: string
  excerpt: string
  content: string
  image: string
  author: string
  viewCount: number
  createdAt: string
}

// Category types
export interface Category {
  id: string
  name: string
  icon: string
  count: number
}

// Coupon types
export interface Coupon {
  id: string
  code: string
  type: 'fixed' | 'percent'
  value: number
  minAmount: number
  maxDiscount?: number
  startDate: string
  endDate: string
  usedCount: number
  totalCount: number
  status: 'active' | 'used' | 'expired'
}

// Toast types
export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  type: ToastType
  message: string
  duration?: number
}

// FAQ types
export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}

// Payment method
export interface PaymentMethod {
  id: string
  name: string
  icon: string
  description: string
}
