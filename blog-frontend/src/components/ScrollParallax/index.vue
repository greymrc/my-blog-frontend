<template>
  <div
    ref="parallaxContainer"
    class="parallax-element"
    :style="{ transform: `translateY(${offset}px)`, transition: 'transform 0.3s ease-out' }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  speed: { type: Number, default: 0.2 },
  direction: { type: String, default: 'up' },
});

const parallaxContainer = ref<HTMLElement | null>(null);
const offset = ref(0);
let scrollY = 0;
let windowHeight = 0;

const calculateOffset = () => {
  if (!parallaxContainer.value) return;
  const rect = parallaxContainer.value.getBoundingClientRect();
  const elementTop = rect.top + window.scrollY;
  const elementHeight = rect.height;
  const elementInView = scrollY + windowHeight > elementTop && scrollY < elementTop + elementHeight;

  if (elementInView) {
    const viewportOffset = (scrollY + windowHeight - elementTop) / (windowHeight + elementHeight);
    const normalized = Math.max(0, Math.min(1, viewportOffset));
    const direction = props.direction === 'up' ? -1 : 1;
    const maxOffset = elementHeight * props.speed * direction;
    offset.value = maxOffset * normalized;
  }
};

const handleScroll = () => {
  scrollY = window.scrollY;
  requestAnimationFrame(calculateOffset);
};

onMounted(() => {
  windowHeight = window.innerHeight;
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.parallax-element {
  will-change: transform;
}
</style>
