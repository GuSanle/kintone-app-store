<template>
  <el-container id="container-main" class="cover-main">
    <el-aside>
      <app-store-nav @changeNav="changeView" :navType="navType" />
    </el-aside>
    <el-main class="right-overflow">
      <!-- <transition name="el-fade-in"> -->
      <el-empty v-if="error" description="服务器请求失败"></el-empty>
      <skeleton-home v-else-if="loading" />
      <div v-else-if="viewShow === 'home'" key="home">
        <app-store-home @chosenId="changeId" />
      </div>
      <div v-else-if="viewShow === 'detail'" key="detail">
        <div class="detail-header">
          <el-link :underline="false" class="el-icon-back" @click="viewShow = navType"></el-link>
        </div>
        <app-store-detail :id="id" @chosenId="changeId" />
      </div>
      <div v-else-if="viewShow === 'search'" key="search">
        <app-store-search @chosenId="changeId" />
      </div>
      <div v-else-if="viewShow === 'category'" key="category">
        <app-store-category @chosenId="changeId" />
      </div>
      <!-- </transition> -->
    </el-main>
  </el-container>
</template>
<script>
// enum NavType { detail, search, home, category };
export default {
  name: 'AppStore',
}
</script>
<script setup>
import { ref } from 'vue'
import appStoreHome from '_v/AppStoreHome.vue'
import appStoreNav from '_v/AppStoreNav.vue'
import appStoreSearch from '_v/AppStoreSearch.vue'
import appStoreCategory from '_v/AppStoreCategory.vue'
import { useStore } from 'vuex'
import appStoreDetail from '_v/AppStoreDetail.vue'
import skeletonHome from '@/components/SkeletonHome.vue'

//viewShow detail， search， home， category

const store = useStore()
const loading = ref(true)
const error = ref(false)
store.dispatch('getAllApps').then((resp) => {
  loading.value = false
  error.value = resp.error
})
store.dispatch('getDomainGroup').then((resp) => {

})
const viewShow = ref('home')
const navType = ref('home')
const id = ref('')

const changeId = (appid) => {
  viewShow.value = 'detail'
  id.value = appid.toString()
}

const changeView = (val) => {
  viewShow.value = val
  navType.value = val
}

defineExpose({
  loading,
  error,
  viewShow,
  navType,
  id,
  changeId,
  changeView,
})
</script>

<style scoped>
.el-aside {
  width: 20vw;
  max-width: 250px;
  color: #333;
  text-align: center;
  background-color: #e9e1e2;
  border-radius: 10px 0 0 10px;
}

.right-overflow {
  height: 80vh;
  overflow-x: hidden;
  overflow-y: auto;
}

.el-link {
  --el-link-default-active-color: var(--el-text-color-regular);
}

.el-icon-back {
  z-index: 999;
  margin: 20px 0 15px 20px;
  font-weight: 700;
  font-size: 25px;
}

.detail-header {
  position: absolute;
  z-index: 99;
  width: 938px;
  margin: -50px -20px;
  backdrop-filter: blur(100px);
}

.cover-main {
  position: relative;
}
</style>
