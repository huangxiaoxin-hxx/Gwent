import store from '@/store'
import { typeList } from '@/static/cardConfig'
import { cloneDeep } from 'lodash'
import { sendData } from './sendMessage'

// 出牌逻辑函数
// export const abilityType = {
//   Doctor:       '医生',
//   Spy:          '间谍',
//   HornMan:      '气势',
//   BurnMan:      '灼烧',
//   Compatriots:  '同胞之情'
// }
export const playingCardTypeSwitch = (Card) => {
  switch (Card.type) {
    case typeList.doctor.type:
      playingDoctor()
      break;
    case typeList.burn.type:
      playingBurn()
      break;
    case typeList.exchange.type:
      playingExchange(Card)
      break;
    case typeList.spy.type:
      playingSpy()
      break;
    case typeList.frost.type:
      // 打出霜冻牌
      playingFrost()
      break;
    case typeList.fog.type:
      // 打出浓雾牌
      playingFog()
      break;
    case typeList.rain.type:
      // 打出酸雨牌
      playingRain()
      break;
    case typeList.sunny.type:
      playingSunny()
      break;
  }
  playingCardPositionSwitch(Card)
}

// export const positionType = {
//   weather:  "天气牌",
//   warrior:  "战士",
//   shooter:  "射手",
//   siege:    "攻城",
//   king:     "国王"
// }

// 判断卡牌的位置
export const playingCardPositionSwitch = (Card) => {
  switch (Card.position) {
    case 'warrior':
      store.dispatch('battle/joinWarriorArea', Card)
      calculateWarriorCombat()
      break;
    case 'shooter':
      store.dispatch('battle/joinShooterArea', Card)
      calculateShooterCombat()
      break;
    case 'siege':
      store.dispatch('battle/joinSiegeArea', Card)
      calculateSiegeCombat()
      break;
    default:
      break;
  }
  // 打出一张手牌，将该牌从手中移
  delHandCard(Card)
  switch (Card.type) {
    case typeList.spy.type:
      sendData('spy', Card)
      break;
    default:
      sendData('playing')
      break;
  }
}
// 打出霜冻
function playingFrost() {
  store.commit('battle/setWeather', {frost: true})
  // 重写计算近战战斗力
  calculateWarriorCombat()
}
// 打出浓雾
function playingFog() {
  store.commit('battle/setWeather', {fog: true})
  // 重写计算远程战斗力
  calculateShooterCombat()
}
// 打出酸雨
function playingRain() {
  store.commit('battle/setWeather', {rain: true})
  // 重写计算攻城战斗力
  calculateSiegeCombat()
}
// 打出晴天牌
function playingSunny() {
  // todo:后续在vuex中优化
  store.commit('battle/setWeather', {frost: false, fog: false, rain: false})
  const initialWarriorList = store.getters['battle/initialWarriorList']
  const initialShooterList = store.getters['battle/initialShooterList']
  const initialSiegeList = store.getters['battle/initialSiegeList']
  const deepWarriorData = JSON.parse(JSON.stringify(initialWarriorList))
  const deepShooterData = JSON.parse(JSON.stringify(initialShooterList))
  const deepSiegeData = JSON.parse(JSON.stringify(initialSiegeList))
  store.commit('battle/setWarriorList', deepWarriorData)
  store.commit('battle/setShooterList', deepShooterData)
  store.commit('battle/setSiegeList', deepSiegeData)
  // 打出晴天，重新计算战斗力
  calculateAllCombat()
}

