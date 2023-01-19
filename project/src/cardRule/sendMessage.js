import { pubSub } from '@/main'
import store from '@/store'
import { getStorage } from '@/util'
const formInline = getStorage('formInline')

// 每出一张牌或其他操作，将我放数据发送出去
export function sendData(type) {
  const data = store.getters['battle/sendData']
  switch (type) {
    case 'start': // 我方准备完毕，发送信息告知对方
      sendStart(data)
      break;
    case 'playing': // 我方打出一张牌
      playingCard(data)
      break;
  }
  
}

function sendStart(data) {
  const random = Math.floor(Math.random()*100)
  judgeMyStart(random)
  store.commit('battle/setRandom', random)
  const message = {
    type: 'start',
    data: data,
    random: random
  }
  pubSub.publish({
    channel: formInline.roomId,
    message: JSON.stringify(message),
    onSuccess : function () {
        console.log("发送成功");
    },
    onFailed : function (error) {
        console.log("消息发送失败，错误编码：" + error.code + " 错误信息：" + error.content);
    }
  });
}

function judgeMyStart(random) { // 比大小决定谁先出牌
  const enemyRandom = store.getters['enemy/random']
  if(enemyRandom !== null) { // 如果敌方random数不为null，证明敌方已开始等待
    if(enemyRandom < random) { // 如果我方点数大于敌方，我方先出
      store.commit('battle/setIsPlaying', true)
    }
  }
}

function playingCard(data) {
  const message = {
    type: 'playing',
    data: data,
  }
  pubSub.publish({
    channel: formInline.roomId,
    message: JSON.stringify(message),
    onSuccess : function () {
      console.log("发送成功");
      store.commit('battle/setIsPlaying', false) // 出完牌将我方出牌置为false
    },
    onFailed : function (error) {
      console.log("消息发送失败，错误编码：" + error.code + " 错误信息：" + error.content);
    }
  });
}