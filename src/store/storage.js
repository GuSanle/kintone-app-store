import { GetRecords } from '@/services/kintoneBackend'
import { backendConfig, manageMapping, detailMapping, domainListMapping } from '@/config'
import { findKey } from '@/libs/utils'
const { appid, status, statusValue, sort, group } = manageMapping
const { appid: id, appName, icon, url, picTable, appType } = detailMapping
const detailFields = [id, appName, icon, url, picTable, appType]
const appTemplate = '应用模版'
const pluginTemplate = '插件'

const total = '全部'

const state = {
  allApps: { appsList: [], error: false },
  domainGroup: '',
}

const _domainGroup = async () => {
  const domain = document.domain
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

const actions = {
  async getAllApps(context) {
    const data = { appsList: [], error: false }
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
      data.appsList = apps
      data.pluginsList = plugins
    } catch {
      data.error = true
    }
    context.commit('SETALLAPPS', data)
    return data
  },

  async getDomainGroup(context) {
    const domainGroup = await _domainGroup()
    context.commit('SETDOMAINGROUP', domainGroup)
    return domainGroup
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
