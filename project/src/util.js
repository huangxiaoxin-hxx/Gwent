// 随机取10张牌

export const getHandCardGroup = (list) => {
  const cardList = shuffle(list)
  const handCardList = cardList.splice(1,10)
  return {
    cardList,
    handCardList
  }
}

export const randomGetCard = (list) => {
  const len = list.length
  const random = Math.random(len)
  return list.splice(random, 1)
}

function shuffle(arr){
  var result = [],
      random;
  while(arr.length>0){
      random = Math.floor(Math.random() * arr.length);
      result.push(arr[random])
      arr.splice(random, 1)
  }
  return result;
}