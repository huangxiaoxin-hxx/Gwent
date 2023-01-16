import { getLocalItem } from '@/indexDB'
import { getHandCardGroup } from '@/util'

const battle = {
  namespaced: true,
  state: {
    handCardList: null,
    kingCard: null,
    camp: null,
    cardGroup: null,
    warriorList: null,
    initialWarriorList: null,
    shooterList: null,
    initialShooterList: null,
    warriorCombat: 0,
    shooterCombat: 0,
    weather: {
      frost: false,
      fog: false,
      rain: false
    }
  },
  actions: {
    async beginGameRandomCard(context) {
      const selectCardGroup = await getLocalItem('group', context.state.camp) || []
      const { cardList, handCardList } = getHandCardGroup(selectCardGroup)
      context.commit('setHandCardList', handCardList)
      context.commit('setCardGroup', cardList)
    },
    async joinWarriorArea(context, Card) {
      const warriorList = [...context.getters.warriorList, {...Card}]
      const initialWarriorList = [...context.getters.initialWarriorList, {...Card}]
      const index = context.getters.handCardList.indexOf(Card)
      context.commit('setWarriorList', warriorList)
      context.commit('setInitialWarriorList', initialWarriorList) // 需要一个初始的数组保存最开始的战斗力
      context.commit('delHandCard', index)
    },
    async joinShooterArea(context, Card) {
      const shooterList = [...context.getters.shooterList, {...Card}]
      const initialShooterList = [...context.getters.initialShooterList, {...Card}]
      const index = context.getters.handCardList.indexOf(Card)
      context.commit('setShooterList', shooterList)
      context.commit('setInitialShooterList', initialShooterList) // 需要一个初始的数组保存最开始的战斗力
      context.commit('delHandCard', index)
    }
  },
  mutations: {
    setHandCardList(state, list) {
      state.handCardList = list
    },
    setCardGroup(state, list) {
      state.cardGroup = list
    },
    setKingCard(state, data) {
      state.kingCard = data
    },
    setCamp(state, camp) {
      state.camp = camp
    },
    setWarriorList(state, list) {
      state.warriorList = list
    },
    setInitialWarriorList(state, list) {
      state.initialWarriorList = list
    },
    setShooterList(state, list) {
      state.shooterList = list
    },
    setInitialShooterList(state, list) {
      state.initialShooterList = list
    },
    delHandCard(state, index) {
      state.handCardList.splice(index, 1)
    },
    setWarriorCombat(state, combat) {
      state.warriorCombat = combat
    },
    setShooterCombat(state, combat) {
      state.shooterCombat = combat
    },
    setWeather(state, obj) {
      state.weather = {
        ...state.weather,
        ...obj
      }
    }
  },
  getters: {
    handCardList: state => state.handCardList || [],
    kingCard: state => state.kingCard || {},
    camp: state => state.camp || 'North',
    cardGroup: state => state.cardGroup || [],
    warriorList: state => state.warriorList || [],
    initialWarriorList: state => state.initialWarriorList || [],
    shooterList: state => state.shooterList || [],
    initialShooterList: state => state.initialShooterList || [],
    warriorCombat: state => state.warriorCombat,
    shooterCombat: state => state.shooterCombat,
    weather: state => state.weather
  }
}

export default battle