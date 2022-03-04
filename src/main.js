import { createApp } from 'vue'
import store from '@/store/store'
import installElementPlus from '@/libs/element'
import App from '@/App.vue'
import $ from 'jquery'

import { CheckAdminRights } from '@/services/kintoneApi'

const button = `<div id='kintone-app-store-button'
  class="gaia-header-toolbar-config goog-inline-block goog-menu-button"
  title="打开商城"
  role="button"
  aria-expanded="false"
  tabindex="0"
  aria-haspopup="true"
  style="user-select: none;"
  ></div>`

document.addEventListener('DOMContentLoaded', () => {
  CheckAdminRights()
    .then((resp) => {
      if ($('#kintone-app-store-button').length <= 0) {
        $('.gaia-header-toolbar-links').prepend(button)
      }
      const app = createApp(App)
      installElementPlus(app)
      app.use(store)
      app.mount('#kintone-app-store-button')
    })
    .catch(() => {
      return
    })
})
