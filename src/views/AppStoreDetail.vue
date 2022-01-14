<template>
  <teleport to="#container-main" v-if="downloading === 'Downloading'">
    <div class="cover" v-loading="downloading === 'Downloading'"></div>
  </teleport>
  <el-empty v-if="error" description="服务器请求失败"></el-empty>
  <skeleton-detail v-else-if="loading" class="detail-main" />
  <div v-else class="detail">
    <div class="detail-main">
      <el-row>
        <el-col :span="3">
          <el-image class="icon" :src="appDetailData.icon"></el-image>
        </el-col>
        <el-col :span="20">
          <el-row>
            <el-col>
              <div class="app-title">{{ appDetailData.appName }}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="btn-space">
              <el-button
                v-if="appDetailData.url"
                type="primary"
                plain
                round
                size="mini"
                @click="install"
              >安装</el-button>
              <el-button
                v-if="appDetailData.url"
                type="success"
                plain
                round
                size="mini"
                @click="download(appDetailData.url)"
              >下载</el-button>
              <el-button
                v-if="appDetailData.docLink"
                @click="gotoLink(appDetailData.docLink)"
                type="warning"
                plain
                round
                size="mini"
              >文档</el-button>
              <el-button
                v-if="appDetailData.csvLink"
                @click="downloadCsv(appDetailData.csvLink)"
                type="danger"
                plain
                round
                size="mini"
              >demo数据</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="divider-space">
        <el-divider></el-divider>
      </el-row>
      <apps-pic-carousel type="S" v-if="picList.length > 0" :apps="picList" v-bind="$attrs" />
      <h2 class="recommend-title content">应用说明</h2>
      <div v-html="appDetailData.document"></div>
      <el-row>
        <el-divider></el-divider>
      </el-row>
    </div>
    <div class="recommend">
      <apps-carousel type="M" :apps="filterList" v-bind="$attrs">
        <template #title>
          <h2 class="recommend-title">推荐应用</h2>
        </template>
      </apps-carousel>
    </div>
  </div>
</template>

<script>
const recommendWord = '推荐'

export default {
  name: 'AppStoreDetail',
  inheritAttrs: false,
};
</script>

<script setup>
import useAppDetail from '@/composables/useAppDetail'
import useRecommendList from '@/composables/useRecommendList'
import appsCarousel from '@/components/AppsCarousel.vue'
import appsPicCarousel from '@/components/AppsPicCarousel.vue'
import skeletonDetail from '@/components/SkeletonDetail.vue'
import { watch, ref } from 'vue'
import { backendConfig, detailMapping } from '@/config'
import { ElNotification } from 'element-plus'
import { SetNewCount } from '@/services/kintoneBackend'

const props = defineProps({
  id: {
    type: String,
    default() {
      return ''
    },
  },
});

//热门推荐数据
const keyWord = ref(recommendWord)
const { filterList } = useRecommendList(keyWord)

//详情数据
const { downloading, picList, appDetailData, error, loading, install } = useAppDetail(props.id)
watch(
  () => props.id,
  (val) => {
    const newDetail = useAppDetail(val)
    downloading.value = newDetail.downloading
    appDetailData.value = newDetail.appDetailData
    error.value = newDetail.error
    loading.value = newDetail.loading
    picList.value = newDetail.picList
  },
)

watch(downloading, (val) => {
  let notice = {}
  if (val === 'Success') {
    notice = {
      title: '安装成功',
      message: '应用安装成功，请刷新kintone查看',
      position: 'bottom-right',
      type: 'success',
    }
    ElNotification(notice)
  } else if (val === 'Failed') {
    notice = {
      title: '安装失败',
      message: '安装失败,请确认是否具有管理员权限',
      position: 'bottom-right',
      type: 'error',
    }
    ElNotification(notice)
  }
})

const gotoLink = (link) => {
  window.open(link, '_blank')
}

const download = (link) => {
  const appid = backendConfig.detailAppId
  const countField = detailMapping.downloadCount
  SetNewCount(appid, props.id, countField)
  window.location.href = link
}

const downloadCsv = (link) => {
  window.location.href = link
}

defineExpose({
  error,
  appDetailData,
  downloading,
  picList,
  filterList,
  loading,
  install,
  gotoLink,
  download
})
</script>
<style scoped>
.detail {
  margin: 0 -20px -20px;
}

.icon {
  width: 80px;
  height: 80px;
}

.detail-main {
  margin: 30px 30px 0;
  padding-top: 10px;
}

.app-title {
  padding-bottom: 10px;
  color: #4e4e4e;
  font-weight: 700;
  font-size: 24px;
}

.btn-space button {
  min-width: 70px;
  font-size: 14px;
}

.divider-space {
  padding-bottom: 10px;
}

.content {
  margin-top: 30px;
}

.recommend {
  padding: 20px;
  background-color: #eeeef7;
  border-bottom-right-radius: 10px;
}

.recommend-title {
  color: #1e0e08;
  font-weight: 700;
  font-size: 20px;
}

:deep(.appstore-view-button) {
  background-color: #fff;
}

.el-button {
  border: 0;
}

.cover {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
}
</style>
