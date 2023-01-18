import moment from "moment";
// 随机取10张牌
export const getHandCardGroup = (list) => {
  const cardList = shuffle(list)
  const handCardList = cardList.splice(0,10)
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

// 洗牌逻辑
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


export function setStorage(key, val, cacheSeconds = null) {
  localStorage.setItem(key, JSON.stringify(val));
  if (cacheSeconds > 0) {
    const duration = moment()
      .add(cacheSeconds, "seconds")
      .valueOf();
    localStorage.setItem(key + "_cache", duration);
  }
}

export function removeStorage(key) {
  localStorage.removeItem(key);
  localStorage.removeItem(key + "_cache");
}

export function getStorage(key, defaultVal = null) {
  const val = JSON.parse(localStorage.getItem(key));
  const valCache = localStorage.getItem(key + "_cache");
  if (valCache > 0) {
    const currentTimestamp = moment().valueOf();
    if (valCache < currentTimestamp) {
      removeStorage(key);
      return defaultVal;
    }
  }
  return val !== "" ? val : defaultVal;
}