import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/store/modules/auth'
import applications from '@/store/modules/applications'

Vue.use(Vuex)

const state = () => ({})

export default new Vuex.Store({
  state,
  modules: {
    auth,
    applications
  }
})
