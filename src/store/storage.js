import { GetRecords } from '@/services/kintoneBackend'
import { backendConfig, manageMapping, detailMapping, whiteListMapping } from '@/config'
import { findKey } from '@/libs/utils'
const { appid, status, statusValue, sort } = manageMapping
const { appid: id, appName, icon, url, picTable, appType } = detailMapping
const detailFields = [id, appName, icon, url, picTable, appType]
const appTemplate = '应用模版'
const pluginTemplate = '插件'

const local = 'local'
const jp = '日系'

const state = {
  allApps: { appsList: [], error: false },
  domainGroup: '',
}

const actions = {
  async getAllApps(context) {
    const data = { appsList: [], error: false }

    try {
      const manageQuery = `${status} = "${statusValue.active}" order by ${sort}`
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
      data.appsList = apps
      data.pluginsList = plugins
    } catch {
      data.error = true
    }
    context.commit('SETALLAPPS', data)
    return data
  },

  async getDomainGroup(context) {
    const domain = document.domain
    const id = backendConfig.whiteListAppId

    const localQuery = `${whiteListMapping.groupName} = "${local}" and ${whiteListMapping.list} like "${domain}"`

    const { records } = await GetRecords(id, [], localQuery)
    const domainGRoup = records.length > 0 ? 'local' : 'jp'
    context.commit('SETDOMAINGROUP', domainGRoup)
    return domainGRoup
  },
}

const mutations = {
  SETALLAPPS(state, value) {
    state.allApps = value
  },

  SETDOMAINGROUP(state, value) {
    state.domainGroup = value
  },
}

export default {
  state,
  actions,
  mutations,
}
