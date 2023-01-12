<template>
  <div class="w-full h-full flex">
    <div class="left w-52 flex items-center">
      <KingCard />
    </div>
    <div class="center flex-grow flex flex-col overflow-hidden">
      <div class="flex-1">
        <WarriorArea />
      </div>
      <div class="flex-1"></div>
      <div class="flex-1"></div>
      <div class="flex-1">
        <HandArea />
      </div>
    </div>
    <div class="right w-52"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import HandArea from '@/components/HandArea.vue'
import KingCard from '@/components/KingCard.vue'
import WarriorArea from '@/components/WarriorArea.vue'
export default {
  name: "OwnWar",
  components: {
    HandArea,
    KingCard,
    WarriorArea
  },
  methods: {
    ...mapActions('battle', ['beginGameRandomCard'])

  },
  computed: {
    ...mapGetters('battle', ['camp', 'handCardList'])
  },
  async created() {
    this.beginGameRandomCard()
  }
}
</script>