import { Request } from '@/services/request'

// 批量获取记录
export const GetRecords = (app, query) => {
  const options = {
    app,
    query,
    totalCount: true,
  }
  const url = '/k/v1/records.json'
  return Request(url, 'GET', options)
}

// 安装模版文件
export const InstallApp = (fileKey) => {
  const options = {
    thread: null,
    fileKey,
  }
  const url = '/k/api/app/installFromTemplateFile'
  return Request(url, 'POST', options)
}

// 安装插件文件
export const InstallPlugin = (fileKey) => {
  const options = {
    item: fileKey,
  }
  const url = '/k/api/dev/plugin/import.json'
  return Request(url, 'POST', options)
}

//上传文件 直接用fetch上传到本地kintone
export const UploadFiles = (blob, name) => {
  const fd = new FormData()
  fd.append('__REQUEST_TOKEN__', kintone.getRequestToken())
  fd.append('file', blob, name)
  return fetch('/k/v1/file.json', {
    method: 'POST',
    body: fd,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
  })
    .then((resp) => resp.json())
    .catch((error) => {
      return Promise.reject(error)
    })
}
