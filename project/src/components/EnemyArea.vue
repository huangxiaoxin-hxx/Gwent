<template>
  <div class="h-full overflow-scroll whitespace-nowrap box-border">
    <div class="enemyCard w-24 border-2 mr-2 relative text-center box-border p-1" v-for="item in handCardList" :key="item.id">
      昆特牌
    </div>
  </div>
</template>

<script>
export default {
  name: "EnemyArea",
  props: {
    handCardList: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style>
  .enemyCard {
    height: 100%;
    line-height: 100%;
    display: inline-block;
  }
</style>