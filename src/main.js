import { createApp } from 'vue'
import store from '@/store/store'
import installElementPlus from '@/libs/element'
import App from '@/App.vue'
import $ from 'jquery'

import { getUserGroups } from '@/services/kintoneApi'

const button = `<div id='kintone-app-store-button'
  class="gaia-header-toolbar-config goog-inline-block goog-menu-button"
  title="打开商城"
  role="button"
  aria-expanded="false"
  tabindex="0"
  aria-haspopup="true"
  style="user-select: none;"
  ></div>`

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
          $('.gaia-header-toolbar-links').prepend(button)
        }
        const app = createApp(App)
        installElementPlus(app)
        app.use(store)
        app.mount('#kintone-app-store-button')
      }
    })
    .catch(() => {
      return
    })
})
