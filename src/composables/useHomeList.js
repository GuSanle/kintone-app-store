import { computed } from 'vue'
import { useStore } from 'vuex'
import { manageMapping } from '@/config'
const { recommend, homeDisplay } = manageMapping

const keyWordHot = '热门'
const keyWordRecommend = '推荐'
const keyWordBanner = '大图轮播'
const keyWordMidPicSwiper = '中图轮播'

export default () => {
  const store = useStore()
  const appsList = store.state.storage.allApps.appsList
  //所有数据
  const allAppsList = computed(() => {
    return store.state.storage.allApps.appsList
  })

  //热门应用
  const hotList = computed(() => {
    return appsList.filter((item) => {
      return item[recommend].includes(keyWordHot)
    })
  })

  //推荐应用
  const recommendList = computed(() => {
    return appsList.filter((item) => {
      return item[recommend].includes(keyWordRecommend)
    })
  })

  //banner
  const bannerList = computed(() => {
    return appsList.filter((item) => {
      return item[homeDisplay].includes(keyWordBanner)
    })
  })

  //midPicSwiper
  const midPicSwiperList = computed(() => {
    return appsList.filter((item) => {
      return item[homeDisplay].includes(keyWordMidPicSwiper)
    })
  })

  const error = computed(() => {
    return store.state.storage.allApps.error
  })
  return {
    allAppsList,
    recommendList,
    bannerList,
    hotList,
    midPicSwiperList,
    error,
  }
}
