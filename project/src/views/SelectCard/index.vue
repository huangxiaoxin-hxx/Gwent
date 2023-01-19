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
      <div class="absolute w-5/12 top-36 bottom-0 overflow-scroll right-0 flex justify-end flex-wrap">
        <Card v-for="(item, index) in selectCardGroup" :key="index" :cardData="item" statue="group" @takeOutGroup="takeOutGroup" />
      </div>
    </div>
    <div class="w-72 left-1/2 absolute top-36 king bottom-0">
      <el-carousel height="360px" arrow="always" :autoplay="false" @change="onChange">
        <el-carousel-item v-for="item in curKingGroup" :key="item.id">
          <img class="h-80 m-auto mb-5"  :src="require(`@/static/${item.id}.jpeg`)">
        </el-carousel-item>
      </el-carousel>
      <div class="absolute bg-white text-sm z-50 w-72 desc h-8 leading-8">{{ king.desc }}</div>
      <div class=" mt-10">单位牌数量： <span :class="rule.unitNumber < 22 && 'text-red-600'">{{ rule.unitNumber }}</span>/22</div>
      <div>特殊牌数量： <span :class="rule.specialNumber > 10 && 'text-red-600'">{{ rule.specialNumber }}</span>/10</div>
      <div class="absolute bottom-20 w-full">
        <el-button type="success" :disabled="ableBegin" @click="BeginGame">开始游戏</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { campList, camp, neutralCardGroup, NorthCardGroup, NilfgaardianCardGroup, kingGroup } from '@/static/cardConfig'
import { judgeCardGroup, calculateSpecialNumber } from './utils' 
import Card from '@/components/Card.vue'
import { setLocalItem, getLocalItem } from '@/indexDB'
import { mapMutations } from 'vuex'
import { startSubscribe } from '@/cardRule/getMessage.js'
export default {
  name: 'SelectCard',
  components: {
    Card
  },
  data() {
    return {
      campList: campList,
      camp: camp.north,
      northCardGroup: [],
      nilfgaardianCardGroup: [],
      kingGroup: kingGroup,
      selectCardGroup: [],
      king: kingGroup[camp.north][0],
      rule: {
        unitNumber: 0, // 单位牌 >= 22
        specialNumber: 0, // 特殊卡 <= 10
      }
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
    },
    curKingGroup() {
      return this.kingGroup[this.camp]
    },
    ableBegin() {
      if(this.rule.specialNumber <= 10 && this.rule.unitNumber >= 22) {
        return false
      }
      return true
    },
  },
  methods: {
    ...mapMutations('battle', ['setCamp', 'setKingCard']),
    setStoreData() {
      setLocalItem('group', this.camp, this.selectCardGroup)
      setLocalItem('store', this.camp, this[this.curCardGroup])
    },
    async getStoreData() {
      this.selectCardGroup = await getLocalItem('group', this.camp) || []
      this.northCardGroup = await getLocalItem('store', camp.north) || neutralCardGroup.concat(NorthCardGroup)
      this.nilfgaardianCardGroup = await getLocalItem('store', camp.nilfgaardian) || neutralCardGroup.concat(NilfgaardianCardGroup)
    },
    joinGroup(data) {
      this.selectCardGroup.push(data)
      const index = this[this.curCardGroup].indexOf(data)
      this[this.curCardGroup].splice(index, 1)
      this.setStoreData()
    },
    takeOutGroup(data) {
      this[this.curCardGroup].push(data)
      const index = this.selectCardGroup.indexOf(data)
      this.selectCardGroup.splice(index, 1)
      this.setStoreData()
    },
    onChange(data) {
      this.king = this.kingGroup[this.camp][data]
    },
    BeginGame() {
      this.setKingCard(this.king)
      this.$router.replace({path:'/battle'})
    }
  },
  watch: {
    selectCardGroup(val) {
      console.log(val)
      const specialCount = calculateSpecialNumber(val)
      this.rule.specialNumber = specialCount
      this.rule.unitNumber = val.length - specialCount
    },
    camp(val) {
      this.getStoreData()
      this.setCamp(val)
    }
  },
  async created() {
    this.getStoreData()
    this.setCamp(this.camp)
  },
  mounted() {
    startSubscribe()
  }
}
</script>

<style>
.king {
  transform: translateX(-50%);
}
.king .desc {
  top: 340px
}
</style>