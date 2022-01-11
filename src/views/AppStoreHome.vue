<template>
  <apps-pic-carousel type="L" :apps="bannerList" :clickable="true" v-bind="$attrs" />
  <apps-carousel type="M" :apps="hotList" v-bind="$attrs">
    <template #title>
      <h2 class="appstore-category-title">热门应用</h2>
    </template>
  </apps-carousel>
  <el-divider></el-divider>
  <apps-pic-carousel type="S" :clickable="true" :apps="midPicSwiperList" v-bind="$attrs">
    <template #title>
      <h2 class="appstore-category-title">编辑推荐</h2>
    </template>
  </apps-pic-carousel>
  <el-divider></el-divider>
  <apps-carousel type="S" :apps="recommendList" v-bind="$attrs">
    <template #title>
      <h2 class="appstore-category-title">推荐下载</h2>
    </template>
  </apps-carousel>
</template>
<script>
export default {
  name: 'AppStoreHome',
  inheritAttrs: false,
}
</script>
<script setup>
import useHomeList from '@/composables/useHomeList'
import appsCarousel from '@/components/AppsCarousel.vue'
import appsPicCarousel from '@/components/AppsPicCarousel.vue'
const { allAppsList, recommendList, bannerList, hotList, midPicSwiperList } = useHomeList()
</script>

