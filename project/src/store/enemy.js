// import { getLocalItem } from '@/indexDB'
// import { getHandCardGroup } from '@/util'

const enemy = {
  namespaced: true,
  state: {
    enemyInfo: null
  },
  mutations: {
    setEnemyInfo(state, data) {
      state.enemyInfo = data
    }
  },
  actions: {},
  getters: {
    enemyInfo: state => state.enemyInfo
  }
}

export default enemy