# GitHub 2FA Authenticator

仿 Claude 风格的 GitHub 两步验证码生成器，支持移动端和 PC 端。

## 功能

- ⚡ **快速生成**：输入密钥立即生成验证码，无需保存账户
- 📋 **账户管理**：保存多个 GitHub 账户，长期管理验证码
- 🔄 每 30 秒自动刷新，环形倒计时动画
- 📋 一键复制验证码
- 🔒 全部本地计算，不上传任何数据

## 快速启动

确保已安装 [Node.js](https://nodejs.org/) (v16+)，然后：

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

打开浏览器访问 http://localhost:5173

## 构建生产版本

```bash
npm run build
npm run preview
```

## 如何获取 GitHub 2FA 密钥

1. 登录 GitHub → Settings
2. Password and authentication
3. Two-factor authentication → Authenticator app
4. 选择 "Setup key" 即可看到 Base32 密钥

## 技术栈

- React 18
- Vite 5
- Web Crypto API（TOTP / RFC 6238）
