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
import { setStorage, getStorage } from '@/util'
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
      setStorage('formInline', this.formInline)
      this.goEasy.connect({
        id: this.formInline.roomId, //pubsub选填，im必填，最大长度60字符
        data:{
          nickname: this.formInline.username
        }, //必须是一个对象，pubsub选填，im必填，最大长度300字符，用于上下线提醒和查询在线用户列表时，扩展更多的属性
        onSuccess: () => {  //连接成功
          console.log("GoEasy connect successfully.") //连接成功
          this.$router.push({
            path: '/selectCard'
          })
        },
        onFailed: (error) => { //连接失败
          console.log("Failed to connect GoEasy, code:"+error.code+ ",error:"+error.content);
        },
        onProgress: (attempts) => { //连接或自动重连中
          console.log("GoEasy is connecting", attempts);
        }
      });
    }
  },
  created() {
    const formInline = getStorage('formInline')
    if(formInline) {
      this.formInline = formInline
    }
  }
}
</script>
