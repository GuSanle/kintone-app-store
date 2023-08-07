import { useAppStore } from '@/stores/app'
import { manageMapping } from '@/config'
const { recommend, homeDisplay } = manageMapping

const keyWordHot = '热门'
const keyWordRecommend = '推荐'
const keyWordBanner = '大图轮播'
const keyWordMidPicSwiper = '中图轮播'

export default () => {
  const appStore = useAppStore()
  const { allApps } = storeToRefs(appStore)
  const appsList = allApps.value.appsList
  const pluginsList = allApps.value.pluginsList

  //所有数据
  const allAppsList = computed(() => {
    return appsList
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

  //插件列表
  const pluginRecommendList = computed(() => {
    return pluginsList.filter((item) => {
      return item[recommend].includes(keyWordHot)
    })
  })

  const error = computed(() => {
    return allApps.value.error
  })
  return {
    allAppsList,
    recommendList,
    bannerList,
    hotList,
    midPicSwiperList,
    pluginRecommendList,
    error,
  }
}
