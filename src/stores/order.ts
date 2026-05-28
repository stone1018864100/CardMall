import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Order, OrderStatus, OrderItem } from '@/types'
import { mockOrders, generateOrderNo, generateCardKeys } from '@/mock/orders'

export const useOrderStore = defineStore('order', () => {
  const orders = ref<Order[]>([...mockOrders])

  // Computed
  const pendingOrders = computed(() => orders.value.filter(o => o.status === 'pending'))
  const completedOrders = computed(() => orders.value.filter(o => o.status === 'completed'))
  const cancelledOrders = computed(() => orders.value.filter(o => o.status === 'cancelled'))

  // Actions
  function createOrder(
    items: OrderItem[],
    email: string,
    phone: string | undefined,
    paymentMethod: string,
    subtotal: number,
    discount: number,
    note?: string
  ): Order {
    const order: Order = {
      id: `order-${Date.now()}`,
      orderNo: generateOrderNo(),
      status: 'pending',
      items,
      subtotal,
      discount,
      total: subtotal - discount,
      paymentMethod,
      email,
      phone,
      note,
      createdAt: new Date().toISOString(),
      cardKeys: [],
    }

    orders.value.unshift(order)
    return order
  }

  function payOrder(orderId: string): boolean {
    const order = orders.value.find(o => o.id === orderId)
    if (order && order.status === 'pending') {
      order.status = 'paid'
      order.paidAt = new Date().toISOString()
      
      // Generate card keys
      const totalQuantity = order.items.reduce((sum, item) => sum + item.quantity, 0)
      order.cardKeys = generateCardKeys(totalQuantity)
      
      // Auto complete after payment
      setTimeout(() => {
        if (order.status === 'paid') {
          order.status = 'completed'
          order.completedAt = new Date().toISOString()
        }
      }, 100)
      
      return true
    }
    return false
  }

  function cancelOrder(orderId: string): boolean {
    const order = orders.value.find(o => o.id === orderId)
    if (order && order.status === 'pending') {
      order.status = 'cancelled'
      order.cancelledAt = new Date().toISOString()
      return true
    }
    return false
  }

  function getOrderById(id: string): Order | undefined {
    return orders.value.find(o => o.id === id)
  }

  function getOrderByNo(orderNo: string): Order | undefined {
    return orders.value.find(o => o.orderNo === orderNo)
  }

  function getOrdersByStatus(status: OrderStatus | 'all'): Order[] {
    if (status === 'all') return orders.value
    return orders.value.filter(o => o.status === status)
  }

  function getOrdersByEmail(email: string): Order[] {
    return orders.value.filter(o => o.email === email)
  }

  return {
    orders,
    pendingOrders,
    completedOrders,
    cancelledOrders,
    createOrder,
    payOrder,
    cancelOrder,
    getOrderById,
    getOrderByNo,
    getOrdersByStatus,
    getOrdersByEmail,
  }
}, {
  persist: true,
})
