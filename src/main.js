import { createApp } from 'vue'
import store from '@/store/store'
import installElementPlus from '@/libs/element'
import { FloatMenu } from 'vue-float-menu'
import 'vue-float-menu/dist/vue-float-menu.css'
import InstantSearch from 'vue-instantsearch/vue3/es'
import App from '@/App.vue'

document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('dld-dev-center')) {
    const el = document.createElement('div')
    el.id = 'dld-dev-center'
    const app = createApp(App)
    app.component('FloatMenu', FloatMenu)
    installElementPlus(app)
    app.use(store)
    app.use(InstantSearch)
    app.mount(el)
    document.body.insertBefore(el, document.body.firstChild)
  }
})
