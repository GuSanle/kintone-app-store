import { computed } from 'vue'
import { useStore } from 'vuex'
import { manageMapping } from '@/config'
const { recommend: searchField } = manageMapping

export default (keyword) => {
  const store = useStore()
  const appsList = store.state.storage.allApps.appsList
  //搜索数据 多选框的数据搜索
  const filterList = computed(() => {
    return appsList.filter((item) => {
      return item[searchField].includes(keyword.value)
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
