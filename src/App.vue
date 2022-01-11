<template>
  <div>
    <float-menu
      :position="'top right'"
      :dimension="66"
      :menu-data="items"
      :on-selected="handleSelection"
      :theme="{
        primary: '',
        textColor: '#303133',
        menuBgColor: '#eeeeee',
        textSelectedColor: '#409eff',
        hoverBackground: '#e2e2e2',
      }"
    >
      <img
        src="https://dev-center-store.oss-cn-shanghai.aliyuncs.com/assets/images/dev-center-logo.png"
        width="66"
      />
      <template #appstore>
        <img src="@/assets/icons/appstore.svg" alt="search" width="18" />
      </template>
      <template #search>
        <img src="@/assets/icons/search.svg" alt="search" width="18" />
      </template>
      <template #devNet>
        <img src="@/assets/icons/devNet.svg" alt="search" width="18" />
      </template>
    </float-menu>
    <el-dialog
      top="10vh"
      v-model="data.centerDialogVisible"
      destroy-on-close
      custom-class="dialog"
      @closed="handleClose"
    >
      <app-store v-if="data.page === 'appStore'" />
      <article-search v-if="data.page === 'articleSearch'" />
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, defineAsyncComponent } from 'vue'

import appStore from '_v/AppStore.vue'
import articleSearch from '_v/ArticleSearch.vue'
// const appStore = defineAsyncComponent(() => import('_v/AppStore.vue'))
// const test = defineAsyncComponent(() => import('_v/Test.vue'))


const items = [
  { name: '应用中心', iconSlot: 'appstore' },
  { divider: true },
  { name: '检索开发者网站', iconSlot: 'search' },
  { divider: true },
  { name: '开发者网站', iconSlot: 'devNet' },
  { divider: true },
]
const data = reactive({
  centerDialogVisible: false,
  page: '',
})
const handleSelection = (selectedItem) => {
  switch (selectedItem) {
    case '应用中心':
      data.page = 'appStore'
      data.centerDialogVisible = true
      break
    case '应用详情':
      data.centerDialogVisible = true
      break
    case '检索开发者网站':
      data.page = 'articleSearch'
      data.centerDialogVisible = true
      break
    case '开发中中心官网':
      window.location.href = 'https://cybozudev.kf5.com/hc/'
      break
    default:
      window.location.href = 'https://cybozudev.kf5.com/hc/'
      break
  }
}
const handleClose = () => {
  // window.location.reload()
}
</script>

<style>
@import "@/assets/style/appstore.css";
</style>
