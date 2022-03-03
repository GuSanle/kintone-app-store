//执行kintone请求的拦截器
import qs from 'qs'
import { backendConfig } from '@/config'

//通过代理发送外部kintone请求
export const ProxyRequest = (url, method, params) => {
  //请求拦截 增加token,json设置 等头部信息
  const headersWithtoken = {
    'X-Cybozu-API-Token': `${process.env.VUE_APP_MANAGEAPPTOKEN},${process.env.VUE_APP_DETAILAPPTOKEN},${process.env.VUE_APP_DOMAINLISTAPPTOKEN},${process.env.VUE_APP_STATISTICSAPPTOKEN}`,
  }
  if (/^(GET|DELETE)$/i.test(method)) {
    url = `${backendConfig.domain + url}?${qs.stringify(params)}`
  } else {
    url = backendConfig.domain + url
    headersWithtoken['Content-Type'] = 'application/json'
  }

  //响应拦截
  return kintone
    .proxy(url, method, headersWithtoken, params)
    .then((resp) => {
      const [data, status] = resp
      if (!/^[2,3]\d{2}$/.test(status)) {
        return Promise.reject(resp)
      }
      return JSON.parse(data)
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}

//发送本域kintone请求
export const Request = (url, method, params) => {
  //响应拦截
  return kintone
    .api(kintone.api.url(url, true), method, params)
    .then((resp) => {
      return resp
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}
