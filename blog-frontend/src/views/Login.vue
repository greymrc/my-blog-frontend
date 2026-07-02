<script setup lang="ts">
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'

const form = reactive({
  account: '',
  password: '',
})

const handleLogin = () => {
  if (!form.account || !form.password) {
    ElMessage.warning('请输入账号和密码')
    return
  }
  ElMessage.info('登录功能开发中')
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="login-title">欢迎登录</h2>
      <el-form :model="form" label-width="0">
        <el-form-item>
          <el-input v-model="form.account" placeholder="请输入账号" :prefix-icon="User" size="large" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" type="password" placeholder="请输入密码" :prefix-icon="Lock" size="large" show-password />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="large" style="width: 100%" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
      <div class="login-footer">
        还没有账号？<el-link type="primary">去注册</el-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-card {
  width: 400px;
  padding: 2.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);

  @media (max-width: 500px) {
    width: 90%;
    padding: 1.5rem;
  }
}

.login-title {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #303133;
}

.login-footer {
  text-align: center;
  color: #909399;
  margin-top: 1rem;
}
</style>
