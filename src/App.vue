<template>
  <div class="sc-cVzyXs kEfCPK" @click="showDialog()">
    <button class="sc-kgfleI PyejM sc-iTOPbJ eDQJfM__button" type="button" title="App Store" aria-expanded="false"
      aria-haspopup="true"><span role="img" aria-label="App Store" class="sc-eqUAAy kRUyJB"
        style="width: 24px; height: 24px;">
        <span aria-hidden="true"><img src="@/assets/icons/store.svg" alt class="appstore-img" />
        </span></span></button>
  </div>
  <el-dialog top="10vh" v-model="centerDialogVisible" destroy-on-close class="dialog">
    <app-store />
  </el-dialog>
</template>

<script setup>
import appStore from '_v/AppStore.vue'

const centerDialogVisible = ref(false)

const showDialog = () => {
  centerDialogVisible.value = true
}
</script>

<style>
@import "@/assets/style/appstore.css";
</style>
