import installElementPlusIcon from '@/libs/element_icons'
import i18n from '@/libs/i18n'
import App from '@/App.vue'
import $ from 'jquery'

import { getUserGroups } from '@/services/kintoneApi'

const button = `<li><div id='kintone-app-store-button'></div></li>`

const { code } = kintone.getLoginUser()
const adminGroupId = '7532782697181632512'

const checkInAdmin = (groupInfo) => {
  return groupInfo.id === adminGroupId
}

//当需要使用插件在多个kitnone应用中加载时，就不需要加入“DOMContentLoaded”这个事件监听了，只需要在插件中加入加载时机就行了。
//时机为DOMContentLoaded，或者叫document-end
// document.addEventListener('DOMContentLoaded', () => {
getUserGroups(code)
  .then((resp) => {
    const { groups: userGroups } = resp
    const checkadmin = userGroups.filter(checkInAdmin)
    const isAdmin = checkadmin.length > 0 ? true : false
    if (isAdmin) {
      if ($('#kintone-app-store-button').length <= 0) {
        $('#header-global-navigation-root nav > div:last > ul').prepend(button)
      }
      const app = createApp(App)
      installElementPlusIcon(app)
      app.use(createPinia())
      app.use(i18n)
      app.mount('#kintone-app-store-button')
    }
  })
  .catch(() => {
    return
  })
// })
