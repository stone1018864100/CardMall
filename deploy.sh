#!/bin/bash

# Card Mall 部署脚本
# 使用方法: ./deploy.sh

echo "=== Card Mall 部署脚本 ==="

# 1. 本地构建
echo "1. 正在构建前端项目..."
npm run build

if [ $? -ne 0 ]; then
    echo "构建失败！"
    exit 1
fi

echo "构建完成！"

# 2. 显示需要上传的文件
echo ""
echo "2. 请将以下文件/目录上传到服务器:"
echo "   - dist/ 目录"
echo "   - docker-compose.yml"
echo "   - nginx.conf"
echo ""
echo "上传命令示例:"
echo "   scp -r dist docker-compose.yml nginx.conf user@你的服务器IP:/home/card-mall/"
echo ""
echo "3. 服务器上执行:"
echo "   cd /home/card-mall"
echo "   docker compose up -d"
echo ""
echo "=== 完成 ==="
