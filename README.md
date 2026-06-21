# My Blog Frontend

基于 Vue 3 + TypeScript + Element Plus 的博客前端 Monorepo 项目。

## 项目结构

```
my-blog-frontend/
├── apps/
│   ├── blog/          # 博客前台（端口 3000）
│   └── admin/         # 管理后台（端口 3001）
├── packages/
│   └── shared/        # 共享代码（类型、API、工具函数）
├── package.json       # Monorepo 根配置
└── pnpm-workspace.yaml
```

## 技术栈

- **框架**: Vue 3.4 + TypeScript 5.3
- **构建**: Vite 5.1
- **状态管理**: Pinia 2.1
- **路由**: Vue Router 4.3
- **UI 组件库**: Element Plus 2.5
- **CSS**: SCSS
- **包管理**: pnpm workspace

## 开发

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
# 启动博客前台
pnpm blog:dev

# 启动管理后台
pnpm admin:dev

# 同时启动两个项目
pnpm dev
```

### 构建

```bash
# 构建博客前台
pnpm blog:build

# 构建管理后台
pnpm admin:build

# 构建所有项目
pnpm build
```

## 共享包 (@my-blog/shared)

提供两个应用共享的代码：

- **types**: 类型定义（用户、文章、分类、标签等）
- **api**: Axios 请求封装
- **utils**: 工具函数
- **constants**: 常量定义

使用方式：

```ts
// 导入所有
import { UserInfo, request, formatDate } from '@my-blog/shared'

// 按模块导入
import { UserInfo } from '@my-blog/shared/types'
import { request } from '@my-blog/shared/api'
import { formatDate } from '@my-blog/shared/utils'
```

## 端口配置

- 博客前台: http://localhost:3000
- 管理后台: http://localhost:3001
- API 代理: /api → http://localhost:8080