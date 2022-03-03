<template>
  <div>
    <el-row>
      <el-col :span="24" class="appstore-title">分类</el-col>
    </el-row>
    <el-row class="divider-space">
      <el-divider></el-divider>
    </el-row>
  </div>
  <apps-pic-carousel type="S" :clickable="true" :apps="chartsList" v-bind="$attrs">
    <template #title>
      <div class="title">图表</div>
    </template>
  </apps-pic-carousel>
  <el-divider></el-divider>
  <div class="title">数据处理</div>
  <apps-carousel type="M" :apps="dataList" v-bind="$attrs"></apps-carousel>
  <el-divider></el-divider>
  <div class="title">表单处理</div>
  <apps-carousel type="M" :apps="formList" v-bind="$attrs"></apps-carousel>
  <el-divider></el-divider>
  <license />
</template>

<script>
export default {
  name: 'AppStoreCategory',
  inheritAttrs: false,
}
</script>
<script setup>
import useCategoryAppList from '@/composables/useCategoryAppList'
import appsCarousel from '@/components/AppsCarousel.vue'
import appsPicCarousel from '@/components/AppsPicCarousel.vue'
import license from '@/components/License.vue'
const { allAppsList, chartsList, dataList, formList, error } = useCategoryAppList()
</script>

<style scoped>
.divider-space {
  padding-bottom: 15px;
}

.title {
  padding-bottom: 15px;
  font-weight: 700;
  font-size: 18px;
}
</style>