// 打出灼烧牌,烧毁场上战力最高的可选牌
function playingBurn() {
  let max = 0
  const warriorList = cloneDeep(store.getters['battle/warriorList'])
  const shooterList = cloneDeep(store.getters['battle/shooterList'])
  const siegeList = cloneDeep(store.getters['battle/siegeList'])
  const list = [...warriorList, ...shooterList, ...siegeList]
  // 找出最大combat
  list.map(item => {
    if(item.fieldSelect && item.combat != null) {
      max = Math.max(max, item.combat)
    }
  })
  // 将最大combat区分出来
  const warriorGather = bifurcateBy(warriorList, (item) => item.combat === max && item.fieldSelect)
  const shooterGather = bifurcateBy(shooterList, (item) => item.combat === max && item.fieldSelect)
  const siegeGather = bifurcateBy(siegeList, (item) => item.combat === max && item.fieldSelect)
  store.dispatch('battle/burnAllAreaSurvived', {
    warriorSurvived: warriorGather[1], shooterSurvived: shooterGather[1], siegeSurvived: siegeGather[1]
  })
  const dieWarrior = warriorGather[0]
  const dieShooter = shooterGather[0]
  const dieSiege = siegeGather[0]
  // 需要将原初copy战场组initial也删除对应卡牌，并放入墓地
  delInitialArea(dieWarrior, dieShooter, dieSiege)
  // 重新计算战力
  calculateAllCombat()
}

// 删除原初卡组区域
function delInitialArea(dieWarrior, dieShooter, dieSiege) {
  const initialWarriorList = cloneDeep(store.getters['battle/initialWarriorList'])
  const initialShooterList = cloneDeep(store.getters['battle/initialShooterList'])
  const initialSiegeList = cloneDeep(store.getters['battle/initialSiegeList'])
  const cemeteryList = cloneDeep(store.getters['battle/cemeteryList'])
  let dieList = []
  console.log(dieWarrior, dieShooter, dieSiege)
  dieWarrior.map(item => {
    initialWarriorList.map((card, index) => {
      if(item.id === card.id) {
        const die = initialWarriorList.splice(index, 1)
        dieList.push(die[0])
      }
    })
  })
  dieShooter.map(item => {
    initialShooterList.map((card, index) => {
      if(item.id === card.id) {
        const die = initialShooterList.splice(index, 1)
        dieList.push(die[0])
      }
    })
  })
  dieSiege.map(item => {
    initialSiegeList.map((card, index) => {
      if(item.id === card.id) {
        const die = initialSiegeList.splice(index, 1)
        dieList.push(die[0])
      }
    })
  })
  store.dispatch('battle/burnAllInitAreaSurvived', {
    warriorSurvived: initialWarriorList, shooterSurvived: initialShooterList, siegeSurvived: initialSiegeList
  })
  console.log(cemeteryList, dieList)
  store.commit('battle/setCemeteryList', cemeteryList.concat(dieList))
}

// 打出替换牌
function playingExchange(Card) {
  store.commit('battle/setExchange', true)
  store.commit('battle/setExchangeCard', Card)
}

// 替换牌逻辑
export function exchangeLogic(card, area) {
  let areaUseObj = {
    areaName: null,
    initAreaName: null,
    setAreaName: null,
    setInitAreaName: null,
    position: null
  }
  switch (area) {
    case 'warriorArea':
      areaUseObj.areaName = 'warriorList'
      areaUseObj.initAreaName = 'initialWarriorList'
      areaUseObj.setAreaName = 'setWarriorList'
      areaUseObj.setInitAreaName = 'setInitialWarriorList'
      areaUseObj.position = 'joinWarriorArea'
      break;
    case 'shooterArea':
      areaUseObj.areaName = 'shooterList'
      areaUseObj.initAreaName = 'initialShooterList'
      areaUseObj.setAreaName = 'setShooterList'
      areaUseObj.setInitAreaName = 'setInitialShooterList'
      areaUseObj.position = 'joinShooterArea'
      break;
    case 'siegeArea':
      areaUseObj.areaName = 'siegeList'
      areaUseObj.initAreaName = 'initialSiegeList'
      areaUseObj.setAreaName = 'setSiegeList'
      areaUseObj.setInitAreaName = 'setInitialSiegeList'
      areaUseObj.position = 'joinSiegeArea'
      break;
  }
  const areaList = cloneDeep(store.getters[`battle/${areaUseObj.areaName}`])
  const initAreaList = cloneDeep(store.getters[`battle/${areaUseObj.initAreaName}`])
  areaList.map((item, index) => {
    if(item.id === card.id) {
      areaList.splice(index, 1)
    }
  })
  initAreaList.map((item, index) => {
    if(item.id === card.id) {
      const initCard = initAreaList.splice(index, 1)
      store.dispatch('battle/addOneHandCard', initCard[0])
    }
  })
  store.commit(`battle/${areaUseObj.setAreaName}`, areaList)
  store.commit(`battle/${areaUseObj.setInitAreaName}`, initAreaList)
  store.commit('battle/setExchange', false)
  const exchangeCard = store.getters['battle/exchangeCard']
  store.dispatch(`battle/${areaUseObj.position}`, exchangeCard)
  switch (area) {
    case 'warriorArea':
      calculateWarriorCombat()
      break;
    case 'shooterArea':
      calculateShooterCombat()
      break;
    case 'siegeArea':
      calculateSiegeCombat()
      break;
  }
  sendData('playing')
}

