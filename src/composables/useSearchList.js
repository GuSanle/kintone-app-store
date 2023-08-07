import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/app'
import { detailMapping } from '@/config'
const { appName: searchField } = detailMapping

export default (keyword) => {
  const appStore = useAppStore()
  const { allApps } = storeToRefs(appStore)
  const appsList = allApps.value.appsList
  const pluginsList = allApps.value.pluginsList
  const allList = appsList.concat(pluginsList)

  //搜索数据
  const filterList = computed(() => {
    return allList.filter((item) => {
      return item.$fromDetail[searchField].indexOf(keyword.value) !== -1
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
