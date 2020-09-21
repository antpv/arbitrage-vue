const state = {
  isLoggedIn: false
}

const mutations = {
  setAuth(state, bool) {
    state.isLoggedIn = bool
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
