<script setup lang="ts">
defineProps({
  onlyFatherContainer: { type: Boolean, default: false },
  isSideBar: { type: Boolean, default: false },
  marginTop: { type: String, default: '0' },
})
</script>

<template>
  <div class="header">
    <slot name="header"/>
  </div>

  <div v-if="onlyFatherContainer">
    <div>
      <slot name="banner"/>
    </div>
    <div class="is_banner_container" style="display: flex;justify-content: center">
      <div class="content_container" style="width: 100%;max-width: 100rem">
        <slot name="content"/>
      </div>
      <div class="information_container" v-if="isSideBar">
        <slot name="information"/>
      </div>
    </div>
  </div>

  <div class="div_container" :style="'margin-top:'+marginTop" v-if="!onlyFatherContainer">
    <div class="content_container">
      <slot name="content"/>
    </div>
    <div class="information_container" v-if="isSideBar">
      <slot name="information"/>
    </div>
  </div>
  <div>
    <slot name="footer"/>
  </div>
</template>

<style scoped lang="scss">
.div_container {
  @media screen and (max-width: 1200px) {
    margin: 0;
  }
  transition: margin 0.5s;
  margin: 0 0;
  display: flex;
  justify-content: center;
  padding-bottom: 2rem;
  width: 100%;
}

.content_container {
  height: 100%;
  width: 60%;
  max-width: 70rem;
  transition: padding 0.5s;
  @media screen and (max-width: 910px) {
    width: 100%;
    padding: 0.2rem;
  }
  padding: 1rem;
  background-color: var(--el-bg-color);
  border-radius: .5em;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.information_container {
  order: -1;
  width: 23%;
  min-height: 100%;
  max-width: 25rem;
  transition: width 0.5s;
  @media screen and (max-width: 910px) {
    display: none;
  }
  @media screen and (max-width: 1200px) {
    width: 30%;
  }
}

.is_banner_container {
  margin: 0 10%;
  height: 100%;
  display: flex;
  padding-bottom: 2rem;
  transition: margin 0.5s;
  @media screen and (max-width: 1200px) {
    margin: 0 5%;
  }
  @media screen and (max-width: 650px) {
    margin: 0 2%;
  }
}
</style>
