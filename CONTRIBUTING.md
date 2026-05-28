# 贡献指南

感谢你对 CardMall 项目的关注！我们欢迎任何形式的贡献。

## 如何贡献

### 提交 Issue

- 使用 Issue 模板提交 Bug 报告或功能建议
- 请尽可能详细地描述问题或建议
- 如果是 Bug，请提供复现步骤和环境信息

### 提交 Pull Request

1. **Fork 项目**
   ```bash
   # 点击项目右上角的 Fork 按钮
   ```

2. **克隆你的 Fork**
   ```bash
   git clone https://github.com/your-username/card-mall-demo.git
   cd card-mall-demo
   ```

3. **创建功能分支**
   ```bash
   git checkout -b feature/你的功能名称
   ```

4. **进行修改**
   - 遵循现有的代码风格
   - 添加必要的注释
   - 确保所有测试通过

5. **提交更改**
   ```bash
   git add .
   git commit -m "feat: 添加某某功能"
   ```

6. **推送到你的 Fork**
   ```bash
   git push origin feature/你的功能名称
   ```

7. **创建 Pull Request**
   - 访问原项目页面
   - 点击 "New Pull Request"
   - 填写 PR 描述

## 代码规范

### 提交信息格式

使用语义化提交信息：

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type 类型：**
- `feat`: 新功能
- `fix`: 修复 Bug
- `docs`: 文档更新
- `style`: 代码格式（不影响代码运行的变动）
- `refactor`: 重构（既不是新增功能，也不是修改 bug 的代码变动）
- `perf`: 性能优化
- `test`: 增加测试
- `chore`: 构建过程或辅助工具的变动

**示例：**
```
feat(product): 添加商品收藏功能

- 用户可以收藏喜欢的商品
- 收藏列表持久化存储
- 个人中心查看收藏列表

Closes #123
```

### 代码风格

- 使用 TypeScript 编写
- 遵循 Vue 3 Composition API 规范
- 使用 `<script setup>` 语法
- 组件名使用 PascalCase
- 变量名使用 camelCase

### 文件组织

```
src/
├── components/          # 可复用组件
│   ├── common/         # 通用组件
│   └── [feature]/      # 功能组件
├── pages/              # 页面组件
├── stores/             # Pinia Store
├── composables/        # 组合式函数
├── utils/              # 工具函数
└── types/              # TypeScript 类型
```

## 开发环境

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0 或 pnpm >= 8.0.0

### 安装与运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 运行测试
npm run test

# 代码检查
npm run lint

# 构建生产版本
npm run build
```

## 问题反馈

如果遇到问题，请通过以下方式反馈：

1. **GitHub Issues**: [提交 Issue](https://github.com/your-username/card-mall-demo/issues)
2. **描述问题**: 请详细描述问题现象和复现步骤
3. **提供信息**: 
   - 操作系统和版本
   - Node.js 版本
   - 浏览器版本
   - 错误信息或截图

## 行为准则

- 尊重每一位贡献者
- 接受建设性的批评和建议
- 专注于对社区最有利的事情
- 对他人表示同理心

## 许可证

参与贡献即表示你同意你的贡献将基于 [MIT License](./LICENSE) 进行许可。

---

再次感谢你的贡献！🎉
