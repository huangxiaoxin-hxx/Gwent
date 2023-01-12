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
      context.commit('setWarriorList', warriorList)
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
    }
  },
  getters: {
    handCardList: state => state.handCardList || [],
    kingCard: state => state.kingCard || {},
    camp: state => state.camp || 'North',
    cardGroup: state => state.cardGroup || [],
    warriorList: state => state.warriorList || []
  }
}

export default battle