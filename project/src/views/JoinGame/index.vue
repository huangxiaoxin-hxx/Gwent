<template>
  <div class="pt-5">
    <img class="h-80 m-auto mb-5" alt="logo" src="@/static/gwent.jpeg">
    <el-form :model="formInline" label-width="80px" class="m-auto w-96">
      <el-form-item label="用户名">
        <el-input v-model="formInline.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="房间号">
        <el-input v-model="formInline.roomId" placeholder="请输入房间号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">进入对战</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'JoinGame',
  data() {
    return {
      formInline: {
        username: '',
        roomId: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log(this.formInline)
    }
  }
}
</script>
