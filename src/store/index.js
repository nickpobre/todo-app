// store/index.js
import { createStore } from 'vuex'

export default createStore({
  state: {
    token: null
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      console.log(state.token)
    }
  },
  getters: {
    isAuthenticated(state) {
      console.log(state.token)
      return !!state.token
    }
  }
})
