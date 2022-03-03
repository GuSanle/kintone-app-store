import { computed } from 'vue'
import { useStore } from 'vuex'
import { detailMapping } from '@/config'
const { appName: searchField } = detailMapping

export default (keyword) => {
  const store = useStore()
  const appsList = store.state.storage.allApps.appsList
  const pluginsList = store.state.storage.allApps.pluginsList
  const allList = appsList.concat(pluginsList)

  //搜索数据
  const filterList = computed(() => {
    return allList.filter((item) => {
      return item.$fromDetail[searchField].indexOf(keyword.value) !== -1
    })
  })

  const error = computed(() => {
    return store.state.storage.allApps.error
  })
  return {
    filterList,
    error,
  }
}
