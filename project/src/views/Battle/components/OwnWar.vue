<template>
  <div class="w-full h-full flex">
    <div class="left w-60 flex items-center">
      <div class="w-60 relative">
        <div class=" text-right pr-4 text-2xl font-bold absolute right-0">{{ totalCombat }}</div>
        <KingCard />
      </div>
    </div>
    <div class="center flex-1 flex flex-col overflow-hidden">
      <div class="flex-1 mb-1">
        <WarriorArea :warriorList="warriorList" :exchange="exchange" statue="warriorArea" />
      </div>
      <div class="flex-1 mb-1">
        <ShooterArea :shooterList="shooterList" :exchange="exchange" statue="shooterArea" />
      </div>
      <div class="flex-1 mb-1">
        <SiegeArea :siegeList="siegeList" :exchange="exchange" statue="siegeArea" />
      </div>
      <div class="flex-1">
        <HandArea />
      </div>
    </div>
    <div class="right w-52 relative">
      <GiveUpButton />
      <CemeteryArea />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import HandArea from '@/components/HandArea.vue'
import KingCard from '@/components/KingCard.vue'
import WarriorArea from '@/components/WarriorArea.vue'
import ShooterArea from '@/components/ShooterArea.vue'
import SiegeArea from '@/components/SiegeArea.vue'
import CemeteryArea from '@/components/CemeteryArea.vue'
import GiveUpButton from '@/components/GiveUpButton.vue'
export default {
  name: "OwnWar",
  components: {
    HandArea,
    KingCard,
    WarriorArea,
    ShooterArea,
    SiegeArea,
    CemeteryArea,
    GiveUpButton
  },
  methods: {
    ...mapActions('battle', ['beginGameRandomCard']),
  },
  computed: {
    ...mapGetters('battle', ['camp', 'handCardList', 'totalCombat', 'warriorList', 'shooterList', 'siegeList', 'exchange'])
  },
  async created() {
    this.beginGameRandomCard()
  }
}
</script>