import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userGithub: null,
    repositories: [],
    reposReadMe: null
  },
  mutations: {
    setData (state, payload) {
      state.userGithub = payload
    },
    setRepositories (state, payload) {
      state.repositories = payload
    },
    setReposReadMe (state, payload) {
      state.reposReadMe = payload
    }
  },
  actions: {

  }
})
