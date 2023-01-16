import store from '@/store'
import { typeList } from '@/static/cardConfig'
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


export const playingCardPositionSwitch = (Card) => {
  switch (Card.position) {
    case 'warrior':
      store.dispatch('battle/joinWarriorArea', Card)
      calculateWarriorCombat()
      break;
    default:
      break;
  }
  delHandCard(Card)
}

function playingFrost() {
  store.commit('battle/setWeather', {frost: true})
  // 打出霜冻，重写计算近战战斗力
  calculateWarriorCombat()
}

function playingFog() {
  store.commit('battle/setWeather', {fog: true})
  // 打出浓雾，重写计算远程战斗力
  calculateWarriorCombat()
}

function playingRain() {
  store.commit('battle/setWeather', {rain: true})
  // 打出霜冻，重写计算攻城战斗力
  calculateWarriorCombat()
}


function playingSunny() {
  store.commit('battle/setWeather', {frost: false, fog: false, rain: false})
  const initialWarriorList = store.getters['battle/initialWarriorList']
  const deepData = JSON.parse(JSON.stringify(initialWarriorList))
  store.commit('battle/setWarriorList', deepData)
  // 打出晴天，重新计算战斗力
  calculateWarriorCombat()
}

function calculateWarriorCombat() {
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

// 打出一张牌就删掉一张手牌
function delHandCard(Card) {
  const index = store.getters['battle/handCardList'].indexOf(Card)
  store.commit('battle/delHandCard', index)
}