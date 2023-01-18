import { getLocalItem } from '@/indexDB'
import { getHandCardGroup, getStorage } from '@/util'
const formInline = getStorage('formInline')
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
    siegeList: null,
    initialSiegeList: null,
    warriorCombat: 0,
    shooterCombat: 0,
    siegeCombat: 0,
    weather: {
      frost: false,
      fog: false,
      rain: false
    },
    cemeteryList: null,
    cemeteryView: false,
    exchange: false,
    exchangeCard: null,
    isDoctor: false, // 是否是因为医生展开的墓地
    isGiveUp: false, // 弃牌标记
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
      context.commit('setWarriorList', warriorList)
      context.commit('setInitialWarriorList', initialWarriorList) // 需要一个初始的数组保存最开始的战斗力
    },
    async joinShooterArea(context, Card) {
      const shooterList = [...context.getters.shooterList, {...Card}]
      const initialShooterList = [...context.getters.initialShooterList, {...Card}]
      context.commit('setShooterList', shooterList)
      context.commit('setInitialShooterList', initialShooterList) // 需要一个初始的数组保存最开始的战斗力
    },
    async joinSiegeArea(context, Card) {
      console.log(Card)
      const siegeList = [...context.getters.siegeList, {...Card}]
      const initialSiegeList = [...context.getters.initialSiegeList, {...Card}]
      context.commit('setSiegeList', siegeList)
      context.commit('setInitialSiegeList', initialSiegeList) // 需要一个初始的数组保存最开始的战斗力
    },
    // 将焚烧后的幸存牌加入战场
    burnAllAreaSurvived(context, { warriorSurvived, shooterSurvived, siegeSurvived }) {
      context.commit('setWarriorList', warriorSurvived)
      context.commit('setShooterList', shooterSurvived)
      context.commit('setSiegeList', siegeSurvived)
    },
    // 原初卡牌对应以上操作
    burnAllInitAreaSurvived(context, { warriorSurvived, shooterSurvived, siegeSurvived }) {
      context.commit('setInitialWarriorList', warriorSurvived)
      context.commit('setInitialShooterList', shooterSurvived)
      context.commit('setInitialSiegeList', siegeSurvived)
    },
    // 增加一张手牌
    addOneHandCard(context, Card) {
      const handCardList = context.getters.handCardList
      context.commit('setHandCardList', [...handCardList, Card])
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
    setSiegeList(state, list) {
      state.siegeList = list
    },
    setInitialSiegeList(state, list) {
      state.initialSiegeList = list
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
    setSiegeCombat(state, combat) {
      state.siegeCombat = combat
    },
    setWeather(state, obj) {
      state.weather = {
        ...state.weather,
        ...obj
      }
    },
    setCemeteryList(state, list) {
      state.cemeteryList = list
    },
    setCemeteryView(state, bool) {
      state.cemeteryView = bool
    },
    setExchange(state, bool) {
      state.exchange = bool
    },
    setExchangeCard(state, card) {
      state.exchangeCard = card
    },
    setIsDoctor(state, bool) {
      state.isDoctor = bool
    },
    setIsGiveUp(state, bool) {
      state.isGiveUp = bool
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
    siegeList: state => state.siegeList || [],
    initialSiegeList: state => state.initialSiegeList || [],
    warriorCombat: state => state.warriorCombat,
    shooterCombat: state => state.shooterCombat,
    siegeCombat: state => state.siegeCombat,
    totalCombat: state => state.warriorCombat + state.shooterCombat + state.siegeCombat,
    weather: state => state.weather,
    cemeteryList: state => state.cemeteryList || [],
    cemeteryView: state => state.cemeteryView,
    exchange: state => state.exchange,
    exchangeCard: state => state.exchangeCard || {},
    isDoctor: state => state.isDoctor,
    isGiveUp: state => state.isGiveUp,
    sendData: state => {
      return {
        username: formInline.username,
        handCardList: state.handCardList || [],
        kingCard: state.kingCard || {},
        warriorList: state.warriorList || [],
        shooterList: state.shooterList || [],
        siegeList: state.siegeList || [],
        weather: state.weather,
        totalCombat: state.warriorCombat + state.shooterCombat + state.siegeCombat,
        isGiveUp: state.isGiveUp
      }
    }
  }
}

export default battle