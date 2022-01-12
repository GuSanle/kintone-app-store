<template>
  <div class="goog-inline-block goog-menu-button-outer-box" @click="showDialog()">
    <div class="goog-inline-block goog-menu-button-inner-box">
      <div class="goog-inline-block goog-menu-button-caption">
        <span class="gaia-header-img gaia-header-img-settings">
          <img src="https://static.cybozu.com/contents/k/image/argo/header/settings.svg" alt />
        </span>
      </div>
      <div class="goog-inline-block goog-menu-button-dropdown">&nbsp;</div>
    </div>
  </div>

  <el-dialog top="10vh" v-model="centerDialogVisible" destroy-on-close custom-class="dialog">
    <app-store />
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'

import appStore from '_v/AppStore.vue'

const centerDialogVisible = ref(false)

const showDialog = () => {
  centerDialogVisible.value = true
}
</script>

<style>
@import "@/assets/style/appstore.css";
</style>
