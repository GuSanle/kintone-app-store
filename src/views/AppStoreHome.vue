<template>
  <apps-pic-carousel type="L" :apps="bannerList" :clickable="true" v-bind="$attrs" />
  <apps-carousel type="M" :apps="hotList" v-bind="$attrs">
    <template #title>
      <h2 class="appstore-category-title">{{ $t('hot_app') }}</h2>
    </template>
  </apps-carousel>
  <el-divider></el-divider>
  <apps-carousel type="M" :apps="pluginRecommendList" v-bind="$attrs">
    <template #title>
      <h2 class="appstore-category-title">{{ $t('hot_plugin') }}</h2>
    </template>
  </apps-carousel>
  <el-divider></el-divider>
  <apps-pic-carousel type="S" :clickable="true" :apps="midPicSwiperList" v-bind="$attrs">
    <template #title>
      <h2 class="appstore-category-title">{{ $t('editor_recommendation') }}</h2>
    </template>
  </apps-pic-carousel>
  <el-divider></el-divider>
  <apps-carousel type="S" :apps="recommendList" v-bind="$attrs">
    <template #title>
      <h2 class="appstore-category-title">{{ $t('recommended_download') }}</h2>
    </template>
  </apps-carousel>
  <el-divider></el-divider>
  <license />
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
import license from '@/components/License.vue'

const { allAppsList, recommendList, bannerList, hotList, midPicSwiperList, pluginRecommendList } = useHomeList()
</script>

