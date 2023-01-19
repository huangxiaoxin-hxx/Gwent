<template>
  <div class="kingCard relative w-40 h-64" v-if="kingCard">
    <img :src="require(`@/static/${kingCard.id}.jpeg`)" alt="">
    <div class="absolute w-full h-full bg-opacity-5 bg-gray-500 hidden top-0 left-0">
      <div class="mt-20">
        <el-popover
        placement="top-start"
        width="200"
        trigger="hover"
        :content="kingCard.desc">
          <el-button slot="reference" size="mini">查看详情</el-button>
        </el-popover>
        <br />
        <el-button v-if="statue === 'owner'" class="mt-2" size="mini" @click="playingCard">发动效果</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "KingCard",
  props: {
    kingCard: {
      type: Object,
      default: () => {}
    },
    statue: String
  },
  methods: {
    playingCard() {}
  }
}
</script>

<style>
.kingCard:hover .hidden{
  display: block;
}
</style>