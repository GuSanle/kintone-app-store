<template>
  <el-image class="img-logo" :src="logoSrc"></el-image>
  <div class="logo-title">kintone应用中心</div>
  <el-menu :default-active="navIndex" class="menu">
    <el-menu-item index="0" @click="changeView('home')">
      <i class="home"></i>
      <template #title>首页</template>
    </el-menu-item>
    <el-menu-item index="1" @click="changeView('category')">
      <i class="hot"></i>
      <template #title>分类</template>
    </el-menu-item>
    <el-menu-item index="2" @click="changeView('search')">
      <i class="all"></i>
      <template #title>搜索</template>
    </el-menu-item>
  </el-menu>
</template>
<script>
export default {
  name: 'AppStoreNav',
}
</script>
<script setup>
import { computed } from 'vue'
const logoSrc = 'https://dev-center-store.oss-cn-shanghai.aliyuncs.com/assets/images/dc-appstore-logo.png'
const navMapping = {
  home: '0',
  category: '1',
  search: '2',
}
const props = defineProps({
  navType: {
    type: String,
    default() {
      return 'home'
    },
  },
})

const navIndex = computed(() => {
  return navMapping[props.navType]
})

const emit = defineEmits(['changeNav'])
const changeView = (val) => {
  emit('changeNav', val)
}

defineExpose({
  logoSrc,
  navIndex,
  changeView,
})
</script>

<style scoped>
.img-logo {
  width: 100px;
  height: 100px;
  padding-top: 20px;
}

.logo-title {
  padding: 10px 0 20px;
  font-weight: 700;
  font-size: var(--el-font-size-extra-large);
}

.el-menu-item {
  width: 100%;
  background-color: #e9e1e2;
}

.el-menu-item.is-active {
  background-color: #c2bbbc;
}

.menu {
  text-align: left;
}

.menu li i {
  display: inline-block;
  width: 20px;
  height: 20px;
  padding-right: 10px;
}

.menu .home {
  background: url("@/assets/icons/home.svg") no-repeat center/65%;
}

.menu .hot {
  background: url("@/assets/icons/hot.svg") no-repeat center/80%;
}

.menu .all {
  background: url("@/assets/icons/all.svg") no-repeat center/80%;
}

.el-main {
  height: 100vh;
  padding: 0;
  color: #333;
  text-align: center;
}
</style>
