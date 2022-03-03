export const backendConfig = {
  domain: 'https://app-market.cybozu.cn',
  manageAppId: '3',
  detailAppId: '4',
  domainListAppId: '9',
  statisticsAppId: '8',
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
  group: 'group',
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
  appType: 'type',
}

export const domainListMapping = {
  id: '$id',
  groupName: 'groupName',
  domain: 'domain',
}

export const statisticsMapping = {
  id: '$id',
  lookup: 'Lookup',
  domain: 'domain',
}
