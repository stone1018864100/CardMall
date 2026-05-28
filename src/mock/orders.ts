import type { Order } from '@/types'

export const mockOrders: Order[] = [
  {
    id: 'order-001',
    orderNo: 'CM20240315001',
    status: 'completed',
    items: [
      {
        productId: 'steam-100',
        productName: 'Steam 钱包充值卡 100元',
        productImage: 'https://picsum.photos/seed/steam100/400/300',
        spec: '100元',
        price: 96.8,
        quantity: 2,
      },
    ],
    subtotal: 193.6,
    discount: 0,
    total: 193.6,
    paymentMethod: '支付宝',
    email: 'user@example.com',
    createdAt: '2024-03-15 14:30:00',
    paidAt: '2024-03-15 14:31:00',
    completedAt: '2024-03-15 14:31:00',
    cardKeys: ['ABCD-EFGH-IJKL-MNOP', 'QRST-UVWX-YZAB-CDEF'],
  },
  {
    id: 'order-002',
    orderNo: 'CM20240316002',
    status: 'completed',
    items: [
      {
        productId: 'windows-11-pro',
        productName: 'Windows 11 Pro 专业版激活码',
        productImage: 'https://picsum.photos/seed/win11/400/300',
        spec: '专业版',
        price: 128.0,
        quantity: 1,
      },
    ],
    subtotal: 128.0,
    discount: 10,
    total: 118.0,
    paymentMethod: '微信支付',
    email: 'user@example.com',
    createdAt: '2024-03-16 09:15:00',
    paidAt: '2024-03-16 09:16:00',
    completedAt: '2024-03-16 09:16:00',
    cardKeys: ['WIN11-PROF-SSION-ALKEY'],
  },
  {
    id: 'order-003',
    orderNo: 'CM20240317003',
    status: 'completed',
    items: [
      {
        productId: 'netflix-1m',
        productName: 'Netflix 奈飞会员 1个月',
        productImage: 'https://picsum.photos/seed/netflix/400/300',
        spec: '高级版(4K)',
        price: 35.0,
        quantity: 1,
      },
      {
        productId: 'spotify-1m',
        productName: 'Spotify Premium 会员 1个月',
        productImage: 'https://picsum.photos/seed/spotify/400/300',
        spec: '个人版',
        price: 12.0,
        quantity: 1,
      },
    ],
    subtotal: 47.0,
    discount: 0,
    total: 47.0,
    paymentMethod: '支付宝',
    email: 'user@example.com',
    createdAt: '2024-03-17 20:45:00',
    paidAt: '2024-03-17 20:46:00',
    completedAt: '2024-03-17 20:46:00',
    cardKeys: ['NETFL-IXAC-COUN-TKEY1', 'SPOTI-FYAC-COUN-TKEY2'],
  },
  {
    id: 'order-004',
    orderNo: 'CM20240318004',
    status: 'pending',
    items: [
      {
        productId: 'steam-50',
        productName: 'Steam 钱包充值卡 50元',
        productImage: 'https://picsum.photos/seed/steam50/400/300',
        spec: '50元',
        price: 48.5,
        quantity: 1,
      },
    ],
    subtotal: 48.5,
    discount: 0,
    total: 48.5,
    paymentMethod: '',
    email: 'user@example.com',
    createdAt: '2024-03-18 10:20:00',
    cardKeys: [],
  },
  {
    id: 'order-005',
    orderNo: 'CM20240319005',
    status: 'cancelled',
    items: [
      {
        productId: 'office-365',
        productName: 'Microsoft 365 个人版 1年订阅',
        productImage: 'https://picsum.photos/seed/office365/400/300',
        spec: '个人版(1人)',
        price: 198.0,
        quantity: 1,
      },
    ],
    subtotal: 198.0,
    discount: 0,
    total: 198.0,
    paymentMethod: '',
    email: 'user@example.com',
    createdAt: '2024-03-19 15:30:00',
    cancelledAt: '2024-03-19 15:45:00',
    cardKeys: [],
  },
]

export function getOrderById(id: string): Order | undefined {
  return mockOrders.find(o => o.id === id)
}

export function getOrderByNo(orderNo: string): Order | undefined {
  return mockOrders.find(o => o.orderNo === orderNo)
}

export function generateOrderNo(): string {
  const now = new Date()
  const date = now.toISOString().slice(0, 10).replace(/-/g, '')
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `CM${date}${random}`
}

export function generateCardKeys(count: number): string[] {
  const keys: string[] = []
  for (let i = 0; i < count; i++) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let key = ''
    for (let j = 0; j < 16; j++) {
      if (j > 0 && j % 4 === 0) key += '-'
      key += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    keys.push(key)
  }
  return keys
}
