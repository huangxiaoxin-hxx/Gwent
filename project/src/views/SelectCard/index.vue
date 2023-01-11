<template>
  <div class="selectCard pt-2 flex flex-col h-screen box-border">
    <div class="text-center text-xl mb-3">选择你的阵营</div>
    <div>
      <el-radio-group v-model="camp">
        <el-radio-button v-for="(item) in campList" :key="item.camp" :label="item.camp">
          {{ item.name }}
        </el-radio-button>
      </el-radio-group>
      <p class="mt-3">{{ campDesc }}</p>
    </div>
    <div>
      <div class="absolute w-5/12 top-36 bottom-0 overflow-scroll left-0 flex justify-start flex-wrap">
        <Card v-for="(item, index) in curCardGroupList" :key="index" :cardData="item" statue="other" @joinGroup="joinGroup" />
      </div>
      <div class="absolute w-5/12 top-36 bottom-0 overflow-scroll right-0">
        <Card v-for="(item, index) in selectCardGroup" :key="index" :cardData="item" statue="group" @takeOutGroup="takeOutGroup" />
      </div>
    </div>
  </div>
</template>

<script>
import { campList, camp, neutralCardGroup, NorthCardGroup } from '@/static/cardConfig'
import { judgeCardGroup } from './utils' 
import Card from '@/components/Card.vue'
export default {
  name: 'SelectCard',
  components: {
    Card
  },
  data() {
    return {
      campList: campList,
      camp: camp.north,
      neutralCardGroup: neutralCardGroup,
      northCardGroup: neutralCardGroup.concat(NorthCardGroup),
      selectCardGroup: []
    }
  },
  computed: {
    campDesc() {
      const fil = campList.filter((item) => {
        if(this.camp === item.camp) return true
      })
      return fil[0].abilityDesc
    },
    curCardGroup() {
      const group = judgeCardGroup(this.camp)
      return group
    },
    curCardGroupList() {
      const group = judgeCardGroup(this.camp)
      return this[group]
    }
  },
  methods: {
    joinGroup(data) {
      this.selectCardGroup.push(data)
      
      const index = this[this.curCardGroup].indexOf(data)
      this[this.curCardGroup].splice(index, 1)
    },
    takeOutGroup(data) {
      this[this.curCardGroup].push(data)
      const index = this.selectCardGroup.indexOf(data)
      this.selectCardGroup.splice(index, 1)
    }
  }
}
</script>