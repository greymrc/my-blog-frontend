<script setup lang="ts">
import useWebsiteStore from '@/stores/website'

const useWebsite = useWebsiteStore()
</script>

<template>
  <div class="info_container">
    <div class="background-image" :style="`background-image: url(${useWebsite.siteConfig?.bloggerCardBackground})`"></div>
    <div class="avatar-wrapper">
      <el-avatar size="large" :src="useWebsite.bloggerInfo?.avatar"/>
    </div>

    <div class="webmaster-name">
      {{ useWebsite.bloggerInfo?.bloggerName }}
      <div class="title-decorator">
        <span class="line"></span>
        <span class="dot"></span>
        <span class="line"></span>
      </div>
    </div>
    <div class="contact-info">
      <div class="info-row">
        <span class="info-label">邮箱：</span>
        <span class="info-value">{{ useWebsite.bloggerInfo?.email }}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Github：</span>
        <span class="info-value">
          <a :href="useWebsite.bloggerInfo?.githubUrl" target="_blank" title="GitHub" class="github-link">
            <el-icon :size="18"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/></svg></el-icon>
          </a>
        </span>
      </div>
      <div class="info-row">
        <span class="info-label">简介：</span>
        <span class="info-value">{{ useWebsite.bloggerInfo?.intro }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.info_container {
  box-sizing: border-box;
  width: $card-width;
  min-height: 300px;
  margin: $card-margin;
  border-radius: $border-radius;
  text-align: center;
  border: 1px solid var(--el-border-color-lighter);
  background: var(--el-bg-color);
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;

  .background-image {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 67%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    &::after {
      content: '';
      position: absolute;
      left: 0; right: 0; bottom: 0;
      height: 100%;
      background: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, var(--el-bg-color) 100%);
    }
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--el-box-shadow-light);
  }

  > * {
    position: relative;
    z-index: 2;
  }

  .avatar-wrapper {
    margin-top: 30px;

    .el-avatar {
      width: 180px; height: 180px;
      border: 3px solid var(--el-color-white);
      border-radius: 8px;
      box-shadow: 0 0 20px rgba(0,0,0,0.1);
    }
  }

  .webmaster-name {
    font-size: 1.4rem;
    font-weight: 600;
    margin: 15px 0 10px;
    color: var(--el-text-color-primary);
    padding: 0 20px;

    .title-decorator {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 8px;

      .line { height: 1px; width: 15px; background: var(--el-border-color); transition: all 0.3s ease; }
      .dot { width: 4px; height: 4px; border-radius: 50%; background: var(--el-color-primary); margin: 0 4px; }
    }

    &:hover .title-decorator .line {
      width: 25px;
      background: var(--el-color-primary);
    }
  }

  .contact-info {
    width: 100%;
    padding: 15px 20px;
    background: var(--el-fill-color-lighter);
    margin-top: auto;
    text-align: left;

    .info-row {
      display: flex;
      align-items: flex-start;
      line-height: 1.6;

      &:not(:last-child) {
        margin-bottom: 10px;
        padding-bottom: 10px;
        position: relative;

        &::after {
          content: '';
          position: absolute;
          left: 10%;
          right: 10%;
          bottom: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--el-border-color) 20%, var(--el-border-color) 80%, transparent);
        }
      }

      .info-label {
        font-size: 0.85rem;
        color: var(--el-text-color-secondary);
        flex-shrink: 0;
      }

      .info-value {
        font-size: 0.85rem;
        color: var(--el-text-color-primary);
        word-break: break-all;
        flex: 1;
      }
    }

    .github-link {
      display: inline-flex;
      align-items: center;
      color: var(--el-text-color-primary);
      transition: color 0.3s ease;

      &:hover {
        color: var(--el-color-primary);
      }
    }
  }
}
</style>
