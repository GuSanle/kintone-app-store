<template>
  <el-row v-if="type === 'M'">
    <el-col :span="1"></el-col>
    <el-col :span="5">
      <el-image class="item" style="width: 65px; height: 65px" :src="appInfo.$fromDetail.icon" />
    </el-col>
    <el-col :span="16">
      <div class="app-title title-wrap">{{ appInfo.$fromDetail.appName }}</div>
      <slot name="right">
        <button @click.stop="showDetail(appInfo.appid)" class="view-button">查看</button>
      </slot>
    </el-col>
    <el-col :span="2"></el-col>
  </el-row>
  <el-row v-else>
    <el-col :span="1"></el-col>
    <el-col :span="4">
      <el-image class="item-small" :src="appInfo.$fromDetail.icon"></el-image>
    </el-col>
    <el-col :span="18">
      <el-row>
        <el-col :span="16">
          <div class="app-title">{{ appInfo.$fromDetail.appName }}</div>
        </el-col>
        <el-col :span="8" :push="2">
          <slot name="right">
            <button @click.stop="showDetail(appInfo.appid)" class="view-button">查看</button>
          </slot>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="1"></el-col>
  </el-row>
  <el-row v-if="type === 'L'" style="padding: 10px 0 50px">
    <el-col :span="1"></el-col>
    <el-col :span="22">
      <el-image :src="firstImage" class="img-middle" fit="cover" />
    </el-col>
    <el-col :span="1"></el-col>
  </el-row>
</template>

<script>
export default {
  name: 'AppItem',
  inheritAttrs: false,
};
</script>

<script setup>
import { computed } from 'vue'
import { detailMapping } from '@/config'
const defaultImage = 'https://dev-center-store.oss-cn-shanghai.aliyuncs.com/assets/images/default-appitem-image.png'

const props = defineProps({
  type: {
    type: String,
    default() {
      //L, M, S 大 小  L:带轮播图，M,S：不带轮播图
      return 'S'
    },
  },
  appInfo: {
    type: Object,
    default() {
      return {}
    },
  },
});

const emit = defineEmits(['chosenId'])

const { appInfo } = props

const showDetail = (id) => {
  emit('chosenId', id)
}
const firstImage = computed(() => {
  const picList = appInfo.$fromDetail.picTable
  const key = detailMapping.imageUrl
  return picList.length > 0 ? picList[0].value[key].value : defaultImage
})

defineExpose({
  firstImage,
  showDetail,
})
</script>
<style scoped>
.app-title {
  color: #4e4e4e;
  font-weight: 500;
  font-size: 16px;
}

.title-wrap {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.view-button {
  width: 75px;
  margin-top: 8px;
  color: #0065ff;
  font-size: 14px;
  letter-spacing: 2px;
  background-color: #f2f2f7;
  border: 0;
  border-radius: 15px;
}

.el-divider {
  background-color: #f0f0f0;
}

.img-middle {
  width: 100%;
  height: 240px;
  border-radius: 10px;
}

.item-small {
  width: 45px;
  height: 45px;
}
</style>
