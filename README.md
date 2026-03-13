# GitHub 2FA Authenticator

仿 Claude 风格的 GitHub 两步验证码生成器（TOTP / RFC 6238），支持移动端和 PC 端。  
除了 GitHub，还支持 Google、Microsoft、AWS、Cloudflare、Discord 等任意遵循 TOTP 标准的平台。

**特点**：轻量、离线、本地计算、即开即用。

## 功能

- ⚡ **快速生成**：选择平台 + 输入密钥立即生成验证码，无需保存账户
- 📋 **账户管理**：保存多个 TOTP 账户，统一查看和管理
- 🔄 **实时刷新**：每 30 秒自动刷新，附带环形倒计时动画
- 📋 **一键复制**：一键复制 6 位验证码
- 🧾 **导出配置**：支持将账户列表导出为 JSON，方便备份/迁移
- 📱 **二维码导入**：在账号卡片中按需展开二维码，直接被手机验证器扫码导入
- 🔒 **本地计算**：全部在浏览器本地完成，不上传任何数据

## 隐私与安全说明

- **不上传**：验证码计算完全在浏览器本地完成，不会向服务器上传密钥或验证码。
- **不持久化**：当前实现仅保存于内存，刷新页面会清空（适合临时使用/演示）。
- **风险提示**：2FA 密钥等同于“生成验证码的钥匙”，请勿在不可信设备或不可信网页中输入。

## 快速启动

确保已安装 [Node.js](https://nodejs.org/)（建议 v18+），然后：

```bash
# 安装依赖
npm install

# 或者（任选其一）
# pnpm install
# yarn install

# 启动开发服务器
npm run dev
```

打开浏览器访问 `http://localhost:5173`

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

## 项目结构

（核心文件，便于二次开发）

```text
src/
  App.jsx                  # 应用入口：布局/状态/样式
  constants/
    platforms.jsx          # 支持的平台定义（名称、图标、提示文案等）
  utils/
    totp.js                 # TOTP 计算 + useTOTP hook
  components/
    QuickGen.jsx            # “快速生成”页（选择平台 + 输入密钥）
    Manager.jsx             # “账户管理”页（列表、导出 JSON）
    AddModal.jsx            # 添加账户弹窗（选择平台 + 账户名称 + 密钥）
    AccountCard.jsx         # 账户卡片（验证码、复制、倒计时、二维码）
    PlatformPicker.jsx      # 平台选择下拉
    QrCode.jsx              # 渲染 otpauth:// 二维码
    Code.jsx                # 验证码展示
    CopyBtn.jsx             # 复制按钮
    Ring.jsx                # 环形倒计时
    Icons.jsx               # 图标集合
```

## 常见问题

- **为什么验证码每 30 秒变化一次？**  
  这是 TOTP 的标准周期（本项目默认 30 秒）。
- **可以做成“永久保存账户”吗？**  
  可以，把账户列表写入 `localStorage` / IndexedDB 即可（目前为了安全与简单，默认不落盘）。
- **导出的 JSON 长什么样？**  
  目前导出格式为一个数组，每项结构为：
  ```json
  [
    {
      "id": 1710230000000,
      "label": "octocat",
      "secret": "JBSWY3DPEHPK3PXP",
      "platformId": "github",
      "color": "#e8612c"
    }
  ]
  ```
  以后可以直接用作导入格式（尚未实现导入，仅支持导出）。

## 贡献

欢迎提交 Issue / PR：

- 修复 bug、优化交互与可访问性（a11y）
- 增加账户持久化（可选开关）
- 增加导入/导出（例如 JSON）

## 技术栈

- React 18 / Vite 5
- Web Crypto API（TOTP / RFC 6238）
- `qrcode`（在前端生成 otpauth:// 二维码）

## License

本项目采用 **MIT License**，详见 `LICENSE`。
