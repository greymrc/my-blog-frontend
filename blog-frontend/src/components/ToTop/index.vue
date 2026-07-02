<script setup lang="ts">
import { Top } from '@element-plus/icons-vue'

const top = ref(0)
window.addEventListener("scroll", () => {
  top.value = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0
})

function backToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <transition name="el-zoom-in-bottom">
    <div v-if="top >= 500" @click="backToTop">
      <el-tooltip effect="light" content="回到顶部" placement="right">
        <div class="back-to-top-btn">
          <el-icon :size="20"><Top /></el-icon>
        </div>
      </el-tooltip>
    </div>
  </transition>
</template>

<style scoped lang="scss">
.back-to-top-btn {
  width: 40px; height: 40px;
  display: flex; justify-content: center; align-items: center;
  background: var(--el-bg-color);
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  }
}
</style>
