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
export default {
  name: "Battle",
  components: {
    OwnWar,
    WeatherArea
  },
}
</script>

<style>
.weather {
  transform: translateY(-50%);
}
</style>