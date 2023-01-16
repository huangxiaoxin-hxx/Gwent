<template>
  <div class="hand-area flex h-full w-full overflow-hidden justify-center">
    <div class="h-full w-16 weather-card" v-show="weather.frost">霜冻</div>
    <div class="h-full w-16 weather-card" v-show="weather.fog">浓雾</div>
    <div class="h-full w-16 weather-card" v-show="weather.rain">酸雨</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "WeatherArea",
  computed: {
    ...mapGetters('battle', ['weather']),
  }
}
</script>

<style>
.weather-card {
  border: 1px black solid;
  line-height: 120px;
}
</style>