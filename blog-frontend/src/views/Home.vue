<script setup lang="ts">
import Main from '@/components/Layout/Main/index.vue'
import SideBar from '@/components/Layout/SideBar/index.vue'
import CardEssay from '@/components/CardEssay/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import TextGlitch from '@/components/TextGlitch/index.vue'
import Wave from '@/components/Wave/index.vue'
import HomeBanner from '@/components/HomeBanner/index.vue'
import useWebsiteStore from '@/stores/website'
import usePaginationStore from '@/stores/pagination'
import { ArrowDown, Bell, Document } from '@element-plus/icons-vue'

const useWebsite = useWebsiteStore()
const paginationStore = usePaginationStore()

// 进入首页始终从第 1 页拉取，避免与分类/标签过滤视图共用分页状态导致的页码残留
paginationStore.articlePagination.current = 1

const scrollDown = () => {
  window.scrollTo({
    behavior: 'smooth',
    top: document.documentElement.clientHeight,
  })
}

// 打字机效果
const typingText = ref('')
const fullText = '热爱编程，热爱生活，记录成长之路'
let charIndex = 0
let isDeleting = false

onMounted(() => {
  typeWriter()
})

function typeWriter() {
  if (!isDeleting) {
    typingText.value = fullText.substring(0, charIndex + 1)
    charIndex++
    if (charIndex === fullText.length) {
      setTimeout(() => { isDeleting = true; typeWriter() }, 2000)
      return
    }
  } else {
    typingText.value = fullText.substring(0, charIndex - 1)
    charIndex--
    if (charIndex === 0) {
      isDeleting = false
    }
  }
  setTimeout(typeWriter, isDeleting ? 50 : 150)
}
</script>

<template>
  <div class="home_container">
    <!-- 首页 Banner 背景图轮播 -->
    <HomeBanner />
    <!-- 首页 Banner -->
    <div class="brand-container">
      <div class="brand">
        <TextGlitch :text="useWebsite?.siteStatic?.websiteName || 'My Blog'" />
        <div class="brand-text">
          <div class="title">
            {{ typingText }}
            <span class="easy-typed-cursor">|</span>
          </div>
        </div>
      </div>
      <Wave />
      <div class="button-container" @click="scrollDown">
        <el-icon :size="50" color="#fff"><ArrowDown /></el-icon>
        <div class="button-ripple"></div>
      </div>
    </div>
    <!-- 首页内容 -->
    <div class="bg">
      <Main is-side-bar>
        <template #content>
          <div class="announcement">
            <el-icon style="min-width: 30px" :size="20"><Bell /></el-icon>
            <span>{{ useWebsite?.siteStatic?.headerNotification }}</span>
          </div>
          <div class="essay_title">
            <el-divider border-style="dashed" content-position="left">
              <div style="display: flex; align-items: center">
                <el-icon color="#409EFF"><Document /></el-icon>
                <span style="margin-left: 5px">文章</span>
              </div>
            </el-divider>
          </div>
          <CardEssay />
          <Pagination />
          <div>
            <el-divider border-style="dashed" content-position="center">
              <div style="font-weight: bold">~~到达底部啦~~</div>
            </el-divider>
          </div>
        </template>
        <template #information>
          <SideBar />
        </template>
      </Main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bg {
  transition: all 1s ease !important;
  background-color: var(--mao-background-color);
}

.home_container {
  width: 100%;
  @media screen and (max-width: 910px) {
    width: 100vw;
  }
}

.brand-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 10rem;
  color: var(--header-text-color);
}

.brand {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: fixed;
  z-index: -1;
  top: 15em;

  .brand-text {
    background: rgba(255, 255, 255, 0.5);
    padding: 0.5em;
    border-radius: 0.5em;
  }

  .title {
    letter-spacing: 0.1em;
    background: linear-gradient(90deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 700;
    font-size: 1.5rem;
    @media (max-width: 500px) {
      font-size: 1em;
    }
  }
}

.easy-typed-cursor {
  opacity: 0;
  animation: blink 0.7s infinite;
  background: linear-gradient(90deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.button-container {
  position: absolute;
  bottom: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 8;
  animation: arrow-shake 1.5s ease-out infinite;
}

.button-ripple {
  position: absolute;
  width: 70px; height: 70px;
  border-radius: 50%;
  background: linear-gradient(90deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82);
  background-size: 300% 300%;
  animation: gradientAnimation 4s ease infinite, ripple 2s ease-out infinite;
  opacity: 0.7;
  z-index: 7;
}

.announcement {
  min-height: 50px;
  margin-top: 10px;
  padding: 5px;
  text-align: center;
  border: 1px dotted #ccc;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.essay_title div {
  display: flex;
  span { margin-left: 5px; }
}

@keyframes arrow-shake {
  0% { opacity: 1; transform: translateY(0); }
  30% { opacity: 0.5; transform: translateY(25px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes blink {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes gradientAnimation {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes ripple {
  0% { transform: scale(0.8); opacity: 0.7; }
  50% { transform: scale(1.2); opacity: 0.5; }
  100% { transform: scale(0.8); opacity: 0.7; }
}

@media (max-width: 767px) {
  .brand-container { padding: 3rem 0.5rem 0; }
}
</style>
