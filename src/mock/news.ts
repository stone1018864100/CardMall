import type { Article, FAQ } from '@/types'

export const articles: Article[] = [
  {
    id: 'a1',
    title: '欢迎来到CardMall自助发卡商城',
    category: 'announcement',
    categoryLabel: '平台公告',
    excerpt: 'CardMall正式上线！我们致力于为您提供安全、快捷的数字商品购买体验。',
    content: `
      <h2>欢迎来到CardMall自助发卡商城</h2>
      <p>尊敬的用户，您好！</p>
      <p>CardMall自助发卡商城正式上线运营！我们致力于为您提供安全、快捷、便捷的数字商品购买体验。</p>
      <h3>平台特色</h3>
      <ul>
        <li><strong>自动发货</strong>：支付成功后，卡密将自动发送至您的邮箱，无需等待</li>
        <li><strong>安全保障</strong>：所有商品均经过严格审核，确保正版有效</li>
        <li><strong>售后无忧</strong>：如遇问题，7×24小时客服在线为您解决</li>
        <li><strong>价格优惠</strong>：直接对接官方渠道，省去中间环节，价格更实惠</li>
      </ul>
      <h3>商品范围</h3>
      <p>我们提供各类数字商品，包括但不限于：</p>
      <ul>
        <li>游戏点卡：Steam、PlayStation、Xbox、Nintendo等</li>
        <li>软件激活码：Windows、Office、Adobe等</li>
        <li>会员订阅：Netflix、Spotify、YouTube等</li>
        <li>生活优惠券：美团、饿了么、滴滴等</li>
      </ul>
      <p>如有任何问题，欢迎随时联系我们的在线客服。</p>
      <p>祝您购物愉快！</p>
      <p>CardMall团队</p>
    `,
    image: 'https://picsum.photos/seed/welcome/800/400',
    author: 'CardMall官方',
    viewCount: 5678,
    createdAt: '2024-03-01 10:00:00',
  },
  {
    id: 'a2',
    title: '新用户注册优惠活动',
    category: 'announcement',
    categoryLabel: '平台公告',
    excerpt: '新用户注册即送5元无门槛优惠券，首单满50元再减10元！',
    content: `
      <h2>新用户注册优惠活动</h2>
      <p>活动时间：即日起至2024年4月30日</p>
      <h3>活动内容</h3>
      <ol>
        <li><strong>注册送券</strong>：新用户注册即送5元无门槛优惠券</li>
        <li><strong>首单优惠</strong>：首单满50元立减10元</li>
        <li><strong>邀请有礼</strong>：邀请好友注册，双方各得3元优惠券</li>
      </ol>
      <h3>使用说明</h3>
      <ul>
        <li>优惠券有效期30天</li>
        <li>不可与其他优惠叠加使用</li>
        <li>部分商品不参与活动</li>
      </ul>
      <p>如有疑问，请联系在线客服。</p>
    `,
    image: 'https://picsum.photos/seed/promotion/800/400',
    author: 'CardMall官方',
    viewCount: 3456,
    createdAt: '2024-03-05 14:30:00',
  },
  {
    id: 'a3',
    title: '如何购买Steam充值卡？详细教程',
    category: 'tutorial',
    categoryLabel: '使用教程',
    excerpt: '手把手教您如何在CardMall购买Steam充值卡并完成充值。',
    content: `
      <h2>如何购买Steam充值卡？详细教程</h2>
      <h3>第一步：选择商品</h3>
      <p>在商品列表中找到"Steam钱包充值卡"，选择您需要的面值（50元、100元、200元、500元）。</p>
      <h3>第二步：确认订单</h3>
      <p>点击"立即购买"，填写接收卡密的邮箱地址，确认订单信息无误。</p>
      <h3>第三步：完成支付</h3>
      <p>选择支付方式（支付宝、微信支付等），完成支付。</p>
      <h3>第四步：获取卡密</h3>
      <p>支付成功后，卡密将自动显示在页面上，同时也会发送至您的邮箱。</p>
      <h3>第五步：充值使用</h3>
      <ol>
        <li>打开Steam客户端或网页版</li>
        <li>登录您的Steam账号</li>
        <li>点击右上角用户名 → 账户明细</li>
        <li>选择"向我的Steam钱包充值"</li>
        <li>点击"兑换Steam礼物卡或钱包充值码"</li>
        <li>输入购买获得的充值码即可</li>
      </ol>
      <h3>常见问题</h3>
      <p><strong>Q：充值码多久有效？</strong></p>
      <p>A：充值码有效期为30天，请在有效期内使用。</p>
      <p><strong>Q：充值码可以退款吗？</strong></p>
      <p>A：充值码一经使用无法退款，未使用可联系客服处理。</p>
    `,
    image: 'https://picsum.photos/seed/steam-tutorial/800/400',
    author: 'CardMall教程',
    viewCount: 8901,
    createdAt: '2024-03-10 09:15:00',
  },
  {
    id: 'a4',
    title: '卡密购买后如何查看和使用？',
    category: 'tutorial',
    categoryLabel: '使用教程',
    excerpt: '购买卡密后，您可以通过多种方式查看和管理您的卡密。',
    content: `
      <h2>卡密购买后如何查看和使用？</h2>
      <h3>方式一：购买成功页面</h3>
      <p>支付成功后，页面会自动跳转到订单成功页面，卡密会直接显示在页面上。</p>
      <h3>方式二：邮箱查看</h3>
      <p>卡密会自动发送至您填写的邮箱，请注意查收（包括垃圾邮件箱）。</p>
      <h3>方式三：订单中心</h3>
      <ol>
        <li>登录您的CardMall账号</li>
        <li>进入"我的订单"页面</li>
        <li>找到对应订单，点击"查看卡密"</li>
      </ol>
      <h3>方式四：订单查询</h3>
      <p>无需登录，使用订单号和邮箱即可查询订单和卡密。</p>
      <h3>使用技巧</h3>
      <ul>
        <li>点击"复制"按钮可一键复制卡密</li>
        <li>长卡密可下载为TXT文件</li>
        <li>建议及时使用，避免过期</li>
      </ul>
    `,
    image: 'https://picsum.photos/seed/cardkey-tutorial/800/400',
    author: 'CardMall教程',
    viewCount: 6789,
    createdAt: '2024-03-12 11:20:00',
  },
  {
    id: 'a5',
    title: '数字商品行业趋势报告2024',
    category: 'news',
    categoryLabel: '行业资讯',
    excerpt: '2024年数字商品市场规模持续增长，游戏和订阅类商品最受欢迎。',
    content: `
      <h2>数字商品行业趋势报告2024</h2>
      <p>随着数字化进程的加速，数字商品市场持续增长。以下是2024年行业趋势分析。</p>
      <h3>市场规模</h3>
      <p>2024年全球数字商品市场规模预计达到5000亿美元，同比增长15%。</p>
      <h3>热门品类</h3>
      <ul>
        <li><strong>游戏点卡</strong>：占比35%，仍是最大品类</li>
        <li><strong>会员订阅</strong>：占比28%，增长最快</li>
        <li><strong>软件激活</strong>：占比22%，稳定增长</li>
        <li><strong>生活优惠券</strong>：占比15%，潜力巨大</li>
      </ul>
      <h3>用户画像</h3>
      <p>主要用户群体为18-35岁，男性占比60%，女性占比40%。</p>
      <h3>购买渠道</h3>
      <p>移动端购买占比超过70%，成为主要购买渠道。</p>
      <p>CardMall将继续优化移动端体验，为用户提供更好的服务。</p>
    `,
    image: 'https://picsum.photos/seed/industry-report/800/400',
    author: '行业分析师',
    viewCount: 2345,
    createdAt: '2024-03-15 16:45:00',
  },
  {
    id: 'a6',
    title: 'CardMall v2.0版本更新说明',
    category: 'announcement',
    categoryLabel: '平台公告',
    excerpt: '新增暗色模式、批量购买、订单导出等功能，优化用户体验。',
    content: `
      <h2>CardMall v2.0版本更新说明</h2>
      <p>感谢您的支持，CardMall v2.0版本正式发布！</p>
      <h3>新增功能</h3>
      <ul>
        <li><strong>暗色模式</strong>：支持深色主题，保护眼睛</li>
        <li><strong>批量购买</strong>：支持一次购买多个商品</li>
        <li><strong>订单导出</strong>：支持导出订单和卡密为TXT/CSV</li>
        <li><strong>商品收藏</strong>：支持收藏喜欢的商品</li>
        <li><strong>消息通知</strong>：订单状态变更实时通知</li>
      </ul>
      <h3>优化内容</h3>
      <ul>
        <li>优化页面加载速度</li>
        <li>改进移动端体验</li>
        <li>完善搜索功能</li>
        <li>增强安全性</li>
      </ul>
      <h3>问题修复</h3>
      <ul>
        <li>修复部分支付方式无法使用的问题</li>
        <li>修复订单状态显示异常</li>
        <li>修复邮箱验证问题</li>
      </ul>
      <p>如有问题，请联系在线客服。</p>
    `,
    image: 'https://picsum.photos/seed/update-v2/800/400',
    author: 'CardMall官方',
    viewCount: 4567,
    createdAt: '2024-03-20 10:30:00',
  },
]

