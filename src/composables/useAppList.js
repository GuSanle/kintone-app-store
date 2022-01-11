import { computed } from 'vue'
import { useStore } from 'vuex'

export default () => {
  const store = useStore()
  //所有数据
  const appsList = computed(() => {
    return store.state.storage.allApps.appsList
  })

  const error = computed(() => {
    return store.state.storage.allApps.error
  })
  return {
    appsList,
    error,
  }
}
