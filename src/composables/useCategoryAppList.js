import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/app'
import { manageMapping } from '@/config'
const { category: searchField } = manageMapping

const keywordCharts = '图表'
const keywordData = '数据处理'
const keywordForm = '表单处理'

export default () => {
  const appStore = useAppStore()
  const { allApps } = storeToRefs(appStore)
  const appsList = allApps.value.appsList

  //所有数据
  const allAppsList = computed(() => {
    return appsList
  })

  //图表
  const chartsList = computed(() => {
    return appsList.filter((item) => {
      return item[searchField].includes(keywordCharts)
    })
  })
  //数据处理
  const dataList = computed(() => {
    return appsList.filter((item) => {
      return item[searchField].includes(keywordData)
    })
  })
  //表单处理
  const formList = computed(() => {
    return appsList.filter((item) => {
      return item[searchField].includes(keywordForm)
    })
  })

  const error = computed(() => {
    return allApps.value.error
  })
  return {
    allAppsList,
    chartsList,
    dataList,
    formList,
    error,
  }
}
