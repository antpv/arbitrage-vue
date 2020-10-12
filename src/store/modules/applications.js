import ApplicationsService from '../../services/ApplicationsService'

const state = {
  applications: []
}

const mutations = {
  setApplications(state, payload) {
    state.applications = payload
  }
}

const actions = {
  async getApplications({ commit }) {
    const applications = await ApplicationsService.getApplications()

    commit('setApplications', applications)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
