<template>
  <div class="hand-area flex h-full overflow-scroll">
    <HandCard v-for="(item) in handCardList" :cardData="item" :key="item.id"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import HandCard from './HandCard.vue'
export default {
  name: "HandArea",
  components: {
    HandCard
  },
  computed: {
    ...mapGetters('battle', ['handCardList'])
  }
}
</script>