<template>
  <slot name="title"></slot>
  <el-carousel indicator-position="none" :autoplay="autoplay" :height="itemHeight">
    <el-carousel-item v-for="(item, index) in appListForView.length" :key="item">
      <el-row :gutter="20">
        <el-col v-for="appItemInfo in appListForView[index]" :key="appItemInfo.appid" :span="12">
          <app-item :type="type" :appInfo="appItemInfo" v-bind="$attrs"></app-item>
          <el-divider :class="typeClass"></el-divider>
        </el-col>
      </el-row>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: 'AppsCarousel',
  inheritAttrs: false,
};
</script>

<script setup>
import appItem from '@/components/AppItem.vue'
import { groupingArray } from '@/libs/utils'

const props = defineProps({
  //类型S或者M
  type: {
    type: String,
    default() {
      return 'S'
    },
  },
  autoplay: {
    type: Boolean,
    default() {
      return false
    },
  },
  apps: {
    type: Object,
  },
});

const { type, apps } = props
const perCounts = type === 'S' ? 6 : 4
const appListForView = groupingArray(apps, perCounts)
const itemHeight = computed(() => {
  return type === 'S' ? '250px' : '200px'
})

const typeClass = computed(() => {
  return type === 'S' ? 'divider-s' : 'divider-m'
})

</script>
<style scoped>
.divider-m {
  width: 70%;
  margin: 24px 0 24px 24%;
}

.divider-s {
  width: 74%;
  margin: 24px 9% 24px 20%;
}
</style>
