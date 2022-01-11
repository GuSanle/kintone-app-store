import { computed } from 'vue'
import { useStore } from 'vuex'
import { manageMapping } from '@/config'
const { category: searchField } = manageMapping

const keywordCharts = '图表'
const keywordData = '数据处理'
const keywordForm = '表单处理'

export default () => {
  const store = useStore()
  const appsList = store.state.storage.allApps.appsList
  //所有数据
  const allAppsList = computed(() => {
    return store.state.storage.allApps.appsList
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
    return store.state.storage.allApps.error
  })
  return {
    allAppsList,
    chartsList,
    dataList,
    formList,
    error,
  }
}
