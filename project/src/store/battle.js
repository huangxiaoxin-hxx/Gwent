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
    warriorCombat: 0,
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
      console.log(Card)
      const warriorList = [...context.getters.warriorList, {...Card}]
      const initialWarriorList = [...context.getters.initialWarriorList, {...Card}]
      const index = context.getters.handCardList.indexOf(Card)
      context.commit('setWarriorList', warriorList)
      context.commit('setInitialWarriorList', initialWarriorList) // 需要一个初始的数组保存最开始的战斗力
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
    delHandCard(state, index) {
      state.handCardList.splice(index, 1)
    },
    setWarriorCombat(state, combat) {
      state.warriorCombat = combat
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
    warriorCombat: state => state.warriorCombat,
    weather: state => state.weather
  }
}

export default battle