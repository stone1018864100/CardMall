import type { PaymentMethod } from '@/types'

export const paymentMethods: PaymentMethod[] = [
  {
    id: 'alipay',
    name: '支付宝',
    icon: '💳',
    description: '推荐使用支付宝支付',
  },
  {
    id: 'wechat',
    name: '微信支付',
    icon: '💬',
    description: '使用微信扫码支付',
  },
  {
    id: 'qqpay',
    name: 'QQ钱包',
    icon: '🐧',
    description: '使用QQ钱包支付',
  },
]
