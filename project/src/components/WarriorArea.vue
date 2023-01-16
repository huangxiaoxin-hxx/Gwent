<template>
  <div class="hand-area flex h-full w-full overflow-hidden">
    <div class="w-24 h-full border-2 mr-2 leading-loose">号角区</div>
    <div class="overflow-scroll flex-1 h-full flex">
      <HandCard v-for="(item) in warriorList" :key="item.id" :cardData="item" statue="warriorArea"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import HandCard from '@/components/HandCard'
export default {
  name: "WarriorArea",
  components: {
    HandCard
  },
  computed: {
    ...mapGetters('battle', ['warriorList'])
  }
}
</script>