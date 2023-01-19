import { pubSub } from '@/main'
import { getStorage } from '@/util'
import store from '@/store'
import { calculateWarriorCombat, calculateShooterCombat, calculateSiegeCombat } from './index.js'
import { sendData } from './sendMessage'

const formInline = getStorage('formInline')
export function startSubscribe() {
  pubSub.subscribe({
    channel: formInline.roomId,
    onMessage: (message) => {
      const data = JSON.parse(message.content)
      console.log(data)
      if(data.data.username !== formInline.username ) {
        switchMessageType(data)
      }
    },
    onSuccess: () => {
      console.log("监听新消息成功")
    },
    onFailed: (error) => {
      console.log("订阅消息失败, code:"+error.code+ ",错误信息:"+error.content);
    }
  })
}

export function switchMessageType(data) {
  switch (data.type) {
    case 'start':
      startMessage(data)
      break;
    case 'playing':
      plyingMessage(data)
      break;
    case 'spy':
      spyMessage(data)
      break;
    case 'callback':
      callbackMessage(data)
      break;
  }
}

function startMessage(data) {
  store.dispatch('enemy/startGameInfo', {data: data.data, random: data.random})
  // 收到对方开始消息，若我方已开始，我方random不为null
  const myRandom = store.getters['battle/random']
  if(myRandom !== null) {
    if(myRandom >= data.random) {
      store.commit('battle/setIsPlaying', true)
    }
  }
}

function plyingMessage(data) {
  store.commit('enemy/setEnemyInfo', data.data)
  store.commit('battle/setIsPlaying', true)
}

function spyMessage(data) {
  store.commit('enemy/setEnemyInfo', data.data)
  store.commit('battle/setIsPlaying', true)
  const spy = data.card
  console.log(spy.position)
  switch (spy.position) {
    case 'spy-warrior':
      store.dispatch('battle/joinWarriorArea', spy)
      calculateWarriorCombat()
      break;
    case 'spy-shooter':
      store.dispatch('battle/joinShooterArea', spy)
      calculateShooterCombat()
      break;
    case 'spy-siege':
      store.dispatch('battle/joinSiegeArea', spy)
      calculateSiegeCombat()
      break;
  }
  sendData('callback')
}

// 对方反馈我方出牌行为，所以我方不能出牌
function callbackMessage(data) {
  store.commit('enemy/setEnemyInfo', data.data)
}