// 打出医生牌
function playingDoctor() {
  const cemeteryList = store.getters['battle/cemeteryList']
  const list = cemeteryList.filter(item => item.fieldSelect)
  if(list.length !== 0) {
    store.commit('battle/setCemeteryView', true)
    store.commit('battle/setIsDoctor', true)
  }
}
// 医生复活一张牌之前的逻辑
export function beforeDoctorPlaying(Card) {
  // del cemetery Card
  const cemeteryList = cloneDeep(store.getters['battle/cemeteryList'])
  const list = cemeteryList.filter(item => item.id !== Card.id)
  store.commit('battle/setCemeteryList', list)
  store.commit('battle/setCemeteryView', false)
  store.commit('battle/isDoctor', false)
}

// 打出间谍牌
function playingSpy() {
  const cardGroup = cloneDeep(store.getters['battle/cardGroup'])
  const addCard = cardGroup.splice(0,2)
  store.dispatch('battle/addHandCardList', addCard)
  store.commit('battle/setCardGroup', cardGroup)
}

// 注，因为后续出牌也需要判断是否有天气牌影响，所以在计算战斗力里判断天气
//计算近战战斗力
export function calculateWarriorCombat() {
  const warriorList = store.getters['battle/warriorList']
  const frost = store.getters['battle/weather'].frost
  if(frost) {
    // 将除hero和0战斗力牌除外的牌战斗力置为1
    warriorList.map(item => {
      if(item.fieldSelect && item.combat > 0) {
        item.combat = 1
      }
    })
    store.commit('battle/setWarriorList', warriorList)
  } 
  let sumCombat = 0
  warriorList.map(item => {
    sumCombat += item.combat
  })
  store.commit('battle/setWarriorCombat', sumCombat)
}

//计算远程战斗力
export function calculateShooterCombat() {
  const shooterList = store.getters['battle/shooterList']
  const fog = store.getters['battle/weather'].fog
  if(fog) {
    // 将除hero和0战斗力牌除外的牌战斗力置为1
    shooterList.map(item => {
      if(item.fieldSelect && item.combat > 0) {
        item.combat = 1
      }
    })
    store.commit('battle/setShooterList', shooterList)
  } 
  let sumCombat = 0
  shooterList.map(item => {
    sumCombat += item.combat
  })
  store.commit('battle/setShooterCombat', sumCombat)
}

// 计算攻城战斗力
export function calculateSiegeCombat() {
  const siegeList = store.getters['battle/siegeList']
  const rain = store.getters['battle/weather'].rain
  if(rain) {
    // 将除hero和0战斗力牌除外的牌战斗力置为1
    siegeList.map(item => {
      if(item.fieldSelect && item.combat > 0) {
        item.combat = 1
      }
    })
    store.commit('battle/setSiegeList', siegeList)
  } 
  let sumCombat = 0
  siegeList.map(item => {
    sumCombat += item.combat
  })
  store.commit('battle/setSiegeCombat', sumCombat)
}

// 重新计算所有战斗力
function calculateAllCombat() {
  calculateWarriorCombat()
  calculateShooterCombat()
  calculateSiegeCombat()
}

// 打出一张牌就删掉一张手牌
function delHandCard(Card) {
  const index = store.getters['battle/handCardList'].indexOf(Card)
  store.commit('battle/delHandCard', index)
}

// 按fn条件将数组分为两个集合
const bifurcateBy = (arr, fn) =>
  arr.reduce((acc, val, i) => (acc[fn(val, i) ? 0 : 1].push(val), acc), [[], []])