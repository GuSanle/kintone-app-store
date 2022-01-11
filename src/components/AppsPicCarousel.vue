<template>
  <slot name="title"></slot>
  <el-carousel indicator-position="none" :autoplay="autoplay" :height="itemHeight">
    <el-carousel-item v-for="(item, index) in appListForView.length" :key="item">
      <el-row :gutter="layoutStyle.gutter">
        <el-col
          v-for="appItemInfo in appListForView[index]"
          :key="appItemInfo.id"
          :span="layoutStyle.span"
          @click.stop="showDetail(appItemInfo.appid)"
        >
          <el-image :class="typeClass" :src="appItemInfo[picField]" fit="cover"></el-image>
        </el-col>
      </el-row>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: 'AppsPicCarousel',
  inheritAttrs: false,
};
</script>

<script setup>
import { computed } from 'vue'
import { groupingArray } from '@/libs/utils'

const props = defineProps({
  type: {
    type: String,
    default() {
      //L,S 大和小  L为1x1,S为2*1
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
  clickable: {
    type: Boolean,
    dafaule() {
      return false
    },
  },
});

const emit = defineEmits(['chosenId'])

const { type, clickable } = props
let { apps } = props
const perCounts = type === 'S' ? 2 : 1
const typeClass = computed(() => {
  return type === 'S' ? 'img-middle' : 'img-large'
})
const layoutStyle = computed(() => {
  return type === 'S' ? { gutter: 20, span: 12 } : { gutter: 0, span: 24 }
})
const picField = computed(() => {
  return type === 'S' ? 'midImage' : 'largeImage'
})
const itemHeight = computed(() => {
  return type === 'S' ? '240px' : '300px'
})

if (type === 'S' && apps.length > 1 && (apps.length % 2 !== 0)) {
  const lastTwoItems = apps.slice(-2)
  apps.pop()
  apps = apps.concat(lastTwoItems)
}

const appListForView = groupingArray(apps, perCounts)

const showDetail = (id) => {
  if (clickable) {
    emit('chosenId', id)
  }
}
defineExpose({
  typeClass,
  picField,
  appListForView,
  layoutStyle,
  showDetail,
})

</script>
<style scoped>
.img-large {
  display: block;
  width: 100%;
  max-width: 900px;
  height: 100%;
  max-height: 300px;
  margin: 0 auto;
}

.img-middle {
  width: 100%;
  height: 240px;
  border-radius: 10px;
}
</style>
