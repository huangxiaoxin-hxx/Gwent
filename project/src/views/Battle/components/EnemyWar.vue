<template>
  <div class="w-full h-full flex">
    <div class="left w-60 flex items-center">
      <div class="w-60 relative">
        <div class=" text-right pr-4 text-2xl font-bold absolute right-0">{{ totalCombat }}</div>
        <KingCard />
      </div>
    </div>
    <div class="center flex-1 flex flex-col overflow-hidden">
      <div class="flex-1">
        <EnemyArea :cardList="enemyInfo.handCardList"/>
      </div>
      <div class="flex-1 mb-1">
        <SiegeArea :siegeList="enemyInfo.siegeList" statue="enemy"/>
      </div>
      <div class="flex-1 mb-1">
        <ShooterArea :shooterList="enemyInfo.shooterList" statue="enemy"/>
      </div>
      <div class="flex-1 mb-1">
        <WarriorArea :warriorList="enemyInfo.warriorList" statue="enemy"/>
      </div>
    </div>
    <div class="right w-52 relative">
      
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EnemyArea from '@/components/EnemyArea.vue'
import KingCard from '@/components/KingCard.vue'
import WarriorArea from '@/components/WarriorArea.vue'
import ShooterArea from '@/components/ShooterArea.vue'
import SiegeArea from '@/components/SiegeArea.vue'
export default {
  name: "OwnWar",
  components: {
    EnemyArea,
    KingCard,
    WarriorArea,
    ShooterArea,
    SiegeArea,
  },
  computed: {
    ...mapGetters('enemy', ['enemyInfo'])
  }
}
</script>