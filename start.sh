#!/bin/bash

# 学员报名系统启动脚本

echo "🚀 启动学员报名系统..."
echo "================================="

# 检查Node.js是否安装
if ! command -v node &> /dev/null; then
    echo "❌ Node.js未安装，请先安装Node.js"
    exit 1
fi

# 检查npm是否安装
if ! command -v npm &> /dev/null; then
    echo "❌ npm未安装，请先安装npm"
    exit 1
fi

echo "✅ Node.js 版本: $(node --version)"
echo "✅ npm 版本: $(npm --version)"
echo ""

# 进入后端目录
cd backend

# 检查是否已安装依赖
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖包..."
    npm install
    echo "✅ 依赖安装完成"
else
    echo "✅ 依赖已存在，跳过安装"
fi

echo ""
echo "🌟 启动后台服务..."
echo "================================="
echo "🔗 管理后台: http://localhost:3000/admin"
echo "👥 用户管理: http://localhost:3000/admin/users.html"
echo "🔧 API接口: http://localhost:3000/api"
echo "❤️  健康检查: http://localhost:3000/health"
echo "================================="
echo "按 Ctrl+C 停止服务"
echo ""

# 启动服务
if command -v nodemon &> /dev/null; then
    echo "🔄 使用nodemon启动（开发模式）"
    nodemon app.js
else
    echo "🚀 使用node启动（生产模式）"
    node app.js
fi