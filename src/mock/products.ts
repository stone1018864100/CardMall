import type { Product, Category } from '@/types'

export const categories: Category[] = [
  { id: 'game', name: '游戏点卡', icon: '🎮', count: 8 },
  { id: 'software', name: '软件激活', icon: '💻', count: 5 },
  { id: 'membership', name: '会员订阅', icon: '⭐', count: 5 },
  { id: 'coupon', name: '优惠券', icon: '🎫', count: 4 },
]

export const products: Product[] = [
  // 游戏点卡
  {
    id: 'steam-50',
    name: 'Steam 钱包充值卡 50元',
    category: 'game',
    categoryLabel: '游戏点卡',
    price: 48.5,
    originalPrice: 50,
    image: 'https://picsum.photos/seed/steam50/400/300',
    images: [
      'https://picsum.photos/seed/steam50/800/600',
      'https://picsum.photos/seed/steam50-2/800/600',
      'https://picsum.photos/seed/steam50-3/800/600',
    ],
    sales: 2856,
    stock: 156,
    rating: 4.9,
    ratingCount: 1283,
    specs: [
      { name: '面值', options: ['50元', '100元', '200元', '500元'] },
    ],
    description: `
      <h3>商品介绍</h3>
      <p>Steam钱包充值卡，可用于Steam平台购买游戏、软件、DLC等数字内容。</p>
      <h3>使用说明</h3>
      <ol>
        <li>登录Steam客户端或网页版</li>
        <li>点击右上角用户名 → 账户明细</li>
        <li>选择"向我的Steam钱包充值"</li>
        <li>点击"兑换Steam礼物卡或钱包充值码"</li>
        <li>输入购买获得的充值码即可</li>
      </ol>
      <h3>注意事项</h3>
      <ul>
        <li>充值码一经售出，概不退换</li>
        <li>请在有效期内使用</li>
        <li>仅限中国大陆区Steam账号使用</li>
      </ul>
    `,
    purchaseNotes: '• 充值码将在支付后自动发送至您的邮箱\n• 请在30天内使用，过期作废\n• 如有问题请联系在线客服',
    reviews: [
      {
        id: 'r1',
        userId: 'u1',
        userName: '游戏达人***',
        userAvatar: 'https://picsum.photos/seed/user1/100/100',
        rating: 5,
        content: '秒到账，非常好用，已经回购很多次了！',
        createdAt: '2024-03-15 14:30:00',
      },
      {
        id: 'r2',
        userId: 'u2',
        userName: 'Steam***',
        userAvatar: 'https://picsum.photos/seed/user2/100/100',
        rating: 5,
        content: '充值很快，价格也比官方便宜，推荐！',
        createdAt: '2024-03-14 20:15:00',
      },
    ],
    tags: ['Steam', '充值卡', '游戏'],
    isHot: true,
    wholesaleTiers: [
      { minQuantity: 1, maxQuantity: 9, price: 48.5 },
      { minQuantity: 10, maxQuantity: 49, price: 47.0 },
      { minQuantity: 50, maxQuantity: 99, price: 45.0 },
      { minQuantity: 100, maxQuantity: null, price: 42.0 },
    ],
  },
  {
    id: 'steam-100',
    name: 'Steam 钱包充值卡 100元',
    category: 'game',
    categoryLabel: '游戏点卡',
    price: 96.8,
    originalPrice: 100,
    image: 'https://picsum.photos/seed/steam100/400/300',
    images: [
      'https://picsum.photos/seed/steam100/800/600',
      'https://picsum.photos/seed/steam100-2/800/600',
    ],
    sales: 3421,
    stock: 203,
    rating: 4.9,
    ratingCount: 1567,
    specs: [
      { name: '面值', options: ['50元', '100元', '200元', '500元'] },
    ],
    description: '<p>Steam钱包充值卡100元面值，购买更优惠！</p>',
    purchaseNotes: '• 充值码将在支付后自动发送至您的邮箱\n• 请在30天内使用',
    reviews: [],
    tags: ['Steam', '充值卡', '游戏'],
    isHot: true,
    wholesaleTiers: [
      { minQuantity: 1, maxQuantity: 9, price: 96.8 },
      { minQuantity: 10, maxQuantity: 49, price: 94.0 },
      { minQuantity: 50, maxQuantity: 99, price: 90.0 },
      { minQuantity: 100, maxQuantity: null, price: 85.0 },
    ],
  },
  {
    id: 'psn-100',
    name: 'PlayStation Network 充值卡 100港币',
    category: 'game',
    categoryLabel: '游戏点卡',
    price: 88.5,
    originalPrice: 92,
    image: 'https://picsum.photos/seed/psn100/400/300',
    images: [
      'https://picsum.photos/seed/psn100/800/600',
    ],
    sales: 1245,
    stock: 89,
    rating: 4.8,
    ratingCount: 567,
    specs: [
      { name: '面值', options: ['50港币', '100港币', '200港币', '500港币'] },
      { name: '区域', options: ['港区', '日区', '美区'] },
    ],
    description: '<p>PlayStation Network 港区充值卡，可购买PS4/PS5游戏、DLC、会员等。</p>',
    purchaseNotes: '• 请确认您的PSN账号区域与充值卡区域一致\n• 港区账号使用',
    reviews: [],
    tags: ['PSN', 'PlayStation', '索尼'],
    isNew: true,
  },
  {
    id: 'xbox-100',
    name: 'Xbox 礼品卡 100港币',
    category: 'game',
    categoryLabel: '游戏点卡',
    price: 89.0,
    originalPrice: 92,
    image: 'https://picsum.photos/seed/xbox100/400/300',
    images: [
      'https://picsum.photos/seed/xbox100/800/600',
    ],
    sales: 876,
    stock: 120,
    rating: 4.7,
    ratingCount: 432,
    specs: [
      { name: '面值', options: ['50港币', '100港币', '200港币'] },
    ],
    description: '<p>Xbox礼品卡，可在微软商店购买游戏、应用、电影等。</p>',
    purchaseNotes: '• 请确认您的微软账号区域\n• 港区账号使用',
    reviews: [],
    tags: ['Xbox', '微软', '礼品卡'],
  },
  {
    id: 'nintendo-100',
    name: 'Nintendo eShop 充值卡 100港币',
    category: 'game',
    categoryLabel: '游戏点卡',
    price: 87.5,
    originalPrice: 92,
    image: 'https://picsum.photos/seed/nintendo100/400/300',
    images: [
      'https://picsum.photos/seed/nintendo100/800/600',
    ],
    sales: 654,
    stock: 78,
    rating: 4.8,
    ratingCount: 298,
    specs: [
      { name: '面值', options: ['50港币', '100港币', '200港币'] },
    ],
    description: '<p>Nintendo eShop港区充值卡，可购买Switch游戏和DLC。</p>',
    purchaseNotes: '• 请确认您的Nintendo账号区域\n• 港区账号使用',
    reviews: [],
    tags: ['Nintendo', 'Switch', '任天堂'],
  },
  {
    id: 'genshin-328',
    name: '原神 创世结晶 3280结晶',
    category: 'game',
    categoryLabel: '游戏点卡',
    price: 318.0,
    originalPrice: 328,
    image: 'https://picsum.photos/seed/genshin328/400/300',
    images: [
      'https://picsum.photos/seed/genshin328/800/600',
    ],
    sales: 2134,
    stock: 45,
    rating: 4.9,
    ratingCount: 1023,
    specs: [
      { name: '面值', options: ['60结晶(6元)', '300结晶(30元)', '980结晶(98元)', '1980结晶(198元)', '3280结晶(328元)', '6480结晶(648元)'] },
    ],
    description: '<p>原神创世结晶充值码，可用于购买原石、月卡等。</p>',
    purchaseNotes: '• 请提供正确的UID和服务器\n• 充值后无法退款',
    reviews: [],
    tags: ['原神', '米哈游', '充值'],
    isHot: true,
  },
  {
    id: 'lol-100',
    name: '英雄联盟 点券 10000点券',
    category: 'game',
    categoryLabel: '游戏点卡',
    price: 95.0,
    originalPrice: 100,
    image: 'https://picsum.photos/seed/lol100/400/300',
    images: [
      'https://picsum.photos/seed/lol100/800/600',
    ],
    sales: 1567,
    stock: 234,
    rating: 4.8,
    ratingCount: 789,
    specs: [
      { name: '面值', options: ['1000点券(10元)', '5000点券(50元)', '10000点券(100元)'] },
    ],
    description: '<p>英雄联盟点券充值码，可用于购买皮肤、英雄等。</p>',
    purchaseNotes: '• 请提供正确的游戏ID\n• 充值后无法退款',
    reviews: [],
    tags: ['LOL', '英雄联盟', '腾讯'],
  },
  {
    id: 'steam-key',
    name: 'Steam游戏激活码 - 赛博朋克2077',
    category: 'game',
    categoryLabel: '游戏点卡',
    price: 128.0,
    originalPrice: 298,
    image: 'https://picsum.photos/seed/cyberpunk/400/300',
    images: [
      'https://picsum.photos/seed/cyberpunk/800/600',
    ],
    sales: 3456,
    stock: 23,
    rating: 4.6,
    ratingCount: 2341,
    specs: [
      { name: '版本', options: ['标准版', '豪华版'] },
    ],
    description: '<p>赛博朋克2077 Steam激活码，全球通用。</p>',
    purchaseNotes: '• 激活码一经使用无法退换\n• 请在Steam客户端激活',
    reviews: [],
    tags: ['Steam', '游戏激活码', '赛博朋克'],
    isFlashSale: true,
    flashSaleEndTime: '2024-04-01 00:00:00',
    flashSalePrice: 98,
  },

  // 软件激活
  {
    id: 'windows-11-pro',
    name: 'Windows 11 Pro 专业版激活码',
    category: 'software',
    categoryLabel: '软件激活',
    price: 128.0,
    originalPrice: 199,
    image: 'https://picsum.photos/seed/win11/400/300',
    images: [
      'https://picsum.photos/seed/win11/800/600',
      'https://picsum.photos/seed/win11-2/800/600',
    ],
    sales: 5678,
    stock: 567,
    rating: 4.9,
    ratingCount: 3456,
    specs: [
      { name: '版本', options: ['家庭版', '专业版', '企业版'] },
    ],
    description: `
      <h3>商品介绍</h3>
      <p>Windows 11 正版激活码，永久有效，支持重装系统后重新激活。</p>
      <h3>激活步骤</h3>
      <ol>
        <li>打开设置 → 系统 → 激活</li>
        <li>点击"更改产品密钥"</li>
        <li>输入购买获得的激活码</li>
        <li>点击"下一步"完成激活</li>
      </ol>
    `,
    purchaseNotes: '• 激活码为一次性使用，绑定主板\n• 支持重装系统后重新激活\n• 如有问题请联系客服',
    reviews: [
      {
        id: 'r3',
        userId: 'u3',
        userName: '电脑***',
        userAvatar: 'https://picsum.photos/seed/user3/100/100',
        rating: 5,
        content: '激活成功，正版授权，价格实惠！',
        createdAt: '2024-03-10 16:20:00',
      },
    ],
    tags: ['Windows', '微软', '系统激活'],
    isHot: true,
  },
  {
    id: 'office-365',
    name: 'Microsoft 365 个人版 1年订阅',
    category: 'software',
    categoryLabel: '软件激活',
    price: 198.0,
    originalPrice: 398,
    image: 'https://picsum.photos/seed/office365/400/300',
    images: [
      'https://picsum.photos/seed/office365/800/600',
    ],
    sales: 4321,
    stock: 345,
    rating: 4.8,
    ratingCount: 2345,
    specs: [
      { name: '版本', options: ['个人版(1人)', '家庭版(6人)'] },
      { name: '时长', options: ['1年', '2年'] },
    ],
    description: '<p>Microsoft 365订阅，包含Word、Excel、PowerPoint、Outlook等全套Office应用，1TB OneDrive云存储。</p>',
    purchaseNotes: '• 订阅到期后需续费\n• 支持5台设备同时使用\n• 包含1TB OneDrive存储',
    reviews: [],
    tags: ['Office', '微软', '办公软件'],
  },
  {
    id: 'adobe-cc',
    name: 'Adobe Creative Cloud 1年订阅',
    category: 'software',
    categoryLabel: '软件激活',
    price: 298.0,
    originalPrice: 499,
    image: 'https://picsum.photos/seed/adobe/400/300',
    images: [
      'https://picsum.photos/seed/adobe/800/600',
    ],
    sales: 1234,
    stock: 67,
    rating: 4.7,
    ratingCount: 678,
    specs: [
      { name: '套餐', options: ['摄影计划(PS+LR)', '单应用(PS)', '全部应用'] },
    ],
    description: '<p>Adobe Creative Cloud全套创意应用订阅，包含Photoshop、Illustrator、Premiere Pro等20+应用。</p>',
    purchaseNotes: '• 需要Adobe账号\n• 订阅期内可使用全部应用\n• 包含100GB云存储',
    reviews: [],
    tags: ['Adobe', '设计', '创意软件'],
  },
  {
    id: 'kaspersky',
    name: '卡巴斯基安全软件 1年3设备',
    category: 'software',
    categoryLabel: '软件激活',
    price: 89.0,
    originalPrice: 158,
    image: 'https://picsum.photos/seed/kaspersky/400/300',
    images: [
      'https://picsum.photos/seed/kaspersky/800/600',
    ],
    sales: 2345,
    stock: 456,
    rating: 4.6,
    ratingCount: 1234,
    specs: [
      { name: '版本', options: ['基础版', '安全软件', '全方位安全'] },
      { name: '设备数', options: ['1设备', '3设备', '5设备'] },
    ],
    description: '<p>卡巴斯基安全软件，保护您的设备免受病毒、勒索软件、网络钓鱼等威胁。</p>',
    purchaseNotes: '• 支持Windows、Mac、Android\n• 1年订阅，到期需续费',
    reviews: [],
    tags: ['卡巴斯基', '杀毒软件', '安全'],
    wholesaleTiers: [
      { minQuantity: 1, maxQuantity: 4, price: 89.0 },
      { minQuantity: 5, maxQuantity: 19, price: 85.0 },
      { minQuantity: 20, maxQuantity: 49, price: 79.0 },
      { minQuantity: 50, maxQuantity: null, price: 72.0 },
    ],
  },
  {
    id: 'jetbrains',
    name: 'JetBrains 全家桶 1年订阅',
    category: 'software',
    categoryLabel: '软件激活',
    price: 199.0,
    originalPrice: 349,
    image: 'https://picsum.photos/seed/jetbrains/400/300',
    images: [
      'https://picsum.photos/seed/jetbrains/800/600',
    ],
    sales: 876,
    stock: 34,
    rating: 4.9,
    ratingCount: 567,
    specs: [
      { name: '产品', options: ['IntelliJ IDEA', 'WebStorm', 'PyCharm', '全部产品'] },
    ],
    description: '<p>JetBrains IDE全家桶订阅，包含IntelliJ IDEA、WebStorm、PyCharm等所有IDE。</p>',
    purchaseNotes: '• 需要JetBrains账号\n• 订阅期内可使用所有IDE\n• 支持Windows、Mac、Linux',
    reviews: [],
    tags: ['JetBrains', 'IDE', '开发工具'],
    isNew: true,
  },

  // 会员订阅
  {
    id: 'netflix-1m',
    name: 'Netflix 奈飞会员 1个月',
    category: 'membership',
    categoryLabel: '会员订阅',
    price: 25.0,
    originalPrice: 35,
    image: 'https://picsum.photos/seed/netflix/400/300',
    images: [
      'https://picsum.photos/seed/netflix/800/600',
    ],
    sales: 6789,
    stock: 234,
    rating: 4.7,
    ratingCount: 4567,
    specs: [
      { name: '套餐', options: ['基础版(480p)', '标准版(1080p)', '高级版(4K)'] },
      { name: '时长', options: ['1个月', '3个月', '6个月', '12个月'] },
    ],
    description: '<p>Netflix奈飞会员共享账号，支持手机、平板、电脑、电视观看。</p>',
    purchaseNotes: '• 共享账号，请勿修改密码\n• 支持1080P/4K画质\n• 如有问题随时联系客服',
    reviews: [],
    tags: ['Netflix', '奈飞', '视频会员'],
    isHot: true,
    wholesaleTiers: [
      { minQuantity: 1, maxQuantity: 4, price: 25.0 },
      { minQuantity: 5, maxQuantity: 19, price: 23.0 },
      { minQuantity: 20, maxQuantity: 49, price: 20.0 },
      { minQuantity: 50, maxQuantity: null, price: 18.0 },
    ],
  },
  {
    id: 'spotify-1m',
    name: 'Spotify Premium 会员 1个月',
    category: 'membership',
    categoryLabel: '会员订阅',
    price: 12.0,
    originalPrice: 18,
    image: 'https://picsum.photos/seed/spotify/400/300',
    images: [
      'https://picsum.photos/seed/spotify/800/600',
    ],
    sales: 4567,
    stock: 567,
    rating: 4.8,
    ratingCount: 3456,
    specs: [
      { name: '类型', options: ['个人版', '家庭版(6人)'] },
      { name: '时长', options: ['1个月', '3个月', '6个月', '12个月'] },
    ],
    description: '<p>Spotify Premium会员，无广告、离线播放、高音质。</p>',
    purchaseNotes: '• 需要科学上网使用\n• 共享账号请勿修改密码\n• 支持手机、电脑、平板',
    reviews: [],
    tags: ['Spotify', '音乐', '会员'],
    wholesaleTiers: [
      { minQuantity: 1, maxQuantity: 9, price: 12.0 },
      { minQuantity: 10, maxQuantity: 29, price: 11.0 },
      { minQuantity: 30, maxQuantity: 99, price: 10.0 },
      { minQuantity: 100, maxQuantity: null, price: 9.0 },
    ],
  },
  {
    id: 'youtube-premium',
    name: 'YouTube Premium 会员 1个月',
    category: 'membership',
    categoryLabel: '会员订阅',
    price: 15.0,
    originalPrice: 23,
    image: 'https://picsum.photos/seed/youtube/400/300',
    images: [
      'https://picsum.photos/seed/youtube/800/600',
    ],
    sales: 3456,
    stock: 345,
    rating: 4.7,
    ratingCount: 2345,
    specs: [
      { name: '时长', options: ['1个月', '3个月', '6个月', '12个月'] },
    ],
    description: '<p>YouTube Premium会员，无广告、后台播放、YouTube Music。</p>',
    purchaseNotes: '• 需要科学上网使用\n• 支持手机、电脑、平板、电视',
    reviews: [],
    tags: ['YouTube', '视频', '会员'],
  },
  {
    id: 'bilibili-vip',
    name: 'B站大会员 1个月',
    category: 'membership',
    categoryLabel: '会员订阅',
    price: 18.0,
    originalPrice: 25,
    image: 'https://picsum.photos/seed/bilibili/400/300',
    images: [
      'https://picsum.photos/seed/bilibili/800/600',
    ],
    sales: 8765,
    stock: 678,
    rating: 4.8,
    ratingCount: 5678,
    specs: [
      { name: '时长', options: ['1个月', '3个月', '6个月', '12个月'] },
    ],
    description: '<p>B站大会员，享受1080P高清、抢先看、专属装扮等特权。</p>',
    purchaseNotes: '• 充值到您的B站账号\n• 支持手机、电脑、平板',
    reviews: [],
    tags: ['B站', 'bilibili', '视频会员'],
    isHot: true,
  },
  {
    id: 'apple-music',
    name: 'Apple Music 会员 1个月',
    category: 'membership',
    categoryLabel: '会员订阅',
    price: 8.0,
    originalPrice: 11,
    image: 'https://picsum.photos/seed/applemusic/400/300',
    images: [
      'https://picsum.photos/seed/applemusic/800/600',
    ],
    sales: 2345,
    stock: 456,
    rating: 4.6,
    ratingCount: 1234,
    specs: [
      { name: '类型', options: ['个人版', '家庭版(6人)', '学生版'] },
      { name: '时长', options: ['1个月', '3个月', '6个月', '12个月'] },
    ],
    description: '<p>Apple Music会员，畅听1亿首歌曲，支持无损音质和空间音频。</p>',
    purchaseNotes: '• 需要Apple ID\n• 支持iPhone、iPad、Mac、Android',
    reviews: [],
    tags: ['Apple', '音乐', '会员'],
  },

  // 优惠券
  {
    id: 'meituan-30',
    name: '美团外卖红包 30元',
    category: 'coupon',
    categoryLabel: '优惠券',
    price: 3.0,
    originalPrice: 5,
    image: 'https://picsum.photos/seed/meituan/400/300',
    images: [
      'https://picsum.photos/seed/meituan/800/600',
    ],
    sales: 12345,
    stock: 2345,
    rating: 4.5,
    ratingCount: 8765,
    specs: [
      { name: '面值', options: ['20元', '30元', '50元'] },
    ],
    description: '<p>美团外卖红包，满减优惠，每天可领。</p>',
    purchaseNotes: '• 有效期7天\n• 每天可领取一次\n• 满30元可用',
    reviews: [],
    tags: ['美团', '外卖', '红包'],
    isHot: true,
  },
  {
    id: 'ele-25',
    name: '饿了么红包 25元',
    category: 'coupon',
    categoryLabel: '优惠券',
    price: 2.5,
    originalPrice: 4,
    image: 'https://picsum.photos/seed/eleme/400/300',
    images: [
      'https://picsum.photos/seed/eleme/800/600',
    ],
    sales: 9876,
    stock: 1234,
    rating: 4.4,
    ratingCount: 6543,
    specs: [
      { name: '面值', options: ['15元', '25元', '40元'] },
    ],
    description: '<p>饿了么外卖红包，满减优惠。</p>',
    purchaseNotes: '• 有效期7天\n• 满25元可用',
    reviews: [],
    tags: ['饿了么', '外卖', '红包'],
  },
  {
    id: 'didi-20',
    name: '滴滴出行优惠券 20元',
    category: 'coupon',
    categoryLabel: '优惠券',
    price: 2.0,
    originalPrice: 3,
    image: 'https://picsum.photos/seed/didi/400/300',
    images: [
      'https://picsum.photos/seed/didi/800/600',
    ],
    sales: 7654,
    stock: 987,
    rating: 4.3,
    ratingCount: 4321,
    specs: [
      { name: '类型', options: ['快车', '专车', '拼车'] },
      { name: '面值', options: ['10元', '20元', '30元'] },
    ],
    description: '<p>滴滴出行优惠券，打车立减。</p>',
    purchaseNotes: '• 有效期15天\n• 满50元可用',
    reviews: [],
    tags: ['滴滴', '出行', '优惠券'],
  },
  {
    id: 'taobao-50',
    name: '淘宝天猫优惠券 50元',
    category: 'coupon',
    categoryLabel: '优惠券',
    price: 5.0,
    originalPrice: 8,
    image: 'https://picsum.photos/seed/taobao/400/300',
    images: [
      'https://picsum.photos/seed/taobao/800/600',
    ],
    sales: 15678,
    stock: 3456,
    rating: 4.6,
    ratingCount: 12345,
    specs: [
      { name: '类型', options: ['淘宝', '天猫', '天猫超市'] },
      { name: '面值', options: ['30元', '50元', '100元'] },
    ],
    description: '<p>淘宝天猫通用优惠券，购物更划算。</p>',
    purchaseNotes: '• 有效期30天\n• 满200元可用\n• 部分商品不可用',
    reviews: [],
    tags: ['淘宝', '天猫', '优惠券'],
  },
]

// Helper functions
export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'all') return products
  return products.filter(p => p.category === category)
}

export function getHotProducts(): Product[] {
  return products.filter(p => p.isHot)
}

export function getNewProducts(): Product[] {
  return products.filter(p => p.isNew)
}

export function getFlashSaleProducts(): Product[] {
  return products.filter(p => p.isFlashSale)
}

export function searchProducts(keyword: string): Product[] {
  const lower = keyword.toLowerCase()
  return products.filter(p =>
    p.name.toLowerCase().includes(lower) ||
    p.tags.some(t => t.toLowerCase().includes(lower)) ||
    p.categoryLabel.toLowerCase().includes(lower)
  )
}
