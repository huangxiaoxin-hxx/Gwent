<template>
  <div class="battle h-screen w-full">
    <div class="h-1/2"></div>
    <div class="h-1/2">
      <OwnWar />
    </div>
    <div class="weather"></div>
  </div>
</template>

<script>
import OwnWar from './components/OwnWar.vue'
export default {
  name: "Battle",
  components: {
    OwnWar
  },
}
</script>
