<template>
  <div class="inline-block">
    <div class="w-32 h-44 border-2 m-3 relative text-center box-border card" :class="borderColor">
      <div class="absolute border-2 w-6 h-6 bg-white rounded-full -top-3 -left-3 box-border" :class="borderColor" v-show="cardData.combat != null">{{ cardData.combat }}</div>
      <span class="absolute box-border top-2 left-0 w-full text-sm">{{ position }}</span>
      <span class="absolute box-border bottom-8 left-0 w-full text-sm">{{ ability }}</span>
      <span class="absolute bottom-2 w-full left-0 text-sm" >{{ cardData.name }}</span>
      <div class="absolute w-full h-full bg-opacity-5 bg-gray-500 hidden">
        <div class=" mt-16">
          <el-popover
          placement="top-start"
          width="200"
          trigger="hover"
          :content="cardData.desc">
            <el-button slot="reference" type="text" size="mini">查看详情</el-button>
          </el-popover>
          <el-button v-if="statue === 'other'" type="text" size="mini" @click="joinGroup">加入牌组</el-button>
          <el-button v-if="statue === 'group'" type="text" size="mini" @click="takeOutGroup">拿出牌组</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { positionType, abilityType } from '@/static/cardConfig'
export default {
  name: "Card",
  props: {
    cardData: {
      type: Object,
      default: () => {}
    },
    statue: {
      type: String,
      default: 'other'
    }
  },
  computed: {
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
    joinGroup() {
      this.$emit('joinGroup', this.cardData)
    },
    takeOutGroup() {
      this.$emit('takeOutGroup', this.cardData)
    }
  }
}
</script>

<style>
.card:hover .hidden{
  display: block;
}
</style>