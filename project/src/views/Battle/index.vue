<template>
  <div class="battle h-screen w-full">
    <div class="h-1/2"></div>
    <div class="h-1/2">
      <OwnWar />
    </div>
    <div class="weather absolute border-2 border-black w-56 h-32 top-1/2 left-0">
      <WeatherArea />
    </div>
  </div>
</template>

<script>
import OwnWar from './components/OwnWar.vue'
import WeatherArea from '@/components/WeatherArea.vue'
import { pubSub } from '@/main'
import { getStorage } from '@/util'
export default {
  name: "Battle",
  components: {
    OwnWar,
    WeatherArea
  },
  created() {
    const formInline = getStorage('formInline')
    pubSub.subscribe({
      channel: formInline.roomId,
      onMessage: (message) => {
        const data = JSON.parse(message.content)
        console.log(data)
      },
      onSuccess: () => {
        console.log("监听新消息成功")
      },
      onFailed: (error) => {
        console.log("订阅消息失败, code:"+error.code+ ",错误信息:"+error.content);
      }
    })
  }
}
</script>

<style>
.weather {
  transform: translateY(-50%);
}
</style>