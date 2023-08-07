import { createApp } from 'vue'
import installElementPlusIcon from '@/libs/element_icons'
import i18n from '@/libs/i18n'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import $ from 'jquery'

import { getUserGroups } from '@/services/kintoneApi'

const button = `<li><div id='kintone-app-store-button'></div></li>`

const { code } = kintone.getLoginUser()
const adminGroupId = '7532782697181632512'

const checkInAdmin = (groupInfo) => {
  return groupInfo.id === adminGroupId
}

document.addEventListener('DOMContentLoaded', () => {
  getUserGroups(code)
    .then((resp) => {
      const { groups: userGroups } = resp
      const checkadmin = userGroups.filter(checkInAdmin)
      const isAdmin = checkadmin.length > 0 ? true : false
      if (isAdmin) {
        if ($('#kintone-app-store-button').length <= 0) {
          $('.dhOPxC__menu-list:last').prepend(button)
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
})
