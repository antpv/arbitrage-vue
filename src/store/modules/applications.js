import ApplicationsService from '../../services/ApplicationsService'

const state = {
  applications: [],
  request: false
}

const mutations = {
  setApplications(state, payload) {
    state.applications = payload
  },

  setRequest(state, bool) {
    state.request = bool
  }
}

const actions = {
  async getApplications({ commit }) {
    try {
      commit('setRequest', true)

      const applications = await ApplicationsService.getApplications()

      commit('setApplications', applications)

      return applications
    } catch (error) {
      throw Error(error)
    } finally {
      commit('setRequest', false)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
