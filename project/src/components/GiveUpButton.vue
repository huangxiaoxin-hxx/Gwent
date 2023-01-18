<template>
  <div>
    <el-button @click="giveUpPlaying">放弃出牌</el-button>

  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: "GiveUpButton",
  methods: {
    ...mapMutations('battle', ['setIsGiveUp']),
    giveUpPlaying() {
      this.$confirm('是否放弃本轮出牌?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.setIsGiveUp(true)
        })
    }
  }
}
</script>

<style>

</style>