export const faqs: FAQ[] = [
  {
    id: 'f1',
    question: '购买后多久能收到卡密？',
    answer: '支付成功后，卡密会立即自动发送。您可以在页面上直接查看，也会收到邮件通知。通常在1-5分钟内到账。',
    category: '购买相关',
  },
  {
    id: 'f2',
    question: '卡密有效期是多久？',
    answer: '不同商品有效期不同，一般为30天。请在有效期内使用，过期将无法使用。具体有效期请查看商品详情页。',
    category: '购买相关',
  },
  {
    id: 'f3',
    question: '卡密可以退款吗？',
    answer: '未使用的卡密可以在购买后7天内申请退款。已使用或已激活的卡密无法退款。请联系客服处理退款事宜。',
    category: '购买相关',
  },
  {
    id: 'f4',
    question: '没有收到卡密怎么办？',
    answer: '请先检查邮箱的垃圾邮件箱。如果仍未收到，请使用订单查询功能查看，或联系在线客服提供订单号，我们会尽快为您处理。',
    category: '购买相关',
  },
  {
    id: 'f5',
    question: '卡密无法使用怎么办？',
    answer: '请确认：1. 卡密输入正确，无多余空格；2. 卡密在有效期内；3. 卡密适用的区域/版本与您的账号匹配。如仍有问题，请联系客服并提供卡密截图。',
    category: '使用相关',
  },
  {
    id: 'f6',
    question: '支持哪些支付方式？',
    answer: '目前支持支付宝、微信支付、QQ钱包等主流支付方式。部分商品还支持花呗、信用卡支付。',
    category: '支付相关',
  },
  {
    id: 'f7',
    question: '如何查看我的订单？',
    answer: '登录后，在"我的订单"页面可以查看所有订单。未登录用户可以使用"订单查询"功能，输入订单号和邮箱查看。',
    category: '订单相关',
  },
  {
    id: 'f8',
    question: '订单可以取消吗？',
    answer: '未支付的订单可以取消。已支付的订单，如未使用卡密，可以联系客服取消并退款。',
    category: '订单相关',
  },
  {
    id: 'f9',
    question: '如何联系客服？',
    answer: '您可以通过以下方式联系我们：1. 页面右下角在线客服；2. 邮箱：support@cardmall.com；3. QQ群：123456789；4. Telegram：@cardmall',
    category: '其他',
  },
  {
    id: 'f10',
    question: '商品是正版吗？',
    answer: '我们所有商品均为正版授权，来源可靠。如发现任何问题，我们提供售后保障，请放心购买。',
    category: '其他',
  },
]

export function getArticlesByCategory(category: string): Article[] {
  if (category === 'all') return articles
  return articles.filter(a => a.category === category)
}

export function getArticleById(id: string): Article | undefined {
  return articles.find(a => a.id === id)
}
