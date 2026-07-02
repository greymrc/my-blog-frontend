<script setup lang="ts">
import { Refresh } from '@element-plus/icons-vue'

defineProps({
  prefixIcon: String,
  suffixIcon: { type: String, default: '' },
  isDithering: { type: Boolean, default: false },
  isArrow: { type: Boolean, default: false },
  isRotate: { type: Boolean, default: false },
  isScale: { type: Boolean, default: false },
  title: String,
  isCatalog: { type: Boolean, default: false },
})

const emit = defineEmits(['invoke'])
function invoke() { emit('invoke') }
</script>

<template>
  <div class="card">
    <div class="title" :style="isCatalog ? 'position: sticky;top: 0' : ''">
      <div class="title_text">
        <el-icon v-if="prefixIcon" :size="24"><component :is="prefixIcon" /></el-icon>
        <span style="margin-left: 10px">{{ title }}</span>
      </div>
      <div :class="{ 'arrow': isArrow, 'rotate': isRotate }"
           :style="suffixIcon === 'rotate' ? 'cursor: pointer' : ''"
           @click="invoke">
        <el-icon v-if="suffixIcon === 'rotate'" :size="20"><Refresh /></el-icon>
      </div>
    </div>
    <div class="content">
      <slot/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  background-color: var(--el-bg-color);
  width: $card-width;
  margin: $card-margin;
  border: 1px solid var(--el-border-color);
  border-radius: $border-radius;
  margin-top: 1.5em;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
  overflow: hidden;

  .title {
    border-radius: $border-radius $border-radius 0 0;
    background-color: var(--el-bg-color);
    z-index: 2;
    display: flex;
    padding: 10px;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;

    .title_text {
      display: flex;
      align-items: center;
    }

    .rotate:hover { animation: rotate 1s infinite linear; }

    @keyframes rotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  }

  .content {
    min-height: 5em;
    text-align: center;
    line-height: 22px;
    padding: 10px;
    color: grey;
  }
}
</style>
