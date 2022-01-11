import { GetRecords } from '@/services/kintoneBackend'
import { backendConfig, manageMapping, detailMapping } from '@/config'
import { findKey } from '@/libs/utils'
const { appid, status, statusValue, sort } = manageMapping
const { appid: id, appName, icon, url, picTable } = detailMapping
const detailFields = [id, appName, icon, url, picTable]

const state = {
  allApps: { appsList: [], error: false },
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

      const aggregatedData = records.map((app) => {
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
        return data
      })
      data.appsList = aggregatedData
    } catch {
      data.error = true
    }
    context.commit('SETALLAPPS', data)
    return data
  },
}

const mutations = {
  SETALLAPPS(state, value) {
    state.allApps = value
  },
}

export default {
  state,
  actions,
  mutations,
}
