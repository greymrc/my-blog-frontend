<template>
  <div class="not-found">
    <div class="content">
      <h1 class="code">404</h1>
      <p class="message">页面走丢了...</p>
      <el-button type="primary" @click="$router.push('/')">回到首页</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--mao-background-color);
}

.content {
  text-align: center;
}

.code {
  font-size: 8rem;
  font-weight: bold;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
}

.message {
  font-size: 1.5rem;
  color: #909399;
  margin-bottom: 2rem;
}
</style>
