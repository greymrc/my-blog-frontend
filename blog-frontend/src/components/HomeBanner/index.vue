<template>
  <div class="home-banner">
    <ul>
      <li
        v-for="(image, index) in bannerImages"
        :key="index"
        class="item"
        :style="{
          backgroundImage: `url(${image})`,
          animationDelay: `${index * 6}s`,
          animationDuration: `${bannerImages.length * 6}s`,
        }"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import useWebsiteStore from '@/stores/website'

const useWebsite = useWebsiteStore()
// 图片列表来自 store 的 siteConfig.bannerImages，一张 6s 交叉淡入淡出
const bannerImages = computed(() => useWebsite.siteConfig?.bannerImages ?? [])
</script>

<style lang="scss" scoped>
.home-banner {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -9;
  background-color: #363636;
  overflow: hidden;

  .item {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: no-repeat 50% 50% / cover;
    opacity: 0;
    animation-name: imageAnimation;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    backface-visibility: hidden;
    transform-style: preserve-3d;
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

@keyframes imageAnimation {
  0% {
    opacity: 0;
    animation-timing-function: ease-in;
  }

  2% {
    opacity: 1;
  }

  8% {
    opacity: 1;
    transform: scale(1.05);
    animation-timing-function: ease-out;
  }

  17% {
    opacity: 1;
    transform: scale(1.1);
  }

  25% {
    opacity: 0;
    transform: scale(1.1);
  }

  100% {
    opacity: 0;
  }
}
</style>
