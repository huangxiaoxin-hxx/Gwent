// import { getLocalItem } from '@/indexDB'
// import { getHandCardGroup } from '@/util'

const enemy = {
  namespaced: true,
  state: {
    enemyInfo: null,
    random: null
  },
  mutations: {
    setEnemyInfo(state, data) {
      state.enemyInfo = data
    },
    setRandom(state, num) {
      state.random = num
    }
  },
  actions: {
    startGameInfo(context, { data, random }) {
      context.commit('setEnemyInfo', data)
      context.commit('setRandom', random)
    }
  },
  getters: {
    enemyInfo: state => state.enemyInfo,
    random: state => state.random
  }
}

export default enemy