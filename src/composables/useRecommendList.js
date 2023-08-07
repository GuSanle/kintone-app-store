import { useAppStore } from '@/stores/app'
import { manageMapping } from '@/config'
const { recommend: searchField } = manageMapping

export default (keyword) => {
  const appStore = useAppStore()
  const { allApps } = storeToRefs(appStore)
  const appsList = allApps.value.appsList

  //搜索数据 多选框的数据搜索
  const filterList = computed(() => {
    return appsList.filter((item) => {
      return item[searchField].includes(keyword.value)
    })
  })

  const error = computed(() => {
    return allApps.value.error
  })
  return {
    filterList,
    error,
  }
}
