import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token'),
    user:{
      name : 'Guest',
      id : '',
      cId: 0
    }
  },
  mutations: {
    getToken (state, user) {
      state.token = localStorage.getItem('token')
      state.user = user
    },
    delToken (state) {
      localStorage.removeItem('token')
      state.token = null
      state.user={
        name : 'Guest',
        id : '',
        cId: 0
      }
    }
  },
  actions: {

  }
})