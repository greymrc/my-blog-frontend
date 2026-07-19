<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { MoreFilled, MagicStick, EditPen } from '@element-plus/icons-vue'
import ToTop from '@/components/ToTop/index.vue'

defineProps({
  toTop: { type: Boolean, default: false },
  scrollPercentage: { type: Boolean, default: false },
})

const isContainerVisible = ref(false)
const toggleContainer = () => { isContainerVisible.value = !isContainerVisible.value }

// 快捷面板按钮（功能待开发，点击先提示开发中）
function comingSoon(name: string) {
  ElMessage.info(`${name}功能开发中，敬请期待～`)
}
</script>

<template>
  <div class="container_div">
    <div class="hide" :class="{ visible: isContainerVisible }">
      <div class="quick-panel">
        <div class="quick-btn" @click="comingSoon('AI助手')">
          <div class="quick-icon">
            <el-icon :size="20"><MagicStick /></el-icon>
          </div>
          <span class="quick-label">AI助手</span>
        </div>
        <div class="quick-btn" @click="comingSoon('问题反馈')">
          <div class="quick-icon">
            <el-icon :size="20"><EditPen /></el-icon>
          </div>
          <span class="quick-label">问题反馈</span>
        </div>
      </div>
    </div>
    <div class="my-4" @click="toggleContainer">
      <div class="more-btn">
        <el-icon :size="20"><MoreFilled /></el-icon>
      </div>
    </div>
    <div class="mb-4">
      <ToTop v-if="toTop"/>
    </div>
    <div class="scroll_percentage" v-if="scrollPercentage">
      <slot name="scroll_percentage"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container_div {
  z-index: 9999;
  position: fixed;
  bottom: 4rem;
  right: 2rem;
  padding: 0.5rem;
  width: 60px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  @media screen and (max-width: 768px) {
    bottom: 0;
    right: .5rem;
  }

  .scroll_percentage {
    background: var(--mao-scroll-percentage-bg);
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    border-radius: 10px;
    width: 40px; height: 40px;
    display: flex; justify-content: center; align-items: center;
    font-size: .9rem;
    font-weight: bold;
  }

  .more-btn {
    width: 40px; height: 40px;
    display: flex; justify-content: center; align-items: center;
    background: var(--el-bg-color);
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    cursor: pointer;
    transition: all 0.3s;

    &:hover { transform: translateY(-3px); }
  }

  .quick-panel {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    align-items: center;
    margin-bottom: 0.75rem;

    .quick-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;

      .quick-icon {
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: var(--el-bg-color);
        border-radius: 50%;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        transition: all 0.3s;

        &:hover {
          transform: translateY(-3px);
        }
      }

      .quick-label {
        margin-top: 4px;
        font-size: 0.7rem;
        color: var(--el-text-color-regular);
        white-space: nowrap;
      }
    }
  }
}

.hide {
  opacity: 0;
  height: auto;
  transition: all .5s;
  transform: translate(90px, 0);
}

.visible {
  height: auto;
  opacity: 1;
  transform: translate(0, 0);
  transition: all .5s;
}
</style>
