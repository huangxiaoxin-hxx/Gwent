import store from '@/store'
console.log(store)
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
    case 'Doctor':
      
      break;
  
    default:
      playingCardPositionSwitch(Card)
      break;
  }
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
      console.log(Card)
      break;
  
    default:
      break;
  }
}