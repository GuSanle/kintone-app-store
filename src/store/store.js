import { createStore } from 'vuex'
import storage from '@/store/storage'
export default createStore({
  modules: {
    storage: storage,
  },
})
