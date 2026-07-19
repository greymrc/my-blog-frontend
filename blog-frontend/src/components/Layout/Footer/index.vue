<script setup lang="ts">
import useWebsiteStore from '@/stores/website'

const useWebsite = useWebsiteStore()
</script>

<template>
  <div class="Footer">
    <div class="footer_container">
      <div class="footer_text">
        <div>&copy; {{ useWebsite.siteStatic?.websiteName }}</div>
        <div>备案号：<a href="https://beian.miit.gov.cn">{{ useWebsite.siteStatic?.recordInfo }}</a></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Footer {
  box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100px;
  background: var(--mao-bg-footer);
}

.footer_container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer_text {
  line-height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff;

  a {
    color: #fff;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
