#!/bin/bash
# 启动 admin 管理端容器（nginx 镜像 + 挂载 dist + 8443 端口 HTTPS）
# 用法：在 docker-compose.yml 同目录下执行  ./build.sh
set -e

docker compose up -d

# 停止并删除容器：docker compose down
# 查看实时日志：    docker compose logs -f
# 老版本 docker-compose（v1）改用：docker-compose up -d
