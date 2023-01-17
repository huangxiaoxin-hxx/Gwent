<template>
  <div class="hand-area flex h-full w-full overflow-hidden">
    <div class="w-24 h-full border-2 mr-2 leading-loose">号角区</div>
    <div class="overflow-scroll flex-1 h-full flex">
      <HandCard v-for="(item) in siegeList" :key="item.id" :cardData="item" statue="siegeArea" :exchange="exchange"/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import HandCard from '@/components/HandCard'
export default {
  name: "SiegeArea",
  components: {
    HandCard
  },
  computed: {
    ...mapGetters('battle', ['siegeList']),
    ...mapState('battle', ['exchange'])
  }
}
</script>