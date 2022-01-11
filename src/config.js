export const backendConfig = {
  domain: 'https://devcenter.cybozu.cn',
  manageAppId: '32',
  detailAppId: '33',
}

export const manageMapping = {
  id: '$id',
  appid: 'appid',
  category: 'category',
  homeDisplay: 'homeDisplay',
  largeImage: 'largeImage',
  midImage: 'midImage',
  recommend: 'recommend',
  sort: 'sort',
  status: '状态',
  statusValue: {
    NotStarted: '未处理',
    active: '已上架',
    notActive: '已下架',
    pending: '待定',
  },
}

export const detailMapping = {
  id: '$id',
  appName: 'appName',
  document: 'document',
  icon: 'icon',
  appid: 'id',
  url: 'url',
  docLink: 'docLink',
  picTable: 'picTable',
  imageUrl: 'imageUrl',
  downloadCount: 'downloadCount',
  installCount: 'installCount',
  csvLink: 'csvLink',
}
