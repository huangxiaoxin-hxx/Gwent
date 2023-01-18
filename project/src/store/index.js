import Vue from 'vue'
import Vuex from 'vuex'
import battle from './battle'
import enemy from './enemy'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    battle,
    enemy
  }
})

export default store