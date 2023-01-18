<template>
  <div class="w-32 h-44 border-2 border-black absolute bottom-0 right-1">
    <p class="mt-2 mb-5">墓地</p>
    <el-button type="text" @click="viewCemetery">查看墓地</el-button>
    <el-dialog
      title="提示"
      :visible.sync="cemeteryView"
      width="50%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false">
      <div class="flex h-32 overflow-scroll">
        <HandCard v-for="item in ableShowCard" :key="item.id" :cardData="item" :statue="isDoctor ? 'doctorPlay' : 'cemetery'" />
      </div>
      <span slot="footer" class="dialog-footer" v-show="!isDoctor">
        <el-button @click="coverCemetery">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import HandCard from './HandCard.vue'
export default {
  name: "CemeteryArea",
  components: {
    HandCard
  },
  computed: {
    ...mapGetters('battle', ['cemeteryList', 'cemeteryView', 'isDoctor']),
    ableShowCard() { // 墓地不展示不可选的卡牌
      return this.cemeteryList.filter(item => item.fieldSelect)
    }
  },
  methods: {
    ...mapMutations('battle', ['setCemeteryView']),
    viewCemetery() {
      this.setCemeteryView(true)
    },
    coverCemetery() {
      this.setCemeteryView(false)
    }
  }
}
</script>

<style>

</style>