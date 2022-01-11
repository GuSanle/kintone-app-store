// 基于kintone的后端应用管理系统的api
import { ProxyRequest } from '@/services/request'

////根据1条记录
export const GetRecord = (app, id) => {
  const params = {
    app,
    id,
  }
  const url = '/k/v1/record.json'
  return ProxyRequest(url, 'GET', params)
}

//根据条件获取记录(500条)
export const GetRecords = (app, fields = [], query = '') => {
  let params = {
    app,
    query,
  }
  if (fields.length > 0) {
    params.fields = fields
  }

  const url = '/k/v1/records.json'
  return ProxyRequest(url, 'GET', params)
}

//更新计数器
export const UpdateDownloadCount = (app, id, countField, newCount) => {
  const params = {
    app,
    id,
    record: {
      [countField]: {
        value: newCount,
      },
    },
  }
  const url = '/k/v1/record.json'
  return ProxyRequest(url, 'PUT', params)
}

//获取并更新计数器
export const SetNewCount = (app, id, countField) => {
  GetRecord(app, id).then((resp) => {
    const record = resp.record
    const newCount = Number(record[countField].value) + 1
    UpdateDownloadCount(app, id, countField, newCount)
  })
}

//从阿里云的oss服务器下载文件(需要先允许跨域)
export const DownloadOssFiles = (url) => {
  return fetch(url)
    .then((resp) => resp.blob())
    .then((blob) => blob)
    .catch((error) => {
      return Promise.reject(error)
    })
}
