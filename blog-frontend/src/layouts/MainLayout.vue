<script setup lang="ts">
import Header from '@/components/Layout/Header/index.vue'
import Footer from '@/components/Layout/Footer/index.vue'
import BottomRightLayout from '@/components/BottomRightLayout/index.vue'
</script>

<template>
  <Header />
  <div style="min-height: 100vh">
    <router-view v-slot="{ Component, route }">
      <transition name="el-fade-in-linear" mode="out-in">
        <div :key="route.path">
          <component :is="Component" />
        </div>
      </transition>
    </router-view>
  </div>
  <Footer />
  <BottomRightLayout to-top />
</template>

<style scoped lang="scss">
</style>
