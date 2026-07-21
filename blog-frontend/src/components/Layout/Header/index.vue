<script setup lang="ts">
import useWebsiteStore from '@/stores/website'
import {
  HomeFilled, Files, DocumentCopy, PriceTag, Clock, Link,
  ArrowDownBold, Expand, Close
} from '@element-plus/icons-vue'

const useWebsite = useWebsiteStore()
const drawer = ref(false)
const router = useRouter()

function navigateTo(path: string) {
  drawer.value = false
  router.push(path)
}
</script>

<template>
  <nav :class="{ 'transparent': true }">
    <div id="menu-left">
      <div id="menus">
        <span id="blog-info">
          <router-link to="/">{{ useWebsite.siteConfig?.websiteName }}</router-link>
        </span>
        <div class="menus_items">
          <div class="menus_item" @click="$router.push('/')">
            <span>
              <el-icon><HomeFilled /></el-icon>
              <span>首页</span>
            </span>
          </div>
          <div class="menus_item">
            <span>
              <el-icon><Files /></el-icon>
              <span>归档</span>
              <el-icon class="arrow"><ArrowDownBold /></el-icon>
            </span>
            <ul class="menus_item_child">
              <li @click="$router.push('/category')">
                <span><el-icon><DocumentCopy /></el-icon><span>分类</span></span>
              </li>
              <li @click="$router.push('/tag')">
                <span><el-icon><PriceTag /></el-icon><span>标签</span></span>
              </li>
              <li @click="$router.push('/archive')">
                <span><el-icon><Clock /></el-icon><span>时间轴</span></span>
              </li>
            </ul>
          </div>
          <div class="menus_item" @click="$router.push('/about')">
            <span>
              <el-icon><Link /></el-icon>
              <span>关于</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <!-- 移动端导航 -->
  <div class="move_nav">
    <div @click="drawer = true">
      <el-icon style="font-size: 24px; color: #409EFF"><Expand /></el-icon>
    </div>
  </div>
  <el-drawer v-model="drawer" :with-header="true" size="40%" direction="ltr" :show-close="false">
    <template #header>
      <span style="font-size: 1.2rem">导航</span>
      <el-button :icon="Close" style="background: none;font-size: 1.5rem;width: 30px;border: none"
                 @click="drawer = false"/>
    </template>
    <template #default>
      <div class="mobile-menu">
        <div class="mobile-menu-item" @click="navigateTo('/')">首页</div>
        <div class="mobile-menu-item" @click="navigateTo('/category')">分类</div>
        <div class="mobile-menu-item" @click="navigateTo('/tag')">标签</div>
        <div class="mobile-menu-item" @click="navigateTo('/archive')">时间轴</div>
        <div class="mobile-menu-item" @click="navigateTo('/about')">关于</div>
      </div>
    </template>
  </el-drawer>
</template>

<style scoped lang="scss">
nav {
  position: fixed;
  top: 0;
  display: flex;
  height: 50px;
  width: 100%;
  z-index: 999;
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(6px);
  transition: top 0.3s ease-in-out, background-color 0.3s ease-in-out;

  &.transparent {
    background-color: transparent;
  }

  #menu-left {
    flex: 2;

    #menus {
      display: flex;
      justify-content: left;
      align-items: center;
      height: 100%;
      width: 100%;
      font-weight: bold;

      #blog-info {
        width: 120px;
        margin: 0 10px;
        a { color: inherit; }
      }

      .menus_items {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: left;

        .menus_item {
          position: relative;
          height: 100%;
          width: 100px;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          cursor: pointer;

          span .arrow {
            margin-left: 5px;
            transition: all 0.5s;
            transform: rotate(0deg);
            color: #409EFF;
          }

          &::before {
            content: '';
            position: absolute;
            bottom: 5px;
            left: 0;
            height: 2px;
            width: 0;
            background-color: #409EFF;
            transition: width 0.3s;
          }

          &:hover {
            span .arrow {
              transition: all 0.5s;
              transform: rotate(180deg);
              color: #cc5de8;
            }

            .menus_item_child {
              display: block;
            }

            &::before {
              width: 100%;
            }
          }

          span {
            display: flex;
            align-items: center;
            justify-content: center;
            span { margin-left: 5px; }
          }
        }

        .menus_item_child {
          display: none;
          position: absolute;
          top: 50px;
          background: var(--el-bg-color);
          box-shadow: 0 2px 12px 0 var(--shadow-color);
          border-radius: 5px;

          li {
            display: flex;
            justify-content: left;
            padding: 10px;
            border-radius: 5px;
            cursor: pointer;

            &:hover {
              background: #91a7ff;
            }
          }

          animation: slide-down 0.3s ease-out;
        }
      }
    }
  }

  #menu-right {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: right;
    align-items: center;

    .search {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 20px;
      transition: transform 0.3s linear;
      cursor: pointer;

      &:hover {
        transform: scale(1.1);
      }
    }
  }

  @media screen and (max-width: 910px) {
    display: none;
  }
}

.move_nav {
  display: none;
  justify-content: space-between;
  align-items: center;
  height: 45px;
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100vw;
  padding: 0 1.5rem;

  .right_nav {
    display: flex;
  }

  @media screen and (max-width: 910px) {
    display: flex;
  }
}

.mobile-menu {
  .mobile-menu-item {
    padding: 12px 16px;
    font-size: 16px;
    cursor: pointer;
    border-bottom: 1px solid #eee;

    &:hover {
      color: #409EFF;
      background: #f5f5f5;
    }
  }
}

@keyframes slide-down {
  0% { opacity: 0; transform: translateY(-10px); }
  100% { opacity: 1; transform: translateY(0); }
}
</style>
