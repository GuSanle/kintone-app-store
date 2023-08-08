import { GetRecords } from '@/services/kintoneBackend'
import { backendConfig, manageMapping, detailMapping, domainListMapping } from '@/config'
import { findKey } from '@/libs/utils'
const { appid, status, statusValue, sort, group } = manageMapping
const { appid: id, appName, icon, url, picTable, appType } = detailMapping
const detailFields = [id, appName, icon, url, picTable, appType]
const appTemplate = '应用模版'
const pluginTemplate = '插件'
const total = '全部'

const _domainGroup = async () => {
  const domain = window.location.hostname
  const id = backendConfig.domainListAppId

  const query = `${domainListMapping.domain} = "${domain}" limit 1`
  let domainGroup = total

  try {
    const { records } = await GetRecords(id, [], query)
    domainGroup = records.length > 0 ? records[0][domainListMapping.groupName].value : total
  } catch (e) {
    console.log(e)
  }
  return domainGroup
}

export const useAppStore = defineStore('app', {
  state: () => ({
    allApps: { appsList: [], pluginsList: [], error: false },
    domainGroup: '',
  }),

  // persist: true, // 持久化状态

  getters: {},

  actions: {
    async getAllApps() {
      const domainGRoup = await _domainGroup()
      try {
        const manageQuery = `${status} = "${statusValue.active}" and ${group} in ("${domainGRoup}","${total}")  order by ${sort}`
        const { records } = await GetRecords(backendConfig.manageAppId, [], manageQuery)
        const ids = records.map((v) => v[appid].value)
        const idsString = ids.join(',')
        const detailQuery = `${id} in (${idsString})`
        const { records: detailRecords } = await GetRecords(backendConfig.detailAppId, detailFields, detailQuery)
        const idMapping = {}
        for (const index in detailRecords) {
          const appIdValue = detailRecords[index][id].value
          idMapping[appIdValue] = index
        }

        const plugins = []
        const apps = []

        for (const app of records) {
          const data = {}
          const index = idMapping[app[appid].value]
          const detail = detailRecords[index]
          const newDetail = {}

          Object.keys(app).forEach((key) => {
            const mappingKey = findKey(manageMapping, key)

            if (typeof mappingKey !== 'undefined') {
              data[mappingKey] = app[key].value
            }
          })
          Object.keys(detail).forEach((i) => {
            const mappingKey = findKey(detailMapping, i)
            if (typeof mappingKey !== 'undefined') {
              newDetail[mappingKey] = detail[i].value
            }
          })
          data.$fromDetail = newDetail
          if (detail[appType].value === pluginTemplate) {
            plugins.push(data)
          }
          if (detail[appType].value === appTemplate) {
            apps.push(data)
          }
        }
        this.allApps.appsList = apps
        this.allApps.pluginsList = plugins
      } catch {
        this.allApps.error = true
      }
    },

    async getDomainGroup() {
      this.domainGroup = await _domainGroup()
    },
  },
})
