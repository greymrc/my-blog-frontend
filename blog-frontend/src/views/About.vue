<script setup lang="ts">
import Main from '@/components/Layout/Main/index.vue'
import SideBar from '@/components/Layout/SideBar/index.vue'
import useWebsiteStore from '@/stores/website'

const useWebsite = useWebsiteStore()
</script>

<template>
  <Main is-side-bar>
    <template #content>
      <div class="about-container">
        <el-divider border-style="dashed" content-position="left">
          <div style="display: flex; align-items: center">
            <el-icon color="#409EFF"><InfoFilled /></el-icon>
            <span style="margin-left: 5px">关于</span>
          </div>
        </el-divider>
        <div class="about-content">
          <div class="profile-section">
            <el-avatar :size="120" :src="useWebsite.bloggerInfo?.avatar" />
            <h1 class="name">{{ useWebsite.bloggerInfo?.bloggerName }}</h1>
            <p class="motto">{{ useWebsite.bloggerInfo?.intro }}</p>
          </div>
          <el-divider />
          <div class="info-section">
            <h3>关于本站</h3>
            <p>这是一个基于 Vue3 + TypeScript 搭建的个人博客，记录技术学习与生活感悟。</p>
            <p>如果你喜欢我的文章，欢迎收藏本站，也欢迎与我交流讨论。</p>
          </div>
          <el-divider />
          <div class="tech-section">
            <h3>技术栈</h3>
            <div class="tech-list">
              <el-tag v-for="tech in ['Vue3', 'TypeScript', 'Pinia', 'Element Plus', 'Vite', 'Sass']"
                      :key="tech" class="tech-tag" effect="plain">{{ tech }}</el-tag>
            </div>
          </div>
          <el-divider />
          <div class="contact-section">
            <h3>联系方式</h3>
            <div class="contact-list">
              <div class="contact-item">
                <el-icon><Message /></el-icon>
                <span>GitHub: <a :href="useWebsite.bloggerInfo?.githubUrl" target="_blank">{{ useWebsite.bloggerInfo?.githubUrl }}</a></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #information>
      <SideBar />
    </template>
  </Main>
</template>

<script lang="ts">
import { InfoFilled, Message } from '@element-plus/icons-vue'
</script>

<style lang="scss" scoped>
.about-container {
  padding: 1rem;
}

.about-content {
  padding: 1rem;
}

.profile-section {
  text-align: center;
  padding: 2rem 0;

  .name {
    font-size: 1.8rem;
    font-weight: bold;
    margin: 1rem 0 0.5rem;
    color: var(--el-text-color-primary);
  }

  .motto {
    color: var(--el-text-color-secondary);
    font-style: italic;
    font-size: 1.1rem;
  }
}

.info-section, .tech-section, .contact-section {
  margin: 1rem 0;

  h3 {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: var(--el-text-color-primary);
  }

  p {
    line-height: 1.8;
    color: var(--el-text-color-regular);
    margin-bottom: 0.5rem;
  }
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  .tech-tag {
    font-size: 0.9rem;
  }
}

.contact-list {
  .contact-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;

    a {
      color: #409eff;
      &:hover { text-decoration: underline; }
    }
  }
}
</style>
