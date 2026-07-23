#!/bin/bash
# 启动 blog 前端容器（nginx 镜像 + 挂载 dist + 80 端口）
# 用法：在 docker-compose.yml 同目录下执行  ./build.sh
set -e

# docker compose up -d
# --force-recreate：重建容器以重新解析 ./dist 挂载，避免部署时删重建 dist 目录导致 bind mount 失效（容器里 html 为空 -> 403）
docker compose up -d --force-recreate

# 停止并删除容器：docker compose down
# 查看实时日志：    docker compose logs -f
# 老版本 docker-compose（v1）改用：docker-compose up -d
