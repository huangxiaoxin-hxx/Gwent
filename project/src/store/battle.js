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
    warriorCombat: 0
  },
  actions: {
    async beginGameRandomCard(context) {
      const selectCardGroup = await getLocalItem('group', context.state.camp) || []
      const { cardList, handCardList } = getHandCardGroup(selectCardGroup)
      context.commit('setHandCardList', handCardList)
      context.commit('setCardGroup', cardList)
    },
    async joinWarriorArea(context, Card) {
      const warriorList = [...context.getters.warriorList, Card]
      const index = context.getters.handCardList.indexOf(Card)
      context.commit('setWarriorList', warriorList)
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
    delHandCard(state, index) {
      state.handCardList.splice(index, 1)
    },
    setWarriorCombat(state, combat) {
      state.warriorCombat = combat
    },
  },
  getters: {
    handCardList: state => state.handCardList || [],
    kingCard: state => state.kingCard || {},
    camp: state => state.camp || 'North',
    cardGroup: state => state.cardGroup || [],
    warriorList: state => state.warriorList || [],
    warriorCombat: state => state.warriorCombat
  }
}

export default battle