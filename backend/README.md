# 学员报名小程序后台系统

## 项目简介

这是一个为微信小程序学员报名系统提供后台API服务的Node.js应用程序，包含用户管理、数据统计等功能。

## 功能特性

### 用户管理模块
- 📊 **数据看板**: 显示访问总人数、有效用户数、近一个月访问人数等关键指标
- 👥 **用户列表**: 分页显示用户信息，支持搜索筛选
- 📈 **实时统计**: 支持实时刷新统计数据
- 💾 **数据导出**: 支持用户数据CSV格式导出

### API 接口
- `GET /api/users/stats` - 获取用户统计数据（总人数、有效用户、近一月访问）
- `GET /api/users` - 获取用户列表（支持分页和搜索）
- `GET /api/users/total-visitors` - 获取访问总人数
- `GET /api/users/valid-users` - 获取有效用户数
- `GET /api/users/recent-visitors` - 获取近一个月访问人数
- `GET /api/blacklist/stats` - 获取黑名单统计数据（总黑名单数、生效黑名单数）
- `GET /api/blacklist` - 获取黑名单列表（支持分页、搜索和状态筛选）
- `GET /api/blacklist/total` - 获取黑名单总数
- `GET /api/blacklist/active` - 获取生效黑名单数

## 安装和运行

### 1. 安装依赖

```bash
cd backend
npm install
```

### 2. 环境配置

复制 `.env` 文件并配置数据库连接信息：

```bash
# 复制环境配置文件
cp .env.example .env

# 编辑配置文件
vim .env
```

### 3. 启动服务

```bash
# 开发模式（推荐）
npm run dev

# 生产模式
npm start
```

### 4. 访问后台

服务启动后，可通过以下地址访问：

- **管理后台**: http://localhost:3000/admin
- **用户管理**: http://localhost:3000/admin/users.html
- **黑名单管理**: http://localhost:3000/admin/blacklist.html
- **API接口**: http://localhost:3000/api
- **健康检查**: http://localhost:3000/health

## 目录结构

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # 数据库配置和模拟数据
│   └── routes/
│       └── users.js             # 用户相关API路由
├── .env                         # 环境变量配置
├── app.js                       # 应用程序入口
├── package.json                 # 项目依赖配置
└── README.md                    # 项目说明文档
```

## 技术栈

- **后端框架**: Express.js
- **数据库**: MySQL 2 (可选，当前使用模拟数据)
- **跨域处理**: CORS
- **环境变量**: dotenv
- **开发工具**: nodemon

## 数据模拟

当前版本使用模拟数据进行演示，包含150个用户的示例数据。在生产环境中，可以配置实际的MySQL数据库连接。

### 模拟数据包含：
- 用户ID、OpenID、微信昵称
- 手机号（70%用户已授权）
- 首次访问时间、最新访问时间
- 访问次数统计

## 开发说明

### 添加新的API接口

1. 在 `src/routes/` 目录下创建新的路由文件
2. 在 `app.js` 中注册新的路由
3. 在 `src/config/database.js` 中添加数据处理函数

### 前端集成

管理后台页面位于 `../admin/` 目录，通过静态文件服务提供访问。修改前端代码后无需重启后端服务。

## 部署建议

### 生产环境配置

1. 配置实际的MySQL数据库
2. 修改 `.env` 文件中的数据库连接信息
3. 使用PM2等进程管理工具
4. 配置Nginx反向代理
5. 启用HTTPS

### Docker部署（可选）

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 许可证

MIT License