<template>
  <div class="home-banner">
    <ul>
      <li
        v-for="(image, index) in bannerImages"
        :key="index"
        class="item"
        :class="{ active: index === activeIndex }"
        :style="{ backgroundImage: `url(${image})` }"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import useWebsiteStore from '@/stores/website'

const useWebsite = useWebsiteStore()
// 图片列表来自 store 的 siteConfig.bannerImages，一张 6s 交叉淡入淡出
const bannerImages = computed(() => useWebsite.siteConfig?.bannerImages ?? [])

const SLIDE_DURATION = 6000 // 每张停留 6s
const activeIndex = ref(0)
let timer: number | undefined

const stop = () => {
  if (timer !== undefined) {
    clearInterval(timer)
    timer = undefined
  }
}
const start = () => {
  stop()
  // 仅一张时无需轮播，保持常驻（也避免单图反复淡出露灰底）
  if (bannerImages.value.length <= 1) return
  timer = window.setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % bannerImages.value.length
  }, SLIDE_DURATION)
}

onMounted(start)
onBeforeUnmount(stop)
// 图片列表变化（如网站配置刷新）时重置轮播
watch(bannerImages, () => {
  activeIndex.value = 0
  start()
})
</script>

<style lang="scss" scoped>
.home-banner {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -9;
  background-color: #363636; // 仅作首屏图片加载前的兜底，切换时不再可见
  overflow: hidden;

  .item {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: no-repeat 50% 50% / cover;
    opacity: 0;
    // 新旧张同时过渡：opacity 交叉淡入淡出（合成透明度恒≈1，无灰底）；
    // transform 实现 Ken Burns 缓慢放大，并在每次 .active 时自动重放
    transition: opacity 1.2s ease-in-out, transform 8s linear;
    backface-visibility: hidden;
    transform-style: preserve-3d;

    &.active {
      opacity: 1;
      transform: scale(1.1);
    }
  }

  // 半透明遮罩，保证上方文字可读
  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease-in-out 0s;
  }
}
</style>
