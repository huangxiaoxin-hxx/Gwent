<template>
  <div class="inline-block">
    <div class="w-24 h-full border-2 mr-2 relative text-center box-border card" :class="borderColor">
      <div class="absolute border-2 w-6 h-6 bg-white rounded-full top-0 left-0 box-border" :class="borderColor" v-show="cardData.combat != null">{{ cardData.combat }}</div>
      <span class="absolute box-border top-2 left-0 w-full text-sm">{{ position }}</span>
      <span class="absolute box-border bottom-8 left-0 w-full text-sm">{{ ability }}</span>
      <span class="absolute bottom-2 w-full left-0 text-sm truncate">{{ cardData.name }}</span>
      <div class="absolute w-full h-full bg-opacity-5 bg-gray-500 hidden">
        <div class=" mt-8">
          <el-popover
          placement="top-start"
          width="200"
          trigger="hover"
          :content="cardData.desc">
            <el-button slot="reference" type="text" size="mini">查看详情</el-button>
          </el-popover>
          <div v-show="!isGiveUp">
            <el-button v-if="statue === 'handArea'" type="text" size="mini" @click="playingCard">出牌</el-button>
            <el-button v-if="statue === 'doctorPlay'" type="text" size="mini" @click="doctorPlayingCard">出牌</el-button>
          </div>
        </div>
      </div>
      <div v-show="exchange && cardData.fieldSelect" class="absolute w-full h-full bg-opacity-5 bg-gray-800 z-20">
        <el-button type="text" class="mt-10" @click="playingExchange">替换</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { positionType, abilityType } from '@/static/cardConfig'
import { playingCardTypeSwitch, exchangeLogic, beforeDoctorPlaying } from '@/cardRule'
import { mapGetters } from 'vuex'
export default {
  name: "Card",
  props: {
    cardData: {
      type: Object,
      default: () => {}
    },
    statue: {
      type: String,
      default: 'handArea'
    },
    exchange: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters('battle', ['isGiveUp']),
    borderColor() {
      return this.cardData.hero ? 'border-yellow-500' : 'border-black'
    },
    position() {
      return positionType[this.cardData.position] || null
    },
    ability() {
      return abilityType[this.cardData.type] || null
    }
  },
  methods: {
    playingCard() {
      playingCardTypeSwitch(this.cardData)
    },
    playingExchange() {
      exchangeLogic(this.cardData, this.statue)
    },
    doctorPlayingCard() {
      beforeDoctorPlaying(this.cardData)
      playingCardTypeSwitch(this.cardData)
    }
  }
}
</script>

<style>
.card:hover .hidden{
  display: block;
}
</style>