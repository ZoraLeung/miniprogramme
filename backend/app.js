const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 静态文件服务（服务admin目录）
app.use('/admin', express.static('../admin'));

// API 路由
const usersRouter = require('./src/routes/users');
const blacklistRouter = require('./src/routes/blacklist');
app.use('/api/users', usersRouter);
app.use('/api/blacklist', blacklistRouter);

// 健康检查
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 404 处理
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: '接口不存在'
  });
});

// 错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: '服务器内部错误',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`后台服务启动成功，端口: ${PORT}`);
  console.log(`管理后台地址: http://localhost:${PORT}/admin`);
  console.log(`API文档: http://localhost:${PORT}/api`);
});