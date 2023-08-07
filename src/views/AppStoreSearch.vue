<template>
  <el-row>
    <el-col :span="12" class="appstore-title">全部</el-col>
    <el-col :span="11">
      <input class="icon-search" placeholder="请输入内容" v-model="keyWord" />
    </el-col>
    <el-col :span="1"></el-col>
  </el-row>
  <el-row class="divider-space">
    <el-divider></el-divider>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="24">
      <span class="search-title" v-show="keyWord != ''">“{{ keyWord }}”的搜索结果:</span>
      <el-empty v-if="paginationInfo.total === 0" description="暂无数据"></el-empty>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="12" v-for="appInfo in paginationList" :key="appInfo.id">
      <app-item :appInfo="appInfo" v-bind="$attrs" type="L" />
    </el-col>
  </el-row>
  <div class="pagination">
    <span v-show="!paginationInfo.isHide">共{{ paginationInfo.total }}条</span>
    <el-pagination :hide-on-single-page="paginationInfo.isHide" :page-size="paginationInfo.pageSize"
      @current-change="handleCurrentChange" @prev-click="paginationInfo.currentPage - 1"
      @next-click="paginationInfo.currentPage + 1" layout="prev, pager, next"
      :total="paginationInfo.total"></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'AppStoreSearch',
  inheritAttrs: false,
};
</script>

<script setup>
import useSearchList from '@/composables/useSearchList'
import appItem from '@/components/AppItem.vue'
import { groupingArray } from '@/libs/utils'

const paginationInfo = reactive({
  isHide: false,
  total: 0,
  currentPage: 1,
  pageSize: 4,
})
const keyWord = ref('')
const { filterList } = useSearchList(keyWord)

const paginationList = computed(() => {
  //过滤后的数据
  const list = groupingArray(filterList.value, paginationInfo.pageSize)
  paginationInfo.total = filterList.value.length
  paginationInfo.isHide = paginationInfo.total < paginationInfo.pageSize
  const pageIndex = paginationInfo.currentPage - 1
  return list[pageIndex]
})

const handleCurrentChange = (val) => {
  paginationInfo.currentPage = val
}
defineExpose({
  keyWord,
  paginationList,
  paginationInfo,
  handleCurrentChange,
})
</script>

<style scoped>
.icon-search {
  display: inline-block;
  background-image: url("@/assets/icons/search.svg");
  background-repeat: no-repeat;
  background-position: 10px 50%;
  background-size: 20px 20px;
  width: 300px;
  height: 40px;
  padding: 0 30px 0 40px;
  border: 0;
  border-radius: 10px;
  background-color: #eaeaea;
  font-size: 16px;
}

.pagination {
  text-align: center;
}

.el-pagination {
  justify-content: center;
}

.search-title {
  display: block;
  padding: 0 0 20px;
  color: #1e0e08;
  font-weight: 700;
  font-size: 24px;
}

.divider-space {
  padding-bottom: 15px;
}
</style>
