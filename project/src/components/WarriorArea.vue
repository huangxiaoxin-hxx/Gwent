<template>
  <div class="hand-area flex h-full w-full overflow-hidden">
    <div class="w-24 h-full border-2 mr-2 leading-loose">号角区</div>
    <div class="overflow-scroll flex-1 h-full flex">
      <HandCard v-for="(item) in warriorList" :key="item.id" :cardData="item" :exchange="exchange" :statue="statue"/>
    </div>
  </div>
</template>

<script>
import HandCard from '@/components/HandCard'
export default {
  name: "WarriorArea",
  props: {
    warriorList: {
      type: Array,
      default: () => []
    },
    exchange: {
      type: Boolean,
      default: false
    },
    statue: String
  },
  components: {
    HandCard
  },
}
</script>