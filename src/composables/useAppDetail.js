import { GetRecord, DownloadOssFiles, SetNewCount, AddDownload } from '@/services/kintoneBackend'
import { backendConfig, detailMapping, statisticsMapping } from '@/config'
import { UploadFiles, InstallApp, InstallPlugin } from '@/services/kintoneApi'
import { findKey } from '@/libs/utils'
const appTemplate = '应用模版'
const pluginTemplate = '插件'
const installField = 'install'
const downloadField = 'download'

export default (id) => {
  const appDetail = reactive({
    appDetailData: {},
    picList: {},
    error: false,
    loading: true,
  })
  const appid = backendConfig.detailAppId
  const statisticsAppId = backendConfig.statisticsAppId
  const countField = detailMapping.installCount

  GetRecord(appid, id)
    .then((resp) => {
      const record = resp.record
      const data = {}
      Object.keys(record).forEach((key) => {
        const mappingKey = findKey(detailMapping, key)
        if (typeof mappingKey !== 'undefined') {
          data[mappingKey] = record[key].value
        }
      })
      const picList = []
      data.picTable.forEach((v) => {
        const key = detailMapping.imageUrl
        if (v.value[key].value != '') {
          const item = {
            id: v.id,
            midImage: v.value[key].value,
          }
          picList.push(item)
        }
      })
      appDetail.appDetailData = data
      appDetail.picList = picList
      appDetail.loading = false
    })
    .catch((error) => {
      appDetail.error = true
    })

  //三种状态：NotDownload Downloading  Downloaded
  let downloading = ref('NotDownload')
  //安装应用的方法
  const install = async () => {
    downloading.value = 'Downloading'
    try {
      const blob = await DownloadOssFiles(appDetail.appDetailData.url)
      const { fileKey } = await UploadFiles(blob, appDetail.appDetailData.appName)
      if (appDetail.appDetailData.appType === appTemplate) {
        await InstallApp(fileKey)
      } else {
        await InstallPlugin(fileKey)
      }
      downloading.value = 'Success'
    } catch {
      downloading.value = 'Failed'
    }
    SetNewCount(appid, id, countField)
    const record = {
      [statisticsMapping.lookup]: {
        value: id,
      },
      [statisticsMapping.domain]: {
        value: document.domain,
      },
      [statisticsMapping.type]: {
        value: installField,
      },
    }
    AddDownload(statisticsAppId, record).catch((err) => {
      console.log(err)
    })
  }

  return {
    downloading,
    ...toRefs(appDetail),
    install,
  }
}
